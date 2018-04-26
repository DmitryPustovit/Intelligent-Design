var div = document.getElementById('layers'); //UI element to display layers

/* Control Functions */
//Add Layer
$("#add").click(function() {
  var layer = parent.createLayer();
  $('#layers').prepend(
    '<div class="layer" id="' + layer.id + '">' +
    '<div class="canvasHolder"><canvas></canvas></div>' +
    '<span> ' +  layer.name  +  '</span>' +
    '<input class="check" type="checkbox" checked>' +
    '</div>');
});

//Remove Layer
$("#remove").click(function() {
  parent.removeLayer($('.selected').attr('id'));
  $('.selected').remove(); //Removes the current selected layer from the UI
});

//Merge Layer
$( "#merge" ).click(function() {
  if(parent.mergeLayers($('.selected').attr('id')))
    $('.selected').remove();
});

//Move Layer Up
$( "#up" ).click(function() {
  if(parent.moveLayerUp($('.selected').attr('id')))
    drawLayers();
});

//Merge Layer Down
$( "#down" ).click(function() {
  if(parent.moveLayerDown($('.selected').attr('id')))
    drawLayers();
});

//Select Layer
$(document).delegate( ".layer", "click", function() { //delegate will eventually be removed from Jquery
  $(".layer").removeClass('selected'); //Removes the selected layer style from all the layers
  $(this).addClass('selected'); //Add the styling to the layer selected
  selected = $(this).attr('id'); //get the ID of the layer selected
  parent.selectLayer(selected);
});

//Hide Layer
$(document).delegate( ".check", "change", function() { //delegate will eventually be phased out of JQuery
  parent.changeLayerVisability($(this).parent().attr('id')); //Triggers a toggle
});

//Redraws layers
function drawLayers(){
  var layers = parent.getLayers();
  div.innerHTML = "";

  for(var i = 0; i < layers[1].length; i++)
  {
    div.innerHTML =
      '<div class="layer" id="' + layers[1][i].id + '">' +
      '<div class="canvasHolder"><canvas></canvas></div>' +
      '<span> ' +  layers[1][i].name  +  '</span>' +
      '<input class="check" type="checkbox" checked>' +
      '</div>' + div.innerHTML;
  }

  $('#' + layers[0]).addClass('selected');
}

//Update Layer Preview
function updateLayerPreview(data, width, height){
  var canvas = document.getElementsByClassName('selected')[0].getElementsByTagName('canvas')[0];
  var ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(data,0,0);
}
