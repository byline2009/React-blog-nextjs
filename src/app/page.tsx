"use client";

import { getBlogList } from "@api/blogAPI";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";

const App = async () => {
  // const topNewsData = await getBlogList("/blogs", { is_hero: true });

  // const responseBlogList = await getBlogList("/blogs", {
  //   limit: "500",
  //   is_hero: false,
  //   is_most_read: false,
  // });
  const formatTime = (time: any) => {
    const d = moment(time).format("D");
    const m = moment(time).format("M");
    const y = moment(time).format("YYYY");
    return `${d} Tháng ${m}, ${y}`;
  };
  return (
    <div className="home-page">
      <div className="top-news">
        {/* {topNewsData &&
          topNewsData.results.map((item: any, index: number) => (
            <Link href={`/blog/${item.slug}`} key={index}>
              <a className="top-news-item">
                <img src={item.feature_image} alt="top-new" />
                <div className="top-news-content">
                  <span>{formatTime(item.publish_time)}</span>
                  <h2>{item.title}</h2>
                </div>
              </a>
            </Link>
          ))} */}
        <div className="document-receive">
          <div className="thumb">
            <img
              src="/imgs/home-page/document-receive2.png"
              alt="document-receive2.png"
            />
          </div>
          <h3>85 dự án tại TP.HCM có giá bán căn hộ dưới 1.5 tỷ/căn</h3>
          {/* <button onClick={() => setOpenModal(!openModal)}>
              <i className="icon-arrow-download" />
              Nhận tài liệu
            </button> */}
          <button
            onClick={() =>
              alert("Tính năng đang được xây dựng, mong bạn thông cảm")
            }
          >
            <i className="icon-arrow-download" />
            Nhận tài liệu
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
