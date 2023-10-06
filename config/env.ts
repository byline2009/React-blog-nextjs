"use client";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const getNodeEnv = () => {
  return {
    NEXT_PUBLIC_APP_ENV: publicRuntimeConfig.NEXT_PUBLIC_APP_ENV === "dev",

    NEXT_PUBLIC_API_URL: publicRuntimeConfig.NEXT_PUBLIC_API_URL,
  };
};
const env = getNodeEnv();

export default env;
