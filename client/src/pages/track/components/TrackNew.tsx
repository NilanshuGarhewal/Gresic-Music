import React from "react";

// STORE
import { useDispatch } from "react-redux";
import { playTrack } from "../../../store/playerSlice";

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
};

const TrackNew = ({ allBeats }: BeatProps) => {
  const dispatch = useDispatch();

  const handlePlay = (beat: Beat) => {
    dispatch(playTrack(beat));
  };

  return (
    <span className="tc-new">
      {allBeats.slice(0, 3).map((beat, index) => (
        <div
          className="tc-card"
          onClick={() => {
            handlePlay(beat);
          }}
        >
          <div className="tc-card-info">
            <div className="tc-card-new">NEW TYPEBEAT</div>
            <div className="tc-card-genre">{beat.title}</div>
            <div className="tc-card-song-name">Gresic</div>
          </div>
          <div className="tc-card-image">
            <img src={beat.coverImage} alt="cover" />
          </div>
        </div>
      ))}
    </span>
  );
};

export default TrackNew;
