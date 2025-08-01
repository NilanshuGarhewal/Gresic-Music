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

      <div className="track-det">
        <div className="track-title">
          <p>{beat.title}</p>
          <p className="track-duration">Gresic</p>
        </div>
        <div className="track-duration">{beat.duration}</div>
      </div>
    </div>
  );
};

export default TrackWrapper;
