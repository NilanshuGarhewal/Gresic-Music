import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  DotsThreeOutlineIcon,
  ShareNetworkIcon,
  PlayIcon,
  PauseIcon,
} from "@phosphor-icons/react";

import ShowTrackMore from "./components/ShowTrackMore";
import RelatedTracks from "./components/RelatedTracks";

import { useDispatch, useSelector } from "react-redux";
import { playTrack, pauseTrack, resumeTrack } from "../../store/playerSlice";
import { RootState } from "../../store"; // <- Add this import if not present

type Beat = {
  _id: string;
  title?: string;
  bpm?: number;
  audioUrl: string;
  genre?: string[];
  mood?: string[];
  scale?: string;
  duration?: string;
  price?: string;
  description?: string;
  coverImage?: string;
};

const TrackInfo = ({
  setSongTitleForLocation,
}: {
  setSongTitleForLocation: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { id } = useParams();
  const [singleBeat, setSingleBeat] = useState<Beat>();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  const handlePlay = () => {
    if (!singleBeat) return;

    if (currentTrack?._id === singleBeat._id) {
      if (isPlaying) {
        dispatch(pauseTrack());
      } else {
        dispatch(resumeTrack());
      }
    } else {
      dispatch(playTrack(singleBeat));
    }
  };

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/track/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleBeat(data);
        setLoading(false);
        setSongTitleForLocation(data.title);
      })
      .catch((err) => console.log(err));
  }, [id, setSongTitleForLocation]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (loading || !singleBeat) return <div>Loading...</div>;

  const isThisTrackPlaying = currentTrack?._id === singleBeat._id && isPlaying;

  return (
    <div className="track-info">
      <div className="track-info-wrapper">
        <div className="show-track-wrapper">
          <div className="show-track-img">
            <img src={singleBeat.coverImage} alt={singleBeat.title} />
          </div>

          <div className="show-track-details">
            <div className="st-info">
              <p className="st-title">{singleBeat.title}</p>
              <p className="st-artist">by Gresic</p>

              <div className="st-controls">
                <div className="st-play" onClick={handlePlay}>
                  {isThisTrackPlaying ? (
                    <PauseIcon weight="fill" size={20} />
                  ) : (
                    <PlayIcon weight="fill" size={20} />
                  )}
                </div>
                <div className="st-tool" onClick={handleCopyLink}>
                  <ShareNetworkIcon weight="fill" size={16} />
                </div>
                <div className="st-tool">
                  <DotsThreeOutlineIcon weight="fill" size={16} />
                </div>
              </div>
            </div>

            <div className="buy-track">
              <div className="st-price">{singleBeat.price || "N/A"}</div>
              <div className="button-sm">Purchase</div>
            </div>
          </div>
        </div>

        {copied && <div className="copied-popup">Link copied!</div>}

        <ShowTrackMore singleBeat={singleBeat} />
      </div>

      <RelatedTracks />
    </div>
  );
};

export default TrackInfo;
