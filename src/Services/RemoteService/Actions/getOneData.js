import ac from "../../../Utilities/getAbortController";
import { getUiInfoStorage } from "../../LocalService/localService";
import { supabase } from "../Configuration/supabaseClient";

export const getOneData = async (searchName) =>
  await supabase
    .from("TodoList")
    .select(`${searchName}, userEmail`)
    .match({ userEmail: getUiInfoStorage().email })
    .abortSignal(ac.signal);
