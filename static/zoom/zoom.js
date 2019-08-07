var currentScaleRatio = 0.25;
var SIZE_RATIO = .1;
var UPPER_BOUND = 5; //Roughly a 500% zoom;
var LOWER_BOUND = 0.05;
var SKETCH_BORDER = 1.1;

$(window).bind('mousewheel DOMMouseScroll', function(event) {
    if(event.ctrlKey == true) {
        event.preventDefault();

        var zoom = .5;
		if(event.originalEvent.detail > 0) {
			zoom  = currentScaleRatio * (1 + SIZE_RATIO);
		} else {
			zoom  = currentScaleRatio * (1 - SIZE_RATIO);
		}
		doZoom(zoom);
    }
});

/* Sets and applies a zoom */
function doZoom(zoom) {
	setZoom(zoom);
	applyZoom();
}

/* Applies the current zoom */
function applyZoom(){
	$('#sketch').css('width', image.width * window.devicePixelRatio * currentScaleRatio);
	$('#sketch').css('height', image.height * window.devicePixelRatio * currentScaleRatio);

	$('#sketchScroll').css('width', $('#sketch').width() * SKETCH_BORDER);
	$('#sketchScroll').css('height', $('#sketch').height() * SKETCH_BORDER);
  //document.getElementById('canvasHolder').scrollTop = $('#canvasHolder').prop("scrollHeight") / 2;
  //console.log(document.getElementById('canvasHolder').scrollTop);
  $("#canvasHolder").scrollTop($("#canvasHolder").scrollTop() + $("#sketchScroll").position().top
  - $("#canvasHolder").height()/2 + $("#sketchScroll").height()/2);
  $("#canvasHolder").scrollLeft($("#canvasHolder").scrollTop() + $("#sketchScroll").position().top
  - $("#canvasHolder").width()/2 + $("#sketchScroll").width()/2);
}

  document.getElementById('canvasHolder').addEventListener("scroll", function (){
    console.log(document.getElementById('canvasHolder').scrollTop);
  });

/* Sets the current zoom */
function setZoom(zoom){
	currentScaleRatio = Math.max(Math.min(zoom, UPPER_BOUND), LOWER_BOUND);
}

/*
function zoomhandler(e) {
	e.preventDefault();
	if(e.wheelDelta > 0) {
		zoom(.05, currentscale);
	} else {
		zoom(-.05, currentscale);
	}
} */

//canvasarray is the array that holds the canvases is the canvas that is to zoomed on
//currentscale is an int that gives the current scale: ie a 1, 1.1
function zoom(zoomlevel, currentscale) {
		var zoom = document.getElementById("sketch");
		//to make it work with all browsers
		window["currentscale"] = currentscale + zoomlevel;
		zoom.style.transform = "translate(-50%, -50%) scale(" + currentscale +"," + currentscale + ")";
}

/*
$(window).bind('mousewheel DOMMouseScroll', function(event)
{
    if(event.ctrlKey == true)
    {
        event
        if(event.originalEvent.detail > 0) {
             console.log('Down');
         }else {
             console.log('Up');
         }
    }
});
*/
