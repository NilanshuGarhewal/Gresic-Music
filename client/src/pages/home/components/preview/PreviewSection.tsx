// import "./PreviewSection.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BeatCard from "../../../../components/common/beat_card/BeatCard";

const PreviewSection = () => {
  const apiLink = process.env.REACT_APP_API_URL;

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
    <div className="preview-section">
      <div className="preview-heading">
        <p>Newly Released</p>
        <Link to={"/tracks"} className="border-btn uni-link">
          View All
        </Link>
      </div>

      <div className="preview-wrapper">
        {allBeats.slice(0, 8).map((beat, index) => (
          <BeatCard key={beat._id} beat={beat} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PreviewSection;
