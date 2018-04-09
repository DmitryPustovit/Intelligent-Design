//Creates Layer in the sketch div, canvas holder
function createLayer(number) {
  var canvas = document.createElement('canvas');
  canvas.id = number;
  canvas.width = width;
  canvas.height = height;
  canvas.style.zIndex = number ;
  $('#sketch').append(canvas);
}

//Selects the active canvas layer
function selectLayer(number)
{
  canvas = document.getElementById(number);
  ctx = canvas.getContext('2d');
}

//Merges two layer canvases together
//TODO layer opactiy HERE
function mergeLayers(top, bottom){
  console.log(top + " " + bottom);
  var ctx = document.getElementById(bottom).getContext('2d');
  //ctx.setOpacity(top.getOpacity, bottom);
  ctx.drawImage(document.getElementById(top), 0, 0);
  //ctx.setOpacity(1, bottom);
  $(document.getElementById(top)).remove();
}

//Removes a Layer
function removeLayer(num)
{
  $(document.getElementById(num)).remove();
}

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

//Hides a layer
function hideLayer(num, val)
{
    $(document.getElementById(num)).toggle();
}
