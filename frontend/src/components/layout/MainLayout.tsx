import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { LayoutDashboard, Users, Package, ShoppingCart, History, LogOut, Menu } from 'lucide-react';

const MainLayout = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = user?.role === 'ADMIN' 
    ? [
        { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { title: 'Manajemen User', icon: Users, path: '/users' },
        { title: 'Manajemen Produk', icon: Package, path: '/products' },
      ]
    : [
        { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { title: 'Beli Produk', icon: ShoppingCart, path: '/shop' },
        { title: 'Riwayat', icon: History, path: '/history' },
      ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="h-16 flex items-center px-6 border-b bg-blue-600">
          <span className="text-white font-bold text-lg">DOMPET PNBP</span>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors mt-10"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <Menu className="md:hidden h-6 w-6" />
            <h2 className="font-semibold text-slate-700">Selamat Datang, {user?.name || 'User'}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user?.role}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;