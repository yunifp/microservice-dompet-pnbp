import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useTransactions } from '@/hooks/useTransactions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search, Package } from 'lucide-react';

const ShopPage = () => {
  const { products, isLoading: loadingProducts, search, setSearch } = useProducts();
  const { addToCart, checkout, isLoading: loadingTx } = useTransactions();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Katalog Layanan PNBP</h1>
          <p className="text-slate-500">Pilih layanan yang Anda butuhkan</p>
        </div>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Cari layanan..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="default" className="bg-green-600 hover:bg-green-700" onClick={checkout} disabled={loadingTx}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Checkout Keranjang
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <Package className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>Layanan PNBP Resmi</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <span className="text-2xl font-bold text-blue-600">
                Rp {Number(product.harga).toLocaleString()}
              </span>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button 
                variant="outline" 
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => addToCart(product.id)}
                disabled={loadingTx}
              >
                Tambah ke Keranjang
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {products.length === 0 && !loadingProducts && (
        <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed">
          <p className="text-slate-500">Tidak ada produk yang tersedia saat ini.</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;