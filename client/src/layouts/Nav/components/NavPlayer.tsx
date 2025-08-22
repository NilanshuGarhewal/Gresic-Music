import React, { useEffect, useRef, useState } from "react";
import img from "../../../assets/images/slide.png"; // fallback if no coverImage
import { PlayIcon, PauseIcon } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { pauseTrack, resumeTrack } from "../../../store/playerSlice";
import { Link } from "react-router-dom";

type NavPlayerProps = {
  handleIsOn: () => void;
};

const NavPlayer = ({ handleIsOn }: NavPlayerProps) => {
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

  // Toggle play/pause
  const togglePlay = () => {
    if (!currentTrack) return;
    isPlaying ? dispatch(pauseTrack()) : dispatch(resumeTrack());
  };

  // Setup audio element listeners
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

  // Control play/pause from Redux
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      const tryPlay = () => {
        audio.play().catch((err) => {
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

  // ⬅️➡️ Keyboard seek
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!audioRef.current) return;

      if (e.key === "ArrowRight") {
        audioRef.current.currentTime = Math.min(
          audioRef.current.currentTime + 5,
          duration
        );
      }
      if (e.key === "ArrowLeft") {
        audioRef.current.currentTime = Math.max(
          audioRef.current.currentTime - 5,
          0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [duration]);

  // Format time nicely
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!currentTrack) return null;

  if (currentTrack) handleIsOn();

  return (
    <>
      <div className="divider-n"></div>
      <div className="nav-player">
        {/* hidden audio element */}
        <audio ref={audioRef} src={currentTrack.audioUrl} preload="metadata" />

        {/* cover image */}
        <Link
          to={`/track/${currentTrack._id}`}
          className="player-image uni-link"
        >
          <img
            src={currentTrack.coverImage || img}
            alt={currentTrack.title}
            className="player-img"
          />
        </Link>

        {/* track info + progress bar */}
        <div className="player-container">
          <div className="player-wrapper">
            <div className="player-info">{currentTrack.title}</div>
            <div className="duration">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div
            className="player-bar"
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
            {hoverTime !== null && (
              <div className="mp-tooltip" style={{ left: hoverX }}>
                {formatTime(hoverTime)}
              </div>
            )}

            <div
              className="mp-progress"
              style={{
                width: `${(currentTime / duration) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* play/pause button */}
        <div className="player-control" onClick={togglePlay}>
          {isPlaying ? (
            <PauseIcon weight="fill" size={18} />
          ) : (
            <PlayIcon weight="fill" size={18} />
          )}
        </div>
      </div>
    </>
  );
};

export default NavPlayer;
