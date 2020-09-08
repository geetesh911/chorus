import Dexie from "dexie";

// Define your database
const db = new Dexie("Melody");
// console.log(db.table());

// create new databse
// our schema is of storing a song
db.version(1).stores({
  songs:
    "&videoId, timestamp, playbackTimes, artists, title, duration, downloadState",
});

db.version(2).stores({});

db.open().catch((err) => {
  console.log(err.stack || err);
});

export const updateHistory = async (data) => {
  data.timestamp = Date.now();
  data.playbackTimes = 1;
  data.downloadState = false;
  console.log(db.songs.toArray());
  const song = await db.songs.get({ videoId: data.videoId });

  if (song) {
    db.songs.update(data.videoId, {
      timestamp: Date.now(),
      playbackTimes: song.playbackTimes + 1,
    });
  } else {
    console.log(data);
    db.songs.add(data);
  }
};
