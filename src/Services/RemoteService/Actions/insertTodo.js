import { getUiInfoStorage } from "../../LocalService/localService";
import { supabase } from "../Configuration/supabaseClient";

export const insertTodo = async (todo, searchName) =>
  await supabase
    .from("TodoList")
    .insert({ [searchName]: todo, userEmail: getUiInfoStorage().email });
