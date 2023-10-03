"use client";

import "../styles/global.scss";
import HeaderApp from "src/components/header/HeaderApp";
import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import MobileMenu from "@components/MobileMenu";

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
        <div className="main-layout">
          <div className="content-page">{children}</div>
        </div>
      </body>
    </html>
  );
}
