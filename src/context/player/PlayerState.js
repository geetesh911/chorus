import React, { useReducer } from "react";
import playerContext from "./playerContext";
import playerReducer from "./playerReducer";
import axios from "axios";
import {
  SET_CURRENT_SONG,
  TOGGLE_RANDOM,
  TOGGLE_REPEAT,
  TOGGLE_PLAYING,
  PAUSE_AND_PLAY_NEXT,
  SET_SONGS,
  SET_CURRENT_SONG_STATE,
  SET_MSG,
  ADD_TO_QUEUE,
  PLAY_NEXT,
  SHARE,
  CLOSE_SHARE_MODAL,
  CALL_MORE_TRACKS,
  CALL_MORE_TRACKS_FAILED,
} from "./types";
import {
  PLAY_SEARCHED_TRACK,
  PLAY_SEARCHED_TRACK_FAILED,
  PLAY_PLAYLIST_TRACK,
  PLAY_PLAYLIST_TRACK_FAILED,
  SHUFFLE_PLAY_ALL_PLAYLIST_TRACK,
  SHUFFLE_PLAY_ALL_PLAYLIST_TRACK_FAILED,
  PLAY_ALL_PLAYLIST_TRACK,
  PLAY_ALL_PLAYLIST_TRACK_FAILED,
  SHUFFLE_PLAY_ALL_ARTIST_TRACK,
  SHUFFLE_PLAY_ALL_ARTIST_TRACK_FAILED,
  PLAY_ALL_ARTIST_TRACK,
  PLAY_ALL_ARTIST_TRACK_FAILED,
  PLAY_DOWNLOADED_SONGS,
  PLAY_DOWNLOADED_SONGS_FAILED,
} from "../musicTypes";
import _ from "lodash";

const NODE_API_URL = "http://localhost:1000";
// const NODE_API_URL = "https://chorusmusic-api.herokuapp.com";
const API_URL = "https://flick-py-api.herokuapp.com";

const PlayerState = (props) => {
  const initialState = {
    currentSong: 0,
    share: { link: "", title: "", image: "" },
    nowPlaying: null,
    currentSongVideoID: "",
    songs: [],
    repeat: false,
    random: false,
    playing: false,
    audio: null,
    error: null,
    msg: "",
    shareModalOpen: false,
    playingDownloaded: false,
    loading: false,
    pauseToPlayNext: false,
  };
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const getSong = async (videoId) => {
    try {
      const itemAudio = await axios.get(`${NODE_API_URL}/song?id=${videoId}`);

      return `${NODE_API_URL}/proxy/${itemAudio.data}`;
    } catch (err) {
      throw err;
    }
  };

  // Set playing state
  const togglePlaying = (playing) => {
    if (playing !== undefined && playing === false) {
      dispatch({ type: TOGGLE_PLAYING, data: true });
    } else {
      dispatch({ type: TOGGLE_PLAYING, data: state.playing ? false : true });
    }
  };
  // Set current song
  const SetCurrent = async (songs, id) => {
    if (!songs[id].audio) {
      songs[id].audio = await getSong(songs[id].videoId);
    }
    dispatch({ type: SET_CURRENT_SONG, payload: { songs, id } });
  };

  // Set msg
  const setMsg = (msg) => dispatch({ type: SET_MSG, payload: msg });

  // Prev song
  const prevSong = async (songs) => {
    try {
      if (state.repeat) {
        pauseAndPlayNext();
        songs[state.currentSong].audioBlob
          ? (songs[state.currentSong].audio = window.URL.createObjectURL(
              songs[state.currentSong].audioBlob
            ))
          : (songs[state.currentSong].audio = await getSong(
              songs[state.currentSong].videoId
            ));
        SetCurrent(songs, state.currentSong);
      } else if (state.random) {
        const index = ~~(Math.random() * state.songs.length);
        pauseAndPlayNext();

        songs[index].audioBlob
          ? (songs[index].audio = window.URL.createObjectURL(
              songs[index].audioBlob
            ))
          : (songs[index].audio = await getSong(songs[index].videoId));
        SetCurrent(songs, index);
      } else if (state.currentSong === 0) {
        pauseAndPlayNext();
        songs[state.songs.length - 1].audioBlob
          ? (songs[state.songs.length - 1].audio = window.URL.createObjectURL(
              songs[state.songs.length - 1].audioBlob
            ))
          : (songs[state.songs.length - 1].audio = await getSong(
              songs[state.songs.length - 1].videoId
            ));
        SetCurrent(songs, state.songs.length - 1);
      } else {
        pauseAndPlayNext();
        songs[state.currentSong - 1].audioBlob
          ? (songs[state.currentSong - 1].audio = window.URL.createObjectURL(
              songs[state.currentSong - 1].audioBlob
            ))
          : (songs[state.currentSong - 1].audio = await getSong(
              songs[state.songs.length - 1].videoId
            ));
        SetCurrent(songs, state.currentSong - 1);
      }
    } catch (err) {
      if (err.response && err.response.data.msg === "Not Found") {
        pauseAndPlayNext();
        setMsg("Skipping unavailable track");
        const index = ~~(Math.random() * state.songs.length);
        try {
          songs[index].audio = await getSong(songs[index].videoId);
          SetCurrent(songs, index);
        } catch (err) {
          prevSong(state.songs);
        }
      }
    }
  };
  // Next song
  const nextSong = async (songs) => {
    try {
      if (state.repeat) {
        pauseAndPlayNext();
        songs[state.currentSong].audioBlob
          ? (songs[state.currentSong].audio = window.URL.createObjectURL(
              songs[state.currentSong].audioBlob
            ))
          : (songs[state.currentSong].audio = await getSong(
              songs[state.currentSong].videoId
            ));
        SetCurrent(songs, state.currentSong);
      } else if (state.random) {
        const index = ~~(Math.random() * state.songs.length);
        pauseAndPlayNext();
        songs[index].audioBlob
          ? (songs[index].audio = window.URL.createObjectURL(
              songs[index].audioBlob
            ))
          : (songs[index].audio = await getSong(songs[index].videoId));
        SetCurrent(songs, index);
      } else if (state.currentSong === state.songs.length - 1) {
        pauseAndPlayNext();
        songs[0].audioBlob
          ? (songs[0].audio = window.URL.createObjectURL(songs[0].audioBlob))
          : (songs[0].audio = await getSong(songs[0].videoId));
        SetCurrent(songs, 0);
      } else {
        pauseAndPlayNext();
        songs[state.currentSong + 1].audioBlob
          ? (songs[state.currentSong + 1].audio = window.URL.createObjectURL(
              songs[state.currentSong + 1].audioBlob
            ))
          : (songs[state.currentSong + 1].audio = await getSong(
              songs[state.currentSong + 1].videoId
            ));
        SetCurrent(songs, state.currentSong + 1);
      }
    } catch (err) {
      if (err.response && err.response.data.msg === "Not Found") {
        pauseAndPlayNext();
        setMsg("Skipping unavailable track");
        const index = ~~(Math.random() * state.songs.length);
        try {
          songs[index].audio = await getSong(songs[index].videoId);
          SetCurrent(songs, index);
        } catch (err) {
          nextSong(state.songs);
        }
      }
    }
  };

  const pauseAndPlayNext = () => {
    dispatch({ type: PAUSE_AND_PLAY_NEXT });
  };

  // Repeat and Random
  const toggleRepeat = (id) =>
    dispatch({ type: TOGGLE_REPEAT, data: state.repeat ? false : true });
  const toggleRandom = (id) =>
    dispatch({ type: TOGGLE_RANDOM, data: state.random ? false : true });

  // End of Song
  const handleEnd = async () => {
    // Check for random and repeat options
    const index = ~~(Math.random() * state.songs.length);
    try {
      if (state.repeat) {
        pauseAndPlayNext();
        let newSongs = { ...state.songs };
        newSongs[state.currentSong].audioBlob
          ? (newSongs[state.currentSong].audio = window.URL.createObjectURL(
              newSongs[state.currentSong].audioBlob
            ))
          : (newSongs[state.currentSong].audio = await getSong(
              newSongs[state.currentSong].videoId
            ));
        return dispatch({
          type: SET_CURRENT_SONG,
          payload: {
            songs: newSongs,
            id: state.currentSong,
          },
        });
      } else if (state.random) {
        pauseAndPlayNext();
        let newSongs = { ...state.songs };
        newSongs[index].audioBlob
          ? (newSongs[index].audio = window.URL.createObjectURL(
              newSongs[index].audioBlob
            ))
          : (newSongs[index].audio = await getSong(newSongs[index].videoId));
        return dispatch({
          type: SET_CURRENT_SONG,
          payload: {
            songs: newSongs,
            id: index,
          },
        });
      } else if (state.currentSong === state.songs.length - 1) {
        if (window.navigator.onLine) {
          try {
            pauseAndPlayNext();
            const relatedVideos = await axios.get(
              `${API_URL}/api/get_related_tracks/?videoId=${
                state.songs[state.currentSong].videoId
              }`
            );

            relatedVideos.data.splice(0, 1);

            relatedVideos.data[0].audio = await getSong(
              relatedVideos.data[0].videoId
            );

            let queueItems = [...state.songs];
            for (let item of relatedVideos.data) queueItems.push(item);

            queueItems = _.uniqBy(queueItems, "videoId");

            dispatch({ type: CALL_MORE_TRACKS, payload: queueItems });

            dispatch({
              type: SET_CURRENT_SONG,
              payload: {
                songs: queueItems,
                id: state.currentSong + 1,
              },
            });
          } catch (err) {
            handleEnd();
            dispatch({ type: CALL_MORE_TRACKS_FAILED, payload: err.response });
          }
        } else {
          nextSong(state.songs);
        }
      } else {
        if (state.repeat) {
          nextSong(state.songs);
        } else if (state.currentSong === state.songs.length - 1) {
          return;
        } else {
          nextSong(state.songs);
        }
      }
    } catch (err) {
      if (err.response && err.response.data.msg === "Not Found") {
        pauseAndPlayNext();
        setMsg("Skipping unavailable track");
        let newSongs = { ...state.songs };
        try {
          newSongs[index + 1].audio = await getSong(
            newSongs[index + 1].videoId
          );
          return dispatch({
            type: SET_CURRENT_SONG,
            payload: {
              songs: newSongs,
              id: index + 1,
            },
          });
        } catch (err) {
          nextSong(state.songs);
        }
      }
    }
  };

  const playSearchedTrack = async (track) => {
    try {
      let queueItems = [];
      try {
        const relatedVideos = await axios.get(
          `${API_URL}/api/get_related_tracks/?videoId=${track.videoId}`
        );
        queueItems = relatedVideos.data;

        queueItems[0].audio = await getSong(queueItems[0].videoId);
      } catch (err) {
        queueItems[0] = track;
        queueItems[0].audio = await getSong(queueItems[0].videoId);
      }

      dispatch({ type: PLAY_SEARCHED_TRACK, payload: queueItems });
    } catch (err) {
      dispatch({ type: PLAY_SEARCHED_TRACK_FAILED, payload: err.response });
    }
  };

  const playDownloadedSongsOnline = async (track, queue) => {
    try {
      let queueItems = [];
      let index = 0;
      if (window.navigator.onLine) {
        const relatedVideos = await axios.get(
          `${API_URL}/api/get_related_tracks/?videoId=${track.videoId}`
        );
        queueItems = relatedVideos.data;
      } else {
        queueItems = queue;
        index = queue.findIndex((q) => q.videoId === track.videoId);
      }

      const itemAudio = window.URL.createObjectURL(track.audioBlob);
      queueItems[index].audio = itemAudio;

      dispatch({
        type: PLAY_DOWNLOADED_SONGS,
        payload: { tracks: queueItems, index },
      });
    } catch (err) {
      dispatch({ type: PLAY_DOWNLOADED_SONGS_FAILED, payload: err.response });
    }
  };

  const playPlaylistTrack = async (tracks, index) => {
    try {
      tracks[index].audio = await getSong(tracks[index].videoId);

      dispatch({ type: PLAY_PLAYLIST_TRACK, payload: { tracks, index } });
    } catch (err) {
      if (err.response && err.response.data.msg === "Not Found") {
        setMsg("Skipping unavailable track");
        try {
          tracks[index + 1].audio = await getSong(tracks[index + 1].videoId);

          dispatch({
            type: PLAY_PLAYLIST_TRACK,
            payload: { tracks, index: index + 1 },
          });
        } catch (err) {
          const i = ~~(Math.random() * state.songs.length);
          playPlaylistTrack(tracks, i);
        }
      } else {
        dispatch({ type: PLAY_PLAYLIST_TRACK_FAILED, payload: err.response });
      }
    }
  };

  const playAllPlaylistTrack = async (tracks) => {
    try {
      tracks[0].audio = await getSong(tracks[0].videoId);

      dispatch({ type: PLAY_ALL_PLAYLIST_TRACK, payload: tracks });
    } catch (err) {
      if (err.response && err.response.data.msg === "Not Found") {
        setMsg("Skipping unavailable track");
        try {
          tracks[1].audio = await getSong(tracks[1].videoId);

          dispatch({
            type: PLAY_ALL_PLAYLIST_TRACK,
            payload: { tracks, index: 1 },
          });
        } catch (err) {
          const i = ~~(Math.random() * state.songs.length);
          playPlaylistTrack(tracks, i);
        }
      } else {
        dispatch({
          type: PLAY_ALL_PLAYLIST_TRACK_FAILED,
          payload: err.response,
        });
      }
    }
  };

  const shufflePlayAllPlaylistTrack = async (tracks) => {
    try {
      const index = ~~(Math.random() * tracks.length);
      tracks[index].audio = await getSong(tracks[index].videoId);

      dispatch({
        type: SHUFFLE_PLAY_ALL_PLAYLIST_TRACK,
        payload: { tracks, index },
      });
    } catch (err) {
      if (err.response && err.response.data.msg === "Not Found") {
        const index = ~~(Math.random() * tracks.length);
        setMsg("Skipping unavailable track");
        try {
          tracks[index].audio = await getSong(tracks[index].videoId);

          dispatch({
            type: SHUFFLE_PLAY_ALL_PLAYLIST_TRACK,
            payload: { tracks, index },
          });
        } catch (err) {
          shufflePlayAllPlaylistTrack(tracks);
        }
      } else {
        dispatch({
          type: SHUFFLE_PLAY_ALL_PLAYLIST_TRACK_FAILED,
          payload: err.response,
        });
      }
    }
  };

  const shufflePlayAllArtistTracks = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/api/get_playlist_data/?id=${id}`);
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

      const index = ~~(Math.random() * data.tracks.length);

      data.tracks[index].audio = await getSong(data.tracks[index].videoId);

      dispatch({
        type: SHUFFLE_PLAY_ALL_ARTIST_TRACK,
        payload: { tracks: data.tracks, index },
      });
    } catch (err) {
      if (err.response && err.response.data.msg === "Not Found") {
        setMsg("Skipping unavailable track");
        try {
          const res = await axios.get(
            `${API_URL}/api/get_playlist_data/?id=${id}`
          );
          const data = res.data;
          const index = ~~(Math.random() * data.tracks.length);
          data.tracks[index].audio = await getSong(data.tracks[index].videoId);

          dispatch({
            type: SHUFFLE_PLAY_ALL_PLAYLIST_TRACK,
            payload: { tracks: data.tracks, index },
          });
        } catch (err) {
          shufflePlayAllArtistTracks(id);
        }
      } else {
        dispatch({
          type: SHUFFLE_PLAY_ALL_ARTIST_TRACK_FAILED,
          payload: err.response,
        });
      }
    }
  };

  const playAllArtistTracks = async (id, index) => {
    try {
      const res = await axios.get(`${API_URL}/api/get_playlist_data/?id=${id}`);
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

      data.tracks[index].audio = await getSong(data.tracks[index].videoId);

      dispatch({
        type: PLAY_ALL_ARTIST_TRACK,
        payload: { songs: data.tracks, index },
      });
    } catch (err) {
      if (err.response && err.response.data.msg === "Not Found") {
        setMsg("Skipping unavailable track");
        try {
          const res = await axios.get(
            `${API_URL}/api/get_playlist_data/?id=${id}`
          );
          const data = res.data;
          const i = ~~(Math.random() * data.tracks.length);

          data.tracks[i].audio = await getSong(data.tracks[i].videoId);

          dispatch({
            type: SHUFFLE_PLAY_ALL_PLAYLIST_TRACK,
            payload: { tracks: data.tracks, index: i },
          });
        } catch (err) {
          shufflePlayAllArtistTracks(id);
        }
      } else {
        dispatch({
          type: PLAY_ALL_ARTIST_TRACK_FAILED,
          payload: err.response,
        });
      }
    }
  };

  const setSongs = (songs) => {
    dispatch({ type: SET_SONGS, payload: songs });
  };

  const setCurrentSongState = (index) => {
    dispatch({ type: SET_CURRENT_SONG_STATE, payload: index });
  };

  const addToQueue = (track) => {
    if (state.songs.length > 0) {
      if (typeof track.artists !== "string" && track.artists) {
        let artistsText = "";
        for (let i = 0; i < track.artists.length; i++) {
          if (i === track.artists.length - 1)
            artistsText += track.artists[i].name;
          else artistsText += track.artists[i].name + ", ";
        }
        track.artists = artistsText;
      }
      dispatch({ type: ADD_TO_QUEUE, payload: track });
    } else {
      pauseAndPlayNext();
      playSearchedTrack(track);
    }
  };

  const playNext = (track) => {
    console.log(track);
    if (state.songs.length > 0) {
      if (typeof track.artists !== "string" && track.artists) {
        let artistsText = "";
        for (let i = 0; i < track.artists.length; i++) {
          if (i === track.artists.length - 1)
            artistsText += track.artists[i].name;
          else artistsText += track.artists[i].name + ", ";
        }
        track.artists = artistsText;
      }
      dispatch({ type: PLAY_NEXT, payload: track });
    } else {
      pauseAndPlayNext();
      playSearchedTrack(track);
    }
  };

  const shareLink = (track) => {
    const link = `${NODE_API_URL}/watch/${track.videoId}`;
    const title = track.title;
    const image = track.thumbnails[track.thumbnails.length - 1].url;
    dispatch({ type: SHARE, payload: { link, title, image } });
  };
  const closeShareModal = () => {
    dispatch({ type: CLOSE_SHARE_MODAL });
  };

  return (
    <playerContext.Provider
      value={{
        currentSong: state.currentSong,
        currentSongVideoID: state.currentSongVideoID,
        songs: state.songs,
        repeat: state.repeat,
        random: state.random,
        playing: state.playing,
        nowPlaying: state.nowPlaying,
        audio: state.audio,
        pauseToPlayNext: state.pauseToPlayNext,
        loading: state.loading,
        error: state.error,
        msg: state.msg,
        share: state.share,
        shareModalOpen: state.shareModalOpen,
        nextSong,
        prevSong,
        SetCurrent,
        toggleRandom,
        toggleRepeat,
        togglePlaying,
        handleEnd,
        playSearchedTrack,
        pauseAndPlayNext,
        playPlaylistTrack,
        playAllPlaylistTrack,
        playAllArtistTracks,
        shufflePlayAllPlaylistTrack,
        shufflePlayAllArtistTracks,
        setSongs,
        setCurrentSongState,
        addToQueue,
        playNext,
        setMsg,
        shareLink,
        closeShareModal,
        playDownloadedSongsOnline,
      }}
    >
      {props.children}
    </playerContext.Provider>
  );
};

export default PlayerState;
