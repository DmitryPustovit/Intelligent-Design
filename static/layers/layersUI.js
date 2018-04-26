var div = document.getElementById('layers'); //UI element to display layers

/* Control Functions */
//Add Layer
$("#add").click(function() {
  var layer = parent.createLayer();
  div.innerHTML =
    '<div class="layer" id="' + layer.id + '">' +
    '<div class="canvasHolder"> </div>' +
    '<span> ' +  layer.name  +  '</span>' +
    '<input class="check" type="checkbox" checked>' +
    '</div>' + div.innerHTML;
});

//Remove Layer
$("#remove").click(function() {
  parent.removeLayer($('.selected').attr('id'));
  $('.selected').remove(); //Removes the current selected layer from the UI
});

//Merge Layer
$( "#merge" ).click(function() {
  parent.mergeLayers($('.selected').attr('id'));
  $('.selected').remove();
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


/* Reaction Functions */
    //Flatten Layers
  /*  function flatten(){
      layers = [layers[0]]; //Removes all layers execpt bottom most layer
      //Sets the UI to display only one layer
      div.innerHTML =
      '<div class="layer" id="' + layers[0] + '">' +
        '<div class="canvasHolder"> </div>' +
        '<span> layer ' + layers[0]   +  '</span>' +
        '<input class="check" type="checkbox" checked>' +
      '</div>';
    }

*/
