import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import LoadingScreen from '@/components/feedback/LoadingScreen';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await authService.getCurrentUser();
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <LoadingScreen message="Authenticating..." />;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
