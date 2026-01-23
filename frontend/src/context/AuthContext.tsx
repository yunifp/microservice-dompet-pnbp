import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

interface User {
  id: number;
  email: string;
  role: 'ADMIN' | 'PEMBELI';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = Cookies.get('token');
      
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp && decoded.exp < currentTime) {
            Cookies.remove('token');
            setUser(null);
          } else {
            setUser({
              id: decoded.id,
              email: decoded.email,
              role: decoded.role,
              name: decoded.name
            });
          }
        } catch (error) {
          console.error("Token invalid:", error);
          Cookies.remove('token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'Strict' });
    
    try {
      const decoded: any = jwtDecode(token);
      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name
      });
    } catch (error) {
      console.error("Gagal decode token saat login:", error);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};