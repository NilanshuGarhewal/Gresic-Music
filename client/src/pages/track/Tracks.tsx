import { useEffect, useState } from "react";

import TrackNew from "../../components/TrackWrapper/TrackNew";
import TrackLatest from "../../components/TrackWrapper/TrackLatest";
import TrackGenre from "../../components/TrackWrapper/TrackGenre";

import Loading from "../../components/Loading/Loading";

const Tracks = () => {
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

  return (
    <div className="tracks">
      <div className="track-heading bg-blur">
        <p>Browse</p>
        <div></div>
      </div>

      {allBeats.length > 0 ? (
        <div className="browse-content-container">
          <TrackNew allBeats={allBeats} till={3} />

          <TrackLatest allBeats={allBeats} />

          <TrackGenre allBeats={allBeats} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Tracks;
