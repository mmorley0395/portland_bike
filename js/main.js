import { makemap } from "./map.js";

let map = makemap();

map.on("load", () => {
  map.addSource("day0", {
    type: "geojson",
    data: "https://mmorley0395.github.io/portland_bike/routes/dayzero.json",
    lineMetrics: true,
  });
  map.addSource("day1", {
    type: "geojson",
    data: "https://mmorley0395.github.io/portland_bike/routes/dayone.json",
    lineMetrics: true,
  });
  map.addSource("day2", {
    type: "geojson",
    data: "https://mmorley0395.github.io/portland_bike/routes/daytwo.json",
    lineMetrics: true,
  });
  map.addSource("day3", {
    type: "geojson",
    data: "https://mmorley0395.github.io/portland_bike/routes/daythree.json",
    lineMetrics: true,
  });
  map.addSource("day4", {
    type: "geojson",
    data: "https://mmorley0395.github.io/portland_bike/routes/dayfour.json",
    lineMetrics: true,
  });
});

function removeAll() {
  if (map.getLayer("route-line")) map.removeLayer("route-line");
}

function makeAnimation() {
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
  };
  if (animationPhase > 1) {
    return;
  }
  window.requestAnimationFrame(frame);
  window.requestAnimationFrame(frame);
  // repeat
  setInterval(() => {
    startTime = undefined;
    window.requestAnimationFrame(frame);
  }, duration + 1500);
}

// Control implemented as ES6 class

// map.addLayer({
//   id: "route-line",
//   type: "line",
//   source: "route",
//   paint: {
//     "line-color": "rgba(0,0,0,0)",
//     "line-width": 8,
//     "line-opacity": 0.7,
//   },
// });

class ControlButton {
  onAdd(map) {
    this.map = map;
    this.container = document.createElement("div");
    this.container.className = "Button";
    this.container.textContent = "Day X";
    return this.container;
  }
  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

const dayOne = new ControlButton();
map.addControl(dayOne);
dayOne.container.textContent = "Day 1";
// dayOne.container.addEventListener("click", removeAll());
dayOne.container.addEventListener("click", function () {
  map.addLayer({
    id: "route-line",
    type: "line",
    source: "day1",
    paint: {
      "line-color": "rgba(0,0,0,0)",
      "line-width": 8,
      "line-opacity": 0.7,
    },
  });
  makeAnimation();
});

// const dayTwo = new ControlButton();
// map.addControl(dayTwo);
// dayTwo.container.textContent = "Day 2";
// dayTwo.container.addEventListener(
//   "click",
//   map.addLayer({
//     id: "route-line",
//     type: "line",
//     source: "day2",
//     paint: {
//       "line-color": "rgba(0,0,0,0)",
//       "line-width": 8,
//       "line-opacity": 0.7,
//     },
//   })
//   // makeAnimation()
// );

// const dayThree = new ControlButton();
// map.addControl(dayThree);
// dayThree.container.textContent = "Day 3";

// const dayFour = new ControlButton();
// map.addControl(dayFour);
// dayFour.container.textContent = "Day 4";
