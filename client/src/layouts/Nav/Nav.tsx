import React from "react";
import { useState, useEffect } from "react";

import NavLinks from "./components/NavLinks";
import NavPlayer from "./components/NavPlayer";
// import NavSearch from "./components/NavSearch";

const Nav: React.FC = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHide(entry.isIntersecting); // hide when footer is visible
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const [isOn, setIsOn] = useState(false);

  const handleIsOn = () => {
    setIsOn(true);
  };

  return (
    <div className={`nav ${isOn ? "nav2" : ""} ${hide ? "hide-nav" : ""}`}>
      <div className={`nav-container glass`}>
        <NavLinks />
        <NavPlayer handleIsOn={handleIsOn} />
      </div>
    </div>
  );
};

export default Nav;
