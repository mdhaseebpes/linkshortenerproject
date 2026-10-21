import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function DashboardGuard() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  return null;
}

export default function DashboardPage() {
  return (
    <>
      <Suspense fallback={null}>
        <DashboardGuard />
      </Suspense>
      <h1>Dashboard</h1>
    </>
  );
}
