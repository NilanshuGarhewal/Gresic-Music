import { useEffect, useState } from "react";
// import Filters from "./components/FIlters";
import TrackContainer from "./components/TrackContainer";

const Tracks = () => {
  type Beat = {
    _id: string;
    title?: string;
    bpm?: number;
    audioUrl: string;
    genre?: string[];
    mood?: string[];
    scale: string,
    duration?: string;
    price?: string;
    description?: string;
    coverImage?: string;
  };

  const [allBeats, setAllBeats] = useState<Beat[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => {
        setAllBeats(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="tracks">
      {/* <Filters /> */}

      <TrackContainer allBeats={allBeats}/>
    </div>
  );
};

export default Tracks;


