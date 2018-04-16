//canvas is the canvas that needs to be scaled
//width is the width that the canvas needs to be scaled to
//height is the height the the canvas needs to be scaled to
//only called if resize has a 1 pass 
function scale(canvas, width, height) {
	var width = canvas.width;
	var height = canvas.height;
	var temp = document.createElement("canvas");
	var tempctx = tempCanvas.getContext("2d");
	tempctx.drawImage(canvas,0,0);
	var ctx = canvas.getContext('2d');
	ctx.drawImage(temp, 0, 0, width, height);	
}
