import env from "@config/env";
import qs from "query-string";

// const { API_URL } = process.env
const { API_URL } = env;
// console.log(API_URL)

const getBlogList = async (
  path: string,
  params?: {
    limit?: number;
    is_hero?: boolean;
    is_most_read?: boolean;
    is_market_information?: boolean;
    title?: any;
  }
) => {
  // console.log(API_URL)
  let apiString = `${API_URL}${path}`;
  const newQueryParam = {
    ...(params && params.limit && { limit: params.limit }),
  };
  const res = await fetch(`${API_URL}${path}${newQueryParam}`, {
    method: "GET",
  });
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
