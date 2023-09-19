"use client";
import { useEffect, useState } from "react";
import axios from "axios";
interface IBlog {
  id: string;
  title: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  useEffect(() => {
    axios
      .get("https://houze-portal-api.houze.io/portal/blogs?limit=5")
      .then((result) => {
        console.log("result", result.data.results);
        const arrayTemp = result.data.results.map((item: any) => {
          return { id: item.id, title: item.title } as IBlog;
        });
        setBlogs(arrayTemp);
      });
  }, []);
  return (
    <main className="main-layout">
      <div className="content-page">
        {blogs.map((item, index) => {
          return <h4 key={index}>{item.title}</h4>;
        })}
      </div>
    </main>
  );
}
