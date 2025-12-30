import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = (name, email, password, plan = 'free') => {
    // Simulate API Call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { 
          id: Date.now(), 
          name, 
          email, 
          role: 'user', // 'user' or 'admin'
          plan, // 'free' or 'pro'
          joined: new Date().toLocaleDateString() 
        };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setUser(newUser);
        resolve(newUser);
      }, 800);
    });
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Hardcoded Admin for you
        if (email === 'admin@ashi.com' && password === 'admin123') {
          const adminUser = { id: 1, name: 'Jitendra (Admin)', email, role: 'admin', plan: 'pro' };
          localStorage.setItem('currentUser', JSON.stringify(adminUser));
          setUser(adminUser);
          resolve(adminUser);
          return;
        }

        // For regular users, we just simulate a successful login for this prototype
        // In a real app, you'd check against a database of registered users.
        // Here, we just "create" a session for demo purposes if it's not admin.
        // Or you can require they hit Signup first. Let's assume Signup is required.
        // For prototype speed, I'll allow any login to become a "Free User" if not Admin.
        const mockUser = { id: Date.now(), name: email.split('@')[0], email, role: 'user', plan: 'free' };
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        setUser(mockUser);
        resolve(mockUser);
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const upgradeToPro = () => {
    if (user) {
      const updatedUser = { ...user, plan: 'pro' };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    upgradeToPro,
    isAuthenticated: !!user,
    isPro: user?.plan === 'pro',
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};