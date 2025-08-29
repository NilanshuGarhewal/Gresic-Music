import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { playTrack } from "../../../store/playerSlice";

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

type BeatCardProps = {
  beat: Beat;
  index: number;
};

const BeatCard = ({ beat, index }: BeatCardProps) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(playTrack(beat));
  };

  return (
    <Link to={`/track/${beat?._id}`} key={index} className="">
      <div className="beat-container" onClick={handlePlay}>
        <div className="beat-box-1">
          <img src={beat.coverImage} alt="" />
        </div>
      </div>
    </Link>
  );
};

export default BeatCard;
