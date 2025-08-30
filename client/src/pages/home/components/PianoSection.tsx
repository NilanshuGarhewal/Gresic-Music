import React, { useEffect, useState } from "react";

import pianoC from "../../../assets/music/pianoKeys/C.mp3";
import pianoCs from "../../../assets/music/pianoKeys/Cs.mp3";
import pianoD from "../../../assets/music/pianoKeys/D.mp3";
import pianoDs from "../../../assets/music/pianoKeys/Ds.mp3";
import pianoE from "../../../assets/music/pianoKeys/E.mp3";
import pianoF from "../../../assets/music/pianoKeys/F.mp3";
import pianoFs from "../../../assets/music/pianoKeys/Fs.mp3";
import pianoG from "../../../assets/music/pianoKeys/G.mp3";
import pianoGs from "../../../assets/music/pianoKeys/Gs.mp3";
import pianoA from "../../../assets/music/pianoKeys/A.mp3";
import pianoAs from "../../../assets/music/pianoKeys/As.mp3";
import pianoB from "../../../assets/music/pianoKeys/B.mp3";

// Map QWERTY keys → notes
const keyToNote: Record<string, string> = {
  a: pianoC,
  w: pianoCs,
  s: pianoD,
  e: pianoDs,
  d: pianoE,
  f: pianoF,
  t: pianoFs,
  g: pianoG,
  y: pianoGs,
  h: pianoA,
  u: pianoAs,
  j: pianoB,
};

// Letters shown in hero section
const letters: string[] = [
  "g",
  "r",
  "e",
  "s",
  "i",
  "c",
  "m",
  "u",
  "s",
  "i",
  "c",
  "_",
];

// Friendly note names to show below each letter (looped)
const noteNames: string[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const PianoSection: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  const playSound = (key: string | undefined): void => {
    if (!key) return;
    const sound = keyToNote[key];
    if (!sound) return;

    const audio = new Audio(sound);
    audio.currentTime = 0;
    void audio.play().catch((err) => console.error("Playback failed:", err));

    // highlight pressed key
    setActiveKeys((prev) => new Set(prev).add(key));

    // remove highlight after short delay
    setTimeout(() => {
      setActiveKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }, 150);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (keyToNote[key]) {
        playSound(key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="piano-section">
        {letters.map((letter, index) => {
          const keyForLetter = Object.keys(keyToNote)[index % 12];
          const isActive = activeKeys.has(keyForLetter);
          const noteLabel = noteNames[index % 12]; // show note name below

          return (
            <div key={index} className="piano-key-wrapper">
              <p
                className={`piano-key ${isActive ? "active" : ""}`}
                onClick={() => playSound(keyForLetter)}
              >
                {letter}
              </p>
              <span className="actual-piano-key">{noteLabel}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PianoSection;
