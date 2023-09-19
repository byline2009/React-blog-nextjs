"use client";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";

const HeaderApp = () => {
  return (
    <ul className="navigation-header">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/blogs">Blogs</Link>
      </li>
    </ul>
  );
};

export default HeaderApp;
