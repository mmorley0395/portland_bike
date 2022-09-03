import { map } from "./main.js";
export let startTime;
export const duration = 40000;
export const frame = (time) => {
  if (!startTime) startTime = time;
  const animationPhase = (time - startTime) / duration;
  const animationPhaseDisplay = animationPhase.toFixed(2);
  // Reduce the visible length of the line by using a line-gradient to cutoff the line
  // animationPhase is a value between 0 and 1 that reprents the progress of the animation
  map.setPaintProperty("route-line", "line-gradient", [
    "step",
    ["line-progress"],
    "#77dcb7",
    animationPhase,
    "rgba(0, 0, 0, 0)",
  ]);
  if (animationPhase > 1) {
    return;
  }
  window.requestAnimationFrame(frame);
};

function makeAnimation() {
  window.requestAnimationFrame(frame);
  // repeat
  setInterval(() => {
    startTime = undefined;
    window.requestAnimationFrame(frame);
  }, duration + 1500);
}

export { makeAnimation };
