function saveButton(data){
  $.when($.ajax(flattenLayers())).then(function () {
     save(data[0], data[1]);
  });
}

function save(name, type){

  var iframe = document.getElementById("theCanvasIframeId");
  var iframe_canvas = iframe.contentDocument || iframe.contentWindow.document;
  var canvas = iframe_canvas.getElementsByTagName("canvas")[0]; //Possibly a better, cleaner way of fixing things

  var downloadLink = document.createElement("a");
  var dt = canvas.toDataURL('image/' + type);
  dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
  downloadLink.href = dt;
  downloadLink.download = name + "." + type;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

//TODO Document Code PLZ :D
