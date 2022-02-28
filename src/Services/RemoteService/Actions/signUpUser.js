import { supabase } from "../Configuration/supabaseClient";

export const signUpUser = (email, password) =>
  supabase.auth.signUp({ email: email, password: password });
