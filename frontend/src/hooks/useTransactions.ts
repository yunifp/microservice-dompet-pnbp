import { useState } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

export const useTransactions = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (produk_id: number) => {
    if (!user?.id) {
      toast.error('Sesi habis, silakan login kembali');
      return;
    }
    setIsLoading(true);
    try {
      await axiosInstance.post('/transactions/cart/add', {
        pembeli_id: user.id,
        produk_id
      });
      toast.success('Berhasil ditambah ke keranjang');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal menambah ke keranjang');
    } finally {
      setIsLoading(false);
    }
  };

  const checkout = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/transactions/checkout', {
        pembeli_id: user.id
      });
      toast.success('Checkout berhasil!');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return { addToCart, checkout, isLoading };
};