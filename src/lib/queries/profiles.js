import { supabase } from "../supabase";

export async function updateProfile(userId, patch) {
  const { data, error } = await supabase
    .from("profiles")
    .update(patch)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
