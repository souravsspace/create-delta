import { hc } from "hono/client";
import { env } from "@/lib/env";
import { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(env.HOST_NAME);
