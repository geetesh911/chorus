import React, { Fragment, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import CardMedia from "@material-ui/core/CardMedia";
import PlayerContext from "./../../context/player/playerContext";
import Img from "react-cool-img";

export const HomeSections = ({ item, classes, heading }) => {
  const playerContext = useContext(PlayerContext);
  const {
    playSearchedTrack,
    pauseAndPlayNext,
    // currentSongVideoID,
    // playing,
  } = playerContext;

  const handlePlayingHotlistTrack = (track) => {
    pauseAndPlayNext();
    playSearchedTrack(track);
  };

  return (
    <Fragment>
      <div className="space"></div>
      <Card
        className={`${classes.root} trending-card`}
        onClick={() => handlePlayingHotlistTrack(item)}
      >
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
            <div className="play">
              <PlayArrowIcon />
            </div>
          </div>
        </CardActionArea>
      </Card>
      <div className="space"></div>
    </Fragment>
  );
};
