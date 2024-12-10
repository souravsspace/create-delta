/**
 *  @ROUTES
 *
 * Here you can define the @routes which are accessible to everyone.
 * if you don't want to define any public routes, you can remove it fully.
 */
export const apiRoute = "/api";
export const privateRoutes = ["/"];
export const authRoutes = ["/login", "/verify-email", "/signed-out"];

export const publicRoutes = ["/overview"];
export const homeRouteNonAuth = "/overview";

/**
 *  @APP CONFIG
 *
 * Here you can define the @app config which are accessible to everyone.
 */

export const applicationName = "Create-Delta";
export const companyName = "Delta";

/**
 *  @URLS
 *
 * Here you can define the @urls which are accessible to everyone.
 * if you don't want to define any public url, you can remove it fully.
 */

export const afterLoginUrl = "/";
export const afterLogoutUrl = "/signed-out";
export const loginUrl = "/login";

/**
 *  @SOCIAL
 *
 * Here you can define the @social urls which are accessible to everyone.
 * Add your social urls here. That will be used in the footer and other places.
 */

export const social = {
  githubUrl: "https://github.com/souravsspace/create-delta",
  linkedinUrl: "https://www.linkedin.com/company/delta-labs-org/",
  twitterUrl: "https://x.com/delta_labs_org",
};

/**
 *  @TOKEN
 *
 * Here you can define the @token config.
 * This is used to generate the token for the user authentication.
 */

export const TOKEN_LENGTH = 32;
export const TOKEN_TTL = 1000 * 60 * 5; // 5 min
export const VERIFY_EMAIL_TTL = 1000 * 60 * 60 * 24 * 1; // 1 day

/**
 *  @PROFILE_IMAGE_UPLOAD
 *
 * Here you can define the @profile_image_upload config.
 * This is used to define the max upload size for the image.
 */

export const MAX_UPLOAD_IMAGE_SIZE_IN_MB = 5;
export const MAX_UPLOAD_IMAGE_SIZE = 1024 * 1024 * MAX_UPLOAD_IMAGE_SIZE_IN_MB;

/**
 *  @SESSION
 *
 * Here you can define the @session config.
 * This is used to define the session cookie name. and the schema table prefix.
 */

export const schemaTablePrefix = "su";
export const SESSION_COOKIE_NAME = `${schemaTablePrefix}_session`;

/**
 *  @LOGO
 *
 * Here you can define the @logo config.
 * This is used to define the logo url.
 */

export const LOGO_URL =
  "https://utfs.io/f/U7iRRauile4Vl5vCBBrAfjeVI8Qio694Fuh0DCUkyXYbMwGN";

/**
 *  @DROP_ZONE_CONFIG
 *
 * Here you can define the @drop_zone_config config.
 * This is used to define the drop zone config for the profile image.
 */

export const dropZoneConfigForProfileImage = {
  maxFiles: 1,
  maxSize: MAX_UPLOAD_IMAGE_SIZE,
  multiple: false,
  accept: {
    "image/*": [".jpg", ".jpeg", ".png"],
  },
};
