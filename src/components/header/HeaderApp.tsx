"use client";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import { menuCategory } from "../../../config/contants";
import { usePathname, useRouter } from "next/navigation";

const HeaderApp = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="header">
      <div className="header-top">
        <div className="logo-group">
          <div className="block-center">
            <div className="logo">
              <Link href="/" passHref>
                <img src={`/imgs/logo-primary.svg`} alt="logo" />
              </Link>
            </div>
            <div className="main-title">Blog</div>
          </div>
        </div>
        <div className="hotline">
          <a
            href="https://houze.vn/"
            target="_blank"
            rel="noreferrer"
            className="back-houzevn"
          >
            Truy cập houze.vn
          </a>
          <a href="tel:0886048899" className={`btn-houze btn-solid`}>
            <i className="icon-call-connecting" />
            <span>0886 048 899</span>
          </a>
        </div>
      </div>
      <div className="header-bottom">
        <div className="navigation">
          {/* <div className={`nav-item ${pathname === '/' && 'active'}`}>
            <Link href={'/'}>
              <a>Trang chủ</a>
            </Link>
          </div> */}
          {menuCategory.map((item, index) => (
            <div
              key={index}
              className={`nav-item ${item.link === pathname && "active"}`}
            >
              <Link href={item.link}>
                <span>{item.label} </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderApp;
