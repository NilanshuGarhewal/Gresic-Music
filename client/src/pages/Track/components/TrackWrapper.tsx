import img from "../../../assets/images/test.jpg";

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

type TrackWrapperProps = {
  beat: Beat;
};

const TrackWrapper = ({ beat }: TrackWrapperProps) => {
  return (
    <div className="track-wrapper">
      <div className="track-img">
        <img src={img} alt="" />
      </div>

      {/* <div className="track-visualizer">
        <WaveformPlayer audioUrl={beat.audioUrl} />
      </div> */}

      <div className="track-title">{beat.title}</div>
    </div>
  );
};

export default TrackWrapper;
