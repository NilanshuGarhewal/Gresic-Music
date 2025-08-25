import React from "react";
import { useState, useEffect } from "react";

import NavLinks from "./components/NavLinks";
import NavPlayer from "./components/NavPlayer";
import { useLocation } from "react-router-dom";
// import NavSearch from "./components/NavSearch";

const Nav: React.FC = () => {
  const location = useLocation();

  const path = location.pathname;

  // const [hide, setHide] = useState(false);

  // useEffect(() => {
  //   console.log(path);

  //   const footer = document.querySelector("footer");
  //   if (!footer) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         setHide(entry.isIntersecting); // hide when footer is visible
  //       });
  //     },
  //     { threshold: 0.1 }
  //   );

  //   observer.observe(footer);

  //   return () => observer.disconnect();
  // }, [path]);

  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    if (path.includes("/track/")) {
      setIsOn(false);
    }
    if (!path.includes("/track/")) {
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
