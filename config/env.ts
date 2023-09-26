"use client";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const getNodeEnv = () => {
  return {
    IS_DEV: publicRuntimeConfig.APP_ENV === "dev",
    APP_ENV: publicRuntimeConfig.APP_ENV,

    API_URL: publicRuntimeConfig.API_URL,
  };
};
const env = getNodeEnv();

export default env;
