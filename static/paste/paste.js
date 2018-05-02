//Paste img feature
		window.addEventListener('paste', pasteHere);

		function pasteHere(e) {
			if(e.clipboardData == false) {
				return false; //there is nothing to paste
			}
		    	var paste = e.clipboardData.items;
		    	if(paste == undefined) {
				return false //there is nothing to paste
			}
		    	for (var i = 0; i < paste.length; i++) {
		        if (paste[i].type.indexOf("image") == -1) {
				continue; //means there is no image
			}
		        var blob = paste[i].getAsFile();
		        var URLObj = window.URL || window.webkitURL;
		        var source = URLObj.createObjectURL(blob);
		        pasteTheImage(source);
		        }
		}
			//draw pasted object
		function pasteTheImage(source) {
			var pastedImage = new Image();
			pastedImage.onload = function() {
		        	ctx.drawImage(pastedImage, mouse.x, mouse.y);
			}
			pastedImage.src = source;
		}
