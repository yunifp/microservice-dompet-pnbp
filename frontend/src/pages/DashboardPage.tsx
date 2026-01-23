import { useAuthContext } from '@/context/AuthContext';
import AdminDashboard from './dashboard/AdminDashboard';
import BuyerDashboard from './dashboard/BuyerDashboard';

const DashboardPage = () => {
  const { user } = useAuthContext();

  if (user?.role === 'ADMIN') {
    return <AdminDashboard />;
  }

  return <BuyerDashboard />;
};

export default DashboardPage;