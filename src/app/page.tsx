"use client";
import { getBlogList } from "@api/blogAPI";
import ButtonAlert from "@components/button/ButtonAlert";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
type IBlog = {
  id: string;
  title: string;
  feature_image: string;
  publish_time: string;
  slug: string;
};
const App = () => {
  const [topNewsData, setTopNewsData] = useState<IBlog[]>([]);
  const [responseBlogList, setResponseBlogList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [widthWindow, setWidthWindow] = useState(0);
  const [wellRead, setWellRead] = useState<any[]>([]);
  const [defautCategory, setDefautCategory] = useState("all");
  const [blogList, setBlogList] = useState([]);
  const [showLoadmore, setShowLoadmore] = useState(true);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [numberToShow, setnumberToShow] = useState(12);
  const [filterDataNoLoad, setFilterDataNoLoad] = useState<any[]>([]);
  const [blogData, setBlogData] = useState<any[]>([]);
  const firstUpdate = useRef(true);

  useEffect(() => {
    getBlogList("/blogs", {
      is_hero: true,
    }).then((res) => {
      if (res) setTopNewsData(res.results);
    });
    getBlogList("/blogs", { is_most_read: true }).then((res) => {
      if (res) {
        console.log("check is most read", res.results);

        setWellRead(res.results);
      }
    });
    getBlogList("/blogs", {
      limit: "500",
      is_hero: false,
      is_most_read: false,
    }).then((res) => {
      if (res) {
        console.log("check newest blog", res.results);
        setBlogList(res.results);

        if (res.results) {
          const data = res.results.sort((a: any, b: any) =>
            b.publish_time.localeCompare(a.publish_time)
          );
          // console.log('data', data)
          setBlogData(data);
          handleFilter(res.results);
        }
      }
    });
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidthWindow(window.innerWidth);
    }
  }, []);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    handleFilter(blogData);
  }, [defautCategory]);

  useEffect(() => {
    if (numberToShow != 12) {
      handleShowMore(filterDataNoLoad);
    }
  }, [numberToShow]);

  const handleFilter = (arr: any) => {
    let filterCategory = null;
    if (defautCategory !== "all") {
      filterCategory = arr.reduce((resData: any, item: any) => {
        const subarr = item.categories.reduce((a: any, b: any) => {
          if (b.name === defautCategory) resData.push(item);
          return a;
        }, {});
        return resData;
      }, []);
    } else {
      filterCategory = arr;
    }

    if (filterCategory.length > numberToShow) {
      setShowLoadmore(true);
    }
    setFilterDataNoLoad(filterCategory);
    handleShowMore(filterCategory);
  };
  const handleShowMore = (arr: any[]) => {
    const display = arr.filter((it: any, idx: any) => idx < numberToShow);
    if (arr.length < numberToShow) {
      setShowLoadmore(false);
    }
    setFilterData(display);
  };

  const formatTime = (time: any) => {
    const d = moment(time).format("D");
    const m = moment(time).format("M");
    const y = moment(time).format("YYYY");
    return `${d} Tháng ${m}, ${y}`;
  };
  const settingTopnews = {
    dots: true,
    dotsClass: "slick-dots slick-top-news",
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="home-page">
      <div className="top-news">
        {widthWindow < 960 ? (
          <Slider {...settingTopnews}>
            {topNewsData.map((item, index) => (
              <div key={index}>
                <Link href={`/blog/${item.slug}`} className="top-news-item">
                  <img src={item.feature_image} alt="top-new" />
                  <div className="top-news-content">
                    <span>{formatTime(item.publish_time)}</span>
                    <h2>{item.title}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          topNewsData.map((item: any, index: number) => (
            <Link
              href={`/blog/${item.slug}`}
              key={index}
              className="top-news-item"
            >
              <img src={item.feature_image} alt="top-new" />
              <div className="top-news-content">
                <span>{formatTime(item.publish_time)}</span>
                <h2>{item.title}</h2>
              </div>
            </Link>
          ))
        )}

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

      <div className="container">
        <div className="most-read">
          <h2 className="heading-home">Đọc nhiều nhất</h2>

          <div className="row">
            {wellRead.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-xs-12">
                <Link href={`/blog/${item.slug}`} className="most-read-item">
                  <div className="thumb">
                    <img src={item.feature_image} alt="" />
                  </div>
                  <div className="most-read-content">
                    <h3>{item.title}</h3>
                    <span>{formatTime(item.publish_time)}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* most-read */}
        <div className="new-blog">
          <h2 className="heading-home">Bài viết mới nhất</h2>
          <div className="new-blog-category">
            <div
              className={`category-item ${
                defautCategory === "all" && "active"
              }`}
              onClick={() => setDefautCategory("all")}
            >
              Tất cả
            </div>
            <div
              className={`category-item ${
                defautCategory === "Phân tích" && "active"
              }`}
              onClick={() => setDefautCategory("Phân tích")}
            >
              Phân tích
            </div>
            <div
              className={`category-item ${
                defautCategory === "Thị trường" && "active"
              }`}
              onClick={() => setDefautCategory("Thị trường")}
            >
              Thị trường
            </div>
            <div
              className={`category-item ${
                defautCategory === "Kiến thức" && "active"
              }`}
              onClick={() => setDefautCategory("Kiến thức")}
            >
              Kiến thức
            </div>
            <div
              className={`category-item ${
                defautCategory === "Đầu tư" && "active"
              }`}
              onClick={() => setDefautCategory("Đầu tư")}
            >
              Đầu tư
            </div>
          </div>
        </div>

        <div className="row">
          {filterData.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-xs-12">
              <Link href={`/blog/${item.slug}`} className="new-blog-item">
                <div className="thumb">
                  <img src={item.feature_image} alt="" />
                </div>
                <div className="new-blog-content">
                  <h3>{item.title}</h3>
                  <span>{formatTime(item.publish_time)}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {showLoadmore && (
          <div className="text-center">
            <button
              className="btn-houze btn-solid"
              onClick={() => {
                setnumberToShow(numberToShow + 12);
              }}
            >
              Xem thêm bài viết
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
