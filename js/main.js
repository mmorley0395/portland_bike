import { makemap } from "./map.js";
import { frame, makeAnimation, startTime, duration } from "./animate.js";

export let map = makemap();

map.on("load", () => {
  map.addSource("day1", {
    type: "geojson",
    data: "https://mmorley0395.github.io/portland_bike/routes/dayone.json",
    lineMetrics: true,
  });
  map.addLayer({
    id: "day1",
    type: "line",
    source: "day1",
    paint: {
      "line-color": "rgba(101,101,101,101)",
      "line-width": 8,
      "line-opacity": 0.7,
    },
  });

  map.addSource("day2", {
    type: "geojson",
    data: "https://mmorley0395.github.io/portland_bike/routes/daytwo.json",
    lineMetrics: true,
  });
  map.addLayer({
    id: "day2",
    type: "line",
    source: "day2",
    paint: {
      "line-color": "rgba(101,101,101,101)",
      "line-width": 8,
      "line-opacity": 0.7,
    },
  });

  map.addSource("day3", {
    type: "geojson",
    data: "https://mmorley0395.github.io/portland_bike/routes/daythree.json",
    lineMetrics: true,
  });
  map.addLayer({
    id: "day3",
    type: "line",
    source: "day3",
    paint: {
      "line-color": "rgba(101,101,101,101)",
      "line-width": 8,
      "line-opacity": 0.7,
    },
  });

  // map.addSource("day4", {
  //   type: "geojson",
  //   data: "https://mmorley0395.github.io/portland_bike/routes/dayfour.json",
  //   lineMetrics: true,
  // });
  // map.addLayer({
  //   id: "day4",
  //   type: "line",
  //   source: "day4",
  //   paint: {
  //     "line-color": "rgba(101,101,101,101)",
  //     "line-width": 8,
  //     "line-opacity": 0.7,
  //   },
  // });
});
map.on("idle", () => {
  // If these two layers were not added to the map, abort
  if (!map.getLayer("day1") || !map.getLayer("day2") || !map.getLayer("day3")) {
    return;
  }
  // Enumerate ids of the layers.
  const toggleableLayerIds = ["day1", "day2", "day3"];
  // Set up the corresponding toggle button for each layer.
  for (const id of toggleableLayerIds) {
    // Skip layers that already have a button set up.
    if (document.getElementById(id)) {
      continue;
    }
    // Create a link.
    const link = document.createElement("a");
    link.id = id;
    link.href = "#";
    link.textContent = id;
    link.className = "active";
    // Show or hide layer when the toggle is clicked.
    link.onclick = function (e) {
      const clickedLayer = this.textContent;
      e.preventDefault();
      e.stopPropagation();

      const visibility = map.getLayoutProperty(clickedLayer, "visibility");

      // Toggle layer visibility by changing the layout object's visibility property.
      if (visibility === "visible") {
        map.setLayoutProperty(clickedLayer, "visibility", "none");
        this.className = "";
      } else {
        this.className = "active";
        map.setLayoutProperty(clickedLayer, "visibility", "visible");
      }
    };

    const layers = document.getElementById("menu");
    layers.appendChild(link);
  }
});
// class ControlButton {
//   onAdd(map) {
//     this.map = map;
//     this.container = document.createElement("div");
//     this.container.className = "Button";
//     this.container.textContent = "Day X";
//     return this.container;
//   }
//   onRemove() {
//     this.container.parentNode.removeChild(this.container);
//     this.map = undefined;
//   }
// }

// function add_day_one() {
//   console.log("testing if this block runs");
//   map.addLayer({
//     id: "route-line",
//     type: "line",
//     source: "day1",
//     paint: {
//       "line-color": "rgba(0,0,0,0)",
//       "line-width": 8,
//       "line-opacity": 0.7,
//     },
//   });
//   console.log("layer added successfully");
//   makeAnimation();
// }

console.log("layer added successfully");
// makeAnimation();

// const dayOne = new ControlButton();
// console.log(dayOne);
// map.addControl(dayOne);
// dayOne.container.textContent = "Day 1";
// // dayOne.container.addEventListener("click", removeAll());
// dayOne.container.addEventListener("click", add_day_one());

// function removeAll() {
//   if (map.getLayer("route-line")) map.removeLayer("route-line");
// }

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
