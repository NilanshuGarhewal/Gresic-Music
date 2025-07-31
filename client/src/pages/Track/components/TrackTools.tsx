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

type TrackToolsProps = {
  beat: Beat;
};

const shortenScale = (scale: string) => {
  return scale
    .replace(/minor/i, "m")
    .replace(/major/i, "M")
    .replace(/\s+/g, ""); // remove spaces like between "C# Minor"
};

const TrackTools = ({ beat }: TrackToolsProps) => {
  return (
    <div className="track-tools">
      <div className="genre-wrapper">
        {(beat.genre?.slice(0, 2) || []).map((g, i, arr) => (
          <span className="genre-box border-btn" key={i}>
            {g}
          </span>
        ))}
      </div>

      <p>{shortenScale(beat.scale)}</p>

      <div className="purchase-wrapper">
        <p>{beat.bpm} BPM</p>
        <div className="button-sm">Buy</div>
      </div>
    </div>
  );
};

export default TrackTools;
