import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardMedia from "@material-ui/core/CardMedia";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import { rightScroll } from "../../utils/scroll";
import { leftScroll } from "../../utils/scroll";
import { Link } from "react-router-dom";
import Img from "react-cool-img";

export const PlaylistSection = ({
  items,
  classes,
  heading,
  className,
  link,
}) => {
  const scrollLeft = (e, div) => {
    leftScroll(e, div);
  };

  const scrollRight = (e, div) => {
    rightScroll(e, div);
  };

  useEffect(() => {
    //eslint-disable-next-line
  }, []);

  return (
    <div className="home-section playlist">
      <div className="section-heading">{heading}</div>

      <div className="left-scroll" onClick={(e) => scrollLeft(e, className)}>
        <ArrowBackIosOutlinedIcon />
      </div>

      <div className={`section-content playlist-content ${className}`}>
        {items.map((item) => (
          <Link to={`/${link ? link : "playlist"}/${item.id}`} key={item.title}>
            <Card className={classes.root}>
              <CardActionArea>
                <div className="parent">
                  <Img
                    className="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img"
                    placeholder="https://i.ibb.co/pX3GZvJ/loading.gif"
                    src={item.thumbnailURL}
                    error="https://i.ibb.co/b183xtL/error.png"
                    alt={item.title}
                  />
                  <div className="overlay"></div>
                  <div className="hover-overlay"></div>
                </div>

                <div className="song-name">{item.title}</div>
                <div className="type">{link ? "Album" : "Playlist"}</div>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </div>

      <div className="right-scroll" onClick={(e) => scrollRight(e, className)}>
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};
