import { Link } from "react-router-dom";
import "./BeatCard.css";

import img from "../../../assets/images/example.jpg";

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
    <Link to={`/track/${beat?._id}`} key={index} className="beat">
      <div className="beat-box-1">
        <img src={img} alt="" />
      </div>
      <div className="beat-box-2">
        <p className="beat-title">{beat?.title}</p>

        <div className="beat-tools">
          <div className="beat-bpm">{beat?.bpm} BPM</div>
          &middot;
          <div className="genre-wrapper">
            {(beat.genre?.slice(0, 3) || []).map((g, i, arr) => (
              <span className="genre-box" key={i}>
                {g}
              </span>
            ))}
          </div>
          &middot;
          <div>{beat?.duration}</div>
        </div>
        <div className="beat-play-tools">
          <div className="beat-control">play</div>

          <div className="beat-control">share</div>
        </div>
      </div>
      <div className="beat-box-3">
        <div className="beat-purchase">purchase</div>
      </div>
    </Link>
  );
};

export default BeatCard;
