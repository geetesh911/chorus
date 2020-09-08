import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { AlbumSection } from "../atrist-page/AlbumSection";
import { leftScroll, rightScroll } from "./../../utils/scroll";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Img from "react-cool-img";
// import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "345px",
    overflow: "unset",
    marginRight: "20px",
  },
});

export const History = ({ history, handlePlaying, heading, Icon }) => {
  const scrollLeft = (e, div) => {
    leftScroll(e, div);
  };

  const scrollRight = (e, div) => {
    rightScroll(e, div);
  };
  const scrollClass = "history-area";
  const classes = useStyles();
  return (
    <div className="album-section container">
      <div className="heading" style={{ fontSize: "22px" }}>
        {heading}
        <span className="ml-2">
          <Icon />
        </span>
      </div>
      <div className="left-scroll" onClick={(e) => scrollLeft(e, scrollClass)}>
        <ArrowBackIosOutlinedIcon />
      </div>
      <div className={`data ${scrollClass}`}>
        {history.map((item) => (
          //   <Link to={`/album/${item.videoId}`}>
          <div className="album-area" key={item.videoId}>
            <Card className={classes.root} onClick={() => handlePlaying(item)}>
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
                <div className="year">{item.song}</div>
              </CardActionArea>
            </Card>
          </div>
          //   </Link>
        ))}
      </div>
      <div
        className="right-scroll"
        onClick={(e) => scrollRight(e, scrollClass)}
      >
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};
