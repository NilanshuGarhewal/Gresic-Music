

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
      
    </div>
  );
};

export default TrackContainer;
