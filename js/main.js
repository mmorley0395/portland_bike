import { makemap } from "./map.js";

let map = makemap();
map.on("load", () => {
  // LOAD DATA: add vector tileset from DVRPC's server
});
map.on("style.load", () => {
  // https://en.wikipedia.org/wiki/Transpeninsular_Line
  const transpeninsularLine = {
    type: "Feature",
    properties: {
      stroke: "#555555",
      "stroke-width": 2,
      "stroke-opacity": 1,
    },
    geometry: {
      type: "LineString",
      coordinates: [
        [-122.68505573272704, 45.50938453263581],
        [-122.68222332000732, 45.51467743947122],
        [-122.68067836761473, 45.51732370622547],
        [-122.67866134643553, 45.516872646826776],
        [-122.67655849456786, 45.516331370775696],
        [-122.67415523529054, 45.520901982666636],
        [-122.67110824584961, 45.52009012477689],
        [-122.67037868499756, 45.521503351328604],
        [-122.67432689666748, 45.52249559556816],
        [-122.67552852630615, 45.52255573102026],
        [-122.6761293411255, 45.52144321475166],
        [-122.67939090728761, 45.51536908938486],
        [-122.6684045791626, 45.5124821464813],
        [-122.66162395477296, 45.512331780814186],
        [-122.65849113464355, 45.51230170763256],
        [-122.64595985412598, 45.51242200026267],
        [-122.64544486999512, 45.51182053454101],
        [-122.6451015472412, 45.50514383337021],
        [-122.64484405517578, 45.50388058459948],
        [-122.64458656311035, 45.49930859021302],
        [-122.6523971557617, 45.50063210045372],
        [-122.6579761505127, 45.50159463381535],
        [-122.66844749450684, 45.500993052392694],
        [-122.6741123199463, 45.5007524180238],
        [-122.67591476440428, 45.50153447596235],
        [-122.67651557922362, 45.503279027602645],
        [-122.68003463745119, 45.50388058459948],
        [-122.68106460571289, 45.5049032167422],
        [-122.68157958984375, 45.506647663994315],
        [-122.68157958984375, 45.508031152686875],
      ],
    },
  };

  map.addSource("tp-line", {
    type: "geojson",
    data: transpeninsularLine,
    // Line metrics is required to use the 'line-progress' property
    lineMetrics: true,
  });

  map.addLayer({
    id: "tp-line-line",
    type: "line",
    source: "tp-line",
    paint: {
      "line-color": "rgba(0,0,0,0)",
      "line-width": 8,
      "line-opacity": 0.7,
    },
  });

  let startTime;
  const duration = 20000;
  const frame = (time) => {
    if (!startTime) startTime = time;
    const animationPhase = (time - startTime) / duration;
    const animationPhaseDisplay = animationPhase.toFixed(2);

    // Reduce the visible length of the line by using a line-gradient to cutoff the line
    // animationPhase is a value between 0 and 1 that reprents the progress of the animation
    map.setPaintProperty("tp-line-line", "line-gradient", [
      "step",
      ["line-progress"],
      "green",
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
