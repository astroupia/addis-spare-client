import Link from "next/link"
import SignInForm from "@/components/auth/sign-in-form"

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-md py-2 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Welcome <span className="text-[#670D2F] pr-4 ">Back</span>
        </h1>
        <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center ">
           Back to Home
        </Link>
      </div>

      <div className="flex gap-6 mb-8">
        <Link
          href="/sign-up"
          className="flex-1 bg-white dark:bg-gray-900 py-3 text-center rounded-lg font-medium border border-gray-200 dark:border-gray-700"
        >
          Sign Up
        </Link>
        <Link href="/sign-in" className="flex-1 bg-gray-100 dark:bg-gray-800 py-3 text-center rounded-lg font-medium">
          Login
        </Link>
      </div>

      <SignInForm />
    </div>
  )
}
