"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBlogDetail, getBlogList } from "@api/blogAPI";
import { formatTime } from "src/until/helper";
import Link from "next/link";
import moment from "moment";
import Head from "next/head";

const page = () => {
  const params = useParams();
  const router = useRouter();

  const [blogDetail, setBlogDetail] = useState<any>({
    categories: [],
    tags: [],
  });
  const [initTop, setInitTop] = useState<number>(0);
  const [heightContent, setHeightContent] = useState<number>(0);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [wellRead, setWellRead] = useState<any[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getBlogDetail("/blogs", params.blogId.toString()).then((res) => {
      console.log("check detail", Object.keys(res));
      setBlogDetail(res);
    });
  }, []);
  useEffect(() => {
    // setShowChild(true)
    const { blogID }: any = params.blogId;
    if (typeof window !== "undefined" && blogDetail.categories.length > 0) {
      const el = document.querySelector("#social-blog");
      const height: any = document.getElementById("blog-detail");
      const blogHeight = height.offsetHeight;
      const top = getPosition(el).top;
      setInitTop(top);
      setHeightContent(blogHeight);

      const getCategory = blogDetail.categories[0].name;

      getBlogList("/blogs", { limit: "100", is_most_read: false }).then(
        (res) => {
          const fullData = res.results;
          if (fullData.length > 0) {
            setIsLoading(false);
          }
          handleFilter(fullData, getCategory, blogID);
        }
      );
      getBlogList("/blogs", { limit: "5", is_most_read: true }).then((res) => {
        setWellRead(res.results);
      });
    }
  }, [blogDetail]);

  const handleFilter = (arr: any, category: any, currSlug: string) => {
    const filterCategory = arr.reduce((resData: any, item: any) => {
      // eslint-disable-next-line no-unused-vars
      const subarr = item.categories.reduce((a: any, b: any) => {
        if (b.name === category) resData.push(item);
        return a;
      }, {});
      return resData;
    }, []);
    // console.log(filterCategory)
    const relatedBlog = filterCategory.filter(
      (item: any, index: any) => item.slug !== currSlug && index < 6
    );
    setRelatedPosts(relatedBlog);
  };

  const getPosition = (el: any) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  };

  return (
    <div className="blog-detail-page">
      <Head>
        {!isLoading && (
          <>
            <title>{blogDetail.title} | Houze Blog</title>
            <meta
              property="og:title"
              content={`${blogDetail.title} | Houze Blog`}
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content={"https://integration-blog-houze-vn.houze.io"}
            />
            <meta
              property="og:image"
              content={blogDetail.feature_image || "/thumbnail-default.jpg"}
            />
            <meta
              property="og:image:url"
              content={blogDetail.feature_image || "/thumbnail-default.jpg"}
            />
            <meta
              property="og:image:secure"
              content={blogDetail.feature_image || "/thumbnail-default.jpg"}
            />
            <meta
              property="og:image:secure_url"
              content={blogDetail.feature_image || "/thumbnail-default.jpg"}
            />
            <meta property="og:description" content={blogDetail.sapo} />
            <link rel="icon" href="/cropped-favicon-192x192.webp" />
          </>
        )}
      </Head>
      <div className="container">
        {isLoading && (
          <div className="blog-loading">
            <div className="load1">
              <div className="api-loading"></div>
            </div>
            <div className="load2">
              <div className="api-loading"></div>
            </div>
            <div className="load3">
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
          </div>
        )}
        <div
          id="blog-detail"
          className="blog-detail"
          style={{ opacity: isLoading ? 0 : 1 }}
        >
          <div className="subject">
            {blogDetail.categories.map((item: any) => (
              <span key={item.id}>{item.name}</span>
            ))}
          </div>
          <h1 className="title-blog">{blogDetail.title}</h1>
          <p className="short-desc">{blogDetail.sapo}</p>
          <div className="row">
            <div className="col-lg-9 col-md-12 pr-24">
              <div className="blog-detail-content">
                <div className="blog-big-thumb">
                  <img
                    src={blogDetail.feature_image}
                    alt={blogDetail.feature_image_alt_text}
                  />
                </div>
                <div className="author-and-content">
                  <div className="author">
                    <div className="author-avatar">
                      <img src="/imgs/avatar-houze.jpg" alt="avatar" />
                    </div>
                    <h4 className="author-name">{blogDetail.author_text}</h4>
                    <div className="day-post">
                      {moment(blogDetail.publish_time).format("DD/MM/YYYY")}
                    </div>
                    <div
                      id="social-blog"
                      className={`social-blog ${isSticky ? "isSticky" : ""}`}
                      style={{ display: "none" }}
                    >
                      <a href="#">
                        <i className="icon-facebook-o" />
                      </a>
                      <a href="#">
                        <i className="icon-linkedin-o" />
                      </a>
                      <a href="#">
                        <i className="icon-twitter-o" />
                      </a>
                      <a href="#">
                        <i className="icon-copy-link" />
                      </a>
                      <a href="#">
                        <i className="icon-mail-o" />
                      </a>
                    </div>
                  </div>
                  <div className="blog-content">
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{ __html: blogDetail.content }}
                    ></div>
                    <ul className="hashtag">
                      {blogDetail.tags.map((item: any, index: any) => (
                        <li key={index}>
                          <img src="/imgs/blog-detail/tag-icon.svg" alt="tag" />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                    {/* <div className="newsletter-blog">
                      <h3>Đăng ký nhận tin phân tích thị trường từ Houze</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        At diam odio diam adipiscing augue leo fringilla
                        imperdiet.
                      </p>
                      <div className="form-newsletter">
                        <input
                          type="text"
                          placeholder="Để lại email tại đây."
                        />
                        <button>Đăng ký</button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 pl-24">
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
        </div>

        <div className="news-about-page">
          <h2>Bài viết liên quan</h2>
          <div className="list-news">
            <div className="row">
              {relatedPosts.map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6 col-xs-12">
                  <Link href={`/blog/${item.slug}`} className="news-item">
                    <img
                      src={item.feature_image}
                      alt={item.feature_image_alt_text}
                    />
                    <h3>{item.title}</h3>
                    <div className="tag-and-date">
                      <div className="item-category">
                        {item.categories.map((item: any) => (
                          <span key={item.id}>{item.name}</span>
                        ))}
                      </div>
                      <span>{formatTime(item.publish_time)}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
