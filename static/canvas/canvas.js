//Onload Code
var brush = new Brush(pen), pencil = new Brush(pencil), pen = new Brush(pen);
var canvas, ctx;

if (localStorage.getItem("color1") == null ) {
  localStorage.setItem("color1", JSON.stringify([0,0,0,255]));
}

if (localStorage.getItem("color2") == null ) {
  localStorage.setItem("color2", JSON.stringify([255,255,255,255]));
}

if (localStorage.getItem("tool") === null) {
	ctx.strokeStyle = 'pencil';
}

updateColor();

//Univeral Mouse Movement Tracker //TODO
var mouse = {x: 0, y: 0, oX: 0, oY: 0};

document.getElementById('sketch').addEventListener("pointermove", function(e) {
  mouse.x = (e.pageX - $('#sketch').offset().left); /// currentscale;
	mouse.y = (e.pageY - $('#sketch').offset().top); /// currentscale;
}, false);

document.getElementById('canvasHolder').addEventListener("pointerdown",function(e) {
		updateColor();
		mouse.oX = mouse.x;
		mouse.oY = mouse.y;``
    onPaint();
		document.addEventListener('pointermove', onPaint, false);
});

document.getElementById('canvasHolder').addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);

document.getElementById('canvasHolder').addEventListener("pointerup",function(e) {
	 document.removeEventListener('pointermove', onPaint, false);
   image.layers[image.selected].data = ctx.getImageData(0,0,image.width, image.height);
   document.getElementById('layers_iframe').contentWindow.updateLayerPreview(
     image.layers[image.selected], image.width, image.height);
});

var onPaint = function() {
		if(localStorage.getItem("tool") == "pencil"){
      brush = pencil;
      brush.drawLine(ctx,  new Point(mouse.oX,mouse.oY), new Point(mouse.x, mouse.y));
		}

		if (localStorage.getItem("tool") == "er"){
      brush = pen;
	    brush.drawLine(ctx,  new Point(mouse.oX,mouse.oY), new Point(mouse.x, mouse.y), true);
	  }

		if (localStorage.getItem("tool") == "eyedropper") {
			var pixel = ctx.getImageData(mouse.x, mouse.y, 1, 1);
      document.getElementById('colorwheel_iframe').contentWindow.setColor(pixel.data);
    }

    if (localStorage.getItem("tool") == "brush") {
      brush = pen;
      brush.drawLine(ctx,  new Point(mouse.oX,mouse.oY), new Point(mouse.x, mouse.y));
    }

		mouse.oX = mouse.x;
    mouse.oY = mouse.y;
};

function updateColor(){
	var storedNames = JSON.parse(localStorage.getItem("color1"));
  brush.setRGBA(storedNames[0], storedNames[1], storedNames[2], storedNames[3]/ 255);
}
