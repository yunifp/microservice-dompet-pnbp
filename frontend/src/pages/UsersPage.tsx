import { useState } from 'react';
import { useUsers, UserData } from '@/hooks/useUsers';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { UserForm } from '@/components/users/UserForm';
import { 
  UserPlus, RefreshCw, Pencil, Trash2, Search, 
  ChevronLeft, ChevronRight, Users, Shield, 
  Mail, MoreHorizontal, CheckCircle2, XCircle 
} from 'lucide-react';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const UsersPage = () => {
  const { users, isLoading, meta, setPage, setSearch, search, refresh, addUser, updateUser, deleteUser } = useUsers();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const handleEdit = (user: UserData) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus user ini?')) {
      try {
        await deleteUser(id);
        toast.success('User berhasil dihapus');
      } catch (error) {
        toast.error('Gagal menghapus user');
      }
    }
  };

  const onFormSubmit = async (data: any) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
        toast.success('Data diperbarui');
      } else {
        await addUser(data);
        toast.success('User ditambahkan');
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Gagal menyimpan data');
    }
  };



  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Manajemen User</h1>
            </div>
            <p className="text-slate-400 max-w-xl">
              Kelola data pengguna, hak akses role, dan status akun dalam sistem.
            </p>
          </div>
          <div className="flex gap-3">
             <Button 
              variant="outline" 
              onClick={refresh} 
              disabled={isLoading}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white h-11 px-5 rounded-xl backdrop-blur-md transition-all"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 h-11 px-5 rounded-xl font-semibold transition-all active:scale-[0.98]"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Tambah User
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-80 w-80 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      </div>

      <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96 group">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                placeholder="Cari nama atau email pengguna..."
                className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Total <span className="text-slate-900 font-bold">{meta.totalItems}</span> Pengguna
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="w-[300px] px-6 py-4 font-semibold text-slate-600">User Profile</TableHead>
                  <TableHead className="font-semibold text-slate-600">Role Akses</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status Akun</TableHead>
                  <TableHead className="text-right px-6 font-semibold text-slate-600">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <TableRow key={user.id} className="group hover:bg-slate-50/80 transition-colors border-slate-100">
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        user.roleData?.role === 'ADMIN' 
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        <Shield className="h-3 w-3" />
                        {user.roleData?.role}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        user.status 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {user.status ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {user.status ? 'Aktif' : 'Non-Aktif'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-200 data-[state=open]:bg-slate-200">
                            <MoreHorizontal className="h-4 w-4 text-slate-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-slate-100">
                          <DropdownMenuLabel className="text-xs text-slate-500">Aksi</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(user)} className="gap-2 cursor-pointer focus:bg-blue-50 focus:text-blue-600">
                            <Pencil className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(user.id)} className="gap-2 text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-700">
                            <Trash2 className="h-4 w-4" /> Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50/30">
             <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => p - 1)} 
                disabled={meta.currentPage === 1 || isLoading}
                className="h-9 px-4 rounded-xl border-slate-200 hover:bg-white hover:text-blue-600 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Sebelumnya
              </Button>
              <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                Halaman {meta.currentPage} dari {meta.totalPages}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => p + 1)} 
                disabled={meta.currentPage === meta.totalPages || isLoading}
                className="h-9 px-4 rounded-xl border-slate-200 hover:bg-white hover:text-blue-600 disabled:opacity-50"
              >
                Selanjutnya
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <UserForm user={selectedUser} onSubmit={onFormSubmit} onClose={() => setIsDialogOpen(false)} />
      </Dialog>
    </div>
  );
};

export default UsersPage;