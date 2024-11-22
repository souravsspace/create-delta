import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

const LoaderButton = ({
  children,
  isLoading,
  className,
  ...props
}: ButtonProps & { isLoading: boolean }) => {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      {...props}
      className={cn("flex items-center justify-center gap-2 px-3", className)}
    >
      {isLoading && <Loader2Icon className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default LoaderButton;
