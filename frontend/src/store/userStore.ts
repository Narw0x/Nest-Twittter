import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    _id: string | null;
    name: string | null;
    email: string | null;
    liked?: string[] | null;
}

interface UserState extends User {
    setUser: (user: User) => void;
    clearUser: () => void;
    updateUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            _id: null,
            name: null,
            email: null,
            liked: [],
            setUser: ({ _id, name, email, liked }) => set({ _id, name, email, liked }),
            updateUser: (user: Partial<User>) => set((state) => ({
                _id: user._id ?? state._id,
                name: user.name ?? state.name,
                email: user.email ?? state.email,
                liked: user.liked ?? state.liked,
            })),
            clearUser: () => set({ _id: null, name: null, email: null, liked: null }),
        }),
        {
            name: 'user-store',
        }
    )
);
