import { create } from 'zustand'

type UserStore = {
    user: string,
    login: (token:string) => void,
    logout: () => void,
    refresh: boolean,
    toggleRefresh: () => void,
}

export const useUserStore = create<UserStore>((set) => ({
    user: function () {
        if (typeof window === 'undefined') {
            return "";
        } else {
            return localStorage.getItem("token") || "";
        }
    }(),
    login: (token:string) => set((state) => {
        localStorage.setItem("token", token);
        return {user: token};
    }),
    logout: () => set((state) => {
        localStorage.removeItem("token");
        return {user: ""};
    }),
    refresh:false,
    toggleRefresh:()=>set(state => {
        return {refresh:!state.refresh}
    })
}));