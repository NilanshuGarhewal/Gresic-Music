// import TrackCard from "./TrackCard";

// import { ArrowLeftIcon } from "@phosphor-icons/react";

// import img from "../../../assets/images/example.jpg";
import TrackNew from "./TrackNew";
import TrackLatest from "./TrackLatest";
import TrackGenre from "./TrackGenre";

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

const TrackContainer = ({ allBeats }: BeatProps) => {
  return (
    <div className="track-container">
      <span className="tc-heading bg-blur">
        <div className="tc-head">
          <p>Browse</p>
        </div>

        <div className="tc-divider"></div>
      </span>

      <TrackNew allBeats={allBeats} />

      <TrackLatest allBeats={allBeats} />

      <TrackGenre allBeats={allBeats} />
    </div>
  );
};

export default TrackContainer;
