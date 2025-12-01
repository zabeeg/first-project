import { create } from 'zustand';

const useStore = create((set) => ({
  // User state
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  
  // Actions
  setUser: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  
  // Daily affirmation
  affirmation: null,
  setAffirmation: (affirmation) => set({ affirmation }),
}));

export default useStore;



