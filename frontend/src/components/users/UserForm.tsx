import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { UserData } from '@/hooks/useUsers';

interface UserFormProps {
  user?: UserData | null;
  onSubmit: (data: any) => Promise<void>;
  onClose: () => void;
}

export const UserForm = ({ user, onSubmit, onClose }: UserFormProps) => {
  const { register, handleSubmit, setValue, reset, control } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'PEMBELI',
      status: true
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.roleData?.role || 'PEMBELI',
        status: user.status
      });
    }
  }, [user, reset]);

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{user ? 'Edit User' : 'Tambah User Baru'}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input id="name" {...register('name')} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} required />
        </div>
        {!user && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} required />
          </div>
        )}
        <div className="space-y-2">
          <Label>Role</Label>
          <Select 
            defaultValue={user?.roleData?.role || 'PEMBELI'} 
            onValueChange={(val) => setValue('role', val as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
              <SelectItem value="PEMBELI">PEMBELI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Status Akun</Label>
            <p className="text-sm text-muted-foreground">
              Tentukan apakah user ini aktif atau tidak
            </p>
          </div>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </form>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Batal</Button>
        <Button onClick={handleSubmit(handleFormSubmit)} className="bg-blue-600">
          {user ? 'Simpan Perubahan' : 'Tambah User'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};