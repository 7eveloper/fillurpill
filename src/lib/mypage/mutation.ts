import { IntakeDiary } from "@/store/Intake";
import { supabase } from "../supabase";

const addIntake = async (newIntake: IntakeDiary) => {
  const { data, error } = await supabase.from("intake").insert([newIntake]);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export { addIntake };
