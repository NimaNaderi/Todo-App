import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nlhthpwaizxeudtmiyrc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5saHRocHdhaXp4ZXVkdG1peXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU4MDAwODgsImV4cCI6MTk2MTM3NjA4OH0.R4moVGkm-GJ-iO81ClEXDo1y7puEricQhj2ku2Sr-B8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
