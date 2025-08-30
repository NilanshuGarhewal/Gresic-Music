import React from "react";
import { useState, useEffect } from "react";

import NavLinks from "./components/NavLinks";
import NavPlayer from "./components/NavPlayer";
import { useLocation } from "react-router-dom";

const Nav: React.FC = () => {
  const location = useLocation();

  const path = location.pathname;

  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    if (path.includes("/track/") || path === "/") {
      setIsOn(false);
    }
    if (!path.includes("/track/") && path !== "/") {
      setIsOn(true);
    }
  }, [path]);

  return (
    <div className={`nav ${isOn ? "" : "hide-nav"}`}>
      <div className={`nav-container `}>
        <NavLinks />
        <NavPlayer />
      </div>
    </div>
  );
};

export default Nav;
