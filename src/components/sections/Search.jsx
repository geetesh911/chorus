import React, { useContext, useEffect, useState, Fragment } from "react";
import MusicContext from "./../../context/music/musicContext";
import $ from "jquery";
import PlayerContext from "./../../context/player/playerContext";
import { SongSearchResult } from "../common/SongSearchResult";
import { ArtistSearchResult } from "./../common/ArtistSearchResult";
import { AlbumSearchResult } from "./../common/AlbumSearchResult";
import { useHistory } from "react-router-dom";
import { PlaylistSearchResult } from "./../common/PlaylistSearchResult";
import CloseIcon from "@material-ui/icons/Close";

export const Search = () => {
  const musicContext = useContext(MusicContext);
  const {
    searchResults,
    getSearchResults,
    getFilteredSearchResults,
    getArtist,
    getAlbum,
    getPlaylist,
  } = musicContext;
  const playerContext = useContext(PlayerContext);
  const {
    playSearchedTrack,
    pauseAndPlayNext,
    currentSongVideoID,
    playing,
  } = playerContext;

  const history = useHistory();

  const [filterActive, setFilterActive] = useState({
    songs: false,
    albums: false,
    artists: false,
    playlists: false,
  });
  const [clearFilter, setClearFilter] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    $(".suggestions").css("display", "none");
    // $(".MuiAppBar-colorPrimary").css("background-color", "transparent");
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
    getSearchResults(history.location.pathname.split("/")[2]);
    // if (searchResults.length === 0) {
    //   getSearchResults(history.location.pathname.split("/")[2]);
    // }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    history.listen(async (location) => {
      setLoad(true);
      await getSearchResults(location.pathname.split("/")[2]);
      setLoad(false);
    });
    // eslint-disable-next-line
  }, []);

  const handlePlayingSearchedTrack = (track) => {
    // history.push(`/watch/${track.videoId}`);
    pauseAndPlayNext();
    playSearchedTrack(track);
  };

  const handleArtist = (track) => {
    getArtist(track.browseId);
    history.push(`/artist/${track.browseId}`);
  };

  const handleAlbum = (track) => {
    getAlbum(track.browseId);
    history.push(`/album/${track.browseId}`);
  };

  const handlePlaylist = (track) => {
    getPlaylist(track.browseId);
    history.push(`/playlist/${track.browseId}`);
  };

  const setFiltersToDefault = () => {
    setFilterActive({
      songs: false,
      albums: false,
      artists: false,
      playlists: false,
    });
  };

  const showFilteredResults = async (filter) => {
    if (filter === "songs") {
      setFilterActive({
        songs: true,
        albums: false,
        artists: false,
        playlists: false,
      });
    } else if (filter === "albums") {
      setFilterActive({
        songs: false,
        albums: true,
        artists: false,
        playlists: false,
      });
    } else if (filter === "artists") {
      setFilterActive({
        songs: false,
        albums: false,
        artists: true,
        playlists: false,
      });
    } else if (filter === "playlists") {
      setFilterActive({
        songs: false,
        albums: false,
        artists: false,
        playlists: true,
      });
    }
    setClearFilter(true);
    setLoad(true);
    await getFilteredSearchResults(
      history.location.pathname.split("/")[2],
      filter
    );
    setLoad(false);
  };

  return (
    <div className="searchResults">
      <div className="search-header-left"></div>
      <div className="search-header">
        {clearFilter && (
          <button
            className={`filterButtons clearFilter active`}
            onClick={async () => {
              setFiltersToDefault();
              setLoad(true);
              await getSearchResults(history.location.pathname.split("/")[2]);
              setLoad(false);
              setClearFilter(false);
            }}
          >
            <CloseIcon />
          </button>
        )}
        <button
          className={`filterButtons ${filterActive.songs ? "active" : ""}`}
          onClick={() => {
            setFiltersToDefault();
            showFilteredResults("songs");
          }}
        >
          Songs
        </button>
        <button
          className={`filterButtons ${filterActive.artists ? "active" : ""}`}
          onClick={() => {
            setFiltersToDefault();
            showFilteredResults("artists");
          }}
        >
          Artists
        </button>
        <button
          className={`filterButtons ${filterActive.albums ? "active" : ""}`}
          onClick={() => {
            setFiltersToDefault();
            showFilteredResults("albums");
          }}
        >
          Albums
        </button>
        <button
          className={`filterButtons ${filterActive.playlists ? "active" : ""}`}
          onClick={() => {
            setFiltersToDefault();
            showFilteredResults("playlists");
          }}
        >
          Playlists
        </button>
      </div>
      <div className="search-header-right"></div>
      {load ? (
        <div className="loader">
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          <section className="songs">
            {searchResults.length > 0 &&
              !filterActive.songs &&
              !filterActive.albums &&
              !filterActive.artists &&
              !filterActive.playlists && <div className="heading">Songs</div>}
            {searchResults.length > 0 &&
              searchResults.map((item) => (
                <Fragment key={item.videoId + Math.random().toString()}>
                  {(item.resultType === "song" ||
                    item.resultType === "video") && (
                    <SongSearchResult
                      item={item}
                      currentSongVideoID={currentSongVideoID}
                      handlePlayingSearchedTrack={handlePlayingSearchedTrack}
                      playing={playing}
                    />
                  )}
                </Fragment>
              ))}
            {searchResults.length > 0 &&
              !filterActive.songs &&
              !filterActive.albums &&
              !filterActive.artists &&
              !filterActive.playlists && (
                <button
                  className="showAll"
                  onClick={() => showFilteredResults("songs")}
                >
                  Show All
                </button>
              )}
          </section>
          <section className="artists-main">
            {searchResults.length > 0 &&
            !filterActive.songs &&
            !filterActive.albums &&
            !filterActive.artists &&
            !filterActive.playlists ? (
              <div className="heading">Artists</div>
            ) : null}
            {searchResults.length > 0 &&
              searchResults.map((item) => (
                <Fragment key={item.browseId + Math.random().toString()}>
                  {item.resultType === "artist" && (
                    <ArtistSearchResult
                      item={item}
                      currentSongVideoID={currentSongVideoID}
                      handlePlayingSearchedTrack={() => handleArtist(item)}
                      playing={playing}
                    />
                  )}
                </Fragment>
              ))}
            {searchResults.length > 0 &&
              !filterActive.songs &&
              !filterActive.albums &&
              !filterActive.artists &&
              !filterActive.playlists && (
                <button
                  className="showAll"
                  onClick={() => showFilteredResults("artists")}
                >
                  Show All
                </button>
              )}
          </section>
          <section className="albums">
            {searchResults.length > 0 &&
              !filterActive.songs &&
              !filterActive.albums &&
              !filterActive.artists &&
              !filterActive.playlists && <div className="heading">Albums</div>}
            {searchResults.length > 0 &&
              searchResults.map((item) => (
                <Fragment key={item.browseId + Math.random().toString()}>
                  {item.resultType === "album" && (
                    <AlbumSearchResult
                      item={item}
                      currentSongVideoID={currentSongVideoID}
                      handlePlayingSearchedTrack={() => handleAlbum(item)}
                      playing={playing}
                    />
                  )}
                </Fragment>
              ))}
            {searchResults.length > 0 &&
              !filterActive.songs &&
              !filterActive.albums &&
              !filterActive.artists &&
              !filterActive.playlists && (
                <button
                  className="showAll"
                  onClick={() => showFilteredResults("albums")}
                >
                  Show All
                </button>
              )}
          </section>
          <section className="playlists">
            {searchResults.length > 0 &&
              !filterActive.songs &&
              !filterActive.albums &&
              !filterActive.artists &&
              !filterActive.playlists && (
                <div className="heading">Playlists</div>
              )}
            {searchResults.length > 0 &&
              searchResults.length > 0 &&
              searchResults.map((item) => (
                <Fragment key={item.browseId + Math.random().toString()}>
                  {item.resultType === "playlist" && (
                    <PlaylistSearchResult
                      item={item}
                      currentSongVideoID={currentSongVideoID}
                      handlePlayingSearchedTrack={() => handlePlaylist(item)}
                      playing={playing}
                    />
                  )}
                </Fragment>
              ))}
            {searchResults.length > 0 &&
              !filterActive.songs &&
              !filterActive.albums &&
              !filterActive.artists &&
              !filterActive.playlists && (
                <button
                  className="showAll"
                  onClick={() => showFilteredResults("playlists")}
                >
                  Show All
                </button>
              )}
          </section>
        </div>
      )}
    </div>
  );
};
