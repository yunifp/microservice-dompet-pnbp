import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ShoppingCart, Receipt, CreditCard, Package, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: any;
  products: any[];
  onProceed: () => void;
  isLoading: boolean;
}

export const CartModal: React.FC<CartModalProps> = ({ 
  open, 
  onOpenChange, 
  cart, 
  products, 
  onProceed, 
  isLoading 
}) => {
  
  const getProductName = (id: number) => {
    const product = products.find(p => p.id === id);
    return product ? product.name : `Produk #${id}`;
  };

  const hasItems = cart && cart.items && cart.items.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white">
        
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-20 w-20 rounded-full bg-blue-400/20 blur-xl" />
          
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-blue-200" />
                Keranjang Belanja
              </DialogTitle>
              <DialogDescription className="text-blue-100 mt-1.5 opacity-90">
                Review pesanan Anda sebelum melakukan pembayaran.
              </DialogDescription>
            </div>
            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-inner">
               <Receipt className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="p-6">
          {!hasItems ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <ShoppingCart className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Keranjang Kosong</h3>
              <p className="text-slate-500 mt-1 max-w-[200px]">
                Belum ada layanan yang ditambahkan.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="max-h-[320px] overflow-y-auto pr-2 -mr-2 space-y-3 custom-scrollbar">
                {cart.items.map((item: any, index: number) => (
                  <div 
                    key={index} 
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-white flex items-center justify-center border border-slate-100 text-blue-600 shadow-sm">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{getProductName(item.produk_id)}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            x{item.quantity}
                          </span>
                          <span className="text-xs text-slate-400">
                            @ Rp {Number(item.harga).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right pl-13 sm:pl-0">
                      <p className="font-bold text-slate-900">
                        Rp {(item.quantity * item.harga).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-slate-500">Total Tagihan</span>
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Rp {Number(cart.total_harga).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Pembayaran aman & terenkripsi
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 pt-2 bg-slate-50/50">
          <div className="flex w-full gap-3">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 rounded-xl font-medium border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              Kembali
            </Button>
            <Button 
              className="flex-1 h-12 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none" 
              onClick={onProceed}
              disabled={!hasItems || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Memproses...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Bayar Sekarang <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};