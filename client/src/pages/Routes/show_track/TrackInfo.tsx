import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  playTrack,
  pauseTrack,
  resumeTrack,
  setSeek,
} from "../../../store/playerSlice";
import { RootState } from "../../../store";
import ColorThief from "color-thief-browser";
import Loading from "../../../components/Loading/Loading";
import {
  HeartIcon,
  DotsThreeOutlineVerticalIcon,
  StarIcon,
} from "@phosphor-icons/react";

// ---------- Types ----------
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

// ---------- Helpers ----------
const formatTime = (sec: number) =>
  `${Math.floor(sec / 60)}:${Math.floor(sec % 60)
    .toString()
    .padStart(2, "0")}`;

const darken = ([r, g, b]: number[], f = 0.7) =>
  `rgb(${(r * f) | 0}, ${(g * f) | 0}, ${(b * f) | 0})`;

// ---------- Component ----------
const TrackInfo = () => {
  const { id } = useParams();
  const [beat, setBeat] = useState<Beat>();
  const [loading, setLoading] = useState(true);
  const [bg, setBg] = useState("black");

  const dispatch = useDispatch();
  const { currentTrack, isPlaying, progress, durationSec, currentTimeSec } =
    useSelector((s: RootState) => s.player);

  const barRef = useRef<HTMLDivElement>(null);
  const apiLink = process.env.REACT_APP_API_URL;

  const isCurrent = currentTrack?._id === beat?._id;
  const playing = isCurrent && isPlaying;

  // ---------- Actions ----------
  const handlePlay = () =>
    beat &&
    dispatch(
      isCurrent ? (playing ? pauseTrack() : resumeTrack()) : playTrack(beat)
    );

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current || !durationSec) return;
    const { left, width } = barRef.current.getBoundingClientRect();
    dispatch(setSeek(((e.clientX - left) / width) * durationSec));
  };

  // ---------- Fetch Beat ----------
  useEffect(() => {
    if (!id || !apiLink) return;

    fetch(`${apiLink}track/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBeat(data);
        setLoading(false);

        if (!data.coverImage) return;
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = data.coverImage;
        img.onload = () => {
          try {
            const thief = new ColorThief();
            const col = thief.getColor(img);
            setBg(
              `linear-gradient(160deg, ${darken(col, 0.8)}, ${darken(
                col,
                0.5
              )})`
            );
          } catch (err) {
            console.warn("ColorThief failed:", err);
          }
        };
      })
      .catch(console.error);
  }, [id, apiLink]);

  // ---------- Render ----------
  if (loading || !beat) return <Loading />;

  return (
    <div className="track-info" style={{ background: bg }}>
      <Link to={"/tracks"} className="go-back uni-link">
        <span className="material-icons-round go-back-icon">
          arrow_back_ios_new
        </span>
      </Link>

      <div className="track-info-wrapper">
        {/* Info Section */}
        <div className="st-box2">
          <div className="st-info1">
            <span className="st-info-section">
              <p className="st-info-song-name">{beat.title}</p>
              <p className="st-info-artist-name">Gresic</p>
            </span>

            <span className="st-interaction-section">
              <HeartIcon weight="fill" size={24} />
              <StarIcon weight="fill" size={24} />
              <DotsThreeOutlineVerticalIcon weight="fill" size={24} />
            </span>
          </div>

          <div className="st-info2">
            {beat.description && (
              <div className="st-info2-des">{beat.description}</div>
            )}

            <div className="st-info2-wrapper">
              {beat.bpm && <p>{beat.bpm} BPM</p>}
              {beat.scale && <p>&middot; {beat.scale}</p>}
              {durationSec > 0 && <p>&middot; {formatTime(durationSec)}</p>}
            </div>

            {beat.genre?.length ? (
              <div className="st-arr-wrapper">
                <div className="st-arr-wrapper-box">
                  {beat.genre.map((el, i) => (
                    <p className="st-arr-wrapper-element" key={i}>
                      {el}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Player Section */}
          <div className="st-box-player-wrapper">
            <span className="beat-purchase-options">
              <div className="beat-add-cart">
                <span>Add to cart</span>
              </div>

              <div className="beat-like">
                <HeartIcon weight="fill" size={20} />
                <StarIcon weight="fill" size={20} />
                <DotsThreeOutlineVerticalIcon weight="fill" size={20} />
              </div>
            </span>

            <span className="st-box-player-wrapper-box">
              <p className="player-bar-song-name">{beat.title}</p>
              <div className="player-bar" ref={barRef} onClick={handleSeek}>
                <div
                  className="player-progress"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="player-song-duration">
                <span>{formatTime(currentTimeSec)}</span>
                <span>-{formatTime(durationSec - currentTimeSec)}</span>
              </div>
            </span>

            <div className="player-controls">
              <span className="material-icons-round pc-skip pc-icon">
                skip_previous
              </span>
              <span
                className="material-icons-round pc-play pc-icon"
                onClick={handlePlay}
              >
                {playing ? "pause" : "play_arrow"}
              </span>
              <span className="material-icons-round pc-skip pc-icon">
                skip_next
              </span>
            </div>
          </div>
        </div>

        {/* Cover Section */}
        <div className="st-box1">
          <div
            className={`st-box-image-wrapper ${playing ? "" : "scale-less"}`}
          >
            <img src={beat.coverImage} alt="album cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;
