import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/layout/MainLayout';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import ShopPage from './pages/ShopPage';
import HistoryPage from './pages/HistoryPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const RoleRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<div className="p-8 text-2xl font-bold">Dashboard</div>} />
            <Route path="users" element={<RoleRoute allowedRoles={['ADMIN']}><UsersPage /></RoleRoute>} />
            <Route path="products" element={<RoleRoute allowedRoles={['ADMIN']}><ProductsPage /></RoleRoute>} />
            <Route path="shop" element={<RoleRoute allowedRoles={['PEMBELI']}><ShopPage /></RoleRoute>} />
            <Route path="history" element={<RoleRoute allowedRoles={['PEMBELI']}><HistoryPage /></RoleRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}

export default App;