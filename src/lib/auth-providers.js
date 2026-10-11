export function getSocialProviderAvailability() {
  const hasCredentials = (clientId, clientSecret) =>
    Boolean(clientId?.trim() && clientSecret?.trim());

  return {
    google: hasCredentials(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    ),
    github: hasCredentials(
      process.env.GITHUB_CLIENT_ID,
      process.env.GITHUB_CLIENT_SECRET
    ),
  };
}
