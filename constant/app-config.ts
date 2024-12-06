export const appConfig: {
  mode: "maintenance" | "alpha" | "beta" | "live";
} = {
  mode: "live",
};

export const apiRoute = "/api";
export const privateRoutes = ["/"];
export const authRoutes = ["/login", "/verify-email", "/signed-out"];
/**
 * @PUBLIC ROUTES
 *
 * Here you can define the public routes which are accessible to everyone.
 * if you don't want to define any public routes, you can remove it fully.
 */
export const publicRoutes = ["/overview"];
export const homeRouteNonAuth = "/overview";

export const applicationName = "Create-Delta";

export const afterLoginUrl = "/";
export const afterLogoutUrl = "/signed-out";
export const loginUrl = "/login";

export const TOKEN_LENGTH = 32;
export const TOKEN_TTL = 1000 * 60 * 5; // 5 min
export const VERIFY_EMAIL_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

export const schemaTablePrefix = "su";
export const SESSION_COOKIE_NAME = `${schemaTablePrefix}_session`;

export const LOGO_URL =
  "https://utfs.io/f/U7iRRauile4Vl5vCBBrAfjeVI8Qio694Fuh0DCUkyXYbMwGN";
