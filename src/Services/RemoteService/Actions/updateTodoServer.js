import { getUiInfoStorage } from "../../LocalService/localService";
import { supabase } from "../Configuration/supabaseClient";

export const updateTodoServer = async (updatedTodo, searchName) =>
  await supabase
    .from("TodoList")
    .update({ [searchName]: updatedTodo })
    .match({ userEmail: getUiInfoStorage().email });
