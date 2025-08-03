// import "./PreviewSection.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BeatCard from "../../../components/common/beat_card/BeatCard";

const PreviewSection = () => {
  type Beat = {
    _id: string;
    title?: string;
    bpm?: number;
    audioUrl: string;
    genre?: string[];
    mood?: string[];
    duration?: string;
    price?: string;
    description?: string;
    coverImage?: string;
  };

  const [allBeats, setAllBeats] = useState<Beat[]>([]);

  useEffect(() => {
    fetch("https://gresic-server.onrender.com/")
      .then((res) => res.json())
      .then((data) => {
        setAllBeats(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="related-tracks">
      <div className="rt-heading">
        <p>Related Tracks</p>
        <Link to={"/tracks"} className="border-btn uni-link none">
          View All
        </Link>
      </div>

      <div className="rt-wrapper">
        {allBeats.slice(0, 8).map((beat, index) => (
          <BeatCard key={beat._id} beat={beat} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PreviewSection;
