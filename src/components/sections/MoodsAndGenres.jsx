import React, { useEffect, useContext, Fragment } from "react";
import MusicContext from "./../../context/music/musicContext";
import { Link } from "react-router-dom";

export const MoodsAndGenres = () => {
  const musicContext = useContext(MusicContext);
  const { getMoodsAndGenres, moodsAndGenres } = musicContext;

  useEffect(() => {
    getMoodsAndGenres();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {moodsAndGenres && (
        <div className="moods-and-genres-page container">
          <div className="heading">Moods & genres</div>
          <div className="subheading">Moods</div>
          <div className="section-content">
            {moodsAndGenres.moods.map((item) => (
              <Fragment key={item.params}>
                <Link
                  to={`/mood_and_genres_data/${item.params}`}
                  className="parent-of-card"
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
                <div className="gap"></div>
              </Fragment>
            ))}
          </div>
          <div className="subheading">Genres</div>
          <div className="section-content">
            {moodsAndGenres.genres.map((item) => (
              <Fragment key={item.params}>
                <Link
                  to={`/mood_and_genres_data/${item.params}`}
                  className="parent-of-card"
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
                <div className="gap"></div>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
