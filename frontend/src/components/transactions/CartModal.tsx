import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi Pesanan</DialogTitle>
          <DialogDescription>
            Periksa kembali layanan yang Anda pesan sebelum melanjutkan ke pembayaran.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {!cart || !cart.items || cart.items.length === 0 ? (
            <div className="text-center py-8 text-slate-500">Keranjang Anda kosong.</div>
          ) : (
            <div className="space-y-4">
              <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
                {cart.items.map((item: any, index: number) => (
                  <div key={index} className="p-3 flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium text-slate-900">{getProductName(item.produk_id)}</div>
                      <div className="text-slate-500 text-xs">{item.quantity} Hit x Rp {Number(item.harga).toLocaleString()}</div>
                    </div>
                    <div className="font-semibold">
                      Rp {(item.quantity * item.harga).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t mt-4">
                <span className="font-bold text-lg">Total Pembayaran</span>
                <span className="font-bold text-xl text-blue-600">
                  Rp {Number(cart.total_harga).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button 
            className="bg-green-600 hover:bg-green-700" 
            onClick={onProceed}
            disabled={!cart || !cart.items || cart.items.length === 0 || isLoading}
          >
            {isLoading ? "Memproses..." : "Lanjutkan Pembayaran"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};