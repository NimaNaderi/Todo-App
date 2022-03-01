import { supabase } from "../Configuration/supabaseClient";

export const signInUser = (email, password) =>
  supabase.auth.signIn({ email: email, password: password });
