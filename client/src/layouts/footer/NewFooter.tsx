import React from "react";
import { Link } from "react-router-dom";

const NewFooter: React.FC = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-top">
          <div className="footer-left">
            <p>
              Your one-stop destination for fresh beats, <br />
              soulful melodies, and endless musical inspiration. <br />{" "}
              Discover, explore, and connect with music that moves you. <br />{" "}
              Whether you’re here to vibe, create, or collaborate – we’ve <br />{" "}
              got the rhythm you’ve been looking for.
            </p>
          </div>
          <div className="footer-mid">
            <div className="footer-links">
              <Link to={"/"}>Home</Link>
              <Link to={"/"}>Search</Link>
              <Link to={"/"}>About</Link>
              <Link to={"/"}>Browse</Link>
              <Link to={"/"}>Release Notes</Link>
              <Link to={"/"}>Contact</Link>
            </div>

            <div className="footer-social">
              <a href="https://www.youtube.com/@gresicmusic">YouTube ↗</a>
              <a href="https://www.instagram.com/gresicmusic">Instagram ↗</a>
              <a href="https://www.soundcloud.com/gresic">SoundCloud ↗</a>
            </div>

            <div className="footer-offices">
              <p>Bhopal - India</p>
            </div>

            <div className="footer-bottom">©2025 gresicmusic.</div>
          </div>
        </div>
        <div className="footer-brand">gresicmusic</div>
      </div>
    </footer>
  );
};

export default NewFooter;
