"use client";

import "../styles/global.scss";
import HeaderApp from "src/components/header/HeaderApp";
import React from "react";
import "react-modern-drawer/dist/index.css";
import MobileMenu from "@components/MobileMenu";
import dynamic from "next/dynamic";
import Footer from "@components/footer";
const Drawer = dynamic(() => import("react-modern-drawer"), {
  ssr: false,
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <html lang="en">
      <body>
        <HeaderApp toggleMenu={toggleDrawer} isOpen={isOpen} />
        <div className="main-layout">
          <div className="content-page">{children}</div>
        </div>
        <Footer />

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className="houze-drawer"
          size={300}
          zIndex={9999}
        >
          <MobileMenu toggleMenu={toggleDrawer} isOpen={isOpen} />
        </Drawer>
      </body>
    </html>
  );
}
