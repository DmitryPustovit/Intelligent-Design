//Onload Code
var brush = new Brush(pen), pencil = new Brush(pencil), pen = new Brush(pen), eraser = new Brush(pen);
var canvas, ctx;
var erase;

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
  var ratio = window.devicePixelRatio;
  mouse.x = (e.pageX - $('#sketch').offset().left) * ratio; /// currentscale;
	mouse.y = (e.pageY - $('#sketch').offset().top) * ratio; /// currentscale;
}, false);

/* When the pointer comes in contact with the canvas */
document.getElementById('canvasHolder').addEventListener("pointerdown",function(e) {
	mouse.oX = mouse.x;
	mouse.oY = mouse.y;

	erase = false;
	/* Detect the brush and set it to draw */
	var tool = localStorage.getItem("tool");
	if (tool == "pencil")
		brush = pencil;
	else if (tool == "brush")
		brush = pen;
	else if (tool == "er") {
		erase = true; //Simply used as a flag, erase with all the brushes!
		//brush = eraser; //Uncomment me for no funsies.
	}

	/* Prime the brush with color */
    updateColor();

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

/* 'Paints' on the canvas */
var onPaint = function() {

	if (localStorage.getItem("tool") == "eyedropper") {
		var pixel = ctx.getImageData(mouse.x, mouse.y, 1, 1);
    	document.getElementById('colorwheel_iframe').contentWindow.setColor(pixel.data);
		return;
    }

    brush.drawLine(ctx,  new Point(mouse.oX,mouse.oY), new Point(mouse.x, mouse.y), erase);

	  mouse.oX = mouse.x;
    mouse.oY = mouse.y;
};

/* Updates the current brush's color */
function updateColor(){
	var storedNames = JSON.parse(localStorage.getItem("color1"));
  brush.setRGBA(storedNames[0], storedNames[1], storedNames[2], storedNames[3]/ 255);
}
