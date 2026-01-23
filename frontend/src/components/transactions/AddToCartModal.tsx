import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Minus, Plus, ShoppingBag, Calculator, Package, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddToCartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any | null;
  onConfirm: (productId: number, quantity: number) => Promise<void>;
  isLoading: boolean;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  open,
  onOpenChange,
  product,
  onConfirm,
  isLoading
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [open, product]);

  if (!product) return null;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleConfirm = async () => {
    await onConfirm(product.id, quantity);
    onOpenChange(false); 
  };

  const totalPrice = quantity * product.harga;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white">
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-20 w-20 rounded-full bg-blue-400/20 blur-xl" />
          
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-blue-200" />
                Tambah Layanan
              </DialogTitle>
              <DialogDescription className="text-blue-100 mt-1.5 opacity-90">
                Atur jumlah kuota layanan yang Anda butuhkan.
              </DialogDescription>
            </div>
            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-inner">
               <Package className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="group relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 p-4 transition-all hover:bg-white hover:shadow-md hover:border-blue-100">
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-lg leading-tight">{product.name}</h3>
                <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                   <Sparkles className="h-3 w-3 text-amber-500" />
                   Premium Service
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">Harga Satuan</p>
                <p className="font-bold text-slate-700">Rp {Number(product.harga).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 ml-1">Jumlah Pemesanan (Hits)</Label>
            <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDecrement}
                className="h-10 w-10 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="h-5 w-5" />
              </Button>
              
              <div className="flex-1 text-center">
                 <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                  className="border-none shadow-none text-center text-2xl font-bold text-slate-800 h-10 focus-visible:ring-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleIncrement}
                className="h-10 w-10 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-lg">
            <div className="absolute top-0 right-0 h-32 w-32 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3 opacity-80">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Calculator className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Total Estimasi</span>
              </div>
              <div className="flex flex-col items-end">
                <span className={cn(
                  "text-2xl font-bold tracking-tight transition-all duration-300", 
                  isAnimating ? "scale-105 text-blue-300" : "scale-100 text-white"
                )}>
                  Rp {totalPrice.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                  Belum termasuk PPN
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 bg-slate-50/50">
          <div className="flex w-full gap-3">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              disabled={isLoading}
              className="flex-1 h-12 rounded-xl font-medium border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              Batal
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={isLoading || quantity < 1} 
              className="flex-1 h-12 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Menyimpan...
                </div>
              ) : (
                "Simpan Pesanan"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};