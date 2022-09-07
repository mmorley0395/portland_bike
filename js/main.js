import { makemap } from "./map.js";
import { makeAnimation, resetStarttime } from "./animate.js";

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
    visibility: "none",
    paint: {
      "line-color": "rgba(0,0,0,0)",
      "line-width": 8,
      "line-opacity": 0.7,
    },
  });
  map.setLayoutProperty("day1", "visibility");

  map.addSource("day2", {
    type: "geojson",
    data: "https://mmorley0395.github.io/portland_bike/routes/daytwo.json",
    lineMetrics: true,
  });
  map.addLayer({
    id: "day2",
    type: "line",
    source: "day2",
    visibility: "none",
    paint: {
      "line-color": "rgba(0,0,0,0)",
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
    visibility: "none",
    paint: {
      "line-color": "rgba(0,0,0,0)",
      "line-width": 8,
      "line-opacity": 0.7,
    },
  });

  map.addSource("day4", {
    type: "geojson",
    data: "https://mmorley0395.github.io/portland_bike/routes/dayfour.json",
    lineMetrics: true,
  });
  map.addLayer({
    id: "day4",
    type: "line",
    source: "day4",
    visibility: "none",
    paint: {
      "line-color": "rgba(0,0,0,0)",
      "line-width": 8,
      "line-opacity": 0.7,
    },
  });
});
map.on("idle", () => {
  // If these two layers were not added to the map, abort
  if (
    !map.getLayer("day1") ||
    !map.getLayer("day2") ||
    !map.getLayer("day3") ||
    !map.getLayer("day4")
  ) {
    return;
  }
  // Enumerate ids of the layers.
  const toggleableLayerIds = ["day1", "day2", "day3", "day4"];
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
    link.className = "inactive";
    // Show or hide layer when the toggle is clicked.
    link.onclick = function (e) {
      const clickedLayer = this.textContent;
      const maplayers = map.getStyle().layers;

      var days = [
        maplayers[80]["id"],
        maplayers[81]["id"],
        maplayers[82]["id"],
        maplayers[83]["id"],
      ];

      var nonclicked = days.filter((day) => day != clickedLayer);

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

        var b, nonclicked;
        for (b of nonclicked) {
          var element = document.querySelector(`a[id=${b}]`);
          element.toggleAttribute("class");
        }

        // console.log(nonclicked);
        // console.log(document.querySelector("a[id=day2]"));

        var d, nonclicked;
        for (d of nonclicked) {
          map.setLayoutProperty(d, "visibility", "none");
        }
        resetStarttime();
        makeAnimation(clickedLayer);
      }
    };

    const layers = document.getElementById("menu");
    layers.appendChild(link);
  }
});
