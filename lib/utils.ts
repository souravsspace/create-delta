import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = ({ date, short }: { date: Date; short: boolean }) => {
  return short ? format(date, "MMM d, yyyy") : format(date, "MMMM do, yyyy");
};
