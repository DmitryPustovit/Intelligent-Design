//To be able to work on all browsers
canvas.addEventListener("mouseweheel", zoomhandler, false);
canvas.addEventListener("DOMMouseScroll" zoomhandler, false);

function zoomhandler(e) {
	canvasarray = getImage();
	if(e / 120 > 0) {
		zoom(canvasarray, .1, currentscale);
	} else {
		zoom(cavnasarray, -.1, currentscale);
	}
}

//canvasarray is the array that holds the canvases is the canvas that is to zoomed on
//currentscale is an int that gives the current scale: ie a 1, 1.1
function zoom(canvasarray, zoomlevel, currentscale) {
	for(i = 0; i < canvasarray.layers.length; i++) {
		var zoom = document.getElementById(canvasarray.layers[i].id);		//to make it work with all browsers
		zoom.style.transform = "scale(" currentscale+zoomlevel + ")";
		zoom.style.["-o-transform"] = "scale(" currentscale+zoomlevel + ")";
		zoom.style.["webkit-transform"] = "scale(" currentscale+zoomlevel + ")";
		zoom.style.["-moz-transform"] = "scale(" currentscale+zoomlevel + ")";
	}
}

