import React, { useEffect, useContext } from "react";
import MusicContext from "./../../context/music/musicContext";
import { Link } from "react-router-dom";
import Img from "react-cool-img";

export const MoodsAndGenresData = (props) => {
  const musicContext = useContext(MusicContext);
  const { getMoodsAndGenresData, moodsAndGenresData } = musicContext;

  useEffect(() => {
    getMoodsAndGenresData(props.match.params.id);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {moodsAndGenresData && (
        <div className="new-relases-page mood-and-genres-data-page container">
          <div className="heading">{moodsAndGenresData.title}</div>
          <div className="subheading">Featured</div>
          <div className="content">
            {moodsAndGenresData.featured.map((item) => (
              <Link
                to={`/playlist/${item.browseId}`}
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
                      {/* <div className="artist">{item.artist}</div> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="subheading">All Playlists</div>
          <div className="content">
            {moodsAndGenresData.playlists.map((item) => (
              <Link
                to={`/playlist/${item.browseId}`}
                className="card-area"
                key={item.browseId}
              >
                <div>
                  <div className="parent">
                    <div className="card-thumbnail">
                      <img
                        src={item.thumbnails[item.thumbnails.length - 1].url}
                        alt=""
                      />
                    </div>
                    <div className="hover-overlay"></div>
                  </div>
                  <div className="card-details">
                    <div className="title">{item.title}</div>
                    <div className="bottom-details">
                      <div className="subtitle">{item.subtitle}</div>
                      {/* <div className="artist">{item.artist}</div> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
