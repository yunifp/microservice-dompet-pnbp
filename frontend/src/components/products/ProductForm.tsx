import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ProductData } from '@/hooks/useProducts';

interface ProductFormProps {
  product?: ProductData | null;
  onSubmit: (data: any) => Promise<void>;
  onClose: () => void;
}

export const ProductForm = ({ product, onSubmit, onClose }: ProductFormProps) => {
  const { register, handleSubmit, reset } = useForm({
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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{product ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="space-y-2">
          <Label>Nama Produk</Label>
          <Input {...register('name')} required />
        </div>
        <div className="space-y-2">
          <Label>Harga</Label>
          <Input type="number" {...register('harga')} required />
        </div>
      </form>
      <DialogFooter>
        <Button variant="outline" onClick={handleClose}>Batal</Button>
        <Button onClick={handleSubmit(onSubmit)} className="bg-blue-600">Simpan</Button>
      </DialogFooter>
    </DialogContent>
  );
};