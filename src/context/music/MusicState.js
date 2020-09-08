import React, { useReducer } from "react";
import MusicContext from "./musicContext";
import musicReducer from "./musicReducer";
import {
  MUSIC_GET_TRENDING,
  MUSIC_GET_TRENDING_FAILED,
  MUSIC_GET_EXPLORE,
  MUSIC_GET_EXPLORE_FAILED,
  GET_PLAYLIST,
  GET_PLAYLIST_FAILED,
  CHANGE_CURRENT_PAGE,
  GET_PLAYLISTS_DATA,
  GET_PLAYLISTS_DATA_FAILED,
  SEARCH_TRACK,
  SEARCH_TRACK_FAILED,
  GET_TRACK_AUDIO,
  GET_TRACK_AUDIO_FAILED,
  GET_RECOMMENDED_PLAYLIST,
  GET_RECOMMENDED_PLAYLIST_FAILED,
  GET_ARTIST,
  GET_ARTIST_FAILED,
  GET_ALBUM,
  GET_ALBUM_FAILED,
  GET_NEW_RELEASES,
  GET_NEW_RELEASES_FAILED,
  GET_MOODS_AND_GENRES,
  GET_MOODS_AND_GENRES_FAILED,
  GET_MOODS_AND_GENRES_DATA,
  GET_MOODS_AND_GENRES_DATA_FAILED,
} from "../musicTypes";
import axios from "axios";
// import _ from "lodash";
// import axClient from "../../utils/youtubeSearch";
// import artistData from "../../components/header/artist.json";

const NODE_API_URL = "https://chorusmusic-api.herokuapp.com";
const API_URL = "https://flick-py-api.herokuapp.com";

const MusicState = (props) => {
  const initialState = {
    trending: null,
    explore: null,
    recommendedPlaylists: [],
    playlists: [],
    playlist: null,
    newReleases: [],
    moodsAndGenres: null,
    moodsAndGenresData: null,
    searchResults: [],
    artist: null,
    album: null,
    loading: false,
    API_URL: API_URL,
    currentPage: "home",
    error: null,
  };

  const [state, dispatch] = useReducer(musicReducer, initialState);

  const getNewReleases = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/get_new_releases/`);
      dispatch({ type: GET_NEW_RELEASES, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_NEW_RELEASES_FAILED, payload: err.response });
    }
  };

  const getMoodsAndGenres = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/get_mood_and_genres/`);
      dispatch({ type: GET_MOODS_AND_GENRES, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_MOODS_AND_GENRES_FAILED, payload: err.response });
    }
  };

  const getMoodsAndGenresData = async (params) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/get_mood_and_genres_data/?params=${params}`
      );
      dispatch({ type: GET_MOODS_AND_GENRES_DATA, payload: res.data });
    } catch (err) {
      dispatch({
        type: GET_MOODS_AND_GENRES_DATA_FAILED,
        payload: err.response,
      });
    }
  };

  const getTrendingVideos = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/get_playlist_data/?id=${"RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g"}`
      );
      const data = res.data;

      for (let track of data.tracks) {
        let artistsText = "";
        for (let i = 0; i < track.artists.length; i++) {
          if (i === track.artists.length - 1)
            artistsText += track.artists[i].name;
          else artistsText += track.artists[i].name + ", ";
        }
        track.artists = artistsText;
      }

      dispatch({ type: MUSIC_GET_TRENDING, payload: data });
    } catch (err) {
      dispatch({ type: MUSIC_GET_TRENDING_FAILED, payload: err.response });
    }
  };

  const getExploreData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/get_explore_data/`);
      const data = res.data;

      dispatch({ type: MUSIC_GET_EXPLORE, payload: data });
    } catch (err) {
      dispatch({ type: MUSIC_GET_EXPLORE_FAILED, payload: err.response });
    }
  };

  const getPlaylist = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/api/get_playlist_data/?id=${id}`);
      let data = res.data;

      for (let track of data.tracks) {
        let artistsText = "";
        for (let i = 0; i < track.artists.length; i++) {
          if (i === track.artists.length - 1)
            artistsText += track.artists[i].name;
          else artistsText += track.artists[i].name + ", ";
        }
        track.artists = artistsText;
      }

      data.tracks = data.tracks.filter((item) => item.videoId !== null);

      dispatch({ type: GET_PLAYLIST, payload: data });
    } catch (err) {
      dispatch({ type: GET_PLAYLIST_FAILED, payload: err.response });
    }
  };

  const getRecommendedPlaylists = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/get_recommended_playlists/`);
      dispatch({ type: GET_RECOMMENDED_PLAYLIST, payload: res.data });
    } catch (err) {
      dispatch({
        type: GET_RECOMMENDED_PLAYLIST_FAILED,
        payload: err.response,
      });
    }
  };

  const getSearchResults = async (query) => {
    try {
      const res = await axios.get(`${API_URL}/api/search/?query=${query}`);
      // res.data = _.unionBy(res.data, "videoId");
      dispatch({ type: SEARCH_TRACK, payload: res.data });
    } catch (err) {
      dispatch({ type: SEARCH_TRACK_FAILED, payload: err.response });
    }
  };

  const getFilteredSearchResults = async (query, filter) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/search/?query=${query}&filter=${filter}`
      );
      dispatch({ type: SEARCH_TRACK, payload: res.data });
    } catch (err) {
      dispatch({ type: SEARCH_TRACK_FAILED, payload: err.response });
    }
  };

  const getPlaylistData = async (data, category, heading) => {
    try {
      let responseData = [];
      for (let item of data) {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${item.id}&key=AIzaSyCZIa7XXX7zmrgkElM4CHalfTl0zWyPKKQ`
        );
        let resObj = {};
        resObj.id = item.id;
        resObj.title = res.data.items[0].snippet.title;
        resObj.thumbnailURL = res.data.items[0].snippet.thumbnails.standard.url;
        responseData.push(resObj);
      }
      let obj = {};
      obj.playlistTitle = heading;
      obj.className = category;
      obj.data = responseData;
      dispatch({ type: GET_PLAYLISTS_DATA, payload: obj });
    } catch (err) {
      dispatch({ type: GET_PLAYLISTS_DATA_FAILED, payload: err.response });
    }
  };

  const getTrackAudio = async (id) => {
    try {
      const res = await axios.get(`${NODE_API_URL}/song?id=${id}`);
      res.data = `${NODE_API_URL}/proxy/${res.data}`;
      dispatch({ type: GET_TRACK_AUDIO, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_TRACK_AUDIO_FAILED, payload: err.response });
    }
  };

  const getArtist = async (id) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/get_artist_data/?browseId=${id}`
      );
      dispatch({ type: GET_ARTIST, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_ARTIST_FAILED, payload: err.response });
    }
  };

  const getAlbum = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/api/get_album_data/?id=${id}`);
      dispatch({ type: GET_ALBUM, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_ALBUM_FAILED, payload: err.response });
    }
  };

  const changeCurrentPage = (page) => {
    dispatch({ type: CHANGE_CURRENT_PAGE, payload: page });
  };

  return (
    <MusicContext.Provider
      value={{
        trending: state.trending,
        newReleases: state.newReleases,
        moodsAndGenres: state.moodsAndGenres,
        moodsAndGenresData: state.moodsAndGenresData,
        explore: state.explore,
        currentPage: state.currentPage,
        recommendedPlaylists: state.recommendedPlaylists,
        playlists: state.playlists,
        playlist: state.playlist,
        artist: state.artist,
        album: state.album,
        searchResults: state.searchResults,
        API_URL: state.API_URL,
        error: state.error,
        getTrendingVideos,
        getExploreData,
        getPlaylist,
        getSearchResults,
        getFilteredSearchResults,
        getRecommendedPlaylists,
        getPlaylistData,
        getTrackAudio,
        changeCurrentPage,
        getArtist,
        getAlbum,
        getNewReleases,
        getMoodsAndGenres,
        getMoodsAndGenresData,
      }}
    >
      {props.children}
    </MusicContext.Provider>
  );
};

export default MusicState;
