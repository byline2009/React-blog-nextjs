"use server";
const { NEXT_PUBLIC_API_URL } = process.env;

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
    ...(params &&
      params.is_hero != undefined && { is_hero: params.is_hero.toString() }),
    ...(params &&
      params.is_most_read != undefined && {
        is_most_read: params.is_most_read.toString(),
      }),
  };

  console.log(
    "url",
    `${NEXT_PUBLIC_API_URL}${path}?${new URLSearchParams(
      newQueryParam
    ).toString()}`
  );
  const res = await fetch(
    `${NEXT_PUBLIC_API_URL}${path}?${new URLSearchParams(
      newQueryParam
    ).toString()}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
  console.log("res server", res);

  return res;
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
