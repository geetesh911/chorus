import React, { useContext, useEffect } from "react";
import DbContext from "./../../context/db/dbContext";
import { History } from "../Library/History";
import HistoryIcon from "@material-ui/icons/History";
// import GetAppIcon from "@material-ui/icons/GetApp";
import PlayerContext from "./../../context/player/playerContext";
import LibraryTabs from "./../Library/LibraryTabs";
import { DownloadedSongs } from "./../Library/DownloadedSongs";

export const Library = () => {
  const dbContext = useContext(DbContext);
  const {
    getDownloadedSongs,
    getHistory,
    history,
    downloadedSongs,
  } = dbContext;

  const playerContext = useContext(PlayerContext);
  const {
    pauseAndPlayNext,
    playDownloadedSongsOnline,
    playSearchedTrack,
    playing,
    currentSongVideoID,
  } = playerContext;

  useEffect(() => {
    getHistory();
    getDownloadedSongs();
    // eslint-disable-next-line
  }, []);

  const handlePlayingHistoryTracks = (track) => {
    pauseAndPlayNext();
    playSearchedTrack(track);
  };

  const handlePlayingDownloadedSongs = (track, queue) => {
    pauseAndPlayNext();
    playDownloadedSongsOnline(track, queue);
  };

  return (
    <div className="library artist-page container">
      <div className="history content-area">
        <div className="heading">
          {history && history.length > 0 && (
            <History
              heading="Recently Played"
              history={history}
              Icon={HistoryIcon}
              handlePlaying={handlePlayingHistoryTracks}
            />
          )}
          {history && downloadedSongs && (
            <LibraryTabs
              tabItems={[
                {
                  label: "downloads",
                  Component: (
                    <DownloadedSongs
                      data={downloadedSongs}
                      extraData={{
                        playing,
                        currentSongVideoID,
                        handlePlaying: handlePlayingDownloadedSongs,
                      }}
                    />
                  ),
                },
                // {
                //   label: "Playlists",
                //   Component: (
                //     <History
                //       heading="Recently Played"
                //       history={history}
                //       Icon={HistoryIcon}
                //       handlePlaying={handlePlayingHistoryTracks}
                //     />
                //   ),
                // },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
