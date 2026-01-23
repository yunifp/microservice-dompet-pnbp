import { useState } from 'react';
import { useProducts, ProductData } from '@/hooks/useProducts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { ProductForm } from '@/components/products/ProductForm';
import { 
  PackagePlus, RefreshCw, Pencil, Trash2, Search, 
  ChevronLeft, ChevronRight, Package, Tag, 
  MoreHorizontal, Sparkles, Box 
} from 'lucide-react';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ProductsPage = () => {
  const { products, isLoading, meta, setPage, setSearch, search, refresh, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  const onFormSubmit = async (data: any) => {
    try {
      if (selectedProduct) await updateProduct(selectedProduct.id, data);
      else await addProduct(data);
      toast.success(selectedProduct ? 'Produk berhasil diperbarui' : 'Produk berhasil ditambahkan');
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Gagal menyimpan produk');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await deleteProduct(id);
        toast.success('Produk berhasil dihapus');
      } catch (error) {
        toast.error('Gagal menghapus produk');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Package className="h-6 w-6 text-indigo-200" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Manajemen Produk</h1>
            </div>
            <p className="text-indigo-100 max-w-xl opacity-90">
              Kelola katalog layanan PNBP, atur harga, dan update informasi produk.
            </p>
          </div>
          <div className="flex gap-3">
             <Button 
              variant="outline" 
              onClick={refresh} 
              disabled={isLoading}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white h-11 px-5 rounded-xl backdrop-blur-md transition-all"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              onClick={() => { setSelectedProduct(null); setIsDialogOpen(true); }}
              className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg h-11 px-5 rounded-xl font-bold transition-all active:scale-[0.98]"
            >
              <PackagePlus className="h-4 w-4 mr-2" />
              Tambah Produk
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-80 w-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 h-40 w-40 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
      </div>

      <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96 group">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <Input 
                placeholder="Cari nama layanan..." 
                className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                value={search} 
                onChange={(e) => { setSearch(e.target.value); setPage(1); }} 
              />
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Total <span className="text-slate-900 font-bold">{meta.totalItems}</span> Layanan
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="w-[400px] px-6 py-4 font-semibold text-slate-600">Nama Layanan</TableHead>
                  <TableHead className="font-semibold text-slate-600">Harga Satuan</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status</TableHead>
                  <TableHead className="text-right px-6 font-semibold text-slate-600">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {products.length === 0 ? (
                   <TableRow>
                      <TableCell colSpan={4} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                <Box className="h-8 w-8 text-slate-300" />
                            </div>
                            <p className="font-medium">Tidak ada produk ditemukan</p>
                        </div>
                      </TableCell>
                   </TableRow>
                ) : (
                  products.map((p) => (
                    <TableRow key={p.id} className="group hover:bg-slate-50/80 transition-colors border-slate-100">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            <Tag className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm line-clamp-1">{p.name}</p>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                              <Sparkles className="h-3 w-3 text-amber-500" />
                              Layanan Resmi PNBP
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 w-fit">
                          Rp {Number(p.harga).toLocaleString('id-ID')}
                        </div>
                      </TableCell>
                      <TableCell>
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Aktif
                         </span>
                      </TableCell>
                      <TableCell className="text-right px-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-200 data-[state=open]:bg-slate-200">
                              <MoreHorizontal className="h-4 w-4 text-slate-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-slate-100">
                            <DropdownMenuLabel className="text-xs text-slate-500">Aksi</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => { setSelectedProduct(p); setIsDialogOpen(true); }} className="gap-2 cursor-pointer focus:bg-indigo-50 focus:text-indigo-600">
                              <Pencil className="h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(p.id)} className="gap-2 text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-700">
                              <Trash2 className="h-4 w-4" /> Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50/30">
             <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => p - 1)} 
                disabled={meta.currentPage === 1 || isLoading}
                className="h-9 px-4 rounded-xl border-slate-200 hover:bg-white hover:text-indigo-600 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Sebelumnya
              </Button>
              <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                Halaman {meta.currentPage} dari {meta.totalPages}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => p + 1)} 
                disabled={meta.currentPage === meta.totalPages || isLoading}
                className="h-9 px-4 rounded-xl border-slate-200 hover:bg-white hover:text-indigo-600 disabled:opacity-50"
              >
                Selanjutnya
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ProductForm product={selectedProduct} onSubmit={onFormSubmit} onClose={() => setIsDialogOpen(false)} />
      </Dialog>
    </div>
  );
};

export default ProductsPage;