import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/api/axiosInstance';

export interface ProductData {
  id: number;
  name: string;
  harga: number;
}

export const useProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 0, totalItems: 0, currentPage: 1 });

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/products?search=${search}&page=${page}&limit=10`);
      setProducts(response.data.data);
      setMeta({
        totalPages: response.data.totalPages,
        totalItems: response.data.totalItems,
        currentPage: response.data.currentPage
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    const timer = setTimeout(() => fetchProducts(), 500);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const addProduct = async (data: any) => {
    await axiosInstance.post('/products', data);
    fetchProducts();
  };

  const updateProduct = async (id: number, data: any) => {
    await axiosInstance.put(`/products/${id}`, data);
    fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    await axiosInstance.delete(`/products/${id}`);
    fetchProducts();
  };

  return { products, isLoading, meta, setPage, setSearch, search, refresh: fetchProducts, addProduct, updateProduct, deleteProduct };
};