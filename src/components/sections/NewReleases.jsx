import React, { useEffect, useContext } from "react";
import MusicContext from "./../../context/music/musicContext";
import { Link } from "react-router-dom";
import Img from "react-cool-img";

export const NewReleases = () => {
  const musicContext = useContext(MusicContext);
  const { getNewReleases, newReleases } = musicContext;

  useEffect(() => {
    getNewReleases();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="new-relases-page container">
      <div className="heading">Albums & singles</div>
      <div className="content">
        {newReleases.map((item) => (
          <Link
            to={`/album/${item.browseId}`}
            className="card-area"
            key={item.browseId}
          >
            <div>
              <div className="parent">
                <div className="card-thumbnail">
                  <Img
                    placeholder="https://i.ibb.co/pX3GZvJ/loading.gif"
                    src={item.thumbnails[item.thumbnails.length - 1].url}
                    error="https://i.ibb.co/b183xtL/error.png"
                    alt={item.title}
                  />
                </div>
                <div className="hover-overlay"></div>
              </div>
              <div className="card-details">
                <div className="title">{item.title}</div>
                <div className="bottom-details">
                  <div className="subtitle">{item.subtitle}</div>
                  <div className="artist">{item.artist}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
