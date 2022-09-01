import { makemap } from "./map.js";

let map = makemap();
map.on("load", () => {});

map.on("style.load", () => {
  map.addSource("route", {
    type: "geojson",
    data: "https://mmorley0395.github.io/portland_bike/routes/dayzero.json",
    // Line metrics is required to use the 'line-progress' property
    lineMetrics: true,
  });
  map.addLayer({
    id: "route-line",
    type: "line",
    source: "route",
    paint: {
      "line-color": "rgba(0,0,0,0)",
      "line-width": 8,
      "line-opacity": 0.7,
    },
  });

  let startTime;
  const duration = 40000;
  const frame = (time) => {
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

  window.requestAnimationFrame(frame);

  // repeat
  setInterval(() => {
    startTime = undefined;
    window.requestAnimationFrame(frame);
  }, duration + 1500);
});
