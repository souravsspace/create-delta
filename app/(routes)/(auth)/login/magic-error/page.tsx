import Link from "next/link";
import { loginUrl } from "@/constants/app-config";
import { buttonVariants } from "@/components/ui/button";
import Wrapper from "@/components/shared/wrapper";

const MagicLinkError = () => {
  return (
    <Wrapper>
      <div className="mx-auto max-w-[400px] space-y-6 py-24">
        <h1 className="text-3xl font-bold">Expired Token</h1>
        <p className="text-lg text-muted-foreground">
          Sorry, this token was either expired or already used. Please try
          logging in again
        </p>

        <Link
          href={loginUrl}
          className={buttonVariants({
            variant: "secondary",
            className: "w-full",
          })}
        >
          Sign In
        </Link>
      </div>
    </Wrapper>
  );
};

export default MagicLinkError;
