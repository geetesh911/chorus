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

export default (state, action) => {
  switch (action.type) {
    case MUSIC_GET_TRENDING:
      return {
        ...state,
        trending: action.payload,
      };
    case MUSIC_GET_EXPLORE:
      return {
        ...state,
        explore: action.payload,
      };
    case GET_NEW_RELEASES:
      return {
        ...state,
        newReleases: action.payload,
      };
    case GET_MOODS_AND_GENRES:
      return {
        ...state,
        moodsAndGenres: action.payload,
      };
    case GET_MOODS_AND_GENRES_DATA:
      return {
        ...state,
        moodsAndGenresData: action.payload,
      };
    case SEARCH_TRACK:
      return {
        ...state,
        searchResults: action.payload,
      };
    case GET_PLAYLIST:
      return {
        ...state,
        playlist: action.payload,
      };
    case GET_ARTIST:
      return {
        ...state,
        artist: action.payload,
      };
    case GET_ALBUM:
      return {
        ...state,
        album: action.payload,
      };
    case GET_PLAYLISTS_DATA:
      return {
        ...state,
        playlists: [...state.playlists, action.payload],
      };
    case GET_RECOMMENDED_PLAYLIST:
      return {
        ...state,
        recommendedPlaylists: action.payload,
      };
    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case MUSIC_GET_TRENDING_FAILED:
    case MUSIC_GET_EXPLORE_FAILED:
    case GET_PLAYLIST_FAILED:
    case GET_PLAYLISTS_DATA_FAILED:
    case GET_MOODS_AND_GENRES_FAILED:
    case GET_MOODS_AND_GENRES_DATA_FAILED:
    case SEARCH_TRACK_FAILED:
    case GET_RECOMMENDED_PLAYLIST_FAILED:
    case GET_ARTIST_FAILED:
    case GET_ALBUM_FAILED:
    case GET_NEW_RELEASES_FAILED:
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
