var canvas = document.getElementById("picker");
var ctx = canvas.getContext("2d");
canvas.height = 140;
canvas.width = 140;
var x = canvas.height / 2;
var y = canvas.width / 2;

var radius = canvas.height / 2;
var counterClockwise = false;

for(var angle=0; angle<=360; angle++)
{
  var startAngle = (angle-2)*Math.PI/180;
  var endAngle = angle * Math.PI/180;
  ctx.beginPath();
  ctx.moveTo(x, y);
    /*
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.closePath();
    var gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0,'hsl('+angle+', 10%, 100%)');
    gradient.addColorStop(1,'hsl('+angle+', 100%, 50%)');
    context.fillStyle = gradient;
    */
  ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
  ctx.closePath();
  var gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0,'hsl('+angle+', 100%, 100%)');
  gradient.addColorStop(1,'hsl('+angle+', 100%, 50%)');
  ctx.fillStyle = gradient;
  ctx.fill();

  //ctx.lineWidth = 1;
  //ctx.strokeRect(220,20,60,60);
}

var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');

canvas.addEventListener('mousedown', pick);

function pick(event) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var rgba = 'rgba(' + data[0] + ', ' + data[1] +
               ', ' + data[2] + ', ' + (data[3] / 255) + ')';
    localStorage.setItem("color", JSON.stringify(data));
    setColor(data);
}

function setColor(data){
  document.getElementById('color1').style.backgroundColor = 'rgba(' + data[0] + ',' + data[1] +',' + data[2] + ',' + (data[3] / 255) + ')';
  red.value = data[0];
  green.value = data[1];
  blue.value = data[2];
  ctx.beginPath();
  //ctx.lineWidth = 1;
  //ctx.fillStyle = 'rgba(' + data[0] + ',' + data[1] +',' + data[2] + ',' + (data[3] / 255) + ')';
  //ctx.rect(220,20,60,60);
  //ctx.fill();
}

if (localStorage.getItem("color") === null) {
  localStorage.setItem("color", JSON.stringify([255,255,255,1]));
}
else{
  var storedColor = JSON.parse(localStorage.getItem("color"));
  setColor(storedColor);
}

window.addEventListener('message', receiver, false);

function receiver(e) {
   if (e.origin == '*') {
     console.log("baka");
     return;
   } else {
     var data = e.data.split(',');

    //if(data[0] == 'eyedropper')
      //setColor([data[1], data[2], data[3], data[4]]);
   }
   console.log([data[1], data[2], data[3], data[4]]);
}
