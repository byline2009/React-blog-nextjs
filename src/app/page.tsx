"use client";
import { getBlogList } from "@api/blogAPI";
import ButtonAlert from "@components/button/ButtonAlert";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const App = () => {
  const [topNewsData, setTopNewsData] = useState([]);
  const [responseBlogList, setResponseBlogList] = useState([]);
  useEffect(() => {
    getBlogList("/blogs", {
      is_hero: true,
    }).then((res) => {
      if (res) setTopNewsData(res.results);
    });
  }, []);

  const formatTime = (time: any) => {
    const d = moment(time).format("D");
    const m = moment(time).format("M");
    const y = moment(time).format("YYYY");
    return `${d} Tháng ${m}, ${y}`;
  };
  return (
    <div className="home-page">
      <div className="top-news">
        {topNewsData &&
          topNewsData.map((item: any, index: number) => (
            <Link href={`/blog/${item.slug}`} key={index}>
              <div className="top-news-item">
                <img src={item.feature_image} alt="top-new" />
                <div className="top-news-content">
                  <span>{formatTime(item.publish_time)}</span>
                  <h2>{item.title}</h2>
                </div>
              </div>
            </Link>
          ))}
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
          <ButtonAlert />
        </div>
      </div>
    </div>
  );
};

export default App;
