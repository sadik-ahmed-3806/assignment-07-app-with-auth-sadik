import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "@/lib/mongodb";

function getProviderCredentials(providerName, clientIdKey, clientSecretKey) {
  const clientId = process.env[clientIdKey]?.trim();
  const clientSecret = process.env[clientSecretKey]?.trim();

  if (Boolean(clientId) !== Boolean(clientSecret)) {
    throw new Error(
      `${clientIdKey} and ${clientSecretKey} must both be configured to enable ${providerName} sign-in.`
    );
  }

  return clientId && clientSecret ? { clientId, clientSecret } : null;
}

function getConfiguredOrigin(name, value) {
  if (!value?.trim()) {
    return null;
  }

  let url;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error(`${name} must be a valid absolute URL.`);
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`${name} must use HTTP or HTTPS.`);
  }

  return url.origin;
}

const configuredBaseURL =
  process.env.BETTER_AUTH_URL?.trim() ||
  process.env.URL?.trim() ||
  (process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "");

if (!configuredBaseURL) {
  throw new Error("Set BETTER_AUTH_URL to your production site origin in Netlify.");
}

const baseURL = getConfiguredOrigin("BETTER_AUTH_URL", configuredBaseURL);
const trustedOrigins = new Set([baseURL]);

for (const [name, value] of [
  ["URL", process.env.URL],
  ["DEPLOY_PRIME_URL", process.env.DEPLOY_PRIME_URL],
]) {
  const origin = getConfiguredOrigin(name, value);
  if (origin) {
    trustedOrigins.add(origin);
  }
}

if (process.env.NODE_ENV !== "production") {
  trustedOrigins.add("http://localhost:3000");
}

const google = getProviderCredentials(
  "Google",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET"
);
const github = getProviderCredentials(
  "GitHub",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET"
);
const socialProviders = {};

if (google) {
  socialProviders.google = google;
}
if (github) {
  socialProviders.github = github;
}

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL,
  trustedOrigins: [...trustedOrigins],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders,
});