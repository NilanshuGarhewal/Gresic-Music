import img from "../../../../assets/images/search_section_img.png";

const Search = () => {
  return (
    <div className="search">
      <div className="search-card">
        <div className="search-image">
          <img src={img} alt="" />
        </div>

        <div className="search-wrapper">
          <span className="search-text">
            <p className="search-heading">Discover more tracks</p>
            <p className="search-des">Search depending on your taste</p>
          </span>

          <div className="search-container">
            <div className="search-btn button">Search</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
