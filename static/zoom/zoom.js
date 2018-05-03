var currentScaleRatio = 0.25;
var UPPER_BOUND = 5; //Roughly a 500% zoom;
var LOWER_BOUND = 0.05;

$(window).bind('mousewheel DOMMouseScroll', function(event) {
    if(event.ctrlKey == true) {
        event.preventDefault();
        var zoom = .5;
		if(event.originalEvent.wheelDelta > 0) {
			zoom  = currentScaleRatio * 1.2;
		} else {
			zoom  = currentScaleRatio * 0.8;
		}
		doZoom(zoom);
    }
});

function doZoom(zoom) {
	setZoom(zoom);
	applyZoom();
}

function applyZoom(){
	$('#sketch').css('width', image.width * window.devicePixelRatio * currentScaleRatio);
	$('#sketch').css('height', image.height * window.devicePixelRatio * currentScaleRatio);
		
	if($('#sketchScroll').width() < $(window).width())
		$('#sketchScroll').css('width', $('#sketch').width() * 1.4);

	if($('#sketchScroll').height() < $(window).height())
		$('#sketchScroll').css('height', $('#sketch').height() * 1.4);
}

function setZoom(zoom){
	currentScaleRatio = Math.max(Math.min(zoom, UPPER_BOUND), LOWER_BOUND);
}

/*
function zoomhandler(e) {
	if(event.ctrlKey == true)
    {
			e.preventDefault();
			if(e.originalEvent.detail > 0) {
				//zoom(.05, currentscale);
				//drawImage(imgObj, 0, 0, image.width * 0.3, imgObj.height * 0.3)
				//ctx.scale(.9, .9);
				//ctx.putImageData(image.layers[image.selected].data, 0, 0);
				console.log("zoom");
				$('#sketch').css('width', $('#sketch').width() * 2);
				$('#sketch').css('height', $('#sketch').height() * 2);
			} else {
				$('#sketch').css('width', $('#sketch').width() / 2);
				$('#sketch').css('height', $('#sketch').height() / 2);
			}
	}
} */

//canvasarray is the array that holds the canvases is the canvas that is to zoomed on
//currentscale is an int that gives the current scale: ie a 1, 1.1
//function zoom(zoomlevel, currentscale) {
//		var zoom = document.getElementById("sketch");
//		//to make it work with all browsers
//		window["currentscale"] = currentscale + zoomlevel;
//		zoom.style.transform = "translate(-50%, -50%) scale(" + currentscale +"," + currentscale + ")";
//	}

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
