import React, { useContext, useEffect, Fragment } from "react";
import MusicContext from "./../../context/music/musicContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import { rightScroll } from "../../utils/scroll";
import { leftScroll } from "../../utils/scroll";
import { Link } from "react-router-dom";
import { HomeSections } from "./../common/HomeSections";
import Img from "react-cool-img";

const useStyles = makeStyles({
  root: {
    width: "345px",
    overflow: "unset",
    marginRight: "20px",
  },
});

export const Explore = () => {
  const musicContext = useContext(MusicContext);
  const { getExploreData, explore, getTrendingVideos, trending } = musicContext;

  const scrollLeft = (e, div, speed) => {
    leftScroll(e, div, speed);
  };

  const scrollRight = (e, div, speed) => {
    rightScroll(e, div, speed);
  };

  useEffect(() => {
    getExploreData();
    getTrendingVideos();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  return (
    <>
      {explore && (
        <div className="explore-page container">
          {/* Trending */}
          <div className="trending new-albums">
            <div className="heading">Trending</div>
            <Link to="/trending" className="seeAll">
              See All
            </Link>
            <div
              className="left-scroll"
              onClick={(e) => scrollLeft(e, "trendingTracks", 500)}
            >
              <ArrowBackIosOutlinedIcon />
            </div>

            <div
              className={`section-content playlist-content ${"trendingTracks"}`}
            >
              {trending &&
                trending.tracks.map((item, i) => (
                  <Fragment key={item.title}>
                    {i <= 10 && (
                      <HomeSections
                        classes={classes}
                        item={item}
                        heading="Trending"
                      />
                    )}
                  </Fragment>
                ))}
            </div>

            <div
              className="right-scroll"
              onClick={(e) => scrollRight(e, "trendingTracks", 500)}
            >
              <ArrowForwardIosIcon />
            </div>
          </div>
          {/* new-albums */}
          <div className="new-albums">
            <div className="heading">{explore.newReleases.title}</div>
            <Link to="/new_releases" className="seeAll">
              See All
            </Link>
            <div
              className="left-scroll"
              onClick={(e) => scrollLeft(e, "newAlbumsAndSingles", 300)}
            >
              <ArrowBackIosOutlinedIcon />
            </div>

            <div
              className={`section-content playlist-content ${"newAlbumsAndSingles"}`}
            >
              {explore.newReleases.contents.map((item) => (
                <Link to={`/album/${item.browseId}`} key={item.browseId}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <div className="parent">
                        <Img
                          className="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img"
                          placeholder="https://i.ibb.co/pX3GZvJ/loading.gif"
                          src={item.thumbnails[item.thumbnails.length - 1].url}
                          error="https://i.ibb.co/b183xtL/error.png"
                          alt={item.title}
                        />
                        <div className="overlay"></div>
                        <div className="hover-overlay"></div>
                      </div>

                      <div className="song-name">{item.title}</div>
                      <div className="bottom-details">
                        <div className="subtitle">{item.subtitle}</div>
                        <div className="artist">{item.artist}</div>
                      </div>
                    </CardActionArea>
                  </Card>
                </Link>
              ))}
            </div>

            <div
              className="right-scroll"
              onClick={(e) => scrollRight(e, "newAlbumsAndSingles", 300)}
            >
              <ArrowForwardIosIcon />
            </div>
          </div>

          {/* mood and genres */}
          <div className="mood-and-genres">
            <div className="heading">{explore.moodsAndGenres.title}</div>
            <Link to="/mood_and_genres" className="seeAll">
              See All
            </Link>
            <div
              className="left-scroll"
              onClick={(e) => scrollLeft(e, "moodsAndGenres", 300)}
            >
              <ArrowBackIosOutlinedIcon />
            </div>

            <div
              className={`section-content playlist-content ${"moodsAndGenres"}`}
            >
              {explore.moodsAndGenres.contents.map((card) => (
                <div className="card-block" key={Math.random()}>
                  {card.map((item) => (
                    <Link
                      to={`/mood_and_genres_data/${item.params}`}
                      key={item.params}
                    >
                      <div className="card-area">
                        {/* {console.log(item.stripColor.toString(16).split("").pop())} */}
                        <div
                          className="left-strip"
                          style={{
                            backgroundColor: "#" + item.stripColor,
                          }}
                        ></div>
                        <div className="main-card">
                          <div className="title">{item.title}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <div
              className="right-scroll"
              onClick={(e) => scrollRight(e, "moodsAndGenres", 300)}
            >
              <ArrowForwardIosIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
