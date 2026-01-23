import { useState } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

export const useTransactions = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  const getCart = async () => {
    if (!user?.id) return;
    try {
      const response = await axiosInstance.get(`/transactions/cart/${user.id}`);
      setCart(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getHistory = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/transactions/transactions/${user.id}`);
      setHistory(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengambil riwayat transaksi");
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (produk_id: number, quantity: number) => {
    if (!user || !user.id) {
      toast.error('Sesi user tidak valid. Silakan login ulang.');
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post('/transactions/cart/add', {
        pembeli_id: user.id,
        produk_id: produk_id,
        quantity: quantity
      });
      toast.success('Produk berhasil ditambahkan ke keranjang');
      await getCart();
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
      setCart(null);
      return response.data;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Gagal checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return { addToCart, checkout, getCart, getHistory, cart, history, isLoading };
};