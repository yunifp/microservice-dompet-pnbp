import { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { 
  LayoutDashboard, Users, Package, ShoppingCart, 
  History, LogOut, Menu, X, ChevronLeft, 
  ShieldCheck, Bell, Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MainLayout = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-300">
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          {isSidebarOpen && (
            <span className="text-white font-bold text-xl tracking-tight animate-in fade-in duration-500">
              DOMPET <span className="text-blue-500">PNBP</span>
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "group-hover:text-blue-400")} />
              {isSidebarOpen && <span className="font-medium text-sm">{item.title}</span>}
              {!isSidebarOpen && isActive && (
                <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors group"
        >
          <LogOut className="h-5 w-5 shrink-0 group-hover:translate-x-1 transition-transform" />
          {isSidebarOpen && <span className="font-semibold text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <aside 
        className={cn(
          "hidden md:flex flex-col sticky top-0 h-screen transition-all duration-300 ease-in-out border-r border-slate-200 z-50",
          isSidebarOpen ? "w-72" : "w-20"
        )}
      >
        <SidebarContent />
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-24 h-6 w-6 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", !isSidebarOpen && "rotate-180")} />
        </button>
      </aside>

   
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <aside 
        className={cn(
          "fixed top-0 left-0 bottom-0 w-72 z-[70] md:hidden transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-slate-600" />
            </Button>
            
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-3 pl-3 sm:pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none mb-1">
                  {user?.name || 'User'}
                </p>
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">
                    {user?.role}
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium">{user?.email}</p>
                </div>
              </div>
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 ring-2 ring-white transition-transform hover:rotate-3">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;