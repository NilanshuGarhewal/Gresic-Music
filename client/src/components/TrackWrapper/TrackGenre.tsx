import React, { useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { playTrack } from "../../store/playerSlice";

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

type BeatProps = {
  allBeats: Beat[];
};

const TrackGenre = ({ allBeats }: BeatProps) => {
  const dispatch = useDispatch();

  const handlePlay = (beat: Beat) => {
    dispatch(playTrack(beat));
  };

  // reusable scroll function
  const useScroll = () => {
    const ref = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
      if (ref.current) {
        ref.current.scrollBy({ left: -500, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (ref.current) {
        ref.current.scrollBy({ left: 500, behavior: "smooth" });
      }
    };

    return { ref, scrollLeft, scrollRight };
  };

  // create scroll refs for each section
  const popScroll = useScroll();
  const hiphopScroll = useScroll();
  const synthwaveScroll = useScroll();
  const afrobeatScroll = useScroll();

  const renderSection = (
    title: string,
    filterGenre: string,
    scroll: ReturnType<typeof useScroll>
  ) => (
    <span className="tc-pop">
      <div className="tc-pop-heading">
        <p>{title}</p>
        <span>
          <ArrowLeftIcon weight="bold" size={24} onClick={scroll.scrollLeft} />
          <ArrowRightIcon
            weight="bold"
            size={24}
            onClick={scroll.scrollRight}
          />
        </span>
      </div>

      <div className="tc-pop-container" ref={scroll.ref}>
        {allBeats
          .filter(
            (beat) =>
              beat.genre?.[0]?.toLowerCase() === filterGenre.toLowerCase()
          )
          .slice(0, 10)
          .map((beat, index) => (
            <div
              className="tc-pop-card"
              key={beat._id}
              onClick={() => handlePlay(beat)}
            >
              <div className="tc-pop-card-image">
                <img src={beat.coverImage} alt="cover" />
              </div>
              <div className="tc-pop-card-info">
                <p className="tc-pop-card-info-title">{beat.title}</p>
                <p className="tc-pop-card-info-genre">{beat.genre?.[1]} &middot; {beat.bpm} BPM</p>
              </div>
            </div>
          ))}
      </div>
    </span>
  );

  return (
    <>
      {renderSection("Pop Ones", "pop", popScroll)}
      {renderSection("Hip Hop & Trap", "hip hop", hiphopScroll)}
      {renderSection("Synthwave & NuAge", "synthwave", synthwaveScroll)}
      {renderSection("Afrobeats", "afro", afrobeatScroll)}
    </>
  );
};

export default TrackGenre;
