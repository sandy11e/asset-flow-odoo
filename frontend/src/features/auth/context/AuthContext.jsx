import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import LoadingScreen from '@/components/feedback/LoadingScreen';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Persistent user state placeholder - purely mock
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('assetflow_mock_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('assetflow_mock_user');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    // Calling the API interface, though currently mocked
    const response = await authService.login(credentials);
    const mockUser = response.data.user;
    
    // Persistent user state placeholder (No JWT / token logic)
    localStorage.setItem('assetflow_mock_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
    return mockUser;
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('assetflow_mock_user');
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
