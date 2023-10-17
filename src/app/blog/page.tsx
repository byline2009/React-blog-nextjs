"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

interface IBlog {
  id: string;
  title: string;
}
interface IComment {
  id: string;
  name: string;
}
const limit = 5;

const fetcher = ([url, limit]: [string, number]) =>
  fetch(`${url}?limit=${limit}`).then((res) => res.json());

export default function Blog() {
  const {
    data: blogs,
    error,
    isLoading,
  } = useSWR(
    ["https://houze-portal-api.houze.io/portal/blogs", limit],
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );

  if (error) {
    return <p>Failed to fetch</p>;
  }

  if (isLoading) {
    return <p>Loading comments...</p>;
  } else {
    console.log("check", blogs);
  }
  return <div>Blogs</div>;
}
