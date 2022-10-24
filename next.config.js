/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    DREAM_API_KEY: process.env.DREAM_API_KEY,
    REPLICATION_STABILITY_API_KEY: process.env.REPLICATION_STABILITY_API_KEY,
    PINATA_JWT: process.env.PINATA_JWT,
    s3AccessKeyId: process.env.s3AccessKeyId,
    s3AccessSecret: process.env.s3AccessSecret,
    s3Region: process.env.s3Region,
    s3Bucket: process.env.s3Bucket,
  },
  future: {
    webpack5: true,
  },
  webpack: config => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
    };
    return config;
  },
};

module.exports = nextConfig;
