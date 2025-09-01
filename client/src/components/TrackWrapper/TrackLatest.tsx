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
  headingName: string;
};

const TrackLatest = ({ allBeats, headingName }: BeatProps) => {
  const dispatch = useDispatch();
  const handlePlay = (beat: Beat) => dispatch(playTrack(beat));

  // helper to chunk beats into groups of 4
  const chunkArray = (arr: Beat[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  // reusable card
  const BeatCard = ({ beat }: { beat: Beat }) => (
    <div className="tc-latest-beat" onClick={() => handlePlay(beat)}>
      <div className="tc-latest-beat-image">
        <img src={beat.coverImage} alt={beat.title || "cover"} />
      </div>
      <div className="tc-latest-beat-info">
        <p className="tc-latest-beat-info-name">{beat.title}</p>
        <p className="tc-latest-beat-info-genre">
          {beat.genre?.[0]} &middot; {beat.bpm} BPM
        </p>
        <div className="tc-latest-wrapper-beat-divider"></div>
      </div>
    </div>
  );

  return (
    <section className="tc-latest">
      <div className="tc-latest-heading">{headingName}</div>

      <div className="tc-latest-container">
        {chunkArray(allBeats.slice(0, 12), 4).map((group, idx) => (
          <div className="tc-latest-wrapper" key={idx}>
            {group.map((beat) => (
              <BeatCard key={beat._id} beat={beat} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrackLatest;
