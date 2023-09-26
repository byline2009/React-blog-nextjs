import { getBlogList } from "@api/blogAPI";
import React from "react";

async function test() {
  console.log("test");
  try {
    const blogList = await getBlogList("/blogs", {
      limit: "500",
      is_hero: false,
      is_most_read: false,
    });

    // console.log("check", blogList);
  } catch (err: any) {
    console.log(err.message);
  }
  return false;
}
const App = () => {
  return (
    <div className="app-page">
      <div className="title">Toi la title cua app</div>
    </div>
  );
};

export default App;
