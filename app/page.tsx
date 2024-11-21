import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { buttonVariants } from "@/components/ui/button";

const HomePage = async () => {
  const user = await getCurrentUser();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4">
      {user ? (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">Welcome, {user.email}!</h2>
          <Link
            href="/api/auth/logout"
            className={buttonVariants({ variant: "default" })}
          >
            LogOut
          </Link>
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
