import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "62.171.181.241",
        port: "9000",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
