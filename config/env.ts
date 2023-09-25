"use client";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const env = {
  IS_DEV: publicRuntimeConfig.APP_ENV === "dev",
  APP_ENV: publicRuntimeConfig.APP_ENV,

  API_URL: publicRuntimeConfig.API_URL,
};

export default env;
