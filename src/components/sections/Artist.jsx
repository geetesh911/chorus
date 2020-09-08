import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import MusicContext from "./../../context/music/musicContext";
import PlayerContext from "./../../context/player/playerContext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import { makeStyles } from "@material-ui/core/styles";
import { SongsSection } from "./../atrist-page/SongsSection";
import { leftScroll, rightScroll } from "./../../utils/scroll";
import { AlbumSection } from "./../atrist-page/AlbumSection";
import $ from "jquery";

const useStyles = makeStyles({
  root: {
    width: "345px",
    overflow: "unset",
    marginRight: "20px",
  },
});

export const Artist = () => {
  const musicContext = useContext(MusicContext);
  const { getArtist, artist } = musicContext;

  const playerContext = useContext(PlayerContext);
  const {
    shufflePlayAllArtistTracks,
    playAllArtistTracks,
    pauseAndPlayNext,
    currentSongVideoID,
    playing,
  } = playerContext;

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    getArtist(history.location.pathname.split("/")[2]);

    // $(".MuiAppBar-colorPrimary").css("background-color", "transparent");
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
        $(".MuiAppBar-colorPrimary").css("background-color", "transparent");
        $(".MuiAppBar-colorPrimary").css("transition", "all 0.3s ease-in-out");
        $(".MuiAppBar-colorPrimary").css("box-shadow", "none");
        // $(".MuiAppBar-colorPrimary").css("marginTop", "10px");
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleArtistSongs = (id) => {
    history.push(`/playlist/${id}`);
  };

  const handlePlayShuffle = async (browseId) => {
    pauseAndPlayNext();
    shufflePlayAllArtistTracks(browseId);
  };

  const handlePlayingAllArtistTracks = async (browseId, index) => {
    pauseAndPlayNext();
    playAllArtistTracks(browseId, index);
  };

  const scrollLeft = (e, div) => {
    leftScroll(e, div);
  };

  const scrollRight = (e, div) => {
    rightScroll(e, div);
  };

  return (
    <>
      {artist && (
        <div
          className="music-home-main-section artist-page"
          style={{
            background: `linear-gradient(360deg,rgba(0, 0, 0, 1) 1.98%,rgba(0, 0, 0, 0) 60%),url(${
              artist.thumbnails[artist.thumbnails.length - 1].url
            })`,
            backgroundSize: "100vw 70vh",
            backgroundRepeat: "no-repeat",
            minHeight: "70vh",
          }}
        >
          {/* <HomeSections classes={classes} songs={songs} heading="Trending" /> */}
          {/* <div
            className="overlay-image"
            style={{
              background: "rgba(0, 0, 0, 0.2)",
            }}
          ></div> */}

          <div className="module container">
            <div className="header">
              <div className="title">{artist.name}</div>
              <div className="description">{artist.description}</div>
              <div className="buttons-area-desktop">
                <div
                  className="shuffle-button"
                  onClick={() => handlePlayShuffle(artist.songs.browseId)}
                >
                  <ShuffleIcon /> Shuffle
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {artist && (
        <div className="content-area">
          <SongsSection
            artist={artist}
            extraData={{
              handleArtistSongs,
              currentSongVideoID,
              playing,
              handlePlayingAllArtistTracks,
            }}
          />
          <AlbumSection
            data={artist.albums}
            heading={"Albums"}
            extraData={{
              scrollLeft,
              scrollRight,
              classes,
              scrollClass: "artist-albums",
            }}
          />
          <AlbumSection
            data={artist.singles}
            heading={"Singles"}
            extraData={{
              scrollLeft,
              scrollRight,
              classes,
              scrollClass: "artist-singles",
            }}
          />
        </div>
      )}
    </>
  );
};
