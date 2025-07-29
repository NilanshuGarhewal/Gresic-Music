import "./TrackInfo.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import img from "../../assets/images/example.jpg";

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

const TrackInfo = ({
  setSongTitleForLocation,
}: {
  setSongTitleForLocation: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { id } = useParams();
  const [singleBeat, setSingleBeat] = useState<Beat>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/track/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleBeat(data);
        setLoading(false);
        setSongTitleForLocation(data.title); // ✅ moved here
      })
      .catch((err) => console.log(err));
  }, [id, setSongTitleForLocation]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="track-info">
      <div className="track-info-wrapper">
        <div className="track-info-box-1">
          <div className="track-img-box">
            <img src={img} alt={singleBeat?.title} />
          </div>
          <div className="track-title-box">
            <h1>{singleBeat?.title}</h1>
            <p>{singleBeat?.description}</p>

            <div className="info-wrapper-1">
              <p>BPM: {singleBeat?.bpm}</p>
              <p>Scale: {singleBeat?.scale}</p>
            </div>

            <div className="info-wrapper-2">
              <p>{singleBeat?.genre?.join(", ")}</p>
              <p>{singleBeat?.mood?.join(", ")}</p>
            </div>

            <div className="info-wrapper-3">
              <p>Duration: {singleBeat?.duration}</p>
              <p>Price: {singleBeat?.price}</p>
            </div>

            <div className="beat-purchase-box">
              <a
                href={singleBeat?.purchaseLink}
                rel="noreferrer"
                target="_blank"
              >
                Purchase
              </a>
            </div>

            <div className="music-player">
              {singleBeat?.audioUrl && (
                <audio controls>
                  <source src={singleBeat.audioUrl} type="audio/mpeg" />
                </audio>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;
