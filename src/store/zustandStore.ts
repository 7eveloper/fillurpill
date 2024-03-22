import { produce } from "immer";
import { create } from "zustand";

export type User = {
  gender: string;
  age: string;
  weight: string;
  height: string;
  nickname: string;
};

type State = {
  loggedIn: boolean;
  surveyDone: boolean;
  users: User[];
};

type Actions = {
  changeLoggedIn: (isSession: boolean) => void;
  changeSurveyDone: () => void;
  addUser: (user: User) => void;
};

export const zustandStore = create<State & Actions>((set) => ({
  loggedIn: false,
  surveyDone: false,
  users: [],
  changeLoggedIn: (isSession) => set({ loggedIn: isSession }),
  changeSurveyDone: () =>
    set((prev) => ({ ...prev, surveyDone: !prev.surveyDone })),
  addUser: (user) =>
    set(
      produce((state) => {
        state.users.push(user);
      })
    ),
}));
