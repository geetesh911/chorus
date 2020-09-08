import React, { useState, useEffect, useRef, useContext } from "react";
import playerContext from "./../../context/player/playerContext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import DbContext from "./../../context/db/dbContext";
// import { updateHistory } from "./../../utils/handleDB";
import Img from "react-cool-img";

function Controls() {
  // Global State
  const {
    currentSong,
    currentSongVideoID,
    songs,
    nextSong,
    prevSong,
    repeat,
    random,
    playing,
    toggleRandom,
    toggleRepeat,
    togglePlaying,
    handleEnd,
    loading,
    nowPlaying,
    pauseToPlayNext,
    playSearchedTrack,
    pauseAndPlayNext,
  } = useContext(playerContext);

  const dbContext = useContext(DbContext);
  const { updateHistory } = dbContext;

  const audio = useRef("audio_tag");
  const history = useHistory();

  // self State
  const [statevolum, setStateVolum] = useState(1);
  const [dur, setDur] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 <= s ? ":" : ":0") + ~~s;
  };

  // const toggleAudio = () =>
  //   audio.current.paused ? audio.current.play() : audio.current.pause();
  useEffect(() => {
    if (history.location.pathname.split("/")[1] === "watch" && !nowPlaying) {
      pauseAndPlayNext();
      playSearchedTrack({
        videoId: history.location.pathname.split("/")[2],
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (nowPlaying) {
      $(".playlist-queue").css("transform", "translateY(00vh)");
      if ($(".showQueue").css("transform") === "none")
        $(".showQueue").css("transform", "rotate(-180deg)");
      else $(".showQueue").css("transform", "");
      $("body").css("overflow-y", "hidden");
      setShowQueue(true);
    }
    // eslint-disable-next-line
  }, [songs]);

  const setupMediaSessions = () => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: nowPlaying.title,
        artist: nowPlaying.artists,
        artwork: [
          {
            src: nowPlaying.thumbnails[nowPlaying.thumbnails.length - 1].url,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });
      navigator.mediaSession.setActionHandler("play", () => {
        /* Code excerpted. */
        playAudio();
        togglePlaying(false);
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        /* Code excerpted. */
        audio.current.pause();
        togglePlaying();
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        prevSong(songs);
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        nextSong(songs);
      });
    }
  };

  const playAudio = () => {
    audio.current.play().then((d) => setupMediaSessions());
  };

  const handleVolume = (q) => {
    setStateVolum(q);
    audio.current.volume = q;
  };

  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100;
    setCurrentTime(compute);
    audio.current.currentTime = compute;
  };

  const handleShowOptions = () => {
    if (!showOptions) {
      $(".vlme").css("display", "flex");
      $(".plsoptions").css("display", "flex");
      setShowOptions(true);
    } else {
      $(".vlme").css("display", "none");
      $(".plsoptions").css("display", "none");
      setShowOptions(false);
    }
  };

  const handleShowQueue = () => {
    if (!showQueue) {
      // $(".playlist-queue").css("display", "flex");
      $(".playlist-queue").css("transform", "translateY(00vh)");
      if ($(".showQueue").css("transform") === "none")
        $(".showQueue").css("transform", "rotate(-180deg)");
      else $(".showQueue").css("transform", "");
      $("body").css("overflow-y", "hidden");
      setShowQueue(true);
      // history.push(`/watch/${currentSongVideoID}`);
    } else {
      $(".playlist-queue").css("transform", "translateY(100vh)");
      if ($(".showQueue").css("transform") === "none")
        $(".showQueue").css("transform", "rotate(-180deg)");
      else $(".showQueue").css("transform", "");
      $("body").css("overflow-y", "auto");
      if (history.location.pathname.split("/")[1] === "watch") {
        history.push("/");
      }
      setShowQueue(false);
    }
  };

  useEffect(() => {
    audio.current.volume = statevolum;
    if (playing) {
      playAudio();
    }
    if (songs.length > 0 && pauseToPlayNext) {
      !audio.current.paused && audio.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong, playing, pauseToPlayNext]);

  return (
    <>
      <div
        className={`controls ${
          songs.length > 0 || loading ? "show-controls" : ""
        }`}
      >
        <audio
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onCanPlay={(e) => setDur(e.target.duration)}
          onEnded={handleEnd}
          onLoadedData={() => updateHistory(nowPlaying)}
          ref={audio}
          type="audio/mpeg"
          preload="true"
          src={nowPlaying ? nowPlaying.audio : ""}
        />

        <div className="musicControls">
          <span className="prev" onClick={() => prevSong(songs)}>
            <SkipPreviousIcon />
          </span>

          <span
            className="play"
            // onClick={() => {
            //   togglePlaying();
            //   toggleAudio();
            // }}
          >
            {!loading && (
              <span className={!playing ? "" : "hide"}>
                <PlayArrowIcon
                  className="playIcon"
                  onClick={() => {
                    playAudio();
                    togglePlaying();
                  }}
                />
              </span>
            )}
            {!loading && (
              <span
                className={!playing ? "hide" : ""}
                onClick={() => {
                  audio.current.pause();
                  togglePlaying();
                }}
              >
                <PauseIcon className="pauseIcon" />
              </span>
            )}
            {loading && (
              <span className="spinner-border text-light" role="status"></span>
            )}
          </span>

          <span className="next" onClick={() => nextSong(songs)}>
            <SkipNextIcon />
          </span>
          <div className="time">
            <span className="currentT">{fmtMSS(currentTime)}</span>/
            <span className="totalT">{fmtMSS(dur)}</span>
          </div>
        </div>
        <div className="progressb">
          <input
            onChange={handleProgress}
            value={dur ? (currentTime * 100) / dur : 0}
            type="range"
            name="progresBar"
            className="form-control-range musicProgress"
            id="formControlRange"
          />
        </div>
        <div className="song-details">
          {nowPlaying && (
            <div className="song-details-innerDiv">
              <div className="thumbnail">
                {nowPlaying.thumbnails && (
                  <Img
                    placeholder="https://i.ibb.co/pX3GZvJ/loading.gif"
                    src={
                      nowPlaying.thumbnailBlob
                        ? window.URL.createObjectURL(nowPlaying.thumbnailBlob)
                        : nowPlaying.thumbnails[
                            nowPlaying.thumbnails.length - 1
                          ].url
                    }
                    error="https://i.ibb.co/b183xtL/error.png"
                    alt={nowPlaying.title}
                  />
                )}
              </div>
              <div className="details">
                <div className="title">{nowPlaying.title}</div>
                <div className="artist">{nowPlaying.artists}</div>
              </div>
            </div>
          )}
        </div>
        <div className="options">
          <div className="vlme">
            <input
              value={Math.round(statevolum * 100)}
              type="range"
              name="volBar"
              id="volBar"
              onChange={(e) => handleVolume(e.target.value / 100)}
            />
            <span className="volum">
              <VolumeUpIcon />
            </span>
          </div>
          <div className="plsoptions">
            <span
              onClick={toggleRandom}
              className={"random " + (random ? "active" : "")}
            >
              <ShuffleIcon />
            </span>
            <span
              onClick={toggleRepeat}
              className={"repeat " + (repeat ? "active" : "")}
            >
              <RepeatIcon />
            </span>
          </div>
          <div className="showOptions" onClick={handleShowOptions}>
            <ArrowLeftIcon />
          </div>
        </div>
        {currentSongVideoID && (
          <div className="showQueue" onClick={handleShowQueue}>
            <ArrowDropUpIcon />
            {/* {!showQueue && <ArrowDropDownIcon />} */}
          </div>
        )}
      </div>
    </>
  );
}

export default Controls;
