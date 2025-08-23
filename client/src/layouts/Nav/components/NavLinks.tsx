import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <div className="nav-links">
      <Link
        to={"/"}
        className={`icon uni-link ${isActive("/") ? "active" : ""}`}
      >
        <p className="icon-title">Home</p>
        <div className="icon-underline"></div>
      </Link>

      <Link
        to={"/tracks"}
        className={`icon uni-link ${
          isActive("/tracks") || isActive("/track") ? "active" : ""
        }`}
      >
        <p className="icon-title">Browse</p>
        <div className="icon-underline"></div>
      </Link>

      <Link
        to={"/about"}
        className={`icon uni-link ${isActive("/about") ? "active" : ""}`}
      >
        <p className="icon-title">About</p>
        <div className="icon-underline"></div>
      </Link>
    </div>
  );
};

export default NavLinks;
