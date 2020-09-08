import React, { useEffect, useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import $ from "jquery";
import { PlaylistSection } from "../common/PlaylistSection";
import playlistsData from "../../utils/playlists.json";
import MusicContext from "../../context/music/musicContext";

const useStyles = makeStyles({
  root: {
    width: "345px",
    overflow: "unset",
    marginRight: "20px",
  },
});

export const Home = () => {
  const musicContext = useContext(MusicContext);
  const {
    getPlaylistData,
    playlists,
    getRecommendedPlaylists,
    recommendedPlaylists,
  } = musicContext;

  useEffect(() => {
    for (let playlist of playlistsData) {
      getPlaylistData(
        playlist.data,
        playlist.className,
        playlist.playlistTitle
      );
    }
    getRecommendedPlaylists();

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

  const classes = useStyles();

  return (
    <div className="music-home-main-section">
      {/* <HomeSections classes={classes} items={items} heading="Trending" /> */}
      <div className="overlay-image"></div>

      <div className="module container">
        <Fragment>
          {recommendedPlaylists.length > 0 &&
            (recommendedPlaylists[0].playlistTitle ===
              "Recommended playlists" ||
              recommendedPlaylists[0].playlistTitle === "New releases") && (
              <PlaylistSection
                key={
                  recommendedPlaylists[0].className + Math.random().toString()
                }
                classes={classes}
                items={recommendedPlaylists[0].data}
                heading={recommendedPlaylists[0].playlistTitle}
                link={
                  recommendedPlaylists[0].playlistTitle === "New releases"
                    ? "album"
                    : null
                }
                className={recommendedPlaylists[0].className}
              />
            )}
          {playlists.map((playlist) => (
            <PlaylistSection
              key={playlist.className + Math.random().toString()}
              classes={classes}
              items={playlist.data}
              heading={playlist.playlistTitle}
              className={playlist.className}
            />
          ))}
        </Fragment>
      </div>
    </div>
  );
};
