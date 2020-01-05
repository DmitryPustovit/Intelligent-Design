$( document ).ready(function() {
    $("#canvasHolder").scrollTop($("#canvasHolder").scrollTop() + $("#sketchScroll").position().top
    - $("#canvasHolder").height()/2 + $("#sketchScroll").height()/2);
    $("#canvasHolder").scrollLeft($("#canvasHolder").scrollTop() + $("#sketchScroll").position().top
    - $("#canvasHolder").width()/2 + $("#sketchScroll").width()/2);
});

$(document).delegate( ".noneAction", "click", function() {
  $(this).toggleClass('menuButtonSelected');
  $('#' + $(this).data("id")).toggle();
  $('#' + $(this).data("id") + " iframe").height($('#' + $(this).data("id") + " iframe").contents().find("body").height());
  $('#' + $(this).data("id") + " iframe").width($('#' + $(this).data("id") + " iframe").contents().find("body").width());
});

$( function() {
  $( ".window" ).draggable({cancel: ".window_inside", snap: '#outerside, #sidemenu, .window', snapMode: "outer", containment: "window"});
  //$( "#sidemenu" ).resizable();
});

$(document).delegate( ".noneAction[data-id='layers']", "click", function() {
  document.getElementById('layers_iframe').contentWindow.drawLayers();
});

$(window).load(function() {
  $(".preloader").fadeOut();
  $(".preloaderHolder").delay(1000).fadeOut("slow");
});


//Pressure Support Testing has begun :D
document.addEventListener('touchstart', function(e) {
   // Iterate through the list of touch points and log each touch
   // point's force.
   //for (var i=0; i < e.targetTouches.length; i++) {
     // Add code to "switch" based on the force value. For example
     // minimum pressure vs. maximum pressure could result in
     // different handling of the user's input.
     //console.log("targetTouches[" + i + "].force = " + e.targetTouches[i].force);
//   }
}, false);


$(document).keydown(function(event) {
if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
        event.preventDefault();
     }
    // 107 Num Key  +
    // 109 Num Key  -
    // 173 Min Key  hyphen/underscor Hey
    // 61 Plus key  +/= key
});
