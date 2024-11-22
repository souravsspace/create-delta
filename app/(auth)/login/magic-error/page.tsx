import Link from "next/link";
import { loginUrl } from "@/constant/app-config";

const MagicLinkError = () => {
  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24">
      <h1 className="text-2xl font-bold">Expired Token</h1>
      <p className="text-xl">
        Sorry, this token was either expired or already used. Please try logging
        in again
      </p>

      <Link href={loginUrl}>Sign In</Link>
    </div>
  );
};

export default MagicLinkError;
