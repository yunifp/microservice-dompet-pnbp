import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock } from 'lucide-react';

interface BillingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billingData: any;
}

export const BillingModal: React.FC<BillingModalProps> = ({ 
  open, 
  onOpenChange, 
  billingData 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] text-center">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <DialogTitle className="text-center text-xl">Checkout Berhasil!</DialogTitle>
          <DialogDescription className="text-center">
            Kode Billing Anda telah diterbitkan. Segera lakukan pembayaran.
          </DialogDescription>
        </DialogHeader>

        {billingData && (
          <div className="bg-slate-50 p-6 rounded-lg border border-dashed border-slate-300 my-4 space-y-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">Kode Billing (Virtual Account)</p>
              <p className="text-3xl font-mono font-bold text-slate-800 tracking-wider">
                {billingData.kode_billing}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-left">
               <div>
                  <p className="text-xs text-slate-500">Total Tagihan</p>
                  <p className="font-bold text-slate-800">Rp {Number(billingData.total_harga).toLocaleString()}</p>
               </div>
               <div>
                  <p className="text-xs text-slate-500">Berlaku Hingga</p>
                  <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                    <Clock className="w-3 h-3" />
                    {new Date(billingData.expired_at).toLocaleDateString('id-ID')}
                  </div>
               </div>
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-center">
           <Button className="w-full" onClick={() => onOpenChange(false)}>
             Selesai
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};