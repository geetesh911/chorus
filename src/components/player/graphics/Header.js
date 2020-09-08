import React, { useContext } from "react";
import playerContext from "./../../../context/player/playerContext";

function Header() {
  const { currentSong, songs } = useContext(playerContext);

  return (
    <header>
      <h3>Now Playing: {songs.length > 0 ? songs[currentSong].title : ""}</h3>
    </header>
  );
}

export default Header;
