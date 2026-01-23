import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { UserData } from '@/hooks/useUsers';
import { Eye, EyeOff, User, Mail, Lock, Shield, Save, X, UserCog, UserPlus, Power } from 'lucide-react';

interface UserFormProps {
  user?: UserData | null;
  onSubmit: (data: any) => Promise<void>;
  onClose: () => void;
}

export const UserForm = ({ user, onSubmit, onClose }: UserFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, setValue, reset, control, formState: { isSubmitting } } = useForm({
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
    <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white">
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 px-6 py-6 text-white overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-20 w-20 rounded-full bg-blue-500/20 blur-xl" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-inner">
            {user ? <UserCog className="h-6 w-6 text-white" /> : <UserPlus className="h-6 w-6 text-white" />}
          </div>
          <div>
            <DialogTitle className="text-xl font-bold tracking-tight text-white">
              {user ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
            </DialogTitle>
            <p className="text-slate-300 text-sm mt-0.5 opacity-90">
              {user ? 'Perbarui informasi dan hak akses pengguna.' : 'Daftarkan akun baru ke dalam sistem.'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700 ml-1">Nama Lengkap</Label>
          <div className="relative group">
            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <Input 
              {...register('name')} 
              required 
              className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Masukkan nama lengkap"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700 ml-1">Email Address</Label>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <Input 
              type="email" 
              {...register('email')} 
              required 
              className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="user@example.com"
            />
          </div>
        </div>

        {!user && (
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700 ml-1">Password</Label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <Input 
                type={showPassword ? "text" : "password"} 
                {...register('password')} 
                required 
                className="pl-10 pr-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700 ml-1">Role Akses</Label>
            <div className="relative">
              <Shield className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 z-10" />
              <Select defaultValue={user?.roleData?.role || 'PEMBELI'} onValueChange={(val) => setValue('role', val as any)}>
                <SelectTrigger className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="PEMBELI">PEMBELI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700 ml-1">Status Akun</Label>
            <div className="h-11 flex items-center justify-between px-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Power className="h-4 w-4" />
                <span>{user?.status ?? true ? 'Aktif' : 'Non-Aktif'}</span>
              </div>
              <Controller 
                name="status" 
                control={control} 
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )} 
              />
            </div>
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
            className="flex-1 h-11 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4" /> {user ? 'Simpan Perubahan' : 'Tambah User'}
              </div>
            )}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};