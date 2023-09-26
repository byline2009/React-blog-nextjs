"use client";

import "../styles/global.scss";
import HeaderApp from "src/components/header/HeaderApp";
import React from "react";

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
      </body>
    </html>
  );
}
