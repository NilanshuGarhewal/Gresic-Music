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

const TrackLatest = ({ allBeats }: BeatProps) => {
  const dispatch = useDispatch();

  const handlePlay = (beat: Beat) => {
    dispatch(playTrack(beat));
  };

  return (
    <span className="tc-latest">
      <div className="tc-latest-heading">Latest Typebeats</div>

      <div className="tc-latest-container">
        <div className="tc-latest-wrapper">
          {allBeats.slice(0, 4).map((beat, index) => (
            <div
              className="tc-latest-beat"
              onClick={() => {
                handlePlay(beat);
              }}
            >
              <div className="tc-latest-beat-image">
                <img src={beat.coverImage} alt="cover" />
              </div>

              <div className="tc-latest-beat-info">
                <p className="tc-latest-beat-info-name">{beat.title}</p>
                <p className="tc-latest-beat-info-genre">{beat.genre?.[0]}</p>
                <div className="tc-latest-wrapper-beat-divider"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="tc-latest-wrapper">
          {allBeats.slice(4, 8).map((beat, index) => (
            <div
              className="tc-latest-beat"
              onClick={() => {
                handlePlay(beat);
              }}
            >
              <div className="tc-latest-beat-image">
                <img src={beat.coverImage} alt="cover" />
              </div>

              <div className="tc-latest-beat-info">
                <p className="tc-latest-beat-info-name">{beat.title}</p>
                <p className="tc-latest-beat-info-genre">{beat.genre?.[0]}</p>
                <div className="tc-latest-wrapper-beat-divider"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="tc-latest-wrapper">
          {allBeats
            .slice(8, 12)

            .map((beat) => (
              <div
                className="tc-latest-beat"
                onClick={() => {
                  handlePlay(beat);
                }}
              >
                <div className="tc-latest-beat-image">
                  <img src={beat.coverImage} alt="cover" />
                </div>

                <div className="tc-latest-beat-info">
                  <p className="tc-latest-beat-info-name">{beat.title}</p>
                  <p className="tc-latest-beat-info-genre">{beat.genre?.[0]}</p>
                  <div className="tc-latest-wrapper-beat-divider"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </span>
  );
};

export default TrackLatest;
