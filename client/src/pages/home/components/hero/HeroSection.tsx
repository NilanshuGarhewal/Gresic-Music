import React from "react";
import PianoSection from "./PianoSection";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-logo-container">
        <PianoSection />
        <p className="web-creator-name d-desktop">
          Press the letters or play it with your keyboard! <br /> website by
          Nilanshu Garhewal
        </p>
        <p className="web-creator-name d-mobile">
          Press the letters to play the piano! <br /> website by
          Nilanshu Garhewal
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
