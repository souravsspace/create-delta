import { headers } from "next/headers";

export async function getIp() {
  const awaitedHeaders = await headers();

  const forwardedFor = awaitedHeaders.get("x-forwarded-for");
  const realIp = awaitedHeaders.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return null;
}
