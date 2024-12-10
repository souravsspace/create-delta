import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserExtended } from "@/types";
import { formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserCardProps = {
  user: UserExtended | undefined;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-1">
        <CardTitle className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={user?.profileUrl ?? ""}
              alt={user?.displayName ?? "Profile"}
              className="object-cover"
            />
            <AvatarFallback className="uppercase">
              {user?.displayName?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span>{user?.displayName}</span>
          {user?.bio ? (
            <>
              <span> | </span>
              <span className="text-muted-foreground">{user?.bio}</span>
            </>
          ) : null}
        </CardTitle>
        <CardDescription>
          It&apos;s {formatDate({ date: new Date(), short: true })}, love to see
          you here!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          href="/api/auth/logout"
          className={buttonVariants({
            variant: "secondary",
            className: "w-full",
          })}
        >
          LogOut
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
