import TrackWrapper from "./TrackWrapper";
import TrackTools from "./TrackTools";
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

type TrackCardProps = {
  beat: Beat;
};

const TrackCard = ({ beat }: TrackCardProps) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(playTrack(beat));
  };

  return (
    <div className="track-card uni-link" onClick={handlePlay}>
      <TrackWrapper beat={beat} />

      <TrackTools beat={beat} />
    </div>
  );
};

export default TrackCard;
