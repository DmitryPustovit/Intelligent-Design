var currentscale = 1;

$(window).bind('mousewheel DOMMouseScroll', function(event) {
    if(event.ctrlKey == true) {
        event.preventDefault();
        if(event.originalEvent.wheelDelta > 0) {
					$('#sketch').css('width', $('#sketch').width() * 2);
					$('#sketch').css('height', $('#sketch').height() * 2);
         }else {
					 $('#sketch').css('width', $('#sketch').width() / 2);
	 				$('#sketch').css('height', $('#sketch').height() / 2);
         }

				 if($('#sketchScroll').width() < $(window).width())
					 $('#sketchScroll').css('width', $('#sketch').width() + ($('#sketch').width() * .4));

				 if($('#sketchScroll').height() < $(window).height())
				 	$('#sketchScroll').css('height', $('#sketch').height() + ($('#sketch').height() * .4));
    }
});

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
