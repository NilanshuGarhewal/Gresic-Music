import "./Tracks.css";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import BeatCard from "../../components/beat_card/BeatCard";

const Tracks = () => {
  type Beat = {
    _id: string;
    title?: string;
    bpm?: number;
    audioUrl?: string;
    genre?: string[];
    mood?: string[];
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
      <h1>All Tracks</h1>

      <div className="track-wrapper">
        {allBeats.map((beat, index) => (
          <BeatCard key={beat._id ?? index} beat={beat} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Tracks;
