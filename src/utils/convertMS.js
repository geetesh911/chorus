export const convertMS = (ms) => {
  let min = Math.floor((ms / 1000 / 60) << 0);
  let sec = Math.floor((ms / 1000) % 60);

  if (sec <= 9) sec = "0" + sec.toString();

  let converted = min + ":" + sec;
  return converted;
};

export const convertToMin = (ms) => {
  let min = Math.floor((ms / 1000 / 60) << 0);
  //   let sec = Math.floor((ms / 1000) % 60);

  //   let converted = min + ":" + sec;
  return min;
};
