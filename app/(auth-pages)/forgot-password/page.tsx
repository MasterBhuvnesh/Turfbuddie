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
    <div
      style={{
        backgroundImage: `url(/assets/back.jpg)`, // same background as the sign-in page
        backgroundSize: "cover", // Adjust as needed
        backgroundPosition: "center", // Adjust as needed
        width: "cover", // Adjust as needed
        height: "100px", // Adjust as needed
      }}
      className="flex min-h-screen w-screen bg-gray-100 items-center justify-center px-4 sm:px-8"
    >
      <div className="flex w-full max-w-4xl bg-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden">
        {/* Left side: Image */}
        <div className="w-full md:w-1/2 hidden md:flex bg-gray-200 relative">
          <img
            src="/assets/forget.jpg" // Make sure this image is in the public folder
            alt="Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right side: Forgot Password Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Forgot Password</h1>

          <form className="min-h-72 flex space-y-4 flex-col gap-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div> <SubmitButton
              pendingText="Sending email..."
              formAction={forgotPasswordAction}
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
            >
              Reset Password
            </SubmitButton></div>

           

            <FormMessage message={searchParams} />
          </form>

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
        </div>
      </div>
    </div>
  );
}
