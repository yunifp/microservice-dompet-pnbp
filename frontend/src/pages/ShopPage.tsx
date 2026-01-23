import React, { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useTransactions } from '@/hooks/useTransactions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search, Package, Plus } from 'lucide-react';
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
          <Button 
            variant="default" 
            className="bg-green-600 hover:bg-green-700 relative" 
            onClick={handleCheckoutClick} 
            disabled={loadingTx}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Checkout
            {cart?.total_harga > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                !
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col border shadow-sm hover:shadow-md transition-all duration-200 group">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <Package className="h-5 w-5" />
                </div>
                <div className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                  Resmi
                </div>
              </div>
              <CardTitle className="text-base font-semibold mt-4 line-clamp-2 min-h-[3rem]">
                {product.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 pb-4">
              <div className="text-2xl font-bold text-slate-800">
                Rp {Number(product.harga).toLocaleString()}
                <span className="text-xs text-slate-400 font-normal ml-1">/ hit</span>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
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
        <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed">
          <p className="text-slate-500">Tidak ada produk yang tersedia saat ini.</p>
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