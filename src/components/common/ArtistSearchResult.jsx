import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Img from "react-cool-img";

export const ArtistSearchResult = ({
  item,
  currentSongVideoID,
  handlePlayingSearchedTrack,
  playing,
}) => {
  return (
    <div
      className={`searchItem ${
        item.browseId === currentSongVideoID && "active"
      }`}
      onClick={() => handlePlayingSearchedTrack(item)}
    >
      <div className="thumbnail">
        <Img
          placeholder="https://i.ibb.co/pX3GZvJ/loading.gif"
          src={item.thumbnails[0].url}
          error="https://i.ibb.co/b183xtL/error.png"
          alt={item.title}
        />
        <div className="thumbnail-overlay">
          <PlayArrowIcon />
        </div>
      </div>
      <div className="details">
        <div className="title">{item.artist}</div>
        <div className="bottom-details">
          <div className="type">{item.type}</div>
        </div>
      </div>
    </div>
  );
};
