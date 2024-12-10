import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = ({ date, short }: { date: Date; short: boolean }) => {
  return short ? format(date, "MMM d, yyyy") : format(date, "MMMM do, yyyy");
};

export const createUUID = () => {
  return uuidv4();
};
