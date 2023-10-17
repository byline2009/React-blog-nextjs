"use client";
import { getBlogList } from "@api/blogAPI";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatTime } from "src/until/helper";
const dataCategory1 = {
  key: "phan-tich",
  value: "Phân tích",
  desc: "Đánh giá, nhận định vể các dự án nổi bật trên thị trường",
  titleMeta:
    "Phân tích dự án, khu vực, xu hướng thị trường bất động sản | Houze Blog",
} as any;
const page = () => {
  const [topBlog, setTopBlog] = useState<any>({});
  const [wellRead, setWellRead] = useState<any[]>([]);
  const [numberToShow, setNumberToShow] = useState(12);
  const [showLoadMore, setshowLoadmore] = useState(false);
  const [filterDataNoLoad, setFilterDataNoLoad] = useState([]);

  const [listBlog, setListBlog] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [titleCategory, setTitleCategory] = useState<any>({
    key: "",
    value: "",
    desc: "",
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTitleCategory(dataCategory1);
      getBlogList("/blogs", {
        is_most_read: true,
        limit: "5",
        ordering: "-public_time",
      }).then((res) => {
        if (res) {
          if (res.results && res.results.length > 0) {
            console.log("check phan tich", res.results);

            setWellRead(res.results);
          }
        }
      });

      getBlogList("/blogs", { limit: "100", is_most_read: false }).then(
        (res) => {
          if (res && res.results && res.results.length > 0) {
            const fullData = res.results;
            const filteredData = fullData.reduce((resData: any, item: any) => {
              item.categories.reduce((a: any, b: any) => {
                if (b.name === "Phân tích") resData.push(item);
                return a;
              }, {});
              return resData;
            }, []);

            setTopBlog(filteredData[0]);
            const shiftArr = filteredData.filter(
              (item: any, index: number) => index > 0
            );
            if (shiftArr.length > numberToShow) {
              setshowLoadmore(true);
            }
            // console.log(filteredData, shiftArr)
            setFilterDataNoLoad(shiftArr);
            handleShowMore(shiftArr);
            if (fullData.length > 0) {
              setIsLoading(false);
            }
          }
        }
      );
    }
  }, []);
  const handleShowMore = (arr: any[]) => {
    const display = arr.filter((it: any, idx: any) => idx < numberToShow);
    if (arr.length < numberToShow) {
      setshowLoadmore(false);
    }
    setListBlog(display);
  };
  return (
    <>
      <Head>
        <title>{titleCategory.titleMeta} | Houze Blog</title>
        <meta
          property="og:title"
          content="Phân tích dự án, khu vực, xu hướng thị trường bất động sản | Houze Blog"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog.houze.vn/phan-tich" />
        <meta property="og:image" content={"/thumbnail-default.jpg"} />
        <meta
          property="og:description"
          content="Đánh giá, nhận định vể các dự án nổi bật trên thị trường"
        />
        <link rel="icon" href="/cropped-favicon-192x192.webp" />
      </Head>
      <div className="category-page">
        <div className="container">
          {isLoading && (
            <div className="category-loading">
              <div className="load1">
                <div className="api-loading"></div>
              </div>
              <div className="load2">
                <div className="api-loading"></div>
              </div>
              <div className="flex-load">
                <div className="load4">
                  <div className="api-loading"></div>
                </div>
                <div className="load5">
                  <div className="api-loading"></div>
                </div>
              </div>
              <div className="flex-load">
                <div className="load6">
                  <div className="api-loading"></div>
                </div>
                <div className="load7">
                  <div className="api-loading"></div>
                </div>
                <div className="load8">
                  <div className="api-loading"></div>
                </div>
                <div className="load9">
                  <div className="api-loading"></div>
                </div>
              </div>
            </div>
          )}
          <div className="new-blog" style={{ opacity: isLoading ? 0 : 1 }}>
            <div className="intro-category">
              <h1>{titleCategory.value}</h1>
              <p>{titleCategory.desc}</p>
            </div>
            <div className="blog-category-container">
              <div className="row">
                <div className="col-lg-9 col-md-12 pr-24">
                  <Link
                    href={`/blog/${topBlog.slug}`}
                    className="new-blog-item top-category"
                  >
                    <div className="thumb">
                      <img
                        src={topBlog.feature_image}
                        alt={topBlog.feature_image_alt_text}
                      />
                    </div>
                    <div className="new-blog-content">
                      <h3>{topBlog.title}</h3>
                      <span>{formatTime(topBlog.publish_time)}</span>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-3 col-md-12"></div>
                {listBlog.length > 0 &&
                  listBlog.map((item) => (
                    <div key={item.id} className="col-lg-3 col-md-6 col-xs-12">
                      <Link
                        href={`/blog/${item.slug}`}
                        className="new-blog-item"
                      >
                        <div className="thumb">
                          <img
                            src={item.feature_image}
                            alt={item.feature_image_alt_text}
                          />
                        </div>
                        <div className="new-blog-content">
                          <h3>{item.title}</h3>
                          <span>{formatTime(item.publish_time)}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
              {showLoadMore && (
                <div className="text-center">
                  <button
                    className="btn-houze btn-solid"
                    onClick={() => setNumberToShow((prev: number) => prev + 12)}
                  >
                    Xem thêm bài viết
                  </button>
                </div>
              )}
              <div className="well-read">
                <h3>Đọc nhiều</h3>
                {wellRead.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="well-read-item"
                  >
                    <div className="sm-thumb">
                      <img
                        src={item.feature_image}
                        alt={item.feature_image_alt_text}
                      />
                    </div>
                    <h5>{item.title}</h5>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* new-blog */}
        </div>
      </div>
    </>
  );
};

export default page;
