import "./PreviewSection.css";

import { useEffect, useState } from "react";
import BeatCard from "../beat_card/BeatCard";

const PreviewSection = () => {
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
    <div className="preview-section">
      <h1>Newly Released</h1>

      <div className="preview-wrapper">
        {allBeats.slice(0, 5).map((beat, index) => (
          <BeatCard key={beat._id} beat={beat} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PreviewSection;
