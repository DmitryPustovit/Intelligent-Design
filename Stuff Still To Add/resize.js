//canvas is the canvas that will be resized
//newwidth is the width the canvas will be
//newheight is the height the canvas will be
//scale is a 1 or 0 that will trigger if the content of the canvas will remain the same size or be scaled as well; 1 is yes 0 is no
function resize(canvas, newwidth, newheight, scale) {
	canvas.width = newwidth;
	canvas.height = newheight;
	if(scale === 1) {
		scale(canvas, newwidth, newheight)
	}
}
