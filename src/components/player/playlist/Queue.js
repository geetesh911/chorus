import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  Fragment,
} from "react";
import { motion, useMotionValue } from "framer-motion";
import { findIndex, Position } from "./find-index";
import move from "array-move";
import playerContext from "../../../context/player/playerContext";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import Img from "react-cool-img";
// import { FixedSizeList } from "react-window";

function Playlist({
  setPosition,
  moveItem,
  i,
  SetCurrent,
  currentSongVideoID,
  songs,
  playing,
  item,
}) {
  const [isDragging, setDragging] = useState(false);

  // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = useRef(null);

  // By manually creating a reference to `dragOriginY` we can manipulate this value
  // if the user is dragging this DOM element while the drag gesture is active to
  // compensate for any movement as the items are re-positioned.
  const dragOriginY = useMotionValue(0);

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop,
    });
  });
  return (
    <motion.li
      ref={ref}
      initial={false}
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      animate={isDragging ? onTop : flat}
      // style={{ background: color, height: heights[color] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      drag="y"
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, { point }) => {
        // console.log(point);
        moveItem(i, point.y);
      }}
      positionTransition={({ delta }) => {
        if (isDragging) {
          // If we're dragging, we want to "undo" the items movement within the list
          // by manipulating its dragOriginY. This will keep the item under the cursor,
          // even though it's jumping around the DOM.
          dragOriginY.set(dragOriginY.get() + delta.y);
        }

        // If `positionTransition` is a function and returns `false`, it's telling
        // Motion not to animate from its old position into its new one. If we're
        // dragging, we don't want any animation to occur.
        return !isDragging;
      }}
    >
      <div
        className={`playlistItem ${
          currentSongVideoID === item.videoId ? "active" : ""
        }`}
      >
        <div className="thumbnail" onClick={() => SetCurrent(songs, i)}>
          <Img
            placeholder="https://i.ibb.co/pX3GZvJ/loading.gif"
            src={
              item.thumbnailBlob
                ? window.URL.createObjectURL(item.thumbnailBlob)
                : item.thumbnails[0].url
            }
            error="https://i.ibb.co/b183xtL/error.png"
            alt={item.title}
          />
          {currentSongVideoID !== item.videoId && (
            <div className="thumbnail-overlay">
              <PlayArrowIcon />
            </div>
          )}
          {currentSongVideoID === item.videoId && !playing && (
            <div className="active-paused-thumbnail-overlay">
              <PlayArrowIcon />
            </div>
          )}
          {currentSongVideoID === item.videoId && playing && (
            <div className="active-thumbnail-overlay">
              <VolumeUpIcon />
            </div>
          )}
        </div>
        <div className="details">
          <div className="title">{item.title}</div>
          <div className="bottom-details">
            <div className="artists">{item.artists}</div>
            <div className="duration">{item.duration}</div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

const Queue = () => {
  const {
    SetCurrent,
    currentSongVideoID,
    currentSong,
    nowPlaying,
    playing,
    songs,
    setSongs,
    setCurrentSongState,
  } = useContext(playerContext);

  const positions = useRef(Position).current;
  const setPosition = (i, offset) => (positions[i] = offset);
  // const history = useHistory();

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) {
      if (currentSong === i) setCurrentSongState(targetIndex);
      setSongs(move(songs, i, targetIndex));
    }
  };

  return (
    <div className="playlist-queue">
      <div className="nowPlaying">
        {nowPlaying && (
          <div className="innerPlaying">
            <div className="header">Now Playing</div>
            <div className="main-area">
              <div className="thumbnail">
                <Img
                  placeholder="https://i.ibb.co/pX3GZvJ/loading.gif"
                  src={
                    nowPlaying.thumbnailBlob
                      ? window.URL.createObjectURL(nowPlaying.thumbnailBlob)
                      : nowPlaying.thumbnails[nowPlaying.thumbnails.length - 1]
                          .url
                  }
                  error="https://i.ibb.co/b183xtL/error.png"
                  alt={nowPlaying.title}
                />
              </div>
              <div className="details">
                <div className="title">{nowPlaying.title}</div>
                <div className="bottom-details">
                  <div className="artists">{nowPlaying.artists}</div>
                  <div className="duration">{nowPlaying.duration}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="songlist">
        <div className="header">Queue</div>
        <div className="list">
          {/* <FixedSizeList
            className="List"
            height={500}
            itemCount={1000}
            itemSize={35}
            width={300}
          > */}
          <ul>
            {songs.map((item, i) => (
              <Fragment key={item.videoId}>
                {item.videoId && (
                  <Playlist
                    item={item}
                    i={i}
                    songs={songs}
                    SetCurrent={SetCurrent}
                    currentSongVideoID={currentSongVideoID}
                    playing={playing}
                    setPosition={setPosition}
                    moveItem={moveItem}
                  />
                )}
              </Fragment>
            ))}
          </ul>
          {/* </FixedSizeList> */}
        </div>
      </div>
    </div>
  );
};
// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 },
};
export default Queue;
