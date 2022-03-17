import { supabase } from "../Configuration/supabaseClient";

export const insertTodo = async (todo, searchName) =>
  await supabase.from("TodoList").insert({ [searchName]: todo });
