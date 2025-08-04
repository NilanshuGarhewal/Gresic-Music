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
        <div className="f-box-header">PAGES</div>
        <div className="f-box-data">
          <Link to={"/"} className="f-data-text real-link">
            Home
          </Link>
          <a
            href="https://www.youtube.com/@gresic1"
            className="f-data-text real-link"
          >
            Search
          </a>
          <Link to={"/about"} className="f-data-text real-link">
            About
          </Link>
          <Link to={"/tracks"} className="f-data-text real-link">
            Browse
          </Link>
          <Link to={"/log"} className="f-data-text real-link">
            Release Notes
          </Link>
        </div>
      </div>

      <div className="f-box-1 none">
        <div className="f-box-header">RESOURCES</div>
        <div className="f-box-data">
          <a
            href={links.nilanshuSocial.portfolio}
            className="f-data-text real-link"
          >
            illpeoplemusic
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
          <a
            href={links.nilanshuSocial.github}
            className="f-data-text real-link"
          >
            BandLab Distrubution
          </a>
          <a
            href={links.nilanshuSocial.github}
            className="f-data-text real-link"
          >
            SoundCloud Distribution
          </a>
        </div>
      </div>

      <div className="f-box-1">
        <div className="f-box-header">NILANSHU'S SOCIAL</div>
        <div className="f-box-data">
          <Link to={"/"} className="f-data-text real-link">
            LinkedIn
          </Link>
          <a
            href="https://www.youtube.com/@gresic1"
            className="f-data-text real-link"
          >
            GitHub
          </a>
          <Link to={"/about"} className="f-data-text real-link">
            Internshala
          </Link>
          <Link to={"/tracks"} className="f-data-text real-link">
            Instagram
          </Link>
          <Link to={"/log"} className="f-data-text real-link">
            Figma
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
