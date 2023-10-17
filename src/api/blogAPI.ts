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
    ordering? :string;
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

  // console.log("res server", res.results);

  return res;
};

const getBlogDetail = async (path: string, slug: string) => {
   console.log(`${NEXT_PUBLIC_API_URL}${path}/${slug}`)
  const res = await fetch(
   `${NEXT_PUBLIC_API_URL}${path}/${slug}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());;
  return res;
};

export { getBlogList ,getBlogDetail};
