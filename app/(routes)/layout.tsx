import { type PropsWithChildren } from "react";
import Footer from "@/app/(routes)/components/footer";

export const RoutesLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default RoutesLayout;
