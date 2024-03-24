import { create } from "zustand";
import { produce } from "immer";

type UserState = {
  user: {
    loggedIn: boolean;
    surveyDone: boolean;
    nickname: string;
  };
};

type Actions = {
  changeLoggedIn: (isSession: boolean) => void;
  changeSurveyDone: (isDone: boolean) => void;
  changeNickname: (nickname: string) => void;
};

export const zustandStore = create<UserState & Actions>((set) => ({
  user: {
    loggedIn: false,
    surveyDone: false,
    nickname: "",
  },
  changeLoggedIn: (isSession) =>
    set(
      produce((state) => {
        state.user.loggedIn = isSession;
      })
    ),
  changeSurveyDone: (isDone) =>
    set(
      produce((state) => {
        state.user.surveyDone = isDone;
      })
    ),
  changeNickname: (nickname) =>
    set(
      produce((state) => {
        state.user.nickname = nickname;
      })
    ),
}));
