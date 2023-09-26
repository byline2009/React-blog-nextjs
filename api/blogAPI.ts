import env from "@config/env";
import qs from "query-string";

const { API_URL } = process.env;
// const { API_URL } = env;
// console.log(API_URL)

const getBlogList = async (
  path: string,
  params?: {
    limit?: string;
    is_hero?: boolean;
    is_most_read?: boolean;
    is_market_information?: boolean;
    title?: any;
  }
) => {
  const newQueryParam = {
    ...(params && params.limit && { limit: params.limit }),
  };

  console.log(
    "url",
    `${API_URL}${path}?${new URLSearchParams(newQueryParam).toString()}`
  );
  const res = await fetch(
    `${API_URL}${path}?${new URLSearchParams(newQueryParam).toString()}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
  //   console.log("result", res);
  const data = res;
  return data;
};

// const getBlogDetail = async (path: string, slug: string) => {
//   // console.log(API_URL)
//   const res = await fetch(
//     url: `${API_URL}${path}/${slug}`,
//   );
//   const data = res.data;
//   return data;
// };

export { getBlogList };
