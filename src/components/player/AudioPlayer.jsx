import React from "react";
import Controls from "./Controls";
import Playlist from "./playlist/Queue";

export const AudioPlayer = () => {
  return (
    <div className="main audio-player">
      <div className="top">
        <div className="right">
          <Playlist />
        </div>
      </div>
      <Controls />
    </div>
  );
};
