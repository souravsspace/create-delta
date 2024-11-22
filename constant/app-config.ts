export const appConfig: {
  mode: "comingSoon" | "maintenance" | "live" | "beta";
} = {
  mode: "live",
};

export const apiRoute = "/api";
export const privateRoutes = ["/"];
export const authRoutes = ["/login", "/verify-email", "/signed-out"];

export const applicationName = "Create Delta";

export const afterLoginUrl = "/";
export const afterLogoutUrl = "/signed-out";
export const loginUrl = "/login";

export const TOKEN_LENGTH = 32;
export const TOKEN_TTL = 1000 * 60 * 5; // 5 min
export const VERIFY_EMAIL_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

export const SESSION_COOKIE_NAME = "su_session";
