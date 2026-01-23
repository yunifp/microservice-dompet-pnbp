import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/api/axiosInstance';

export interface UserData {
  id: number;
  name: string;
  email: string;
  status: boolean;
  roleData?: { role: string };
}

export const useUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 0, totalItems: 0, currentPage: 1 });

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/users/users?search=${search}&page=${page}&limit=10`);
      setUsers(response.data.data);
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
    const timer = setTimeout(() => fetchUsers(), 500);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const addUser = async (data: any) => {
    await axiosInstance.post('/users/add_users', data);
    fetchUsers();
  };

  const updateUser = async (id: number, data: any) => {
    await axiosInstance.put(`/users/update_users/${id}`, data);
    fetchUsers();
  };

  const deleteUser = async (id: number) => {
    await axiosInstance.delete(`/users/delete_users/${id}`);
    fetchUsers();
  };

  return { users, isLoading, meta, setPage, setSearch, search, refresh: fetchUsers, addUser, updateUser, deleteUser };
};