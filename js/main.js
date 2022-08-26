import { makemap } from "./map.js";
import { route_jsons } from "./coordinates.js";

class RouteLine {
  type = "Feature";
  properties = {
    stroke: "#555555",
    "stroke-width": 2,
    "stroke-opacity": 1,
  };
  coordinates = [];
}

let map = makemap();
map.on("load", () => {
  // LOAD DATA: add vector tileset from DVRPC's server
});
map.on("style.load", () => {
  const day_zero_line = {
    type: "Feature",
    properties: {
      stroke: "#555555",
      "stroke-width": 2,
      "stroke-opacity": 1,
    },
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  };

  map.addSource("day-zero", {
    type: "geojson",
    data: day_zero_line,
    // Line metrics is required to use the 'line-progress' property
    lineMetrics: true,
  });

  map.addLayer({
    id: "day-zero-line",
    type: "line",
    source: "day-zero",
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
    map.setPaintProperty("day-zero-line", "line-gradient", [
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
