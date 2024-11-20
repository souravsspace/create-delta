import { hc } from "hono/client";
import { env } from "@/env/client";
import { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(env.NEXT_PUBLIC_URL);
