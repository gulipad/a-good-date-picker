import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/a-good-date-picker" : "",
  assetPrefix: isProd ? "/a-good-date-picker/" : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
