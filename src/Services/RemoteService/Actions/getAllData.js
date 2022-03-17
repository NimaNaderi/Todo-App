import ac from "../../../Utilities/getAbortController";
import { getUiInfoStorage } from "../../LocalService/localService";
import { supabase } from "../Configuration/supabaseClient";

export const getAllData = async () =>
  await supabase
    .from("TodoList")
    .select("personal, school, work, groceries, userEmail")
    .match({ userEmail: getUiInfoStorage().email })
    .abortSignal(ac.signal);
