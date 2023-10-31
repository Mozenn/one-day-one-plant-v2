export const millisecondsToTime = (duration: number) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const hoursText = hours < 10 ? "0" + hours : hours;
  const minutesText = minutes < 10 ? "0" + minutes : minutes;
  const secondsText = seconds < 10 ? "0" + seconds : seconds;

  return hoursText + ":" + minutesText + ":" + secondsText;
};

export const cooldownBetweenDraw: number = 86400000; // 1 day in ms