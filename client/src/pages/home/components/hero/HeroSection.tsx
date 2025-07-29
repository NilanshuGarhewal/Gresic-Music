import "./HeroSection.css";
import nature from "../../../../assets/images/nature_image.jpg";

export default function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-wrapper">
        <div className="hero-message">
          <h1>Discover All My Typebeats Here!</h1>
          <p>
            Here are all the collection of my Typebeats. <br />
            Discover by genre, tags, name, etc.
          </p>
        </div>
        <div className="hero-search">
          <input
            type="text"
            placeholder="What type of track are you looking for?"
          />
          <div className="search-btn">Search</div>
        </div>
      </div>

      <div className="hero-image">
        {/* <img src={nature} alt="nature" /> */}
      </div>
    </div>
  );
}
