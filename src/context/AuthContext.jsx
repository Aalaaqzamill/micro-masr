import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export function AuthProvider({ children }) {
  const initialize = useAuthStore(state => state.initialize);
  
  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}

export const useAuth = () => {
  const store = useAuthStore();
  return store;
};
