import { supabase } from "../Configuration/supabaseClient";

export const insertTodo = (todo) => supabase.from("TodoList").insert(todo);
