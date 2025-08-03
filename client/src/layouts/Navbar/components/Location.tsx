import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import usePreviousRoute from "../../../components/common/prev_route/PreviousRoute";

interface LocationProps {
  songTitleForLocation: string;
  setSongTitleForLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Location = ({
  songTitleForLocation,
  setSongTitleForLocation,
}: LocationProps) => {
  const [path, setPath] = useState("");
  const { pathname } = useLocation();

  const prevPath = usePreviousRoute();

  useEffect(() => {
    if (pathname === "/") {
      setPath("Home");
      setSongTitleForLocation("");
    } else if (pathname === "/about") {
      setPath("About");
      setSongTitleForLocation("");
    } else if (pathname === "/tracks") {
      setPath("Tracks");
      setSongTitleForLocation("");
    } else if (pathname.startsWith("/track")) {
      setPath("Tracks");
    } else {
      setPath("Unknown");
    }
  }, [pathname, setSongTitleForLocation]);

  return (
    <div className="location">
      <Link to={prevPath || "none"} className="take-me-there">
        {path}
      </Link>
      {songTitleForLocation && <p>{">"}</p>}
      {songTitleForLocation && <p>{songTitleForLocation}</p>}
    </div>
  );
};

export default Location;
