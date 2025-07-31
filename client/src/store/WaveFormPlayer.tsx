import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { PlayIcon, PauseIcon } from "@phosphor-icons/react";

type WaveformProps = {
  audioUrl: string;
};

const WaveformPlayer = ({ audioUrl }: WaveformProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<ReturnType<typeof WaveSurfer.create> | null>(null);
  const isReady = useRef(false); // ⛑️ NEW

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#555",
      progressColor: "#5f55df",
      cursorColor: "#fff",
      barWidth: 2,
      height: 40,
      responsive: true,
    });

    wavesurfer.current.load(audioUrl);

    wavesurfer.current.on("ready", () => {
      isReady.current = true;
      const dur = wavesurfer.current?.getDuration() || 0;
      setDuration(formatTime(dur));
    });

    wavesurfer.current.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      if (wavesurfer.current && isReady.current) {
        try {
          wavesurfer.current.destroy();
          wavesurfer.current = null;
          isReady.current = false;
        } catch (err) {
          console.warn("WaveSurfer destroy failed:", err);
        }
      }
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!wavesurfer.current) return;

    wavesurfer.current.playPause();
    setIsPlaying((prev) => !prev);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="track-player">
      <div className="play-pause" onClick={togglePlay}>
        {isPlaying ? <PauseIcon weight="fill" size={18} /> : <PlayIcon weight="fill" size={18} />}
      </div>

      <div className="track-visualizer-box">
        <div className="track-waveform" ref={waveformRef} />
        <div className="track-duration-box">{duration}</div>
      </div>
    </div>
  );
};

export default WaveformPlayer;
