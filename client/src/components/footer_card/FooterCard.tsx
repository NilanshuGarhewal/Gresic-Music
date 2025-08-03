import { Link } from "react-router-dom";

const FooterCard = () => {
  return (
    <div className="footer-card">
      <div className="f-card-container">
        <div className="f-card-text">Level up your songs with us</div>
        <Link to={"/tracks"} className="button uni-link">
          <div className="f-btn-wrapper">Browse Tracks</div>
        </Link>
      </div>
    </div>
  );
};

export default FooterCard;
