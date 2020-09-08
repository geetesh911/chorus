import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardMedia from "@material-ui/core/CardMedia";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import Img from "react-cool-img";

export const AlbumSection = ({ data, heading, extraData }) => {
  const { scrollLeft, scrollRight, classes, scrollClass } = extraData;
  return (
    <div className="album-section container">
      <div className="heading">{heading}</div>
      <div className="left-scroll" onClick={(e) => scrollLeft(e, scrollClass)}>
        <ArrowBackIosOutlinedIcon />
      </div>
      <div className={`data ${scrollClass}`}>
        {data &&
          data.results &&
          data.results.map((album) => (
            <Link to={`/album/${album.browseId}`} key={album.browseId}>
              <div className="album-area">
                <Card className={classes.root}>
                  <CardActionArea>
                    <div className="parent">
                      <Img
                        className="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img"
                        placeholder="https://i.ibb.co/pX3GZvJ/loading.gif"
                        src={album.thumbnails[album.thumbnails.length - 1].url}
                        error="https://i.ibb.co/b183xtL/error.png"
                        alt={album.title}
                      />
                      <div className="overlay"></div>
                      <div className="hover-overlay"></div>
                    </div>

                    <div className="song-name">{album.title}</div>
                    <div className="year">{album.year}</div>
                  </CardActionArea>
                </Card>
              </div>
            </Link>
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
