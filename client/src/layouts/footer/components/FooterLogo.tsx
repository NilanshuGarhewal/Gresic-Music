import {
  InstagramLogoIcon,
  YoutubeLogoIcon,
  SoundcloudLogoIcon,
} from "@phosphor-icons/react";

const FooterLogo = () => {
  return (
    <div className="footer-box-1">
      <div className="f-logo">
        <p className="logo">gresic</p>
        <p className="f-logo-text">music</p>
      </div>

      <div className="social-links">
        <a href="https://www.youtube.com/@gresicmusic">
          <YoutubeLogoIcon weight="fill" size={22} />
        </a>
        <a href="https://www.instagram.com/gresicmusic">
          <InstagramLogoIcon weight="fill" size={22} />
        </a>
        <a href="https://soundcloud.com/gresicmusic">
          <SoundcloudLogoIcon weight="fill" size={22} />
        </a>
      </div>
    </div>
  );
};

export default FooterLogo;
