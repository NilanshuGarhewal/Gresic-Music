// import "./Footer.css";

import FooterDetails from "./components/FooterDetails";
import FooterLinks from "./components/FooterLinks";
import FooterLogo from "./components/FooterLogo";
// import FooterCard from "../../components/footer_card/FooterCard";

export default function Footer() {
  return (
    <div className="footer">
      {/* <FooterCard /> */}

      <div className="footer-links-wrapper">
        <FooterLogo />

        <FooterLinks />
      </div>

      <FooterDetails />
    </div>
  );
}
