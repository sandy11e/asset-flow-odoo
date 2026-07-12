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
        const token = localStorage.getItem('assetflow_token');
        if (token) {
          const res = await authService.getCurrentUser();
          setUser(res.data.user || res.data); // depending on backend structure
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('assetflow_token');
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
    const authData = response.data || response;
    const { user: loggedInUser, token } = authData.data || authData;
    
    if (token) {
      localStorage.setItem('assetflow_token', token);
    }
    
    setUser(loggedInUser);
    setIsAuthenticated(true);
    return loggedInUser;
  };

  const register = async (userData) => {
    const response = await authService.signup(userData);
    const authData = response.data || response;
    const { user: loggedInUser, token } = authData.data || authData;
    
    if (token) {
      localStorage.setItem('assetflow_token', token);
    }
    
    setUser(loggedInUser);
    setIsAuthenticated(true);
    return loggedInUser;
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('assetflow_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <LoadingScreen message="Authenticating..." />;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
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
