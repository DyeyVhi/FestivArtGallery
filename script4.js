
document.addEventListener('mousemove', function(event) {
  var eyesContainer = document.getElementById('eyes');
  var pupils = document.getElementsByClassName('pupil');

  var mouseX = event.clientX;
  var mouseY = event.clientY;

  var eyesRect = eyesContainer.getBoundingClientRect();
  var eyesCenterX = eyesRect.left + eyesRect.width / 2;
  var eyesCenterY = eyesRect.top + eyesRect.height / 2;

  var maxOffset = 25;

  for (var i = 0; i < pupils.length; i++) {
    var pupil = pupils[i];

    var dx = mouseX - eyesCenterX;
    var dy = mouseY - eyesCenterY;
    var distance = Math.sqrt(dx * dx + dy * dy);

    var offsetX = 0;
    var offsetY = 0;

    if (distance > maxOffset) {
      var angle = Math.atan2(dy, dx);
      offsetX = Math.cos(angle) * maxOffset;
      offsetY = Math.sin(angle) * maxOffset;
    } else {
      offsetX = dx;
      offsetY = dy;
    }

    pupil.style.left = offsetX + 'px';
    pupil.style.top = offsetY + 'px';
  }
});