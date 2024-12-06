import { User } from "@/db/schema";

export interface UserExtended extends User {
  displayName: string | null;
  profileUrl: string | null;
}
