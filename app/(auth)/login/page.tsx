import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OAuth from "./components/o-auth";
import MagicLinkForm from "./components/magic-link-form";

const LoginPage = () => {
  return (
    <div className="mx-auto flex min-h-[80dvh] items-center justify-center py-24">
      <Card className="mx-auto min-w-[25rem] max-w-[26rem]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your email below to create your account or sign in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <OAuth />

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
