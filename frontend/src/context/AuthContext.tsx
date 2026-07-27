import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '@/types';
import { authApi, RegisterData } from '@/api/auth';
import { getStoredToken, setStoredToken, getStoredUser, setStoredUser, clearAuthStorage } from '@/utils/storage';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string; role?: Role }) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  switchRole?: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token && !user) {
      authApi
        .getMe()
        .then((fetchedUser) => setUser(fetchedUser))
        .catch(() => clearAuthStorage());
    }
  }, [token]);

  const login = async (credentials: { email: string; password: string; role?: Role }): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await authApi.login(credentials);
      const activeToken = res.token || res.accessToken || 'mock_jwt_token_2026';
      setUser(res.user);
      setToken(activeToken);
      setStoredToken(activeToken);
      setStoredUser(res.user);
      return res.user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await authApi.register(data);
      const activeToken = res.token || res.accessToken || 'mock_jwt_token_2026';
      setUser(res.user);
      setToken(activeToken);
      setStoredToken(activeToken);
      setStoredUser(res.user);
      return res.user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    clearAuthStorage();
    setUser(null);
    setToken(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      setStoredUser(updated);
    }
  };

  const switchRole = (role: Role) => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      setStoredUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
