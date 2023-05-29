const displayDistance = 1; // distance in px to display another photo
const nDisplay = 5; // number of pictures to display at once
const thresholdDelay = 300; // delay in milliseconds before activating the next image

const images = document.getElementsByClassName("image");

let globalIndex = 0; // used to count up the images
let lastMousePosition = { x: 0, y: 0 }; // used to get the last mouse position
let lastActivationTime = performance.now(); // time of the last activation

// function to activate photos
function activatePic(img, x, y) {
  img.dataset.status = "active";
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;
  img.style.zIndex = globalIndex; // otherwise the last pic will always be at the top
  lastMousePosition = { x: x, y: y }; // update the last mouse position
  lastActivationTime = performance.now(); // update the last activation time
}

// compute mouse distance
function mouseDistance(x, y) {
  return Math.hypot(x - lastMousePosition.x, y - lastMousePosition.y);
}

// onmousemove
window.onmousemove = (e) => {
  const currentTime = performance.now();
  if (currentTime - lastActivationTime >= thresholdDelay && mouseDistance(e.clientX, e.clientY) > displayDistance) {
    let activePic = images[globalIndex % images.length];
    let inactivePic = images[(globalIndex - nDisplay) % images.length];

    activatePic(activePic, e.clientX, e.clientY);
    if (inactivePic) {
      inactivePic.dataset.status = "inactive";
    }

    globalIndex++;
  }
};



////scroll///
function checkForVisibility() {
  var headers = document.querySelectorAll(".reveal");
  headers.forEach(function(header) {
    if (isElementInViewport(header)) {
      header.classList.add("revealVisible");
    } else {
      header.classList.remove("revealVisible");
    }
  });
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

if (window.addEventListener) {
  addEventListener("DOMContentLoaded", checkForVisibility, false);
  addEventListener("load", checkForVisibility, false);
  addEventListener("scroll", checkForVisibility, false);
}