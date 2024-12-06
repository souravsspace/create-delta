import Wrapper from "@/components/shared/wrapper";
import { buttonVariants } from "@/components/ui/button";
import { applicationName, loginUrl } from "@/constant/app-config";
import Link from "next/link";

const OverviewPage = () => {
  return (
    <Wrapper>
      <div className="mx-auto flex max-w-2xl items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome to {applicationName}!
            </h2>
            <p className="text-sm text-muted-foreground">
              Please login to continue and start using the app.
            </p>
          </div>
          <Link
            href={loginUrl}
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Login
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default OverviewPage;
