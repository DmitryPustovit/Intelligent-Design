//canvasarray is the array that holds the canvases is the canvas that is to zoomed on
//currentscale is an int that gives the current scale: ie a 1, 1.1
function zoom(canvasarray, zoomlevel, currentscale) {
	for(i = 0; i < canvasarray.length; i++) {
		var canvas = document.getElementById("layer" + canvasarray[i]);
		//to make it work with all browsers
		canvas.style.transform = "scale(" currentscale+.1 + ")";
		canvas.style.["-o-transform"] = "scale(" currentscale+.1 + ")";
		canvas.style.["webkit-transform"] = "scale(" currentscale+.1 + ")";
		canvas.style.["-moz-transform"] = "scale(" currentscale+.1 + ")";
	}
}

