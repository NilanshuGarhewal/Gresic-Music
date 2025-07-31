import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { pauseTrack, resumeTrack } from "../../store/playerSlice";

import { useEffect, useRef, useState } from "react";
import { PlayIcon, PauseIcon } from "@phosphor-icons/react";
import WaveSurfer from "wavesurfer.js";

import { Link } from "react-router-dom";

const Player = () => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<ReturnType<typeof WaveSurfer.create> | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!currentTrack || !waveformRef.current) return;

    // destroy existing instance
    wavesurfer.current?.destroy();

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#898989",
      progressColor: "#5f55df",
      height: 40,
      barWidth: 2,
      responsive: true,
      cursorColor: "#fff",
    });

    wavesurfer.current.load(currentTrack.audioUrl);

    wavesurfer.current.on("ready", () => {
      setDuration(wavesurfer.current?.getDuration() || 0);
      if (isPlaying) wavesurfer.current?.play();
    });

    wavesurfer.current.on("audioprocess", () => {
      const time = wavesurfer.current?.getCurrentTime() || 0;
      setCurrentTime(time);
    });

    wavesurfer.current.on("finish", () => {
      wavesurfer.current?.seekTo(0);
      dispatch(pauseTrack());
    });

    return () => {
      wavesurfer.current?.destroy();
      wavesurfer.current = null;
    };
  }, [currentTrack, dispatch, isPlaying]);

  useEffect(() => {
    if (!wavesurfer.current) return;

    if (isPlaying) {
      if (wavesurfer.current.isPlaying()) {
        wavesurfer.current.play();
      }
    } else {
      wavesurfer.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!currentTrack) return;
    isPlaying ? dispatch(pauseTrack()) : dispatch(resumeTrack());
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wavesurfer.current || !waveformRef.current) return;

    const rect = waveformRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = clickX / rect.width;
    const seekTo = progress * duration;

    wavesurfer.current.seekTo(progress);
    setCurrentTime(seekTo);
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
    <div className="player">
      <div className="player-info-wrapper">
        <div className="player-image">
          <img src={currentTrack?.coverImage} alt="" />
        </div>
        <div className="track-info">
          <div className="title">{currentTrack?.title || "Untitled"}</div>
          <div className="bpm">{currentTrack?.bpm} BPM</div>
        </div>
      </div>

      <div className="player-left">
        <div className="play-btn" onClick={togglePlay}>
          {isPlaying ? (
            <PauseIcon weight="fill" size={20} />
          ) : (
            <PlayIcon weight="fill" size={20} />
          )}
        </div>

        <div className="time-info">{formatTime(currentTime)}</div>

        <div className="waveform-wrapper" onClick={handleSeek}>
          <div ref={waveformRef} />
        </div>

        <div className="time-info">{formatTime(duration)}</div>
      </div>
      <Link
        to={`/track/${currentTrack?._id}`}
        className="track-details uni-link"
      >
        <p className="button-sm">Details</p>
      </Link>
    </div>
  );
};

export default Player;