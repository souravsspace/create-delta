import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { applicationName, loginUrl } from "@/constants/app-config";
import Link from "next/link";

const GetStarted = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Welcome to {applicationName}!</CardTitle>
        <CardDescription>
          Please login to continue and start using the app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={loginUrl}
          className={buttonVariants({
            variant: "secondary",
            className: "w-full",
          })}
        >
          Get started
        </Link>
      </CardContent>
    </Card>
  );
};

export default GetStarted;
