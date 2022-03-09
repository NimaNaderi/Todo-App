import { supabase } from "../Configuration/supabaseClient";

export const selectTodoList = (column) =>
  supabase.from("TodoList").select(column);
