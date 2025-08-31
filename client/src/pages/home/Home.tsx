import { useEffect, useState } from "react";

import TrackLatest from "../../components/TrackWrapper/TrackLatest";
import TrackGenre from "../../components/TrackWrapper/TrackGenre";
import TrackNew from "../../components/TrackWrapper/TrackNew";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const apiLink = process.env.REACT_APP_API_URL;

  type Beat = {
    _id: string;
    title?: string;
    bpm?: number;
    audioUrl: string;
    genre?: string[];
    mood?: string[];
    scale: string;
    duration?: string;
    price?: string;
    description?: string;
    coverImage?: string;
  };

  const [allBeats, setAllBeats] = useState<Beat[]>([]);

  useEffect(() => {
    if (!apiLink) {
      console.error("API URL is not defined!");
      return;
    }

    fetch(apiLink)
      .then((res) => res.json())
      .then((data) => {
        setAllBeats(data);
      })
      .catch((err) => console.log(err));
  }, [apiLink]);

  // const [navActive, setNavActive] = useState("typebeat");

  // const handleHomeNavActive = (str: string) => {
  //   if (str === "remix") {
  //     setNavActive("remix");
  //   } else if (str === "typebeat") {
  //     setNavActive("typebeat");
  //   } else {
  //     return;
  //   }
  // };

  return (
    <div className="home">
      <div className="home-heading bg-blur">
        <p>Home</p>
        <div></div>
      </div>

      {/* <div className="home-navbar">
        <span className="home-navbar-wrapper">
          <div
            className={`home-nav ${
              navActive === "typebeat" ? "home-nav-active" : ""
            }`}
            onClick={() => {
              handleHomeNavActive("typebeat");
            }}
          >
            Typebeats
          </div>
          <div
            className={`home-nav ${
              navActive === "remix" ? "home-nav-active" : ""
            }`}
            onClick={() => {
              handleHomeNavActive("remix");
            }}
          >
            Remixes
          </div>
        </span>
      </div> */}

      {allBeats.length > 0 ? (
        <div className="home-content-container">
          <span className="hcc-heading">
            <p className="hcc-top">Top Picks For You</p>
            <p className="hcc-bottom">New Today</p>
          </span>

          <TrackNew allBeats={allBeats} till={4} />
          <TrackLatest allBeats={allBeats} />
          <TrackGenre allBeats={allBeats} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
