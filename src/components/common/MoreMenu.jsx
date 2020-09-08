import React, { useEffect, useState, useContext } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import ShareIcon from "@material-ui/icons/Share";
import GetAppIcon from "@material-ui/icons/GetApp";
import PlayerContext from "./../../context/player/playerContext";
import $ from "jquery";
import { ShareModal } from "./ShareModal";
import DbContext from "../../context/db/dbContext";
import SnackbarMsg from "./SnackbarMsg";

export default function MoreMenu({ id, track }) {
  const dbContext = useContext(DbContext);
  const { downloadSong, openSnackbar, msg, clearMsg, severity } = dbContext;

  const playerContext = useContext(PlayerContext);
  const {
    addToQueue,
    playNext,
    shareLink,
    share,
    shareModalOpen,
    closeShareModal,
    setMsg,
  } = playerContext;

  const [menu, setMenu] = useState(false);

  useEffect(() => {
    $(document).mouseup(function (e) {
      if ($(e.target).closest(`#${id}`).length === 0) {
        $(`#${id}`).hide();
        setMenu(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  const showMenu = () => {
    if (!menu) {
      $(`#${id}`).show();
      setMenu(true);
    } else {
      $(`#${id}`).hide();
      setMenu(false);
    }
  };

  const handleAddToQueue = () => {
    const song = { ...track };
    $(`#${id}`).hide();
    addToQueue(song);
  };

  const handlePlayNext = () => {
    const song = { ...track };
    $(`#${id}`).hide();
    playNext(song);
  };

  const handleShare = () => {
    $(`#${id}`).hide();
    shareLink(track);
  };

  const handleDownload = () => {
    $(`#${id}`).hide();
    downloadSong(track);
  };

  return (
    <div className="moreMenu">
      <IconButton className="menuButton" onClick={showMenu}>
        <MoreVertIcon />
      </IconButton>
      <div className="menuBody" id={id}>
        <ul>
          <li onClick={handlePlayNext}>
            <span>
              <PlaylistPlayIcon />
            </span>
            Play Next
          </li>
          <li onClick={handleAddToQueue}>
            <span>
              <QueueMusicIcon />
            </span>
            Add to Queue
          </li>
          <li
            onClick={() => {
              handleShare();
            }}
          >
            <span>
              <ShareIcon />
            </span>
            Share
          </li>
          <li
            onClick={() => {
              handleDownload();
            }}
          >
            <span>
              <GetAppIcon />
            </span>
            Download
          </li>
        </ul>
      </div>
      <ShareModal
        setMsg={setMsg}
        handleClose={closeShareModal}
        open={shareModalOpen}
        share={share}
      />
      <SnackbarMsg
        open={openSnackbar}
        severity={severity}
        msg={msg}
        clearMsg={clearMsg}
      />
    </div>
  );
}
