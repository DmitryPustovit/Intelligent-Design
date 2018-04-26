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
