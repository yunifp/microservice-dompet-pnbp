import React, { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useTransactions } from '@/hooks/useTransactions';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search, Package, Plus, Sparkles, Filter } from 'lucide-react';
import { CartModal } from '@/components/transactions/CartModal';
import { BillingModal } from '@/components/transactions/BillingModal';
import { AddToCartModal } from '@/components/transactions/AddToCartModal';

const ShopPage = () => {
  const { products, isLoading: loadingProducts, search, setSearch } = useProducts();
  const { addToCart, checkout, getCart, cart, isLoading: loadingTx } = useTransactions();
  
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBillingOpen, setIsBillingOpen] = useState(false);
  const [billingData, setBillingData] = useState<any>(null);

  useEffect(() => {
    getCart();
  }, []);

  const handleOpenAddToCart = (product: any) => {
    setSelectedProduct(product);
    setIsAddToCartOpen(true);
  };

  const handleCheckoutClick = async () => {
    await getCart();
    setIsCartOpen(true);
  };

  const handleProcessPayment = async () => {
    const result = await checkout();
    if (result) {
      setBillingData(result);
      setIsCartOpen(false);
      setIsBillingOpen(true);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Katalog Layanan</h1>
          <p className="text-slate-500 mt-2 text-lg">Pilih layanan PNBP yang Anda butuhkan.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              placeholder="Cari layanan..."
              className="pl-11 h-12 rounded-xl border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500/20 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
           
          </div>
          
          <Button 
            className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] relative overflow-hidden" 
            onClick={handleCheckoutClick} 
            disabled={loadingTx}
          >
            <div className="flex items-center ">
              <ShoppingCart className="h-5 w-5" />

            </div>
            {cart?.total_harga > 0 && (
              <span className="absolute top-2 right-2 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="group relative flex flex-col border-none shadow-lg bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            <CardHeader className="pb-4 pt-6 px-6">
              <div className="flex justify-between items-start mb-4">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Package className="h-7 w-7" />
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Resmi
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 line-clamp-2 min-h-[3.5rem] leading-snug group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </CardHeader>
            
            <CardContent className="flex-1 px-6 pb-2">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium text-slate-400">Rp</span>
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {Number(product.harga).toLocaleString()}
                </span>
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md ml-1">
                  / hit
                </span>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-4">
              <Button 
                className="w-full h-11 bg-slate-900 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md transition-all duration-300 group-hover:shadow-blue-600/25"
                onClick={() => handleOpenAddToCart(product)}
                disabled={loadingTx}
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Keranjang
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {products.length === 0 && !loadingProducts && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Package className="h-10 w-10 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Tidak ada layanan ditemukan</h3>
          <p className="text-slate-500 max-w-sm text-center mt-1">
            Coba ubah kata kunci pencarian Anda atau hubungi administrator.
          </p>
        </div>
      )}

      <AddToCartModal 
        open={isAddToCartOpen}
        onOpenChange={setIsAddToCartOpen}
        product={selectedProduct}
        onConfirm={addToCart}
        isLoading={loadingTx}
      />

      <CartModal 
        open={isCartOpen} 
        onOpenChange={setIsCartOpen}
        cart={cart}
        products={products}
        onProceed={handleProcessPayment}
        isLoading={loadingTx}
      />

      <BillingModal 
        open={isBillingOpen}
        onOpenChange={setIsBillingOpen}
        billingData={billingData}
      />
    </div>
  );
};

export default ShopPage;