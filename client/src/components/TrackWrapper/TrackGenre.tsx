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

  const handlePlay = (beat: Beat) => dispatch(playTrack(beat));

  // reusable scroll hook
  const useScroll = () => {
    const ref = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
      if (ref.current) {
        ref.current.scrollBy({
          left: dir === "left" ? -500 : 500,
          behavior: "smooth",
        });
      }
    };

    return {
      ref,
      scrollLeft: () => scroll("left"),
      scrollRight: () => scroll("right"),
    };
  };

  // section configs (title + genres)
  const sections = [
    { title: "Pop Refined", genres: ["pop"], scroll: useScroll() },
    {
      title: "Hip Hop & Trap",
      genres: ["hip-hop", "trap"],
      scroll: useScroll(),
    },
  ];

  const renderSection = (
    title: string,
    filterGenres: string[],
    scroll: ReturnType<typeof useScroll>
  ) => (
    <section className="tc-pop" key={title}>
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
          .filter((beat) =>
            beat.genre?.some((g) =>
              filterGenres.some((fg) => g.toLowerCase() === fg.toLowerCase())
            )
          )
          .slice(0, 8)
          .map((beat) => (
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
                <p className="tc-pop-card-info-genre">
                  {beat.genre?.slice(0, 2).join(", ")} &middot; {beat.bpm} BPM
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );

  return <>{sections.map((s) => renderSection(s.title, s.genres, s.scroll))}</>;
};

export default TrackGenre;
