import React, { useEffect, useContext } from "react";
// import songs from "../header/songs.json";
import { makeStyles } from "@material-ui/core/styles";
import { HomeSections } from "../common/HomeSections";
import MusicContext from "./../../context/music/musicContext";
import $ from "jquery";

const useStyles = makeStyles({
  root: {
    width: "345px",
    overflow: "unset",
    marginRight: "20px",
  },
});

export const Trending = () => {
  const musicContext = useContext(MusicContext);
  const { getTrendingVideos, trending } = musicContext;

  useEffect(() => {
    getTrendingVideos();

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
    <div className="music-home-main-section music-trending container">
      {trending && (
        <div className="home-section">
          <div className="section-heading">Trending</div>

          <div className="section-content trending">
            {trending.tracks.map((item) => (
              <HomeSections
                classes={classes}
                item={item}
                heading="Trending"
                key={item.title}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
