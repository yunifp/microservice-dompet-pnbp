import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ProductData } from '@/hooks/useProducts';
import { PackagePlus, Pencil, Package, Banknote, Save, X } from 'lucide-react';

interface ProductFormProps {
  product?: ProductData | null;
  onSubmit: (data: any) => Promise<void>;
  onClose: () => void;
}

export const ProductForm = ({ product, onSubmit, onClose }: ProductFormProps) => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: { name: '', harga: 0 }
  });

  useEffect(() => {
    if (product) {
      reset({ name: product.name, harga: product.harga });
    } else {
      reset({ name: '', harga: 0 });
    }
  }, [product, reset]);

  const handleClose = () => {
    reset({ name: '', harga: 0 });
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white">
      <div className="relative bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-6 text-white overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-20 w-20 rounded-full bg-indigo-400/20 blur-xl" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-inner">
            {product ? <Pencil className="h-6 w-6 text-white" /> : <PackagePlus className="h-6 w-6 text-white" />}
          </div>
          <div>
            <DialogTitle className="text-xl font-bold tracking-tight text-white">
              {product ? 'Edit Layanan' : 'Tambah Layanan Baru'}
            </DialogTitle>
            <p className="text-indigo-100 text-sm mt-0.5 opacity-90">
              {product ? 'Perbarui informasi layanan yang tersedia.' : 'Masukkan detail layanan PNBP baru.'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700 ml-1">Nama Layanan</Label>
          <div className="relative group">
            <Package className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input 
              {...register('name')} 
              required 
              className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="Contoh: Legalisir Dokumen"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700 ml-1">Harga Satuan (Rp)</Label>
          <div className="relative group">
            <Banknote className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input 
              type="number" 
              {...register('harga')} 
              required 
              min="0"
              className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
              placeholder="0"
            />
          </div>
        </div>
      </form>

      <DialogFooter className="p-6 pt-2 bg-slate-50/50">
        <div className="flex w-full gap-3">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="flex-1 h-11 rounded-xl font-medium border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            disabled={isSubmitting}
          >
            <X className="mr-2 h-4 w-4" /> Batal
          </Button>
          <Button 
            onClick={handleSubmit(onSubmit)} 
            className="flex-1 h-11 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Menyimpan...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4" /> Simpan
              </div>
            )}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};