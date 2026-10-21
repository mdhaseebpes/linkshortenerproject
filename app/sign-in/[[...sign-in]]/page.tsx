import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<div className="h-[32rem] w-[25rem]" />}>
        <SignIn />
      </Suspense>
    </div>
  );
}
