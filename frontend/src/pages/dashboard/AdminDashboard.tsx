import { useUsers } from '@/hooks/useUsers';
import { useProducts } from '@/hooks/useProducts';
import { useAuthContext } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Package, ShieldCheck, Activity, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuthContext();
  const { meta: userMeta } = useUsers();
  const { meta: productMeta, products } = useProducts();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Admin</h1>
          <p className="text-slate-500">Overview sistem dan manajemen data.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20">
            <Link to="/products">
              <Plus className="mr-2 h-4 w-4" /> Tambah Produk
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg bg-white rounded-2xl">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Pengguna</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{userMeta.totalItems}</h3>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="h-7 w-7" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white rounded-2xl">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Produk</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{productMeta.totalItems}</h3>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Package className="h-7 w-7" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white rounded-2xl">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Status Sistem</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">Optimal</h3>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Activity className="h-7 w-7" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
        <CardHeader className="border-b border-slate-100 px-8 py-6">
          <CardTitle className="text-lg font-bold text-slate-800">Produk Tersedia</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-50">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{product.name}</p>
                    <p className="text-xs text-slate-500">ID: {product.id}</p>
                  </div>
                </div>
                <p className="font-bold text-blue-600">Rp {Number(product.harga).toLocaleString('id-ID')}</p>
              </div>
            ))}
             {products.length === 0 && (
                <div className="p-8 text-center text-slate-400 italic">Tidak ada data produk.</div>
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;