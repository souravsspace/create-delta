import { cn } from "@/lib/utils";

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
