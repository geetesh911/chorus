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
  SHUFFLE_PLAY_ALL_ARTIST_TRACK,
  SHUFFLE_PLAY_ALL_ARTIST_TRACK_FAILED,
  PLAY_ALL_PLAYLIST_TRACK,
  PLAY_ALL_PLAYLIST_TRACK_FAILED,
  PLAY_ALL_ARTIST_TRACK,
  PLAY_ALL_ARTIST_TRACK_FAILED,
  PLAY_DOWNLOADED_SONGS,
  PLAY_DOWNLOADED_SONGS_FAILED,
} from "../musicTypes";

export default (state, action) => {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload.id,
        currentSongVideoID: action.payload.songs[action.payload.id].videoId,
        nowPlaying: action.payload.songs[action.payload.id],
        playing: true,
        pauseToPlayNext: false,
        loading: false,
      };
    case SET_CURRENT_SONG_STATE:
      return {
        ...state,
        currentSong: action.payload,
      };
    case CALL_MORE_TRACKS:
      return {
        ...state,
        songs: action.payload,
      };
    case PLAY_SEARCHED_TRACK:
      return {
        ...state,
        songs: action.payload,
        currentSong: 0,
        nowPlaying: action.payload[0],
        loading: false,
        pauseToPlayNext: false,
        playing: true,
        currentSongVideoID: action.payload[0].videoId,
      };
    case PLAY_PLAYLIST_TRACK:
      return {
        ...state,
        songs: action.payload.tracks,
        currentSong: action.payload.index,
        nowPlaying: action.payload.tracks[action.payload.index],
        loading: false,
        pauseToPlayNext: false,
        playing: true,
        currentSongVideoID: action.payload.tracks[action.payload.index].videoId,
      };
    case PLAY_DOWNLOADED_SONGS:
      return {
        ...state,
        songs: action.payload.tracks,
        currentSong: action.payload.index,
        nowPlaying: action.payload.tracks[action.payload.index],
        loading: false,
        pauseToPlayNext: false,
        playing: true,
        currentSongVideoID: action.payload.tracks[action.payload.index].videoId,
      };
    case PLAY_ALL_PLAYLIST_TRACK:
      return {
        ...state,
        songs: action.payload,
        currentSong: 0,
        nowPlaying: action.payload[0],
        loading: false,
        pauseToPlayNext: false,
        playing: true,
        currentSongVideoID: action.payload[0].videoId,
      };
    case PLAY_ALL_ARTIST_TRACK:
      return {
        ...state,
        songs: action.payload.songs,
        currentSong: action.payload.index,
        nowPlaying: action.payload.songs[action.payload.index],
        loading: false,
        pauseToPlayNext: false,
        playing: true,
        currentSongVideoID: action.payload.songs[action.payload.index].videoId,
      };
    case SHUFFLE_PLAY_ALL_PLAYLIST_TRACK:
    case SHUFFLE_PLAY_ALL_ARTIST_TRACK:
      return {
        ...state,
        songs: action.payload.tracks,
        currentSong: action.payload.index,
        nowPlaying: action.payload.tracks[action.payload.index],
        loading: false,
        pauseToPlayNext: false,
        playing: true,
        random: true,
        currentSongVideoID: action.payload.tracks[action.payload.index].videoId,
      };
    case PAUSE_AND_PLAY_NEXT:
      return {
        ...state,
        playing: false,
        pauseToPlayNext: true,
        loading: true,
      };
    case TOGGLE_RANDOM:
      return {
        ...state,
        random: action.data,
      };
    case TOGGLE_REPEAT:
      return {
        ...state,
        repeat: action.data,
      };
    case TOGGLE_PLAYING:
      return {
        ...state,
        playing: action.data,
      };
    case SET_SONGS:
      return {
        ...state,
        songs: action.payload,
      };
    case SET_MSG:
      return {
        ...state,
        msg: action.payload,
      };
    case ADD_TO_QUEUE:
      return {
        ...state,
        songs: [...state.songs, action.payload],
      };
    case PLAY_NEXT:
      let tracks = [...state.songs];
      tracks.splice(state.currentSong + 1, 0, action.payload);
      return {
        ...state,
        songs: tracks,
      };
    case SHARE:
      return {
        ...state,
        share: action.payload,
        shareModalOpen: true,
      };
    case CLOSE_SHARE_MODAL:
      return {
        ...state,
        shareModalOpen: false,
      };
    case PLAY_SEARCHED_TRACK_FAILED:
    case PLAY_PLAYLIST_TRACK_FAILED:
    case PLAY_ALL_PLAYLIST_TRACK_FAILED:
    case PLAY_ALL_ARTIST_TRACK_FAILED:
    case SHUFFLE_PLAY_ALL_PLAYLIST_TRACK_FAILED:
    case SHUFFLE_PLAY_ALL_ARTIST_TRACK_FAILED:
    case CALL_MORE_TRACKS_FAILED:
    case PLAY_DOWNLOADED_SONGS_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
