import { IntakeDiary } from "@/store/Intake";
import { supabase } from "../supabase";
import { isThereClientSession } from "@/hooks/clientSession";

const addIntake = async (newIntake: IntakeDiary) => {
  const { supabase, user } = await isThereClientSession();
  const { data, error } = await supabase
    .from("intake")
    .insert([{ user_id: user?.id, ...newIntake }]);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export { addIntake };
