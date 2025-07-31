const Filters = () => {
  return (
    <div className="filters">
      <div className="filter-heading">
        <p className="filter-head">Filters</p>
        <div className="clear">Clear All</div>
      </div>

      <div className="filter-by by-tags">
        Tags
      </div>
      <div className="filter-by by-stem">
        Stem Type
      </div>
      <div className="filter-by by-genre">
        Genre
      </div>
      <div className="filter-by by-bpm">
        BPM
      </div>
      <div className="filter-by by-key">
        Scale/Key
      </div>
      <div className="filter-by by-year">
        Year
      </div>
    </div>
  );
};

export default Filters;
