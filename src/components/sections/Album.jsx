import React, { useEffect, useContext, Fragment } from "react";
import $ from "jquery";
import MusicContext from "./../../context/music/musicContext";
// import playlist from "../header/romantic.json";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PlayerContext from "./../../context/player/playerContext";
import { convertToMin } from "./../../utils/convertMS";
import { convertMS } from "./../../utils/convertMS";
import Img from "react-cool-img";

export const Album = (props) => {
  const musicContext = useContext(MusicContext);
  const { getAlbum, album } = musicContext;

  const playerContext = useContext(PlayerContext);
  const {
    playPlaylistTrack,
    pauseAndPlayNext,
    playAllPlaylistTrack,
    shufflePlayAllPlaylistTrack,
    currentSongVideoID,
    playing,
  } = playerContext;

  useEffect(() => {
    getAlbum(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    $(".MuiAppBar-colorPrimary").css("background-color", "#151515");
    $(window).scroll(function () {
      let scroll = $(this.window).scrollTop();
      if (scroll > 10) {
        $(".MuiAppBar-colorPrimary").css("background-color", "#151515");
        $(".MuiAppBar-colorPrimary").css("transition", "all 0.3s ease-in-out");
        $(".MuiAppBar-colorPrimary").css(
          "box-shadow",
          "0 2px 10px rgba(0,0,0,.3)"
        );
        // $(".MuiAppBar-colorPrimary").css("marginTop", "0px");
      } else {
        $(".MuiAppBar-colorPrimary").css("background-color", "#151515");
        $(".MuiAppBar-colorPrimary").css("transition", "all 0.3s ease-in-out");
        $(".MuiAppBar-colorPrimary").css("box-shadow", "none");
        // $(".MuiAppBar-colorPrimary").css("marginTop", "10px");
      }
    });
    // eslint-disable-next-line
  }, []);

  const handlePlayingPlaylistTrack = (tracks, index) => {
    pauseAndPlayNext();
    playPlaylistTrack(tracks, index);
  };

  const handlePlayAll = (tracks, index) => {
    pauseAndPlayNext();
    playAllPlaylistTrack(tracks);
  };

  const handlePlayShuffle = (tracks) => {
    pauseAndPlayNext();
    shufflePlayAllPlaylistTrack(tracks);
  };

  return (
    <>
      {album && (
        <div className="playlist-page album-page">
          <div className="single-playlist">
            <div className="header container">
              <div className="container playlist-header">
                <div className="thumbnail">
                  <Img
                    className="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img thumbnail"
                    placeholder="https://i.ibb.co/pX3GZvJ/loading.gif"
                    src={album.thumbnails[album.thumbnails.length - 1].url}
                    error="https://i.ibb.co/b183xtL/error.png"
                    alt={album.title}
                  />
                </div>
                <div className="details">
                  <div className="name">{album.title}</div>
                  <div className="sub-title">
                    <span className="header-artist">
                      {album.artist[0].name}
                    </span>
                    {album.artist.length > 1 && (
                      <span className="header-artist">
                        {album.artist.length - 2}
                      </span>
                    )}
                    <span className="year">{album.releaseDate.year}</span>
                  </div>
                  <div className="sub-title">
                    {album.trackCount} Songs: {convertToMin(album.durationMs)}{" "}
                    minutes
                  </div>
                  <div className="description">{album.description}</div>
                  <div className="buttons-area-desktop">
                    <div
                      className="shuffle-button"
                      onClick={() => handlePlayShuffle(album.tracks)}
                    >
                      <ShuffleIcon /> Shuffle
                    </div>
                    <div
                      className="playAll-button"
                      onClick={() => handlePlayAll(album.tracks)}
                    >
                      <PlayArrowIcon /> Play All
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons-area-mobile">
              <div
                className="shuffle-button"
                onClick={() => handlePlayShuffle(album.tracks)}
              >
                <ShuffleIcon /> Shuffle
              </div>
              <div
                className="playAll-button"
                onClick={() => handlePlayAll(album.tracks)}
              >
                <PlayArrowIcon /> Play All
              </div>
            </div>
          </div>
          <div className="tracks container">
            {album.tracks.map((track, i) => (
              <Fragment key={`${track.videoId}${Math.random().toString()}`}>
                {track.videoId && (
                  <div
                    className={`track ${
                      track.videoId === currentSongVideoID && "active"
                    }`}
                    key={track.videoId}
                    onClick={() => handlePlayingPlaylistTrack(album.tracks, i)}
                  >
                    <div className="track-thumbnail">
                      {/* <img src={track.thumbnails[0].url} alt="" />{" "} */}
                      {track.videoId !== currentSongVideoID && (
                        <div className="thumbnail-overlay">
                          <PlayArrowIcon />
                        </div>
                      )}
                      {track.videoId === currentSongVideoID && !playing && (
                        <div className="thumbnail-overlay paused-overlay">
                          <PlayArrowIcon />
                        </div>
                      )}
                      {track.videoId === currentSongVideoID && playing && (
                        <div className="thumbnail-overlay volume-overlay">
                          <VolumeUpIcon />
                        </div>
                      )}
                      {track.videoId !== currentSongVideoID && (
                        <div className="index">{track.index}</div>
                      )}
                    </div>
                    <div className="track-title">
                      {track.title}{" "}
                      <div className="track-artists-mob">
                        <div className="track-artist">{track.artists}</div>
                      </div>
                    </div>
                    <div className="gap"></div>
                    <div className="track-artists">
                      <div className="track-artist">{track.artists}</div>
                    </div>
                    <div className="track-duration">
                      {convertMS(track.lengthMs)}
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
