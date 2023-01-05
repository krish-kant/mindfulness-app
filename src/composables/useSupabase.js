// UseSupabase.js
import { createClient } from "@supabase/supabase-js";
import useAuthUser from "@/composables/useAuthUser";

// config
const supabaseUrl = "https://lqisrvwfsbkiqnjdqrhw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxaXNydndmc2JraXFuamRxcmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3NzE2MjEsImV4cCI6MTk4ODM0NzYyMX0.2TtVHGM-VDp4MxVWBM089PcjT0O1xY8a7Aya8077b2E";

// setup client
const supabase = createClient(supabaseUrl, supabaseKey);

// ⬇ setup auth state listener ⬇
supabase.auth.onAuthStateChange((event, session) => {
  // the "event" is a string indicating what trigger the state change (ie. SIGN_IN, SIGN_OUT, etc)
  // the session contains info about the current session most importanly the user dat
  const { user } = useAuthUser();

  // if the user exists in the session we're logged in
  // and we can set our user reactive ref
  user.value = session?.user || null;
});

// expose supabase client
export default function useSupabase() {
  return { supabase };
}
