//Creates Layer in the sketch div, canvas holder
function createLayer() {
  var newCanvas = document.createElement('canvas');
  newCanvas.id = ++image.counter;
  newCanvas.width = image.width;
  newCanvas.height = image.height;
  newCanvas.style.zIndex = newCanvas.id;

  image.layers.push({
    id : newCanvas.id,
    name : "layer " + newCanvas.id,
    opacity : 1,
    visable : true,
    data : null
  });
  $('#sketch').append(newCanvas);

  return image.layers[image.layers.length - 1];
}

//Removes a Layer
function removeLayer(id)
{
  $(document.getElementById(id)).remove();
  var position = image.layers.findIndex(function(e) {
    return e.id == id
  });
  image.layers.splice(position, 1);
}

//Selects the active canvas layer
function selectLayer(id)
{
  canvas = document.getElementById(id);
  ctx = canvas.getContext('2d');
}

//Hides a layer
function changeLayerVisability(id)
{
    $(document.getElementById(id)).toggle();
    var position = image.layers.findIndex(function(e) {
      return e.id == id
    });
    image.layers[position].visable = !image.layers[position].visable;
}

//Merges two layer canvases together
function mergeLayers(id){
  var position = image.layers.findIndex(function(e) {
    return e.id == id
  });

  if(image.layers[position].id != image.layers[0].id
    && image.layers.length > 1) {
    var ctx = document.getElementById(image.layers[position-1].id).getContext('2d');
    ctx.drawImage(document.getElementById(image.layers[position].id), 0, 0);
    //ctx.setOpacity(top.getOpacity, bottom);
    //ctx.setOpacity(1, bottom);
    $(document.getElementById(image.layers[position].id)).remove();
    image.layers.splice(position, 1);
  }
}

/*
var cur = global.selected; //Gets the current selected layer ID
var indexOfCur = layers.indexOf(parseInt(cur)); //Gets the index of the current Layer ID
layers.splice(indexOfCur, 1); //Removes the layer from the Layer array
sendToSibling("theCanvasIframeId", "removeLayer", [cur]);

if(selected != layers[0] && layers.length > 1) {
  var top = global.selected; //Get the ID of current selected layer as the top layer
  var indexOfTop = layers.indexOf(parseInt(top)); //get the index of the top(selected) layer
  var indexOfBottom = layers.indexOf(parseInt(top)) - 1; //get the index of the layer to the bottom
  var bottom = layers[indexOfBottom]; //Gets the ID of the bottom layer
  sendToSibling("theCanvasIframeId", "mergeLayer", [top,bottom]); //Merges the two canvases together
  $('.selected').remove(); //Removes the selected layer from the UI (top layer)
  layers.splice(indexOfTop, 1); //Removes selected layer from the array (top layer)
}
*/


//Flattens all of the layer canvases into one for saving
function flattenLayers()
{
  var layers = [];
  $('#sketch').children('canvas').each(function () {
    layers.push($(this).attr('id'));
  });

  if(layers.length > 1)
  {
    for(var i = layers.length - 1; i > 0; i--)
      mergeLayers(layers[i], layers[i-1]);
  }
}
