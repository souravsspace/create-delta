import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { buttonVariants } from "@/components/ui/button";

const HomePage = async () => {
  const user = await getCurrentUser();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-center text-xl font-bold uppercase sm:text-2xl">
          {user?.email}!
        </h2>
        <Link
          href="/api/auth/logout"
          className={buttonVariants({ variant: "default" })}
        >
          LogOut
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
