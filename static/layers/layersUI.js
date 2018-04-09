/*
	By: WanderOfFate (Dmitry Pustovit) and Epicderpage
*/

var layers = [1]; //Layer array, all active IDs kept here
var selected = 1; //Current selected Layer ID
var counter = 1; //ID of newly created layer
var div = document.getElementById('layers'); //UI element to display layers
var global = this; // WHY WHY WHY Sometimes JS needs to be remined that global var are global

/* Control Functions */
    //Add Layer
    $("#add").click(function() {
      //Adds a layer to the actual UI
      div.innerHTML =
        '<div class="layer" id="' + ++counter + '">' +
        '<div class="canvasHolder"> </div>' +
        '<span> layer ' + counter   +  '</span>' +
        '<input class="check" type="checkbox" checked>' +
      '</div>' + div.innerHTML;

      layers.push(counter);   //Adds to layer counter
      //Adds an actual canvas as a layer
      sendToSibling("theCanvasIframeId", "createLayer", [counter]);
    });

    //Remove Layer
    $("#remove").click(function() {
      $('.selected').remove(); //Removes the current selected layer from the UI
      var cur = global.selected; //Gets the current selected layer ID
      var indexOfCur = layers.indexOf(parseInt(cur)); //Gets the index of the current Layer ID
      layers.splice(indexOfCur, 1); //Removes the layer from the Layer array
      sendToSibling("theCanvasIframeId", "removeLayer", cur);
    });

    //Merge Layer
    $( "#merge" ).click(function() {
      if(selected != layers[0] && layers.length > 1) {
        var top = global.selected; //Get the ID of current selected layer as the top layer
        var indexOfTop = layers.indexOf(parseInt(top)); //get the index of the top(selected) layer
        var indexOfBottom = layers.indexOf(parseInt(top)) - 1; //get the index of the layer to the bottom
        var bottom = layers[indexOfBottom]; //Gets the ID of the bottom layer
        sendToSibling("theCanvasIframeId", "mergeLayer", [top,bottom]); //Merges the two canvases together
        $('.selected').remove(); //Removes the selected layer from the UI (top layer)
        layers.splice(indexOfTop, 1); //Removes selected layer from the array (top layer)
      }
    });

    //Select Layer
    $(document).delegate( ".layer", "click", function() { //delegate will eventually be removed from Jquery
      $(".layer").removeClass('selected'); //Removes the selected layer style from all the layers
      $(this).addClass('selected'); //Add the styling to the layer selected
      selected = $(this).attr('id'); //get the ID of the layer selected
      sendToSibling("theCanvasIframeId", "selectLayer", $(this).attr('id')); //Set the canvas coresponding to the selected layer as active
    });

    //Hide Layer
    $(document).delegate( ".check", "change", function() { //delegate will eventually be phased out of JQuery
      sendToSibling("theCanvasIframeId", "hideLayer", [$(this).parent().attr('id')]); //Triggers a toggle
    });


/* Reaction Functions */
    //Flatten Layers
    function flatten(){
      layers = [layers[0]]; //Removes all layers execpt bottom most layer
      //Sets the UI to display only one layer
      div.innerHTML =
      '<div class="layer" id="' + layers[0] + '">' +
        '<div class="canvasHolder"> </div>' +
        '<span> layer ' + layers[0]   +  '</span>' +
        '<input type="checkbox" checked>' +
      '</div>';
    }


    //TODO Add to crossWindow.js for cleaner code
    window.addEventListener('message', receiver, false);

    function receiver(e) {
       if (e.origin == '*') {
         return;
       } else {
    		var data = e.data.split(',');
    		if(data[0] == 'flattenLayers')
    			flatten();
       }
    }
