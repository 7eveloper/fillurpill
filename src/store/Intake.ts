import { create } from "zustand";

export interface IntakeDiary {
  intake_id: string;
  title: string;
  contents: string;
  start: Date;
  end: Date;
}

// interface IntakeDiaryState {
//   intake: IntakeDiary[];
//   addIntake: (newIntake: IntakeDiary) => void;
// }

// export const useIntakeStore = create<IntakeDiaryState>((set) => ({
//   intake: [],
//   addIntake: (newIntake) =>
//     set((state) => ({ intake: [...state.intake, newIntake] })),
// }));
