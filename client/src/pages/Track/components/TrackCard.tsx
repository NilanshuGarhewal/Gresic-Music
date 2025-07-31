import { Link } from "react-router-dom";
import TrackWrapper from "./TrackWrapper";
import TrackTools from "./TrackTools";

type Beat = {
  _id: string;
  title?: string;
  bpm?: number;
  audioUrl?: string;
  genre?: string[];
  mood?: string[];
  scale: string;
  duration?: string;
  price?: string;
  description?: string;
  coverImage?: string;
};

type TrackCardProps = {
  beat: Beat;
};

const TrackCard = ({ beat }: TrackCardProps) => {
  return (
    <Link to={`/track/${beat._id}`} className="track-card uni-link">
      <TrackWrapper beat={beat} />

      <TrackTools beat={beat} />
    </Link>
  );
};

export default TrackCard;
