// IMPORTS
import React from "react";

// COMPONENTS
import FooterContainer from "./components/FooterContainer";
import FooterWrapper from "./components/FooterWrapper";

const Footer = () => {
  return (
    <footer className="footer">
      <FooterContainer />

      <div className="footer-divider"></div>

      <FooterWrapper />
    </footer>
  );
};

export default Footer;
