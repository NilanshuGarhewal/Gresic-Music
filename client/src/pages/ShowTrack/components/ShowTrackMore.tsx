type Beat = {
  _id?: string;
  title?: string;
  bpm?: number;
  audioUrl?: string;
  genre?: string[];
  mood?: string[];
  duration?: string;
  price?: string;
  description?: string;
  coverImage?: string;
  scale?: string;
  purchaseLink?: string;
  releaseDate?: string;
};

type STMProps = {
  singleBeat?: Beat;
};

const ShowTrackMore = ({ singleBeat }: STMProps) => {
  return (
    <div className="show-track-more">
      <div className="st-box">
        <div className="stb-head">Genre</div>
        <div className="stb-data">
          {singleBeat?.genre?.slice(0, 3).map((g, idx) => (
            <span className="button-dark" key={idx}>
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="st-box st-box-2">
        <div className="stb-head">BPM</div>
        <div className="stb-data">{singleBeat?.bpm}</div>
      </div>

      <div className="st-box">
        <div className="stb-head">Mood</div>
        <div className="stb-data">
          {singleBeat?.mood?.slice(0, 3).map((g, idx) => (
            <span className="button-dark" key={idx}>
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="st-box st-box-2">
        <div className="stb-head">Scale/Key</div>
        <div className="stb-data">{singleBeat?.scale}</div>
      </div>

      <div className="st-box">
        <div className="stb-head">Duration</div>
        <div className="stb-data">{singleBeat?.duration}</div>
      </div>

      <div className="st-box st-box-2">
        <div className="stb-head">Release Date</div>
        <div className="stb-data">{singleBeat?.releaseDate}</div>
      </div>
    </div>
  );
};

export default ShowTrackMore;
