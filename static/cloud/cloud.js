function cloudButton(data){
  $.when($.ajax(flattenLayers())).then(function () {
     cloud(data[0], data[1]);
  });
}

function cloud(name, type){

  var canvas = document.getElementsByTagName("canvas")[0];
  var downloadLink = document.createElement("a");
  var dataURL = canvas.toDataURL();

  $.ajax({
	  type: "POST",
	  url: "/upload",
	  data:{
		  imageBase64: dataURL
	  }
  }).done(function() {
	  console.log('sent');
  });
}

	/*
  var xmlr = new XMLHttpRequest();
  xmlr.open("POST", "https://www.googleapis.com/upload/drive/v2/files?uploadType=media", true);
  xmlr.setRequestHeader("Authorization", "Bearer insetTokenhere");
  xmlr.setRequestHeader("Content-Type", "image/png");
 // xmlr.setRequestHeader("Content-Length", filesize);

  xmlr.send(dt);
  */

	//dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  //dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
  //downloadLink.href = dt;
  //downloadLink.download = name + "." + type;
  //document.body.appendChild(downloadLink);
  //downloadLink.click();
  //document.body.removeChild(downloadLink);


//TODO Document Code PLZ :D
