import { create } from "zustand";

type State = {
  loggedIn: boolean;
};

type Store = {
  loggedIn: boolean;
  changeLoggedIn: () => void;
};

export const zustandStore = create<State & Store>((set) => ({
  loggedIn: false,
  changeLoggedIn: () => set((state) => ({ loggedIn: !state.loggedIn })),
}));
