import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lerirides.nyc3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "e-learning-paulina-bucket.s3.eu-north-1.amazonaws.com",
      },
    ],
     domains: ['lerirides.nyc3.digitaloceanspaces.com'],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
