"use client";

import Link from "next/link";

import { useLogout } from "@/hooks/use-logout";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSession } from "@/components/providers/session-provider";

const HomePage = () => {
  const { user } = useSession();
  const { mutateAsync: logOut } = useLogout();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4">
      {user ? (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">Welcome, {user.email}!</h2>
          <Button variant="destructive" onClick={() => logOut()}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/api/auth/login/google"
            className={buttonVariants({ variant: "default" })}
          >
            Google
          </Link>
          <Link
            href="/api/auth/login/github"
            className={buttonVariants({ variant: "secondary" })}
          >
            GitHub
          </Link>
        </div>
      )}
    </main>
  );
};

export default HomePage;
