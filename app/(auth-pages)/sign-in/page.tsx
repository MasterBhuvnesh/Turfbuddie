import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-h-screen w-screen bg-gradient-to-r from-green-200 to-green-500">
  <main className="flex-1 flex items-center justify-center p-4">
  <form className="flex flex-col w-full max-w-md bg-[#ade25d] p-8 rounded-lg shadow-md">
  <h1 className="text-4xl text-center font-medium text-gray-800 mb-6"><b>Sign in</b></h1>

  <div className="flex flex-col gap-4">
    <div>
      <Label htmlFor="email" className="text-gray-700">
        <b>Email</b>
      </Label>
      <Input
        name="email"
        placeholder="you@example.com"
        required
      />
    </div>

    <div>
      <div className="flex justify-between items-center">
        <Label htmlFor="password" className="text-gray-700">
          <b>Password</b>
        </Label>
        <Link
          className="text-xs text-teal-600 font-medium hover:underline"
          href="/forgot-password"
        >
          Forgot Password?
        </Link>
      </div>
      <Input
        type="password"
        name="password"
        placeholder="Your password"
        required
      />
    </div>

    <SubmitButton
      pendingText="Signing In..."
      formAction={signInAction}
      className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
    >
      Sign in
    </SubmitButton>

    <FormMessage message={searchParams} />
  </div>

  <p className="text-sm text-gray-700 text-center mt-6">
    Don't have an account?{" "}
    <Link
      className="text-teal-600 font-medium underline hover:text-teal-700"
      href="/sign-up"
    >
      Sign up
    </Link>
  </p>
</form>
  </main>
</div>
  );
}