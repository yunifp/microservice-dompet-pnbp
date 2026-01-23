import { useEffect, useMemo } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { useAuthContext } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ShoppingBag, Clock, CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuyerDashboard = () => {
  const { user } = useAuthContext();
  const { getHistory, history, getCart, cart } = useTransactions();

  useEffect(() => {
    getHistory();
    getCart();
  }, []);

  const stats = useMemo(() => {
    const totalTrx = history.length;
    const totalSpent = history.reduce((acc, curr) => acc + Number(curr.total_harga), 0);
    const pending = history.filter(h => h.status === 'BELUM_DIBAYAR').length;
    return { totalTrx, totalSpent, pending };
  }, [history]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Halo, {user?.name}</h1>
            <p className="text-blue-100 mt-2">Selamat datang kembali di dompet digital Anda.</p>
          </div>
          <Button asChild className="bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl h-12 px-6">
            <Link to="/shop">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Belanja Sekarang
            </Link>
          </Button>
        </div>
        <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-lg bg-white rounded-2xl hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Transaksi</p>
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalTrx}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white rounded-2xl hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Pengeluaran</p>
              <h3 className="text-2xl font-bold text-slate-800">Rp {stats.totalSpent.toLocaleString('id-ID')}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white rounded-2xl hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Menunggu Pembayaran</p>
              <h3 className="text-2xl font-bold text-slate-800">{stats.pending}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white rounded-2xl hover:scale-[1.02] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Keranjang Belanja</p>
              <h3 className="text-2xl font-bold text-slate-800">{cart?.items?.length || 0} Item</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-white px-8 py-6 flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold text-slate-800">Riwayat Terkini</CardTitle>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700" asChild>
              <Link to="/history">Lihat Semua <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0 bg-white">
            <div className="divide-y divide-slate-50">
              {history.slice(0, 5).map((item) => (
                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${item.status === 'SUDAH_DIBAYAR' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      {item.status === 'SUDAH_DIBAYAR' ? <CreditCard className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{item.kode_billing || `Order #${item.id}`}</p>
                      <p className="text-xs text-slate-500">{new Date(item.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">Rp {Number(item.total_harga).toLocaleString('id-ID')}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${item.status === 'SUDAH_DIBAYAR' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
              {history.length === 0 && (
                <div className="p-8 text-center text-slate-400 italic">Belum ada transaksi.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl rounded-3xl bg-slate-900 text-white p-6 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-bold">Informasi Akun</h3>
            <div className="space-y-4 pt-4">
              <div>
                <p className="text-slate-400 text-sm">Nama Lengkap</p>
                <p className="font-semibold text-lg">{user?.name}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Email Terdaftar</p>
                <p className="font-semibold text-lg">{user?.email}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Role Akses</p>
                <span className="inline-block mt-1 bg-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-blue-600/20 rounded-full blur-2xl" />
        </Card>
      </div>
    </div>
  );
};

export default BuyerDashboard;