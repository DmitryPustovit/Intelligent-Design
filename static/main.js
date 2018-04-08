$( function() {
  $( ".window" ).draggable({cancel: ".window_inside", snap: '#outerside, #sidemenu, .window', snapMode: "outer", containment: "parent"});
  //$( "#sidemenu" ).resizable();
});
