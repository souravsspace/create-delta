import { Hono } from "hono";
import { cookies } from "next/headers";
import { generateState, OAuth2RequestError } from "arctic";

import {
  createGithubUserUseCase,
  getAccountByGithubIdUseCase,
} from "@/others/use-case/auth";
import { setSession } from "@/lib/session";
import { validateRequest, github } from "@/lib/auth";
import { afterLoginUrl } from "@/constant/config";
import { env } from "@/env/server";

const app = new Hono()
  .get("/", async (c) => {
    const { session } = await validateRequest();
    if (session) return c.redirect("/");

    const state = generateState();
    const scopes = ["user:email"];
    const url = github.createAuthorizationURL(state, scopes);

    cookies().set("github_oauth_state", state, {
      path: "/",
      secure: env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    });

    return c.redirect(url, 302);
  })
  .get("/callback", async (c) => {
    const url = new URL(c.req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("github_oauth_state")?.value ?? null;

    if (!code || !state || !storedState || state !== storedState) {
      return c.json(null, 400);
    }

    try {
      const tokens = await github.validateAuthorizationCode(code);
      const accessToken = tokens.accessToken();

      const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const githubUser: GitHubUser = await githubUserResponse.json();

      const dbUser = await getAccountByGithubIdUseCase(githubUser.id);

      if (dbUser) {
        await setSession(dbUser.userId);
        return c.redirect(afterLoginUrl, 302);
      }

      if (!githubUser.email) {
        const githubUserEmailResponse = await fetch(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const githubUserEmails = await githubUserEmailResponse.json();

        githubUser.email = getPrimaryEmail(githubUserEmails);
      }

      const userId = await createGithubUserUseCase(githubUser);
      await setSession(userId);
      return c.redirect(afterLoginUrl, 302);
    } catch (e) {
      console.error(e);
      // the specific error message depends on the provider
      if (e instanceof OAuth2RequestError) {
        // invalid code
        return c.json(null, 400);
      }
      return c.json(null, 500);
    }
  });

export default app;

export interface GitHubUser {
  id: string;
  login: string;
  avatar_url: string;
  email: string;
  name: string;
  bio: string;
}

function getPrimaryEmail(emails: Email[]): string {
  const primaryEmail = emails.find((email) => email.primary);
  return primaryEmail!.email;
}

interface Email {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}
