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
  var id = $('.selected').attr('id');
  if(parent.moveLayerUp(id))
    drawLayers();
  $('#' + id).addClass('selected');
});

//Merge Layer Down
$( "#down" ).click(function() {
  var id = $('.selected').attr('id');
  if(parent.moveLayerDown($('.selected').attr('id')))
    drawLayers();
  $('#' + id).addClass('selected');
});

//Settings
$( "#settings" ).click(function() {
  parent.displayUI('static/layers/settings.html', parent.changeLayerSettings);
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
  var image = parent.getImage();
  div.innerHTML = "";

  for(var i = 0; i < image.layers.length; i++)
  {
    var checked = "";
    if(image.layers[i].visable)
      checked = "checked";

    $('#layers').prepend(
      '<div class="layer" id="' + image.layers[i].id + '">' +
      '<div class="canvasHolder"><canvas></canvas></div>' +
      '<span> ' +  image.layers[i].name  +  '</span>' +
      '<input class="check" type="checkbox"' + checked + ' >' +
      '</div>' );
  }

  for(var i = 0; i < image.layers.length; i++)
  {
    updateLayerPreview(image.layers[i], image.width, image.height);
  }

  $('#' + image.layers[image.selected].id).addClass('selected');
}

//Update Layer Preview
function updateLayerPreview(layer, width, height){
  if (!document.getElementById(layer.id))
    return;
  var canvas = document.getElementById(layer.id).getElementsByTagName('canvas')[0];
  var ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  if(layer.data != null)
    ctx.putImageData(layer.data,0,0);
  else
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
