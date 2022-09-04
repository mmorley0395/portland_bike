import { map } from "./main.js";
let startTime;

function day1frame(time) {
  const duration = 40000;
  if (!startTime) startTime = time;
  const day1animationPhase = (time - startTime) / duration;
  // Reduce the visible length of the line by using a line-gradient to cutoff the line
  // animationPhase is a value between 0 and 1 that reprents the progress of the animation
  map.setPaintProperty("day1", "line-gradient", [
    "step",
    ["line-progress"],
    "#77dcb7",
    day1animationPhase,
    "rgba(0, 0, 0, 0)",
  ]);
  if (day1animationPhase > 1) {
    return;
  }
  window.requestAnimationFrame(day1frame);
}

function day2frame(time) {
  const duration = 40000;
  if (!startTime) startTime = time;
  const day2animationPhase = (time - startTime) / duration;
  // Reduce the visible length of the line by using a line-gradient to cutoff the line
  // animationPhase is a value between 0 and 1 that reprents the progress of the animation
  map.setPaintProperty("day2", "line-gradient", [
    "step",
    ["line-progress"],
    "#77dcb7",
    day2animationPhase,
    "rgba(0, 0, 0, 0)",
  ]);
  if (day2animationPhase > 1) {
    return;
  }
  window.requestAnimationFrame(day2frame);
}

function day3frame(time) {
  const duration = 40000;
  if (!startTime) startTime = time;
  const day3animationPhase = (time - startTime) / duration;
  // Reduce the visible length of the line by using a line-gradient to cutoff the line
  // animationPhase is a value between 0 and 1 that reprents the progress of the animation
  map.setPaintProperty("day3", "line-gradient", [
    "step",
    ["line-progress"],
    "#77dcb7",
    day3animationPhase,
    "rgba(0, 0, 0, 0)",
  ]);
  if (day3animationPhase > 1) {
    return;
  }
  window.requestAnimationFrame(day3frame);
}

function day4frame(time) {
  const duration = 40000;
  if (!startTime) startTime = time;
  const day4animationPhase = (time - startTime) / duration;
  // Reduce the visible length of the line by using a line-gradient to cutoff the line
  // animationPhase is a value between 0 and 1 that reprents the progress of the animation
  map.setPaintProperty("day4", "line-gradient", [
    "step",
    ["line-progress"],
    "#77dcb7",
    day4animationPhase,
    "rgba(0, 0, 0, 0)",
  ]);
  if (day4animationPhase > 1) {
    return;
  }
  window.requestAnimationFrame(day4frame);
}

function makeAnimation(clickedLayer) {
  const duration = 40000;
  console.log(clickedLayer);
  if (clickedLayer == "day1") {
    window.requestAnimationFrame(day1frame);
  } else if (clickedLayer == "day2") {
    window.requestAnimationFrame(day2frame);
  } else if (clickedLayer == "day3") {
    window.requestAnimationFrame(day3frame);
  } else if (clickedLayer == "day4") {
    window.requestAnimationFrame(day4frame);
  }
  // repeat;
  setInterval(() => {
    startTime = undefined;
    if (clickedLayer == "day1") {
      window.requestAnimationFrame(day1frame);
    } else if (clickedLayer == "day2") {
      window.requestAnimationFrame(day2frame);
    } else if (clickedLayer == "day3") {
      window.requestAnimationFrame(day3frame);
    } else if (clickedLayer == "day4") {
      window.requestAnimationFrame(day4frame);
    }
  }, duration + 1500);
}

function resetStarttime() {
  startTime = 0;
}

export { makeAnimation, resetStarttime };
