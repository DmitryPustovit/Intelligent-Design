$( document ).ready(function() {
    $("#canvasHolder").scrollTop($("#canvasHolder").scrollTop() + $("#sketchScroll").position().top
    - $("#canvasHolder").height()/2 + $("#sketchScroll").height()/2);
    $("#canvasHolder").scrollLeft($("#canvasHolder").scrollTop() + $("#sketchScroll").position().top
    - $("#canvasHolder").width()/2 + $("#sketchScroll").width()/2);
});

$('iframe').load(function () {
    $(this).height($(this).contents().height());
    $(this).width($(this).contents().width());
});

$(document).delegate( ".menuButton", "click", function() {
  $(this).toggleClass('menuButtonSelected');
});

$( function() {
  $( ".window" ).draggable({cancel: ".window_inside", snap: '#outerside, #sidemenu, .window', snapMode: "outer", containment: "window"});
  //$( "#sidemenu" ).resizable();
});
