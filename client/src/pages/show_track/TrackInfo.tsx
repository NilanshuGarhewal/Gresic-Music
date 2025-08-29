import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  playTrack,
  pauseTrack,
  resumeTrack,
  setSeek,
} from "../../store/playerSlice";
import { RootState } from "../../store";
import ColorThief from "color-thief-browser";

type Beat = {
  _id: string;
  title?: string;
  bpm?: number;
  audioUrl: string;
  genre?: string[];
  mood?: string[];
  scale?: string;
  duration?: string;
  price?: string;
  description?: string;
  coverImage?: string;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// utility: darken an RGB color
const darkenColor = ([r, g, b]: number[], factor = 0.7): string => {
  return `rgb(${Math.floor(r * factor)}, ${Math.floor(
    g * factor
  )}, ${Math.floor(b * factor)})`;
};

const TrackInfo = () => {
  const { id } = useParams();
  const [singleBeat, setSingleBeat] = useState<Beat>();
  const [loading, setLoading] = useState(true);
  const [bgGradient, setBgGradient] = useState("black");
  const [barColor, setBarColor] = useState("gray");

  const dispatch = useDispatch();
  const { currentTrack, isPlaying, progress, durationSec, currentTimeSec } =
    useSelector((state: RootState) => state.player);

  const barRef = useRef<HTMLDivElement | null>(null);

  const handlePlay = () => {
    if (!singleBeat) return;

    if (currentTrack?._id === singleBeat._id) {
      if (isPlaying) dispatch(pauseTrack());
      else dispatch(resumeTrack());
    } else {
      dispatch(playTrack(singleBeat));
    }
  };

  const apiLink = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!id) return;
    if (!apiLink) {
      console.error("API URL is not defined!");
      return;
    }

    fetch(`${apiLink}track/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleBeat(data);
        setLoading(false);

        if (data.coverImage) {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = data.coverImage;

          img.onload = () => {
            const colorThief = new ColorThief();
            try {
              const dominant = colorThief.getColor(img); // [r,g,b]
              const dark = darkenColor(dominant, 0.7);
              const darker = darkenColor(dominant, 0.4);

              // background gradient
              setBgGradient(`linear-gradient(160deg, ${dark}, ${darker})`);

              // bar color
              setBarColor(darker);
            } catch (error) {
              console.warn("ColorThief failed:", error);
            }
          };
        }
      })
      .catch((err) => console.log(err));
  }, [id, apiLink]);

  if (loading || !singleBeat) return <div>Loading...</div>;

  const isThisTrackPlaying = currentTrack?._id === singleBeat._id && isPlaying;

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current || !durationSec) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const newTime = percent * durationSec;
    dispatch(setSeek(newTime));
  };

  return (
    <div
      className="track-info"
      style={{
        background: bgGradient,
      }}
    >
      <Link to={"/tracks"} className="back-icon uni-link">
        <span className="material-icons-round">keyboard_arrow_down</span>
      </Link>

      <div className="track-info-wrapper">
        <div className="show-track-wrapper">
          <div className="st-box1">
            <div className="st-box-image-wrapper">
              <img src={singleBeat.coverImage} alt="album cover" />
            </div>

            <div className="st-box-player-wrapper">
              {/* Progress bar */}
              <span className="st-box-player-wrapper-box">
                <p className=" player-bar-song-name">{singleBeat.title}</p>
                <div
                  className="player-bar"
                  ref={barRef}
                  onClick={handleSeekClick}
                >
                  <div
                    className="player-progress"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="player-song-duration">
                  <span>{formatTime(currentTimeSec)}</span>
                  <span>{formatTime(durationSec)}</span>
                </div>
              </span>

              {/* Controls */}
              <div className="player-controls">
                <span className="material-icons-round pc-skip pc-icon">
                  skip_previous
                </span>

                <span
                  className="material-icons-round pc-play pc-icon"
                  onClick={handlePlay}
                >
                  {isThisTrackPlaying ? "pause" : "play_arrow"}
                </span>

                <span className="material-icons-round pc-skip pc-icon">
                  skip_next
                </span>
              </div>
            </div>
          </div>

          <div className="st-box2">
            <div className="st-info1">
              <div className="st-name">
                <p>{singleBeat.title}</p>
              </div>
              <div className="st-info-act">DETAILS</div>
            </div>

            <div className="st-info2">
              <p className="st-info2-p">{singleBeat.bpm} BPM</p>
              <p className="st-info2-p">{singleBeat.scale}</p>

              <div className="st-arr-wrapper">
                <p className="st-arr-wrapper-heading">Genre</p>
                <div className="st-arr-wrapper-box">
                  {singleBeat.genre?.map((element, index) => (
                    <p className="st-arr-wrapper-element" key={index}>
                      {element}
                    </p>
                  ))}
                </div>
              </div>

              <div className="st-arr-wrapper">
                <p className="st-arr-wrapper-heading">Mood</p>
                <div className="st-arr-wrapper-box">
                  {singleBeat.mood?.map((element, index) => (
                    <p className="st-arr-wrapper-element" key={index}>
                      {element}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;
