import { create } from 'zustand';

interface LoginModalState {
  isOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  isOpen: false,
  openLoginModal: () => set(() => ({ isOpen: true })),
  closeLoginModal: () => set(() => ({ isOpen: false })),
}));
