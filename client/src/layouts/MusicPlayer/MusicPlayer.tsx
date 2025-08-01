import tempImg from "../../assets/images/test.jpg";
import { PlayIcon, PauseIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { pauseTrack, resumeTrack } from "../../store/playerSlice";
import { Link } from "react-router-dom";

const MusicPlayer = () => {
  const dispatch = useDispatch();

  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);

  const { currentTrack, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Toggle play and pause
  const togglePlay = () => {
    if (!currentTrack) return;
    isPlaying ? dispatch(pauseTrack()) : dispatch(resumeTrack());
  };

  // Set up audio element and events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => {
      dispatch(pauseTrack());
      audio.currentTime = 0;
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [dispatch, currentTrack]);

  // Control audio play/pause from Redux
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      const tryPlay = () => {
        audio.play().catch((err) => {
          // silently catch error if browser blocks autoplay
          console.warn("Autoplay error:", err);
        });
      };

      if (audio.readyState >= 2) {
        tryPlay();
      } else {
        audio.addEventListener("loadeddata", tryPlay, { once: true });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Seek on click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !barRef.current || duration === 0) return;

    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const seekTime = percent * duration;

    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="music-player">
      <audio ref={audioRef} src={currentTrack.audioUrl} preload="metadata" />

      <div
        className="music-player-bar"
        ref={barRef}
        onClick={handleSeek}
        onMouseMove={(e) => {
          if (!barRef.current || duration === 0) return;
          const rect = barRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const percent = x / rect.width;
          const time = percent * duration;
          setHoverX(x);
          setHoverTime(time);
        }}
        onMouseLeave={() => setHoverTime(null)}
      >
        <div className="mp-line">
          {hoverTime !== null && (
            <div
              className="mp-tooltip"
              style={{
                left: hoverX,
              }}
            >
              {formatTime(hoverTime)}
            </div>
          )}

          <div
            className="mp-progress"
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          />
          <div
            className="mp-dot"
            style={{
              left: `${(currentTime / duration) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="music-player-more">
        <div className="music-player-detail">
          <div className="mp-img">
            <img src={tempImg} alt={currentTrack.title} />
          </div>
          <div className="mp-text">
            <p className="mp-title">{currentTrack.title}</p>
            <p className="mp-artist">Gresic</p>
          </div>
        </div>

        <div className="music-player-controls">
          <div className="mp-play-pause" onClick={togglePlay}>
            {isPlaying ? (
              <PauseIcon weight="fill" size={16} />
            ) : (
              <PlayIcon weight="fill" size={16} />
            )}
          </div>

          <div className="mp-duration">
            <p>
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
        </div>

        <div className="music-player-tools">
          <Link
            to={`/track/${currentTrack._id}`}
            className="button-sm uni-link"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
