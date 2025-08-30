import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

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
        <span className="material-icons-round icon-child">home</span>

        <p className="icon-title">Home</p>
      </Link>

      <Link
        to={"/tracks"}
        className={`icon uni-link ${
          isActive("/tracks") || isActive("/track") ? "active" : ""
        }`}
      >
        <span className="material-icons-round icon-child">grid_view</span>
        <p className="icon-title">Browse</p>
      </Link>

      <Link
        to={"/search"}
        className={`icon uni-link ${isActive("/search") ? "active" : ""}`}
      >
        <MagnifyingGlassIcon className="icon-child" weight="regular" />
        <p className="icon-title">Search</p>
      </Link>

      {/* <Link
        to={"/about"}
        className={`icon uni-link ${isActive("/about") ? "active" : ""}`}
      >
        <span className="material-icons-round icon-child">person</span>
        <p className="icon-title">About</p>
      </Link> */}
    </div>
  );
};

export default NavLinks;
