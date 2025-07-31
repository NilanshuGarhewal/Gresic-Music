import TrackCard from "./TrackCard";

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

// props type
type TrackContainerProps = {
  allBeats: Beat[];
};

const TrackContainer = ({ allBeats }: TrackContainerProps) => {
  return (
    <div className="track-container">
      {allBeats.map((beat, index) => (
        <TrackCard key={index + 1} beat={beat} />
      ))}
    </div>
  );
};

export default TrackContainer;
