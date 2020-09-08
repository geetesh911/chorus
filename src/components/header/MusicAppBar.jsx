import React, {
  Fragment,
  cloneElement,
  useEffect,
  useState,
  useContext,
} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
// import WhatshotIcon from "@material-ui/icons/Whatshot";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import ExploreIcon from "@material-ui/icons/Explore";
import $ from "jquery";
import MusicContext from "../../context/music/musicContext";
import { Link, useHistory } from "react-router-dom";
import { LogoSVG } from "./../common/LogoSVG";
import axios from "axios";
import DbContext from "./../../context/db/dbContext";

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function MusicAppBar(props) {
  const musicContext = useContext(MusicContext);
  const {
    currentPage,
    changeCurrentPage,
    API_URL,
    getSearchResults,
  } = musicContext;
  const dbContext = useContext(DbContext);
  const { getDownloadedSongs } = dbContext;

  useEffect(() => {
    getDownloadedSongs();

    // eslint-disable-next-line
  }, []);

  let history = useHistory();

  useEffect(() => {
    $(window).scroll(function () {
      let scroll = $(this.window).scrollTop();
      if (scroll > 10) {
        $(".MuiAppBar-colorPrimary").css("background-color", "#151515");
        $(".MuiAppBar-colorPrimary").css("transition", "all 0.3s ease-in-out");
        // $(".MuiAppBar-colorPrimary").css(
        //   "box-shadow",
        //   "0 2px 10px rgba(0,0,0,.3)"
        // );
        $(".search-header").css("background-color", "#151515");
        $(".search-header").css("transition", "all 0.3s ease-in-out");
        // $(".search-header").css("box-shadow", "0 2px 10px rgba(0,0,0,.3)");
        $(".search-header-left").css("background-color", "#151515");
        $(".search-header-left").css("transition", "all 0.3s ease-in-out");
        // $(".search-header-left").css("box-shadow", "0 2px 10px rgba(0,0,0,.3)");
        $(".search-header-right").css("background-color", "#151515");
        $(".search-header-right").css("transition", "all 0.3s ease-in-out");
        $(".search-header-right").css(
          "box-shadow",
          "0 2px 10px rgba(0,0,0,.3)"
        );
        // $(".MuiAppBar-colorPrimary").css("marginTop", "0px");
      } else {
        $(".MuiAppBar-colorPrimary").css("background-color", "transparent");
        $(".MuiAppBar-colorPrimary").css("transition", "all 0.3s ease-in-out");
        $(".MuiAppBar-colorPrimary").css("box-shadow", "none");
        $(".search-header").css("background-color", "transparent");
        $(".search-header").css("transition", "all 0.3s ease-in-out");
        $(".search-header").css("box-shadow", "none");
        $(".search-header-left").css("background-color", "transparent");
        $(".search-header-left").css("transition", "all 0.3s ease-in-out");
        $(".search-header-left").css("box-shadow", "none");
        $(".search-header-right").css("background-color", "transparent");
        $(".search-header-right").css("transition", "all 0.3s ease-in-out");
        $(".search-header-right").css("box-shadow", "none");
        // $(".MuiAppBar-colorPrimary").css("marginTop", "10px");
      }
    });

    // eslint-disable-next-line
  }, []);

  const [search, setSearch] = useState("");
  const [searchBarShow, setSearchBarShow] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const getSearchSuggestions = async (searchQuery) => {
    const res = await axios.get(
      `${API_URL}/api/suggest_search?query=${searchQuery}`
    );
    let data = [];
    if (res.data.toplevel) data = res.data.toplevel.CompleteSuggestion;
    return data;
  };

  useEffect(() => {
    $(".music-search-input")
      .focusin(function (e) {
        $(".suggestions").toggle();
      })
      .focusout(function (e) {
        $(".suggestions").toggle();
      });

    if (history.location.pathname.includes("search")) {
      setSearch(history.location.pathname.split("/")[2]);
      setSearchBarShow(true);

      // getSearchResults(history.location.pathname.split("/")[2]);
    }
    $(document).mouseup(function (e) {
      if ($(e.target).closest(".suggestions").length === 0) {
        $(".suggestions").hide();
      }
    });
    // eslint-disable-next-line
  }, []);

  const showSearchBar = () => {
    setSearchBarShow(true);
  };

  const hideSearchBar = () => {
    setSearchBarShow(false);
  };

  const clearSearchBar = async (e) => {
    setSearch("");
    setSearchSuggestions([]);
  };

  const handleKeyDown = async (event) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      getSearchResults(search);
      history.push(`/search/${search}`);
      $(".suggestions").css("display", "none");
    }
  };

  const onChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      const data = await getSearchSuggestions(e.target.value);
      setSearchSuggestions(data);
    } else {
      setSearchSuggestions([]);
    }
    $(".suggestions").css("display", "block");
  };

  const displayHome = () => {
    changeCurrentPage("home");
  };

  const displayLibrary = () => {
    changeCurrentPage("library");
  };

  const displayExplore = () => {
    changeCurrentPage("explore");
  };

  const setSuggestion = async (suggestion) => {
    setSearch(suggestion);
    // console.log(search);
    getSearchResults(suggestion);
    history.push(`/search/${suggestion}`);
    $(".suggestions").css("display", "none");
  };

  const handleFocus = () => {
    $(".suggestions").css("display", "block");
  };
  const handleBlur = async () => {
    // $(".suggestions").css("display", "none");
  };

  return (
    <Fragment>
      <CssBaseline />

      <AppBar style={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <Toolbar>
          <LogoSVG classNames="logo-desktop" />
          {!searchBarShow && <LogoSVG classNames="logo-mobile" />}
          {!searchBarShow && (
            <div className="menu">
              <Link to="/">
                <div
                  className={`menu-item ${
                    currentPage === "home" ? "active" : ""
                  }`}
                  onClick={displayHome}
                >
                  <span className="mobile">
                    <HomeRoundedIcon />
                  </span>

                  <span className="desktop">Home</span>
                </div>
              </Link>
              <Link to="/explore">
                <div
                  className={`menu-item ${
                    currentPage === "explore" ? "active" : ""
                  }`}
                  onClick={displayExplore}
                >
                  <span className="mobile">
                    <ExploreIcon />
                  </span>
                  <span className="desktop">Explore</span>
                </div>
              </Link>
              <Link to="/library">
                <div
                  className={`menu-item ${
                    currentPage === "trending" ? "active" : ""
                  }`}
                  onClick={displayLibrary}
                >
                  <span className="mobile">
                    <LibraryMusicIcon />
                  </span>
                  <span className="desktop">Library</span>
                </div>
              </Link>
              <div className="menu-item" onClick={showSearchBar}>
                <SearchIcon />
              </div>
            </div>
          )}
          {searchBarShow && (
            <>
              <div className="input-group">
                <div className="input-group-prepend" onClick={hideSearchBar}>
                  <span className="input-group-text" id="basic-addon1">
                    <ArrowBackIcon />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control music-search-input"
                  placeholder="Search"
                  onKeyDown={handleKeyDown}
                  value={search}
                  onChange={onChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoFocus
                />
                <div className="input-group-append" onClick={clearSearchBar}>
                  <span className="input-group-text">
                    <CloseIcon />
                  </span>
                </div>
                <div className="suggestions">
                  {searchSuggestions.map((suggestion) => (
                    <div
                      className="suggestion"
                      onClick={() =>
                        setSuggestion(suggestion.suggestion["@data"])
                      }
                      key={suggestion.suggestion["@data"]}
                    >
                      <div className="icon">
                        <SearchIcon />
                      </div>
                      <div className="query">
                        {suggestion.suggestion["@data"]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Toolbar />
    </Fragment>
  );
}
