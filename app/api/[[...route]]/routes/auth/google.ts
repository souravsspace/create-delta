import {
  generateState,
  generateCodeVerifier,
  OAuth2RequestError,
} from "arctic";
import { Hono } from "hono";
import { cookies } from "next/headers";

import {
  createGoogleUserUseCase,
  getAccountByGoogleIdUseCase,
} from "@/others/use-case/auth";
import { google } from "@/lib/auth";
import { setSession } from "@/lib/session";

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

const app = new Hono()
  .get("/", async (c) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const scopes = ["profile", "email"];
    const url = google.createAuthorizationURL(state, codeVerifier, scopes);

    (await cookies()).set("google_oauth_state", state, {
      secure: true,
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10,
    });

    (await cookies()).set("google_code_verifier", codeVerifier, {
      secure: true,
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10,
    });

    return c.redirect(url, 302);
  })
  .get("/callback", async (c) => {
    const url = new URL(c.req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState =
      (await cookies()).get("google_oauth_state")?.value ?? null;
    const codeVerifier =
      (await cookies()).get("google_code_verifier")?.value ?? null;

    if (
      !code ||
      !state ||
      !storedState ||
      state !== storedState ||
      !codeVerifier
    ) {
      return c.json(null, 400);
    }

    try {
      const tokens = await google.validateAuthorizationCode(code, codeVerifier);
      const accessToken = tokens.accessToken();
      const response = await fetch(
        "https://openidconnect.googleapis.com/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const googleUser: GoogleUser = await response.json();

      const existingAccount = await getAccountByGoogleIdUseCase(googleUser.sub);

      if (existingAccount) {
        await setSession(existingAccount.userId);
        return c.redirect("/", 301);
      }

      const userId = await createGoogleUserUseCase(googleUser);
      await setSession(userId);
      return c.redirect("/", 302);
    } catch (e) {
      // the specific error message depends on the provider
      if (e instanceof OAuth2RequestError) {
        // invalid code
        return c.json(null, 400);
      }
      return c.json(null, 500);
    }
  });

export default app;
