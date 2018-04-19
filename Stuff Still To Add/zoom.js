//To be able to work on all browsers
canvas.addEventListener("mouseweheel", zoomhandler, false);
canvas.addEventListener("DOMMouseScroll" zoomhandler, false);

function zoomhandler(e) {
	if(e / 120 > 0) {
		zoom(canvasarray, .1, currentscale);
	} else {
		zoom(cavnasarray, -.1, currentscale);
	}
}

//canvasarray is the array that holds the canvases is the canvas that is to zoomed on
//currentscale is an int that gives the current scale: ie a 1, 1.1
function zoom(canvasarray, zoomlevel, currentscale) {
	for(i = 0; i < canvasarray.length; i++) {
		var canvas = document.getElementById("layer" + canvasarray[i]);
		//to make it work with all browsers
		canvas.style.transform = "scale(" currentscale+zoomlevel + ")";
		canvas.style.["-o-transform"] = "scale(" currentscale+zoomlevel + ")";
		canvas.style.["webkit-transform"] = "scale(" currentscale+zoomlevel + ")";
		canvas.style.["-moz-transform"] = "scale(" currentscale+zoomlevel + ")";
	}
}

