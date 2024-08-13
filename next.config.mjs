/**
 * @type {import('next').NextConfig}
 */

const { FINANCIAL_MODEL_API_KEY, APP_BASE_URL } = process.env;

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    FINANCIAL_MODEL_API_KEY,
    APP_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
