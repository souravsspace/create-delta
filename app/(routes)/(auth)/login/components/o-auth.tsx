import Link from "next/link";
import Icons from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";

const OAuth = () => {
  const authUrls = {
    google: "/api/auth/login/google",
    github: "/api/auth/login/github",
  };

  return (
    <div className="flex items-center justify-evenly gap-2">
      <Link
        href={authUrls.google}
        className={buttonVariants({
          variant: "outline",
          className: "w-full font-semibold",
        })}
      >
        <Icons.google className="mr-2 h-5 w-5" />
        Google
      </Link>
      <Link
        href={authUrls.github}
        className={buttonVariants({
          variant: "outline",
          className: "w-full font-semibold",
        })}
      >
        <Icons.github className="mr-2 h-5 w-5" />
        GitHub
      </Link>
    </div>
  );
};

export default OAuth;
