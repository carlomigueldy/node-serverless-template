export const config = {
  PRIVATE_KEY: process.env.PRIVATE_KEY ?? "",

  POAP_API_KEY: process.env.POAP_API_KEY ?? "",
  POAP_AUDIENCE: process.env.POAP_AUDIENCE ?? "",
  POAP_CLIENT_ID: process.env.POAP_CLIENT_ID ?? "",
  POAP_CLIENT_SECRET: process.env.POAP_CLIENT_SECRET ?? "",

  JWT_SECRET: process.env.JWT_SECRET ?? "",

  OPENSEA_API_KEY: process.env.OPENSEA_API_KEY ?? "",

  GAME_API_TOKEN_VERSION: process.env.GAME_API_TOKEN_VERSION ?? "",
  GAME_API_BASE_URL: process.env.GAME_API_BASE_URL ?? "",
  GAME_API_KEY: process.env.GAME_API_KEY ?? "",
  GAME_CLIENT_APP_URL: process.env.GAME_CLIENT_APP_URL ?? "",

  TWITTER_APP_ID: process.env.TWITTER_APP_ID ?? "",
  TWITTER_API_KEY: process.env.TWITTER_API_KEY ?? "",
  TWITTER_API_KEY_SECRET: process.env.TWITTER_API_KEY_SECRET ?? "",
  TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN ?? "",

  MONGODB_URI: process.env.MONGODB_URI ?? "",
  MONGODB_CA_CERTIFICATE: process.env.MONGODB_CA_CERTIFICATE ?? "",
};
