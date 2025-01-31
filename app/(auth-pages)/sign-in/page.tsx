import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div
      style={{
        backgroundImage: `url(/assets/back.jpg)`,
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
          <Image
            src="/assets/sign-in-image.jpeg" // Make sure this image is in the public folder
            alt="Illustration"
            fill // Automatically sets width and height to cover parent
            className="object-cover"
          />
        </div>

        {/* Right side: Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign in</h1>

          <form className="min-h-72 flex space-y-4 flex-col gap-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input name="email" placeholder="you@example.com" required />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input type="password" name="password" placeholder="Your password" required />
            </div>
            <p className="text-sm flex justify-end text-gray-700 text-center mt-2">
            <Link
              className="text-blue-600  font-medium underline hover:text-blue-700"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </p>

            <SubmitButton
              pendingText="Signing In..."
              formAction={signInAction}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
            >
              Sign In
            </SubmitButton>
          </form>

          <FormMessage message={searchParams} />

          <p className="text-sm text-gray-700 text-center mt-6">
            Don't have an account?{" "}
            <Link
              className="text-blue-600 font-medium underline hover:text-blue-700"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>

          {/* Forgot Password Link */}
         
        </div>
      </div>
    </div>
  );
}
