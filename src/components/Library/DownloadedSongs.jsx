import React from "react";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Img from "react-cool-img";

export const DownloadedSongs = ({ data, extraData }) => {
  const {
    handlePlaying,
    currentSongVideoID,
    playing,
    // handlePlayingAllArtistTracks,
  } = extraData;
  return (
    <div className="searchResults">
      {data.map((item) => (
        <div className="songs" key={item.videoId}>
          {/* <div className="heading">Songs</div> */}
          <div
            className={`searchItem ${
              item.videoId === currentSongVideoID && "active"
            }`}
          >
            <div
              className="thumbnail"
              onClick={() => handlePlaying(item, data)}
            >
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
                <div className="artists">
                  {/* {item.artists.map((artist) => ( */}
                  <div className="artist"> {item.artists}</div>
                  {/* ))} */}
                </div>
                {item.album && <div className="album">{item.album.name}</div>}
                <div className="duration">{item.duration}</div>
              </div>
            </div>
            {/* <div className="more">
          <MoreMenu id={item.videoId} track={item} />
        </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};
