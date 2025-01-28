import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Function to truncate the email
  function truncateEmail(email: string | undefined): string {
    if (!email) return 'Guest'; // or return an empty string ''
    // Your truncation logic here
    return email.split('@')[0]; // Example truncation
  }

  if (!hasEnvVars) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div>
          <Badge
            variant={"default"}
            className="font-normal pointer-events-none text-center sm:text-left"
          >
            Please update .env.local file with anon key and url
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" variant={"outline"} disabled>
            <Link href="/sign-in"><b>Sign in</b></Link>
          </Button>
          <Button asChild size="sm" variant={"outline"} disabled>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <span className="text-sm sm:text-base text-center sm:text-left">
        Hey, {truncateEmail(user.email)}!
      </span>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"} size="sm" className="w-full sm:w-auto">
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}