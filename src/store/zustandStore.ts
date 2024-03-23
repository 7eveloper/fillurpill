import { Survey } from "./../components/survey/surveyAction";
import { produce } from "immer";
import { create } from "zustand";

export type User = {
  gender: string | null;
  age: string | null;
  weight: string | null;
  height: string | null;
  nickname: string;
  email: string | null;
};

export type UserData = {
  email: string | null;
  nickname: string | null;
  user_id: string;
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
