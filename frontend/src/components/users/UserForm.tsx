import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { UserData } from '@/hooks/useUsers';
import { Eye, EyeOff } from 'lucide-react';

interface UserFormProps {
  user?: UserData | null;
  onSubmit: (data: any) => Promise<void>;
  onClose: () => void;
}

export const UserForm = ({ user, onSubmit, onClose }: UserFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, setValue, reset, control } = useForm({
    defaultValues: { name: '', email: '', password: '', role: 'PEMBELI', status: true }
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email, role: user.roleData?.role || 'PEMBELI', status: user.status });
    } else {
      reset({ name: '', email: '', password: '', role: 'PEMBELI', status: true });
    }
  }, [user, reset]);

  const handleClose = () => {
    reset({ name: '', email: '', password: '', role: 'PEMBELI', status: true });
    setShowPassword(false);
    onClose();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{user ? 'Edit User' : 'Tambah User Baru'}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="space-y-2">
          <Label>Nama Lengkap</Label>
          <Input {...register('name')} required />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" {...register('email')} required />
        </div>
        {!user && (
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} {...register('password')} required className="pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}
        <div className="space-y-2">
          <Label>Role</Label>
          <Select defaultValue={user?.roleData?.role || 'PEMBELI'} onValueChange={(val) => setValue('role', val as any)}>
            <SelectTrigger><SelectValue placeholder="Pilih Role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
              <SelectItem value="PEMBELI">PEMBELI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <Label>Status Akun</Label>
          <Controller name="status" control={control} render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )} />
        </div>
      </form>
      <DialogFooter>
        <Button variant="outline" onClick={handleClose}>Batal</Button>
        <Button onClick={handleSubmit(onSubmit)} className="bg-blue-600">{user ? 'Simpan' : 'Tambah'}</Button>
      </DialogFooter>
    </DialogContent>
  );
};