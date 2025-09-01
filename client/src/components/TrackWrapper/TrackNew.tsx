import React from "react";
import { useDispatch } from "react-redux";
import { playTrack } from "../../store/playerSlice";

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

type BeatProps = {
  allBeats: Beat[];
  till: number;
};

const TrackNew = ({ allBeats, till }: BeatProps) => {
  const dispatch = useDispatch();
  const handlePlay = (beat: Beat) => dispatch(playTrack(beat));

  return (
    <section className="tc-new">
      {allBeats.slice(0, till).map((beat) => (
        <div
          key={beat._id}
          className="tc-card"
          onClick={() => handlePlay(beat)}
        >
          <div className="tc-card-info">
            <span className="tc-card-new">NEW TYPEBEAT</span>
            <span className="tc-card-genre">{beat.title}</span>
            <span className="tc-card-song-name">Gresic</span>
          </div>
          <div className="tc-card-image">
            <img src={beat.coverImage} alt={beat.title || "cover"} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default TrackNew;
