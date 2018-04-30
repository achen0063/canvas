var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

pageSize(yyy)

listenMouse(yyy)

var usingEraser = false
eraser.onclick = function () {
  usingEraser = true
  btx.className = 'btx x'
}
brush.onclick = function () {
  usingEraser = true
  btx.className = 'btx'
}





function listenMouse(canvas) {
  var using = false;
  var lastPoint = { x: undefined, y: undefined }
  if (document.body.ontouchstart !== undefined) {

    canvas.ontouchstart = function (aaa) {
      using = true;
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        lastPoint = { 'x': x, 'y': y }
      }
    }
    canvas.ontouchmove = function (aaa) {
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      if (!using) { return }
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        var newPoint = { 'x': x, 'y': y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function () {
      using = false;
    }
  }
  else {
    canvas.onmousedown = function (aaa) {
      using = true;
      var x = aaa.clientX;
      var y = aaa.clientY;
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        lastPoint = { 'x': x, 'y': y }
      }
    }

    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX;
      var y = aaa.clientY;
      if (!using) { return }
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
      else {
        var newPoint = { 'x': x, 'y': y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function (aaa) {
      using = false;
    }
  }
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineWidth = 5;
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
function pageSize(canvas) {
  page()

  window.onresize = function () {
    page()
  }
  function page() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }

}

