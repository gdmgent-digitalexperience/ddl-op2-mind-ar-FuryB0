const switchButton = document.getElementById("next-button");
const sceneEl = document.querySelector("#ar-scene");

const markers = [
  document.getElementById("marker-0"),
  document.getElementById("marker-1"),
  document.getElementById("marker-2"),
  document.getElementById("marker-3")
];

const models = [
  document.getElementById("model-0"),
  document.getElementById("model-1"),
  document.getElementById("model-2"),
  document.getElementById("model-3")
];

let activeModel = null;
let poweredUp = false;

sceneEl.addEventListener("arReady", () => {

  markers.forEach((marker, index) => {

    marker.addEventListener("targetFound", () => {
      activeModel = models[index];
      switchButton.style.display = "block";
    });

    marker.addEventListener("targetLost", () => {
      switchButton.style.display = "none";
      poweredUp = false;
      if(activeModel){
        activeModel.setAttribute("scale", "0.3 0.3 0.3");
      }
    });

  });

  switchButton.addEventListener("click", () => {
    if(!activeModel) return;

    poweredUp = !poweredUp;

    if(poweredUp){
      activeModel.setAttribute("animation", {
        property: "rotation",
        to: "0 360 0",
        loop: true,
        dur: 1000
      });
      activeModel.setAttribute("scale", "0.5 0.5 0.5");
    } else {
      activeModel.removeAttribute("animation");
      activeModel.setAttribute("scale", "0.3 0.3 0.3");
    }
  });

});