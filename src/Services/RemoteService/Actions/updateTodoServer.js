import { supabase } from "../Configuration/supabaseClient";

export const updateTodoServer = (updatedTodo, matchData) =>
  supabase.from("TodoList").update(updatedTodo).match({ userEmail: matchData });
