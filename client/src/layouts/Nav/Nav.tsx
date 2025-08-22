import React from "react";
import NavLinks from "./components/NavLinks";
import NavPlayer from "./components/NavPlayer";
// import NavSearch from "./components/NavSearch";

import { useState } from "react";

const Nav = () => {
  const [isOn, setIsOn] = useState(false);

  const handleIsOn = () => {
    setIsOn(true);
  };

  return (
    <div className={`nav ${isOn ? "nav2" : ""}`}>
      <div className={`nav-container glass`}>
        <NavLinks />
        <NavPlayer handleIsOn={handleIsOn} />
      </div>
    </div>
  );
};

export default Nav;
