import React from "react";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Img from "react-cool-img";

export const PlaylistSearchResult = ({
  item,
  currentSongVideoID,
  handlePlayingSearchedTrack,
  playing,
}) => {
  return (
    <div
      className={`searchItem ${
        item.videoId === currentSongVideoID && "active"
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
        {item.videoId !== currentSongVideoID && (
          <div className="thumbnail-overlay">
            <PlayArrowIcon />
          </div>
        )}
        {item.videoId === currentSongVideoID && !playing && (
          <div className="thumbnail-overlay paused-overlay">
            <PlayArrowIcon />
          </div>
        )}
        {item.videoId === currentSongVideoID && playing && (
          <div className="thumbnail-overlay volume-overlay">
            <VolumeUpIcon />
          </div>
        )}
      </div>
      <div className="details">
        <div className="title">{item.title}</div>
        <div className="bottom-details">
          <div className="itemCount">{item.itemCount}</div>
        </div>
      </div>
    </div>
  );
};
