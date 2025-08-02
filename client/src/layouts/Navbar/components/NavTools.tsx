import { Link } from "react-router-dom";

const NavTools = () => {
  return (
    <div className="nav-tools">
      <div className="nav-tool">
        <Link to={"/"} className="nav-link uni-link">
          Home
        </Link>
      </div>
      <div className="nav-tool">
        <Link to={"/about"} className="nav-link uni-link none">
          About
        </Link>
      </div>
      <div className="nav-tool">
        <Link to={"/tracks"} className="nav-link uni-link">
          Browse
        </Link>
      </div>
    </div>
  );
};

export default NavTools;
