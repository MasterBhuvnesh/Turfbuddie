import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-r from-green-200 to-green-500">
      <main className="flex-1 flex items-center justify-center p-4">
        <form className="flex flex-col w-full max-w-md bg-[#ade25d] p-8 rounded-lg shadow-md">
          <h1 className="text-4xl text-center font-medium text-gray-800 mb-6">
            <b>Reset Password</b>
          </h1>

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

            <SubmitButton
              formAction={forgotPasswordAction}
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
            >
              Reset Password
            </SubmitButton>

            <FormMessage message={searchParams} />
          </div>

          <hr className="border-t border-gray-300 my-4 w-full" />

          <p className="text-sm text-gray-700 text-center">
            Already have an account?{" "}
            <Link
              className="text-teal-600 font-medium underline hover:text-teal-700"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}