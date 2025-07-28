import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-box-1">
        <span className="my-logo">
          <i>gresic</i>
        </span>
      </div>

      <div className="nav-box-2">
        <div className="nav-search">
          <div className="search">
            <input
              className="search-input"
              type="text"
              placeholder="Search here..."
            />
          </div>
        </div>

        <div className="nav-tools">
          <div className="nav-tool">
            <Link to={"/"} className="uni-link">
              Home
            </Link>
          </div>
          <div className="nav-tool">
            <Link to={"/about"} className="uni-link">
              About
            </Link>
          </div>
          <div className="nav-tool">
            <Link to={"/tracks"} className="uni-link">
              Tracks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
