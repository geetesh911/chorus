import {
  GET_HISTORY,
  GET_HISTORY_FAILED,
  GET_DOWNLOADED_SONGS,
  GET_DOWNLOADED_SONGS_FAILED,
} from "./dbTypes";
import { SET_MSG, CLEAR_MSG, SET_SEVERITY } from "../player/types";

export default (state, action) => {
  switch (action.type) {
    case SET_MSG:
      return {
        ...state,
        msg: action.payload,
        openSnackbar: true,
      };
    case CLEAR_MSG:
      return {
        ...state,
        msg: "",
        openSnackbar: false,
      };
    case SET_SEVERITY:
      return {
        ...state,
        severity: action.payload,
      };
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case GET_DOWNLOADED_SONGS:
      return {
        ...state,
        downloadedSongs: action.payload,
      };
    case GET_HISTORY_FAILED:
    case GET_DOWNLOADED_SONGS_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
