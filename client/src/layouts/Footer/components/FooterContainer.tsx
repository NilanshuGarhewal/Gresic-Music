import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/bg-removed-logo.png";

const FooterContainer = () => {
  return (
    <div className="footer-container">
      <div className="footer-logo">
        <span>
          <img src={logo} alt="gresicmusic" />
        </span>
      </div>

      <div className="footer-info">
        <div className="footer-wrapper  address-routes">
          <h4 className="footer-heading">Routes</h4>

          <span className="footer-box">
            <Link className="uni-link uoh" to={"/"}>
              Home
            </Link>
            <Link className="uni-link uoh" to={"/tracks"}>
              Browse
            </Link>
            <Link className="uni-link uoh" to={"/about"}>
              Links
            </Link>
          </span>
        </div>

        <div className="footer-wrapper footer-address">
          <h4 className="footer-heading">Address</h4>

          <span className="footer-box">
            <p>Bhopal</p>
            <p>Madhya Pradesh</p>
            <p>India</p>
          </span>
        </div>

        <div className="footer-wrapper social-links">
          <h4 className="footer-heading">Social</h4>

          <span className="footer-box">
            <a
              className="uni-link uoh"
              href="https://www.youtube.com/@gresicmusic"
            >
              YouTube
            </a>
            <a
              className="uni-link uoh"
              href="https://www.youtube.com/@gresicmusic"
            >
              Instagram
            </a>
            <a
              className="uni-link uoh"
              href="https://www.youtube.com/@gresicmusic"
            >
              SoundCloud
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterContainer;
