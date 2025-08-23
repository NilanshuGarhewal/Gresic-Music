// IMPORTS
import React from "react";

// COMPONENTS
import FooterContainer from "./FooterContainer";
import FooterWrapper from "./FooterWrapper";

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
