import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Countries() {
  const supabase = await createClient();
  const { data: countries } = await supabase.from("countries").select();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <pre>{JSON.stringify(countries, null, 2)}</pre>;
}
