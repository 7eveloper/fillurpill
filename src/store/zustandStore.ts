import { produce } from "immer";
import { create } from "zustand";

export type User = {
  gender: string;
  age: string;
  weight: string;
  height: string;
  nickname: string;
  email: string;
};

type State = {
  loggedIn: boolean;
  surveyDone: boolean;
  users: User[];
};

type Actions = {
  changeLoggedIn: (isSession: boolean) => void;
  changeSurveyDone: (isDone: boolean) => void;
  addUser: (user: User) => void;
};

export const zustandStore = create<State & Actions>((set) => ({
  loggedIn: false,
  surveyDone: false,
  users: [],
  changeLoggedIn: (isSession) => set({ loggedIn: isSession }),
  changeSurveyDone: (isDone) =>
    set((prev) => ({ ...prev, surveyDone: isDone })),
  addUser: (user) =>
    set(
      produce((state) => {
        state.users.push(user);
      })
    ),
}));
