import { getUiInfoStorage } from "../../LocalService/localService";
import { supabase } from "../Configuration/supabaseClient";

export const isUserSignedUp = async () =>
  await supabase
    .from("TodoList")
    .select("userEmail")
    .match({ userEmail: getUiInfoStorage().email });
