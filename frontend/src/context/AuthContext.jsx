import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('eventify_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (payload) => {
    setUser(payload.user);
    localStorage.setItem('eventify_token', payload.token);
    localStorage.setItem('eventify_user', JSON.stringify(payload.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventify_token');
    localStorage.removeItem('eventify_user');
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
