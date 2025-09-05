import React, { useEffect, useRef, useState } from "react";
import { PlayIcon, PauseIcon } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  pauseTrack,
  resumeTrack,
  setTime,
  clearSeek,
} from "../../../store/playerSlice";
import { Link } from "react-router-dom";

// type NavPlayerProps = {
//   handleIsOn: () => void;
// };

const NavPlayer = () => {
  const dispatch = useDispatch();

  const { currentTrack, isPlaying, seekToSec, currentTimeSec, durationSec } =
    useSelector((state: RootState) => state.player);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);

  // Toggle play/pause
  const togglePlay = () => {
    if (!currentTrack) return;
    isPlaying ? dispatch(pauseTrack()) : dispatch(resumeTrack());
  };

  // Wire audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const onLoaded = () => {
      // duration can be NaN before metadata; guard it
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
      dispatch(setTime({ current: audio.currentTime || 0, duration: dur }));
    };
    const onTimeUpdate = () => {
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
      dispatch(setTime({ current: audio.currentTime, duration: dur }));
    };
    const onEnded = () => {
      dispatch(pauseTrack());
      audio.currentTime = 0;
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
      dispatch(setTime({ current: 0, duration: dur }));
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

  // Apply play/pause from Redux
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

  // Apply seek requests from Redux
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (seekToSec !== null && Number.isFinite(seekToSec)) {
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
      const clamped = Math.min(Math.max(0, seekToSec), dur || seekToSec);
      audio.currentTime = clamped;
      dispatch(clearSeek());
    }
  }, [seekToSec, dispatch]);

  // Seek by clicking on the navbar bar
  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !barRef.current || !durationSec) return;

    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const seekTime = percent * durationSec;

    audioRef.current.currentTime = seekTime;
  };

  // Keyboard arrows to seek
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (e.key === "ArrowRight") {
        audio.currentTime = Math.min(
          audio.currentTime + 5,
          audio.duration || Infinity
        );
      } else if (e.key === "ArrowLeft") {
        audio.currentTime = Math.max(audio.currentTime - 5, 0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const formatTime = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(s / 60);
    const secs = String(s % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!currentTrack) return null;

  const progressPct =
    durationSec > 0 ? (currentTimeSec / durationSec) * 100 : 0;

  return (
    <>
      <div className="divider-n"></div>
      <div className="nav-player">
        {/* Only audio in the whole app */}
        <audio ref={audioRef} src={currentTrack.audioUrl} preload="metadata" />

        {/* cover image → go to track page */}
        <Link
          to={`/track/${currentTrack._id}`}
          className="player-image uni-link"
        >
          <img
            src={currentTrack.coverImage}
            alt={currentTrack.title}
            className="player-img"
          />
        </Link>

        {/* info + progress */}
        <Link
          to={`/track/${currentTrack._id}`}
          className="player-container uni-link"
        >
          <div className="player-wrapper">
            <div className="player-info">{currentTrack.title}</div>
            <div className="duration">
              {formatTime(currentTimeSec)} / {formatTime(durationSec)}
            </div>
          </div>

          <div
            className="player-bar"
            ref={barRef}
            onClick={handleSeekClick}
            onMouseMove={(e) => {
              if (!barRef.current || !durationSec) return;
              const rect = barRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percent = x / rect.width;
              const time = percent * durationSec;
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

            <div className="mp-progress" style={{ width: `${progressPct}%` }} />
          </div>
        </Link>

        {/* play/pause */}
        <div className="player-control" onClick={togglePlay}>
          {isPlaying ? (
            <PauseIcon className="nav-play-icon" weight="fill" />
          ) : (
            <PlayIcon className="nav-play-icon" weight="fill" />
          )}
        </div>
      </div>
    </>
  );
};

export default NavPlayer;
