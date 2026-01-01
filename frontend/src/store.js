import { create } from 'zustand';

// Migration: Save existing user to registeredUsers if not already there
const existingUser = JSON.parse(localStorage.getItem('user'));
if (existingUser?.email) {
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
  if (!registeredUsers[existingUser.email.toLowerCase()]) {
    registeredUsers[existingUser.email.toLowerCase()] = existingUser;
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }
}

// Auto-restore: If no current user, restore the main account
let currentUser = JSON.parse(localStorage.getItem('user'));
if (!currentUser) {
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
  // Restore the main account if it exists
  let mainAccount = registeredUsers['zabeeg@icloud.com'];
  
  // If no saved account, create the main account with preserved settings
  if (!mainAccount) {
    mainAccount = {
      id: 1,
      username: 'Zabeeg.Creator1!',
      email: 'zabeeg@icloud.com',
      avatarType: 'photo',
      avatarColor: '#ff69b4',
      avatarIcon: '♡'
    };
    // Save for future logins
    registeredUsers['zabeeg@icloud.com'] = mainAccount;
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }
  
  currentUser = mainAccount;
  localStorage.setItem('user', JSON.stringify(currentUser));
  localStorage.setItem('token', 'demo-token');
}

const useStore = create((set) => ({
  // User state
  user: currentUser || null,
  token: localStorage.getItem('token') || null,
  
  // Actions
  setUser: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    if (token) localStorage.setItem('token', token);
    set({ user, token: token || localStorage.getItem('token') });
  },
  
  updateUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    // Also save to registered users list for persistence across logins
    if (user?.email) {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
      registeredUsers[user.email.toLowerCase()] = user;
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
    set({ user });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  
  // Daily affirmation
  affirmation: null,
  setAffirmation: (affirmation) => set({ affirmation }),

  // Music settings
  musicEnabled: JSON.parse(localStorage.getItem('musicEnabled')) ?? true,
  musicVolume: JSON.parse(localStorage.getItem('musicVolume')) ?? 0.3,
  currentPage: 'home',
  
  setMusicEnabled: (enabled) => {
    localStorage.setItem('musicEnabled', JSON.stringify(enabled));
    set({ musicEnabled: enabled });
  },
  
  setMusicVolume: (volume) => {
    localStorage.setItem('musicVolume', JSON.stringify(volume));
    set({ musicVolume: volume });
  },
  
  setCurrentPage: (page) => set({ currentPage: page }),

  // Banned users
  bannedUsers: JSON.parse(localStorage.getItem('bannedUsers')) || [],
  
  addBannedUser: (username) => {
    set((state) => {
      const newBannedUsers = [...new Set([...state.bannedUsers, username])];
      localStorage.setItem('bannedUsers', JSON.stringify(newBannedUsers));
      return { bannedUsers: newBannedUsers };
    });
  },
  
  removeBannedUser: (username) => {
    set((state) => {
      const newBannedUsers = state.bannedUsers.filter((u) => u !== username);
      localStorage.setItem('bannedUsers', JSON.stringify(newBannedUsers));
      return { bannedUsers: newBannedUsers };
    });
  },
}));

export default useStore;







