// IMPORTS
import React from "react";

// COMPONENTS
import FooterContainer from "./FooterContainer";
import FooterDots from "./FooterDots";

const Footer = () => {
  return (
    <footer className="footer">
      <FooterContainer />

      <div className="footer-divider"></div>

      <FooterDots />
    </footer>
  );
};

export default Footer;
