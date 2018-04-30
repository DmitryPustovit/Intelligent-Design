var currentscale = 1;

window.addEventListener("mousewheel", zoomhandler, false);
window.addEventListener("DOMMouseScroll", zoomhandler, false);

function zoomhandler(e) {
	if(e.wheelDelta > 0) {
		zoom(.05, currentscale);
	} else {
		zoom(-.05, currentscale);
	}
}

//canvasarray is the array that holds the canvases is the canvas that is to zoomed on
//currentscale is an int that gives the current scale: ie a 1, 1.1
function zoom(zoomlevel, currentscale) {
		var zoom = document.getElementById("sketch");
		//to make it work with all browsers
		window["currentscale"] = currentscale + zoomlevel;
		zoom.style.transform = "translate(-50%, -50%) scale(" + currentscale +"," + currentscale + ")";
}
