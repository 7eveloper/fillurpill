import { supabase } from "../supabase";
import { isThereClientSession } from "@/hooks/clientSession";
import { IntakeDiary } from "../types";

const addIntake = async (newIntake: IntakeDiary) => {
  const { supabase, user } = await isThereClientSession();
  const { data, error } = await supabase
    .from("intake")
    .insert([{ ...newIntake, user_id: user?.id }]);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const deleteIntake = async (id: string) => {
  try {
    const { error } = await supabase.from("intake").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    console.log(id);
    return id;
  } catch (error) {
    throw new Error("Error deleting intake from Supabase: " + error);
  }
};

export { addIntake, deleteIntake };
