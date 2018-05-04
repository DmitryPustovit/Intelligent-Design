//Onload Code
var brush = new Brush(solidPen);
var Pencil = new Brush(pencil);
var Pen = new Brush(pen);
var Solid_Pen = new Brush(solidPen);
var H_Bar = new Brush(horizontalBar);
var V_Bar = new Brush(verticalBar);
var Bubbles = new Brush(bubbles);
var Clouds = new Brush(clouds);
var bTwirl = new Brush(twirl);
var Spaz = new Brush(spaz);
var Pac_Man = new Brush(pacMan);
var Pixel = new Brush(pixel);

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

//Univeral Mouse Movement Tracker //TODO
var mouse = {x: 0, y: 0, oX: 0, oY: 0};

document.getElementById('sketch').addEventListener("pointermove", function(e) {
var ratio = window.devicePixelRatio;
	var sScroll = document.getElementById('sketchScroll');
	var sSketch = document.getElementById('sketch');
	mouse.x = (e.pageX - $('#sketch').offset().left) * ratio; /// currentscale;
	mouse.y = (e.pageY - $('#sketch').offset().top) * ratio; /// currentscale;
	//mouse.x = sScroll.clientX;
	//mouse.y = sScroll.clientY;
}, false);

/* When the pointer comes in contact with the canvas */
document.getElementById('canvasHolder').addEventListener("pointerdown",function(e) {
	mouse.oX = mouse.x;
	mouse.oY = mouse.y;

  	var b = localStorage.getItem("brush").replace(/"/g,"");

	erase = false;
	/* Detect the brush and set it to draw */
	var tool = localStorage.getItem("tool");

	if ("Pencil" == b){
		brush = Pencil;
	} else if ("Pen" == b){
		brush = Pen;
	} else if (b == "Solid Pen"){
		brush = Solid_Pen;
	} else if ("H-Bar" == b){
		brush = H_Bar;
	} else if ("V-Bar" == b){
		brush = V_Bar;
	} else if ("Bubbles" == b){
		brush = Bubbles;
	} else if ("Clouds" == b){
		brush = Clouds;
	} else if ("Twirl" == b){
		brush = bTwirl;
	} else if ("Spaz" == b){
		brush = Spaz;
	} else if ("Pac-Man" == b){
		brush = Pac_Man;
	}

	if (tool == "er") {
		erase = true; //Simply used as a flag, erase with all the brushes!
		//brush = eraser; //Uncomment me for no funsies.
	} else if (tool == "pencil"){
		brush = Pixel;
	} else if (tool == "fill"){
    var storedNames = JSON.parse(localStorage.getItem("color1"));
		fillFromPoint(canvas, new Point(mouse.x,mouse.y), storedNames[0], storedNames[1], storedNames[2]);
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
     //console.log(canvas.toDataURL());
     if(sync)
      socket.emit('my event', {layer: image.selected, data : canvas.toDataURL()});
});

/* 'Paints' on the canvas */
var onPaint = function() {

	var tool = localStorage.getItem("tool");
	if (tool == "eyedropper") {
		var pixel = ctx.getImageData(mouse.x, mouse.y, 1, 1);
		document.getElementById('colorwheel_iframe').contentWindow.setColor(pixel.data);
		mouse.oX = mouse.x;
		mouse.oY = mouse.y;
		return;
    } else if (tool == "fill"){
		return;
	}

    //MUST BE EXPOSED, DO NOT ADD THIS TO AN IF STATEMENT!
    brush.drawLine(ctx,  new Point(mouse.oX,mouse.oY), new Point(mouse.x, mouse.y), erase);

	mouse.oX = mouse.x;
	mouse.oY = mouse.y;
};

/* Updates the current brush's color */
function updateColor(){
	var storedNames = JSON.parse(localStorage.getItem("color1"));
  brush.setRGBA(storedNames[0], storedNames[1], storedNames[2], storedNames[3]/ 255);
}
