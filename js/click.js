const btn1 = document.getElementsByClassName("button 1");
// const btn2 = document.querySelector("button 2");
// const btn3 = document.querySelector("button 3");
// const btn4 = document.querySelector("button 4");
function removeAll() {
  if (map.getLayer("route-line")) map.removeLayer("route-line");
}

btn1.addEventListener("click", removeAll());
