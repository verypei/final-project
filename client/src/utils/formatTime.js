export default function renderTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.floor((time % 3600) % 60);

  let hourStr = String(hours);
  let minuteStr = String(minutes).padStart(2, '0');
  let secondStr = String(seconds).padStart(2, '0');

  if(hours) {
    return `${hourStr}:${minuteStr}:${secondStr}`;
  } else {
    return `${minuteStr}:${secondStr}`;
  }
}