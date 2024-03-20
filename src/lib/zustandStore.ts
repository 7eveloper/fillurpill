import { produce } from "immer";
import { create } from "zustand";

export type User = {
  // email: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
};

type State = {
  loggedIn: boolean;
  users: User[];
};

type Actions = {
  changeLoggedIn: (isSession: boolean) => void;
  addUser: (user: User) => void;
};

export const zustandStore = create<State & Actions>((set) => ({
  loggedIn: false,
  users: [],
  changeLoggedIn: (isSession) => set({ loggedIn: isSession }),
  addUser: (user) =>
    set(
      produce((state) => {
        state.users.push(user);
      })
    ),
}));
