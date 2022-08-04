const makemap = () => {
  // Step 1: create the "map" object
  // -------------------------------
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/dvrpcomad/cks6eiqga0tmc17p3ecw7ij53",
    center: [-122.68507221321813, 45.512064200516335],
    zoom: 12,
    pitch: 60,
  });
};

export { makemap };
