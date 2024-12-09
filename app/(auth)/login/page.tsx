import Link from "next/link";

import { cn } from "@/lib/utils";
import Icons from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { MagicLinkForm } from "./components/magic-link-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="mx-auto flex min-h-[80dvh] items-center justify-center py-24">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
          <CardDescription>
            or <span className="text-blue-500">create an account</span>. No
            password required.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Link
              href="/api/auth/login/google"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
                "w-full",
              )}
            >
              <Icons.google className="mr-2 h-5 w-5 stroke-white" />
              Sign in with Google
            </Link>
            <Link
              href="/api/auth/login/github"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
                "w-full",
              )}
            >
              <Icons.github className="mr-2 h-5 w-5" />
              Sign in with GitHub
            </Link>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-100 px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                  Or sign in with email
                </span>
              </div>
            </div>

            <MagicLinkForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
