import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";

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


  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open, product]);

  if (!product) return null;

  const handleConfirm = async () => {
    await onConfirm(product.id, quantity);
    onOpenChange(false); 
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Layanan</DialogTitle>
          <DialogDescription>
            Masukkan jumlah hit/kuota yang ingin Anda pesan.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Info Produk */}
          <div className="space-y-1 bg-slate-50 p-3 rounded-md border">
            <h3 className="font-semibold text-slate-900">{product.name}</h3>
            <p className="text-sm text-slate-500">
              Harga Satuan: <span className="font-medium text-slate-700">Rp {Number(product.harga).toLocaleString()}</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Jumlah Order (Hits)</Label>
            <div className="flex items-center gap-3">
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                className="text-lg font-medium"
              />
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-blue-50/50 rounded-lg border border-blue-100 mt-2">
            <span className="text-sm font-medium text-slate-600">Total Estimasi</span>
            <span className="text-xl font-bold text-blue-600">
              Rp {(quantity * product.harga).toLocaleString()}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Batal
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading || quantity < 1} className="bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Menyimpan..." : "Simpan ke Keranjang"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};