import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { playTrack } from "../../../store/playerSlice";

// import Transition from "../../components/Transition/Transition";

const Search = () => {
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

  const dispatch = useDispatch();
  const handlePlay = (beat: Beat) => {
    dispatch(playTrack(beat));
  };

  const apiLink = process.env.REACT_APP_API_URL;
  const [allBeats, setAllBeats] = useState<Beat[]>([]);
  const [query, setQuery] = useState(""); 
  const [filteredBeats, setFilteredBeats] = useState<Beat[]>([]);

  useEffect(() => {
    if (!apiLink) {
      console.error("API URL is not defined!");
      return;
    }

    fetch(apiLink)
      .then((res) => res.json())
      .then((data) => {
        setAllBeats(data);
        setFilteredBeats(data); // show all by default
      })
      .catch((err) => console.log(err));
  }, [apiLink]);

  // filter when query changes
  useEffect(() => {
    if (!query.trim()) {
      setFilteredBeats(allBeats); // reset if empty
      return;
    }

    const lowerQuery = query.toLowerCase();

    const results = allBeats.filter((beat) => {
      return (
        beat.title?.toLowerCase().includes(lowerQuery) ||
        beat.genre?.some((g) => g.toLowerCase().includes(lowerQuery)) ||
        beat.mood?.some((m) => m.toLowerCase().includes(lowerQuery)) ||
        beat.scale?.toLowerCase().includes(lowerQuery) ||
        (beat.bpm && beat.bpm.toString().includes(lowerQuery))
      );
    });

    setFilteredBeats(results);
  }, [query, allBeats]);

  return (
    <div className="search">
      <div className="search-input-box bg-blur">
        <span>
          <p className="search-heading">Search</p>

          <div className="search-input">
            <MagnifyingGlassIcon
              className="search-icon"
              weight="bold"
              size={24}
            />
            <input
              type="text"
              placeholder="Search Typebeat, BPM, Scale & More..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </span>

        <div className="search-res-divider"></div>
      </div>

      <div className="search-results">
        <span className="search-res-wrapper">
          {filteredBeats.length > 0 ? (
            filteredBeats.map((beat) => (
              <>
                <div
                  key={beat._id}
                  className="search-res-card"
                  onClick={() => handlePlay(beat)}
                >
                  <div className="search-card-info">
                    <p className="sci-title">{beat.title}</p>
                    <p className="sci-more">
                      {beat.genre?.[0]} &middot; {beat.bpm} BPM &middot;{" "}
                      {beat.scale}
                    </p>
                  </div>

                  <div className="search-card-image">
                    <img src={beat.coverImage} alt="cover" />
                  </div>
                </div>
                <div className="search-cards-divider"></div>
              </>
            ))
          ) : (
            <p className="no-results">No beats found.</p>
          )}
        </span>
      </div>

      {/* <span className="extra-fillup">not now</span> */}
    </div>
  );
};

export default Search;
