function resizeButton(data){
	$.when(resize(data[0], data[1], data[2]));
}
//canvas is the canvas that will be resized
//newwidth is the width the canvas will be
//newheight is the height the canvas will be
//scale is a 1 or 0 that will trigger if the content of the canvas will remain the same size or be scaled as well; 1 is yes 0 is no
function resize(newwidth, newheight, scale) {

	var iframe = document.getElementById("theCanvasIframeId");
 	var iframe_canvas = iframe.contentDocument || iframe.contentWindow.document;
  	var canvas = iframe_canvas.getElementsByTagName("canvas")[0]; //Possibly a better, cleaner way of fixing things

	canvas.width = newwidth;
	canvas.height = newheight;
	if(scale === 1) {
		scale(canvas, newwidth, newheight)
	}
}
//canvas is the canvas that needs to be scaled
//width is the width that the canvas needs to be scaled to
//height is the height the the canvas needs to be scaled to
//only called if resize has a 1 pass 
function scale(canvas, width, height) {
	var width = canvas.width;
	var height = canvas.height;
	var temp = document.createElement("canvas");
	var tempctx = temp.getContext("2d");
	tempctx.drawImage(canvas,0,0);
	var ctx = canvas.getContext('2d');
	ctx.drawImage(temp, 0, 0, width, height);	
}
