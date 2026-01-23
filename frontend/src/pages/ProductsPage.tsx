import  { useState } from 'react';
import { useProducts, ProductData } from '@/hooks/useProducts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { ProductForm } from '@/components/products/ProductForm';
import { PackagePlus, RefreshCw, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const ProductsPage = () => {
  const { products, isLoading, meta, setPage, setSearch, search, refresh, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  const onFormSubmit = async (data: any) => {
    try {
      if (selectedProduct) await updateProduct(selectedProduct.id, data);
      else await addProduct(data);
      toast.success('Produk berhasil disimpan');
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Gagal menyimpan produk');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Produk</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refresh} disabled={isLoading}><RefreshCw className="h-4 w-4 mr-2" />Refresh</Button>
          <Button className="bg-blue-600" onClick={() => { setSelectedProduct(null); setIsDialogOpen(true); }}><PackagePlus className="h-4 w-4 mr-2" />Tambah Produk</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Daftar Inventaris</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Cari produk..." className="pl-9" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>Rp {Number(p.harga).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedProduct(p); setIsDialogOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteProduct(p.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-slate-500">Total {meta.totalItems} Produk</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage(p => p - 1)} disabled={meta.currentPage === 1 || isLoading}><ChevronLeft className="h-4 w-4" /></Button>
              <span className="text-sm">Hal {meta.currentPage} / {meta.totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={meta.currentPage === meta.totalPages || isLoading}><ChevronRight className="h-4 w-4" /></Button>
            </div>
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