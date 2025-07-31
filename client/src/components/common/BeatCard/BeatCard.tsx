import { Link } from "react-router-dom";

import img from "../../../assets/images/test.jpg";

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

type BeatCardProps = {
  beat: Beat;
  index: number;
};

const BeatCard = ({ beat, index }: BeatCardProps) => {
  return (
    <Link to={`/track/${beat?._id}`} key={index} className="beat uni-link">
      <div className="beat-container">
        <div className="beat-box-1">
          <img src={img} alt="" />
        </div>

        <div className="beat-box-2">
          <div className="beat-info-1">
            <p className="beat-title">{beat?.title}</p>

            <div className="beat-bpm">{beat?.bpm} BPM</div>
          </div>

          <div className="beat-info-2">
            <div className="genre-wrapper">
              {(beat.genre?.slice(0, 2) || []).map((g, i, arr) => (
                <span className="genre-box" key={i}>
                  {g}
                </span>
              ))}
            </div>

            <div className="card-play button-sm">Play</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BeatCard;
