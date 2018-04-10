
//Onload Code
var canvas, ctx, width = document.documentElement.clientWidth, height = document.documentElement.clientHeight;
createLayer(1);
selectLayer(1);

//Fills first layer with white
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

bPencil = new Brush(pencil);
bPen = new Brush(pen);
bHorizontalBar = new Brush(horizontalBar);
bVerticalBar = new Brush(verticalBar);
bBubbles = new Brush(bubbles);
bClouds = new Brush(clouds);
blank = new Brush(blank);
bTwirl = new Brush(twirl);
spaz = new Brush(spaz);

if (localStorage.getItem("color") === null) {
  localStorage.setItem("color", JSON.stringify([255,255,255,1]));
}

updateColor();

if (localStorage.getItem("tool") === null) {
	ctx.strokeStyle = 'pencil';
}


//Univeral Mouse Movement Tracker
var mouse = {x: 0, y: 0, oX: 0, oY: 0};
$(document).mousemove(function(e) {
  mouse.x = e.pageX;
	mouse.y = e.pageY;
});

var brush;

$(document).mousedown(function(e) {
		if (localStorage.getItem("tool") != "none")
				blank.assign();

    bPencil.setCanvas(canvas);
    bPen.setCanvas(canvas);
    bHorizontalBar.setCanvas(canvas);
    bVerticalBar.setCanvas(canvas);
    bBubbles.setCanvas(canvas);
    bClouds.setCanvas(canvas);
    blank.setCanvas(canvas);
    bTwirl.setCanvas(canvas);
    spaz.setCanvas(canvas);

    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
		updateColor();
		mouse.oX = mouse.x;
		mouse.oY = mouse.y;``
		document.addEventListener('mousemove', onPaint, false);
});

$(document).mouseup(function(e) {
	 document.removeEventListener('mousemove', onPaint, false);
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
	      ctx.globalCompositeOperation = "destination-out";
	      ctx.arc(mouse.oX,mouse.oY,8,0,Math.PI*2,false);
	      ctx.fill();
	    }
			if (localStorage.getItem("tool") == "eyedropper")
			{
				var pixel = ctx.getImageData(mouse.x, mouse.y, 1, 1);
	      var data = pixel.data;
				parent.eyedropper(data);
				console.log("eyedropper drag");
			}
			mouse.oX = mouse.x;
			mouse.oY = mouse.y;

		    //ctx.lineTo(mouse.x, mouse.y);
		    //ctx.stroke();
		};

//Change Color Feature
		function updateColor(){
			var storedNames = JSON.parse(localStorage.getItem("color"));
			ctx.strokeStyle = 'rgba(' +storedNames[0] + ',' + storedNames[1] + ',' + storedNames[2] + ',1)';

			/*
      bPencil.setRGBA(storedNames[0],storedNames[1],storedNames[2], 1);
      bPen.setRGBA(storedNames[0],storedNames[1],storedNames[2], 1);
      bHorizontalBar.setRGBA(storedNames[0],storedNames[1],storedNames[2], 1);
      bVerticalBar.setRGBA(storedNames[0],storedNames[1],storedNames[2], 1);
      bBubbles.setRGBA(storedNames[0],storedNames[1],storedNames[2], 1);
      bClouds.setRGBA(storedNames[0],storedNames[1],storedNames[2], 1);
      blank.setRGBA(storedNames[0],storedNames[1],storedNames[2], 1);
      bTwirl.setRGBA(storedNames[0],storedNames[1],storedNames[2], 1);
      spaz.setRGBA(storedNames[0],storedNames[1],storedNames[2], 1);  */
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

		var brushWorking = false;
	function assignBrush(brush)
 	 {
		 brushWorking = true;

		 if(brush == "pencil")
 		     bPencil.assign();
		 if(brush == "pen")
			   bPen.assign();
		 if(brush == "h")
	 		   bHorizontalBar.assign();
		 if(brush == "v")
		 		 bVerticalBar.assign();
	 	 if(brush == "b")
			 	 bBubbles.assign();
		 if(brush == "c")
				 bClouds.assign();
    if(brush == "t")
     		 bTwirl.assign();
    if(brush == "s")
         spaz.assign();
 	 }


//Universal Listerer
window.addEventListener('message', receiver, false);

function receiver(e) {
   if (e.origin == '*') {
     return;
   } else {
		 var data = e.data.split(',');
		 if(data[0] == 'createLayer')
		 		createLayer(data[1]);

		if(data[0] == 'selectLayer')
	 		 selectLayer(data[1]);

		if(data[0] == 'mergeLayer')
			mergeLayers(data[1], data[2]);

		if(data[0] == 'flattenLayers')
			flattenLayers();

		if(data[0] == 'removeLayer')
				removeLayer(data[1]);

		if(data[0] == 'hideLayer')
				hideLayer(data[1], data[1]);

		if(data[0] == 'assign')
			assignBrush(data[1]);

		 console.log(data);
   }
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
