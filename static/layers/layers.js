//Creates Layer in the sketch div, canvas holder
function createLayer() {
  var newCanvas = document.createElement('canvas');
  newCanvas.id = ++image.counter;
  newCanvas.width = image.width;
  newCanvas.height = image.height;
  newCanvas.style.zIndex = newCanvas.id;

  image.layers.push({
    id : newCanvas.id,
    zindex : newCanvas.id,
    name : "layer " + newCanvas.id,
    opacity : 1,
    visable : true,
    data : null
  });
  $('#sketch').append(newCanvas);

  return image.layers[image.layers.length - 1];
}

//Removes a Layer
function removeLayer(id){
  $(document.getElementById(id)).remove();
  var position = image.layers.findIndex(function(e) {
    return e.id == id
  });
  image.layers.splice(position, 1);
}

//Selects the active canvas layer
function selectLayer(id){
  var position = image.layers.findIndex(function(e) {
    return e.id == id
  });
  image.selected = position;
  canvas = document.getElementById(id);
  ctx = canvas.getContext('2d');
}

//Hides a layer
function changeLayerVisability(id){
    $(document.getElementById(id)).toggle();
    var position = image.layers.findIndex(function(e) {
      return e.id == id
    });
    image.layers[position].visable = !image.layers[position].visable;
}

//Merges two layer canvases together
function mergeLayers(id){
  var performed = false;
  var position = image.layers.findIndex(function(e) {
    return e.id == id
  });

  if(image.layers[position].id != image.layers[0].id
    && image.layers.length > 1) {
      if(image.layers[position].visable)
      {
        var ctx = document.getElementById(image.layers[position-1].id).getContext('2d');
        ctx.drawImage(document.getElementById(image.layers[position].id), 0, 0);
      }
    $(document.getElementById(image.layers[position].id)).remove();
    image.layers.splice(position, 1);
    performed = true;
  }

  return performed;
}

//Moves layer up
function moveLayerUp(id){
  var performed = false;
  var position = image.layers.findIndex(function(e) {
    return e.id == id
  });

  if(image.layers[position].id != image.layers[image.layers.length-1].id
    && image.layers.length > 1) {
      var z = $('#' + image.layers[position].id).css('z-index');
      $('#' + image.layers[position].id).css('z-index', $('#' + image.layers[position+1].id).css('z-index'));
      image.layers[position].zIndex = image.layers[position+1].zIndex;
      $('#' + image.layers[position+1].id).css('z-index', z);
      image.layers[position+1].zIndex = z;

      var tempLayer = image.layers[position]
      image.layers[position] = image.layers[position+1];
      image.layers[position+1] = tempLayer;

      performed = true;
  }

  return performed;
}

//Move Layer down
function moveLayerDown(id){
  var performed = false;
  var position = image.layers.findIndex(function(e) {
    return e.id == id
  });

  if(image.layers[position].id != image.layers[0].id
    && image.layers.length > 1) {
      var z = $('#' + image.layers[position].id).css('z-index');
      $('#' + image.layers[position].id).css('z-index', $('#' + image.layers[position-1].id).css('z-index'));
      image.layers[position].zIndex = image.layers[position-1].zIndex;
      $('#' + image.layers[position-1].id).css('z-index', z);
      image.layers[position-1].zIndex = z;

      var tempLayer = image.layers[position]
      image.layers[position] = image.layers[position-1];
      image.layers[position-1] = tempLayer;

      performed = true;
  }

  return performed;
}

//Flattens all of the layer canvases into one for saving
function flattenLayers(){
  if(image.layers.length > 1)
  {
    for(var i = image.layers.length - 1; i > 0; i--)
      mergeLayers(image.layers[i].id);
  }

  document.getElementById('layers_iframe').contentWindow.drawLayers();
}

function setLayerOpacity(id, opacity) {
  var modifyCanvas = document.getElementById(id);
  var ctx = canvas.getContext("2d");

	hidden_context.drawImage(canvas, 0, 0);


	var ctx = canvas.getContext("2d");
	ctx.globalAlpha=opacity;
	ctx.drawImage(hidden_canvas, 0, 0);
}

//Returns the layers array
function getLayers()
{
  return [image.selected, image.layers];
}
