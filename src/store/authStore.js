import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  initialize: () => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedAuth === 'true' && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Fix for old sessions without an ID
      if (!parsedUser.id) {
        parsedUser.id = Math.random().toString(36).substr(2, 9);
        localStorage.setItem('currentUser', JSON.stringify(parsedUser));
      }
      set({ isAuthenticated: true, user: parsedUser, isLoading: false });
    } else {
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },

  login: (userData) => {
    // Ensure we have an ID
    if (!userData.id) {
        userData.id = Math.random().toString(36).substr(2, 9);
    }
    set({ user: userData, isAuthenticated: true });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(userData));
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  }
}));
