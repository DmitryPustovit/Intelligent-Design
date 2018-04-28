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
    var ctx = document.getElementById(image.layers[position-1].id).getContext('2d');
    ctx.drawImage(document.getElementById(image.layers[position].id), 0, 0);
    $(document.getElementById(image.layers[position].id)).remove();
    image.layers.splice(position, 1);
    image.selected = null;
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
      selectLayer(image.layers[position+1].id);
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
      selectLayer(image.layers[position-1].id);
      performed = true;
  }

  return performed;
}

//Change Layer Settings
function changeLayerSettings(data)
{
  image.layers[image.selected].name = data[0];
  image.layers[image.selected].opacity = data[1] / 255;
  setLayerOpacity(data[1] / 255);
  document.getElementById('layers_iframe').contentWindow.drawLayers();
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

function setLayerOpacity(opacity) {
  canvas.style.opacity = opacity;
  document.getElementById('layers_iframe').contentWindow.updateLayerPreview(image.layers[image.selected], image.width, image.height);
}

//Returns the layers array
function getImage()
{
  return image;
}
