import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/layout/MainLayout';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import ShopPage from './pages/ShopPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<div className="p-8 text-2xl font-bold">Dashboard</div>} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}

export default App;