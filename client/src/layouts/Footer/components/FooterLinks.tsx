import { Link } from "react-router-dom";

const FooterLinks = () => {
  const links = {
    social: {
      youtube: "https://www.youtube.com/@gresic1",
      instagram: "",
      soundcloud: "",
    },

    nilanshuSocial: {
      linkedin: "",
      github: "",
      portfolio: "",
    },
  };

  return (
    <div className="footer-box-2">
      <div className="f-box-1">
        <div className="f-box-header">Routes</div>
        <div className="f-box-data">
          <Link to={"/"} className="f-data-text real-link">
            Home
          </Link>
          <a href="#search" className="f-data-text real-link">
            Search
          </a>
          <Link to={"/about"} className="f-data-text real-link">
            About
          </Link>
          <Link to={"/tracks"} className="f-data-text real-link">
            Browse
          </Link>
        </div>
      </div>

      <div className="f-box-1">
        <div className="f-box-header">Social</div>
        <div className="f-box-data">
          <a href={links.social.youtube} className="f-data-text real-link">
            YouTube
          </a>
          <a href={links.social.instagram} className="f-data-text real-link">
            Instagram
          </a>
          <a href={links.social.soundcloud} className="f-data-text real-link">
            SoundCloud
          </a>
        </div>
      </div>

      <div className="f-box-1">
        <div className="f-box-header">Nilanshu's Social</div>
        <div className="f-box-data">
          <a
            href={links.nilanshuSocial.portfolio}
            className="f-data-text real-link"
          >
            Portfolio
          </a>
          <a
            href={links.nilanshuSocial.linkedin}
            className="f-data-text real-link"
          >
            LinkedIn
          </a>
          <a
            href={links.nilanshuSocial.github}
            className="f-data-text real-link"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
