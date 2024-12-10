"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import Wrapper from "@/components/shared/wrapper";

const SignedOutPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <Wrapper>
      <div className="mx-auto max-w-[400px] space-y-6 py-24">
        <h1 className={"text-3xl font-bold"}>Successfully Signed Out</h1>
        <p className="text-sm">
          You have been successfully signed out. You can now sign in to your
          account.
        </p>

        <Link
          href="/login"
          className={buttonVariants({
            variant: "default",
            className: "w-full",
          })}
        >
          Sign In
        </Link>
      </div>
    </Wrapper>
  );
};

export default SignedOutPage;
