// eslint-disable-next-line
const envData = require("./next.env");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    ...envData,
  },
};

module.exports = nextConfig;
