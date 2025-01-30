import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div
      style={{
        backgroundImage: `url(/assets/back.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex min-h-screen w-screen items-center justify-center px-4 sm:px-8"
    >
      <div className="flex w-full max-w-4xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden">
        {/* Left side: Image */}
        <div className="w-full md:w-1/2 hidden md:flex bg-gray-200 relative">
          <Image
            src="/assets/sign-up-image.jpeg" // Update if you have a different sign-up image
            alt="Illustration"
            fill
            className="object-cover"
          />
        </div>

        {/* Right side: Sign Up Form */}
        <div className="w-full bg-gray-200 md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign up</h1>

          <p className="text-gray-600 text-sm mb-2">Create your account</p>

          <form className="min-h-72 flex flex-col gap-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input type="password" name="password" placeholder="Your password" minLength={6} required />
            </div>

            <SubmitButton
              formAction={signUpAction}
              pendingText="Signing up..."
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
            >
              Sign up
            </SubmitButton>
          </form>

          <FormMessage message={searchParams} />

          <p className="text-sm text-gray-700 text-center mt-6">
            Already have an account?{" "}
            <Link className="text-blue-600 font-medium underline hover:text-blue-700" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
