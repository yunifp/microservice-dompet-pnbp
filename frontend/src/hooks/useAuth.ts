import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { useAuthContext } from '@/context/AuthContext';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: contextLogin, logout: contextLogout } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      
      const token = response.data.token || response.data.data?.token;

      if (!token) {
        throw new Error("Token tidak ditemukan dalam respon server");
      }

      contextLogin(token);
      
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || 'Email atau password salah');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    contextLogout();
    navigate('/login');
  };

  return { login, logout, isLoading, error };
};