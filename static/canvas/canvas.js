var image = {
  name : "",
  layers : [],
  selected : null,
  counter : 0,
  width: $('#sketch').width(),
  height: $('#sketch').height()
};

var brush = new Brush(pen);

//Onload Code
var canvas, ctx;

if (localStorage.getItem("color1") == null ) {
  localStorage.setItem("color1", JSON.stringify([0,0,0,255]));
}

if (localStorage.getItem("color2") == null ) {
  localStorage.setItem("color2", JSON.stringify([255,255,255,255]));
}

//updateColor();

if (localStorage.getItem("tool") === null) {
	ctx.strokeStyle = 'pencil';
}


//Univeral Mouse Movement Tracker //TODO
var mouse = {x: 0, y: 0, oX: 0, oY: 0};
//$('#sketch').mousemove(function(e) {
//  mouse.x = (e.pageX - $('#sketch').offset().left)/currentscale;
//	mouse.y = (e.pageY - $('#sketch').offset().top)/currentscale;
  //console.log("X: " + mouse.x + " Y: " + mouse.y); //DEBUG
//});
//$('#canvasHolder').pointermove(function(e) {
//  mouse.x = e.pageX - $('#sketch').offset().left;
//	mouse.y = e.pageY - $('#sketch').offset().top;
  //console.log("X: " + mouse.x + " Y: " + mouse.y); //DEBUG
//});

document.getElementById('sketch').addEventListener("pointermove", function(e) {
  mouse.x = (e.pageX - $('#sketch').offset().left); /// currentscale;
	mouse.y = (e.pageY - $('#sketch').offset().top); /// currentscale;
  //console.log("X: " + mouse.x + " Y: " + mouse.y); //DEBUG
}, false);

var brush;

document.getElementById('canvasHolder').addEventListener("pointerdown",function(e) {

    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
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

//Paint feature
		var onPaint = function() {
			ctx.lineWidth = 1;
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';
			ctx.imageSmoothingEnabled = true;
			ctx.beginPath();
			if(localStorage.getItem("tool") == "pencil"){
				ctx.globalCompositeOperation = "source-over";
				ctx.moveTo(mouse.oX,mouse.oY);
				ctx.lineTo(mouse.x,mouse.y);
				ctx.stroke();
			}
			if (localStorage.getItem("tool") == "er")
			{
	      brush.drawLine(ctx,  new Point(mouse.oX,mouse.oY), new Point(mouse.x, mouse.y), true);
	    }
			if (localStorage.getItem("tool") == "eyedropper")
			{
				var pixel = ctx.getImageData(mouse.x, mouse.y, 1, 1);
	      var data = pixel.data;
        document.getElementById('colorwheel_iframe').contentWindow.setColor(data);
			}
      if (localStorage.getItem("tool") == "brush")
      {
        brush.drawLine(ctx,  new Point(mouse.oX,mouse.oY), new Point(mouse.x, mouse.y));
      }
			mouse.oX = mouse.x;
			mouse.oY = mouse.y;

		    //ctx.lineTo(mouse.x, mouse.y);
		    //ctx.stroke();
		};

//Change Color Feature
		function updateColor(){
			var storedNames = JSON.parse(localStorage.getItem("color1"));
      brush.setRGBA(storedNames[0], storedNames[1], storedNames[2], storedNames[3]/ 255);
		}

//Paste img feature
		window.addEventListener('paste', pasteHere);

		function pasteHere(e) {
			if(e.clipboardData == false) {
				return false; //there is nothing to paste
			}
		    	var paste = e.clipboardData.items;
		    	if(paste == undefined) {
				return false //there is nothing to paste
			}
		    	for (var i = 0; i < paste.length; i++) {
		        if (paste[i].type.indexOf("image") == -1) {
				continue; //means there is no image
			}
		        var blob = paste[i].getAsFile();
		        var URLObj = window.URL || window.webkitURL;
		        var source = URLObj.createObjectURL(blob);
		        pasteTheImage(source);
		        }
		}
			//draw pasted object
		function pasteTheImage(source) {
			var pastedImage = new Image();
			pastedImage.onload = function() {
		        	ctx.drawImage(pastedImage, mouse.x, mouse.y);
			}
			pastedImage.src = source;
		}





///JUNK
//var img = new Image();

 //drawing of the test image - img1
 //img.onload = function () {
	 //draw background image
		 //ctx.drawImage(img, 0, canvas.height - 500);
		 //draw a box over the top
		 //ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
		 //ctx.fillRect(0, 0, 500, 500);
 //};

 //img.src = 'intro.jpg';
