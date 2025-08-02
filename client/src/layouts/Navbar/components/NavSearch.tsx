import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import { MagnifyingGlassIcon } from "@phosphor-icons/react";

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

const NavSearch = () => {
  const [search, setSearch] = useState("");
  const [beats, setBeats] = useState<Beat[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://gresic-server.onrender.com/")
      .then((res) => res.json())
      .then((data) => {
        setBeats(data);
      })
      .catch((err) => console.error("Failed to fetch beats", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBeats = beats.filter((beat) =>
    beat.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="nav-search" ref={searchRef}>
      <div className="search">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
        />
      </div>

      {showDropdown && search && (
        <div className="search-results">
          {filteredBeats.length ? (
            filteredBeats.map((beat) => (
              <Link
                to={`/track/${beat._id}`}
                className="search-item uni-link"
                key={beat._id}
                onClick={() => setShowDropdown(false)}
              >
                <img src={beat.coverImage} alt="" className="search-img" />
                <div>
                  <p>{beat.title}</p>
                  <p className="search-dur">{beat.duration}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="search-no-result">No results</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavSearch;
