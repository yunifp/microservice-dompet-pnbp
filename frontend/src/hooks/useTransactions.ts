import { useState } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

export const useTransactions = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (produk_id: number) => {
    if (!user || !user.id) {
      toast.error('Sesi user tidak valid. Silakan login ulang.');
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post('/transactions/cart/add', {
        pembeli_id: user.id,
        produk_id: produk_id
      });
      toast.success('Produk berhasil ditambahkan ke keranjang');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Gagal menambahkan produk');
    } finally {
      setIsLoading(false);
    }
  };

  const checkout = async () => {
    if (!user || !user.id) {
      toast.error('Sesi user tidak valid');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/transactions/checkout', {
        pembeli_id: user.id
      });
      toast.success('Checkout Berhasil! Kode Billing diterbitkan.');
      return response.data;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Gagal checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return { addToCart, checkout, isLoading };
};