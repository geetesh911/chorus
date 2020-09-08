import React from "react";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import MoreMenu from "./../common/MoreMenu";
import Img from "react-cool-img";

export const SongsSection = ({ artist, extraData }) => {
  const {
    handleArtistSongs,
    currentSongVideoID,
    playing,
    handlePlayingAllArtistTracks,
  } = extraData;
  return (
    <div className="songs container">
      <div className="heading">Songs</div>
      <div className="data">
        {artist.songs &&
          artist.songs.results &&
          artist.songs.results.map((song, i) => (
            <div
              className={`song ${
                song.videoId === currentSongVideoID && "active"
              }`}
              key={song.videoId}
            >
              <div
                className="song-thumbnail"
                onClick={() =>
                  handlePlayingAllArtistTracks(artist.songs.browseId, i)
                }
              >
                <Img
                  placeholder="https://i.ibb.co/pX3GZvJ/loading.gif"
                  src={song.thumbnails[song.thumbnails.length - 1].url}
                  error="https://i.ibb.co/b183xtL/error.png"
                  alt={song.title}
                />
                {song.videoId !== currentSongVideoID && (
                  <div className="thumbnail-overlay">
                    <PlayArrowIcon />
                  </div>
                )}
                {song.videoId === currentSongVideoID && !playing && (
                  <div className="thumbnail-overlay paused-overlay">
                    <PlayArrowIcon />
                  </div>
                )}
                {song.videoId === currentSongVideoID && playing && (
                  <div className="thumbnail-overlay volume-overlay">
                    <VolumeUpIcon />
                  </div>
                )}
              </div>
              <div className="song-title">
                {song.title}{" "}
                <div className="song-details-mob">
                  <div className="song-artists-mob">
                    {song.artists.map((artist) => (
                      <div className="song-artist" key={artist.id}>
                        {artist.name}
                      </div>
                    ))}
                  </div>
                  <div className="song-album-mob">{song.album.name}</div>
                </div>
              </div>
              <div className="gap"></div>
              <div className="song-artists">
                {song.artists.map((artist) => (
                  <div className="song-artist" key={artist.id}>
                    {artist.name}
                  </div>
                ))}
              </div>
              <div className="song-album">{song.album.name}</div>
              <div className="more">
                <MoreMenu id={song.videoId} track={song} />
              </div>
            </div>
          ))}
        <button
          className="showAll"
          onClick={() => handleArtistSongs(artist.songs.browseId)}
        >
          Show All
        </button>
      </div>
    </div>
  );
};
