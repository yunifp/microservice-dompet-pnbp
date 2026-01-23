import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Copy, Receipt, Check, Wallet, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (billingData?.kode_billing) {
      navigator.clipboard.writeText(billingData.kode_billing);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white">
        
        <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 px-6 py-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-20 w-20 rounded-full bg-emerald-400/20 blur-xl" />
          
          <div className="relative z-10 flex flex-col items-center text-center gap-4 pt-2">
            <div className="h-16 w-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border-2 border-white/20 shadow-lg mb-2">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                Checkout Berhasil!
              </DialogTitle>
              <DialogDescription className="text-emerald-50 mt-2 text-base opacity-90 max-w-xs mx-auto">
                Kode billing Anda telah diterbitkan. Silakan lakukan pembayaran sebelum batas waktu berakhir.
              </DialogDescription>
            </div>
          </div>
        </div>

        {billingData && (
          <div className="p-6 space-y-6">
            <div className="relative rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 p-6 transition-all hover:bg-slate-50/80">
              <div className="text-center space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Nomor Virtual Account
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-4xl font-bold text-slate-800 tracking-wider">
                    {billingData.kode_billing}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCopy}
                  className={cn(
                    "h-8 mt-2 text-xs font-medium transition-all duration-300",
                    copied ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1.5" />
                      Salin Kode
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Wallet className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-500">Total Tagihan</span>
                </div>
                <p className="text-lg font-bold text-slate-900">
                  Rp {Number(billingData.total_harga).toLocaleString()}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-500">Jatuh Tempo</span>
                </div>
                <p className="text-sm font-bold text-rose-600 mt-1">
                  {new Date(billingData.expired_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 bg-slate-50 py-3 rounded-xl">
              <ShieldCheck className="h-3.5 w-3.5" />
              Simpan bukti pembayaran ini untuk verifikasi.
            </div>
          </div>
        )}

        <DialogFooter className="p-6 pt-2 bg-slate-50/50">
          <Button 
            className="w-full h-12 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all"
            onClick={() => onOpenChange(false)}
          >
            Selesai & Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};