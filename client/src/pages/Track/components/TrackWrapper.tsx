import img from "../../../assets/images/test.jpg";

import { PlayIcon } from "@phosphor-icons/react";

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

type TrackWrapperProps = {
  beat: Beat;
};

const TrackWrapper = ({ beat }: TrackWrapperProps) => {
  return (
    <div className="track-wrapper">
      <div className="track-img">
        <img src={img} alt="" />
      </div>

      <div className="track-player">
        <div className="play-pause">
          <PlayIcon weight="fill" size={16} />
        </div>

        <div className="track-visualizer">
          <div className="beep track-music-visualizer"></div>
          <div className="track-duration-box">{beat.duration}</div>
        </div>
      </div>

      <div className="track-title">{beat.title}</div>
    </div>
  );
};

export default TrackWrapper;
