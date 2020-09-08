import React from "react";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import Img from "react-cool-img";
import MoreMenu from "./MoreMenu";

export const SongSearchResult = ({
  item,
  currentSongVideoID,
  handlePlayingSearchedTrack,
  playing,
}) => {
  return (
    <div>
      <div
        className={`searchItem ${
          item.videoId === currentSongVideoID && "active"
        }`}
      >
        <div
          className="thumbnail"
          onClick={() => handlePlayingSearchedTrack(item)}
        >
          <Img
            placeholder="https://i.ibb.co/pX3GZvJ/loading.gif"
            src={item.thumbnails[0].url}
            error="https://i.ibb.co/b183xtL/error.png"
            alt={item.title}
          />
          {/* <img src={item.thumbnails[0].url} alt="" /> */}
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
            <div className="artists">
              {item.artists &&
                item.artists.map((artist) => (
                  <div className="artist" key={artist.id || artist.name}>
                    {" "}
                    {artist.name}
                  </div>
                ))}
              {item.artist && item.artist && (
                <div className="artist"> {item.artist}</div>
              )}
            </div>
            {item.album && <div className="album">{item.album.name}</div>}
            <div className="duration">{item.duration}</div>
          </div>
        </div>
        <div className="more">
          <MoreMenu id={item.videoId} track={item} />
        </div>
      </div>
    </div>
  );
};
