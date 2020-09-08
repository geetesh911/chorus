import React, { useReducer } from "react";
import DbContext from "./dbContext";
import dbReducer from "./dbReducer";
import Dexie from "dexie";
import {
  GET_HISTORY,
  GET_HISTORY_FAILED,
  GET_DOWNLOADED_SONGS,
  GET_DOWNLOADED_SONGS_FAILED,
} from "./dbTypes";
import { SET_MSG, CLEAR_MSG, SET_SEVERITY } from "../player/types";
// import axios from "axios";

const NODE_API_URL = "https://chorusmusic-api.herokuapp.com";
// const API_URL = "http://localhost:8000";

const DbState = (props) => {
  const initialState = {
    history: null,
    downloadedSongs: null,
    error: null,
    msg: "",
    openSnackbar: false,
    severity: "",
  };

  const [state, dispatch] = useReducer(dbReducer, initialState);

  // Define your database
  const db = new Dexie("chorus");

  // create new databse
  // our schema is of storing a song
  db.version(3).stores({
    songs:
      "&videoId, timestamp, playbackTimes, artists, title, duration, [downloadState+timestamp]",
  });

  db.version(2).stores({});

  db.open().catch((err) => {
    console.log(err.stack || err);
  });

  const getHistory = async () => {
    try {
      const history = await db.songs
        .orderBy("timestamp")
        .limit(500)
        .reverse()
        .toArray();
      dispatch({ type: GET_HISTORY, payload: history });
    } catch (err) {
      dispatch({ type: GET_HISTORY_FAILED, payload: err.response });
    }
  };

  const updateHistory = async (data) => {
    data.timestamp = Date.now();
    data.playbackTimes = 1;
    // data.downloadState = "false";
    const song = await db.songs.get({ videoId: data.videoId });

    if (song) {
      db.songs.update(data.videoId, {
        timestamp: Date.now(),
        playbackTimes: song.playbackTimes + 1,
      });
    } else {
      db.songs.add(data);
    }

    getHistory();
  };

  const getDownloadedSongs = async () => {
    try {
      const songs = await db.songs
        .where("[downloadState+timestamp]") //this will filter song based on time and downloaded
        .between(["true", Dexie.minKey], ["true", Dexie.maxKey])
        .reverse()
        .toArray();

      dispatch({ type: GET_DOWNLOADED_SONGS, payload: songs });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_DOWNLOADED_SONGS_FAILED, payload: err.response });
    }
  };

  const setMsg = (msg) => dispatch({ type: SET_MSG, payload: msg });
  const clearMsg = () => dispatch({ type: CLEAR_MSG });
  const setSeverity = (severity) =>
    dispatch({ type: SET_SEVERITY, payload: severity });

  const downloadSong = async (data) => {
    try {
      setSeverity("info");
      setMsg("Downloading...");
      if (typeof data.artists !== "string") {
        let artistsText = "";
        for (let i = 0; i < data.artists.length; i++) {
          if (i === data.artists.length - 1)
            artistsText += data.artists[i].name;
          else artistsText += data.artists[i].name + ", ";
        }
        data.artists = artistsText;
      }

      let URL = "";
      let getUrl = await fetch(`${NODE_API_URL}/song?id=${data.videoId}`);
      URL = await getUrl.text();
      const [audioBlob, thumbnailBlob] = await Promise.all([
        fetchBlob(URL),
        fetchBlob(`https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`),
      ]);
      data.timestamp = Date.now();
      data.downloadState = "true";
      data.audioBlob = audioBlob;
      data.thumbnailBlob = thumbnailBlob;

      const song = await db.songs.get({ videoId: data.videoId });

      if (song) {
        db.songs.update(data.videoId, {
          timestamp: Date.now(),
          playbackTimes: song.playbackTimes + 1,
          downloadState: "true",
          audioBlob,
          thumbnailBlob,
        });
      } else {
        db.songs.add(data);
      }

      getHistory();
      getDownloadedSongs();
      setSeverity("success");
      setMsg("Downloaded");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBlob = async (URL) => {
    try {
      const res = await fetch(`${NODE_API_URL}/proxy/${URL}`);
      const blob = await res.blob();

      return blob;
    } catch (err) {
      fetchBlob();
    }
  };

  return (
    <DbContext.Provider
      value={{
        history: state.history,
        downloadedSongs: state.downloadedSongs,
        openSnackbar: state.openSnackbar,
        msg: state.msg,
        severity: state.severity,
        error: state.error,
        updateHistory,
        getHistory,
        downloadSong,
        setMsg,
        clearMsg,
        getDownloadedSongs,
        setSeverity,
      }}
    >
      {props.children}
    </DbContext.Provider>
  );
};

export default DbState;
