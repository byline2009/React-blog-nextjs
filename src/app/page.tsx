import { getBlogList } from "@api/blogAPI";
import React from "react";

const App = async () => {
  const responseBlogList = await getBlogList("/blogs", {
    limit: "500",
    is_hero: false,
    is_most_read: false,
  });
  // console.log("blogList", Object.keys(responseBlogList));
  return (
    <div className="app-page">
      {responseBlogList &&
        responseBlogList.results.map((blog: any) => (
          <div key={blog.id}>
            <h1>{blog.title}</h1>
          </div>
        ))}
    </div>
  );
};

export default App;
