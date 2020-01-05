function textTool() {
	
	var canvas = document.querySelector('#paint');
	var ctx = canvas.getContext('2d');
	
	var sketch = document.querySelector('#sketch');
	var sketch_style = getComputedStyle(sketch);
	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
	canvas.height = parseInt(sketch_style.getPropertyValue('height'));
	
	
	// Creating a tmp canvas
	var tmp_canvas = document.createElement('canvas');
	var tmp_ctx = tmp_canvas.getContext('2d');
	tmp_canvas.id = 'tmp_canvas';
	tmp_canvas.width = canvas.width;
	tmp_canvas.height = canvas.height;
	
	sketch.appendChild(tmp_canvas);

	var mouse = {x: 0, y: 0};
	var start_mouse = {x: 0, y: 0};
	var last_mouse = {x: 0, y: 0};
	
	var sprayIntervalID;
	
	var textarea = document.createElement('textarea');
	textarea.id = 'text_tool';
	sketch.appendChild(textarea);
	
	// Text tool's text container for calculating
	// lines/chars
	var tmp_txt_ctn = document.createElement('div');
	tmp_txt_ctn.style.display = 'none';
	sketch.appendChild(tmp_txt_ctn);
	
	
	textarea.addEventListener('mouseup', function(e) {
		tmp_canvas.removeEventListener('mousemove', onPaint, false);
	}, false);
	
	
	/* Mouse Capturing Work */
	tmp_canvas.addEventListener('mousemove', function(e) {
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
	}, false);
	
	
	/* Drawing on Paint App */
	tmp_ctx.lineWidth = 5;
	tmp_ctx.lineJoin = 'round';
	tmp_ctx.lineCap = 'round';
	//tmp_ctx.strokeStyle = 'blue';
	//tmp_ctx.fillStyle = 'blue';
	
	tmp_canvas.addEventListener('mousedown', function(e) {
		tmp_canvas.addEventListener('mousemove', onPaint, false);
		
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
		
		start_mouse.x = mouse.x;
		start_mouse.y = mouse.y;
		
		// onPaint();
		// sprayIntervalID = setInterval(onPaint, 50);
	}, false);
	
	tmp_canvas.addEventListener('mouseup', function() {
		tmp_canvas.removeEventListener('mousemove', onPaint, false);
		
		var lines = textarea.value.split('\n');
		var processed_lines = [];
		
		for (var i = 0; i < lines.length; i++) {
			var chars = lines[i].length;
			
			for (var j = 0; j < chars; j++) {
				var text_node = document.createTextNode(lines[i][j]);
				tmp_txt_ctn.appendChild(text_node);
				
				// Since tmp_txt_ctn is not taking any space
				// in layout due to display: none, we gotta
				// make it take some space, while keeping it
				// hidden/invisible and then get dimensions
				tmp_txt_ctn.style.position   = 'absolute';
				tmp_txt_ctn.style.visibility = 'hidden';
				tmp_txt_ctn.style.display    = 'block';
				
				var width = tmp_txt_ctn.offsetWidth;
				var height = tmp_txt_ctn.offsetHeight;
				
				tmp_txt_ctn.style.position   = '';
				tmp_txt_ctn.style.visibility = '';
				tmp_txt_ctn.style.display    = 'none';
				
				// Logix
				// console.log(width, parseInt(textarea.style.width));
				if (width > parseInt(textarea.style.width)) {
					break;
				}
			}
			
			processed_lines.push(tmp_txt_ctn.textContent);
			tmp_txt_ctn.innerHTML = '';
		}
		
		var ta_comp_style = getComputedStyle(textarea);
		var fs = ta_comp_style.getPropertyValue('font-size');
		var ff = ta_comp_style.getPropertyValue('font-family');
		
		tmp_ctx.font = fs + ' ' + ff;
		tmp_ctx.textBaseline = 'top';
		
		for (var n = 0; n < processed_lines.length; n++) {
			var processed_line = processed_lines[n];
			
			tmp_ctx.fillText(
				processed_line,
				parseInt(textarea.style.left),
				parseInt(textarea.style.top) + n*parseInt(fs)
			);
		}
		
		// Writing down to real canvas now
		ctx.drawImage(tmp_canvas, 0, 0);
		// Clearing tmp canvas
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		
		// clearInterval(sprayIntervalID);
		textarea.style.display = 'none';
		textarea.value = '';
	}, false);
	
	var onPaint = function() {
		
		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		
		var x = Math.min(mouse.x, start_mouse.x);
		var y = Math.min(mouse.y, start_mouse.y);
		var width = Math.abs(mouse.x - start_mouse.x);
		var height = Math.abs(mouse.y - start_mouse.y);
		
		textarea.style.left = x + 'px';
		textarea.style.top = y + 'px';
		textarea.style.width = 200 + 'px';
		textarea.style.height = 100 + 'px';
		
		textarea.style.display = 'block';
	};
	
		
};



$(document).ready(function(){
	
	//shows the font and font size inputs
	
    $("#textToolButton").click(function(){
        $("#fontSizeType").show();
		var size = $("textarea").css("font-size");
		//removes 'px' from the font size
		var finalSize = size.substring(0, size.length-2);
		$("#fontSize").val(finalSize);
		
    });
	
	// gets the 'enter' keypress and changes the font size
	$('#fontSize').keypress(function( e ) {
	
		
		if(e.which == 13) {
		
		var sizeChange = $(this).val();
	
		sizeChange = sizeChange + "px";
		$("#text_tool").css({'font-size':sizeChange});}
	
	});

	//uses the font selection library to change to a different google font
	$(function(){
  $('#font').fontselect().change(function(){

    // replace + signs with spaces for css
    var font = $(this).val().replace(/\+/g, ' ');

    // split font into family and weight
    font = font.split(':');

    // set family on paragraphs
    $('textarea').css('font-family', font[0]);
  });
});
	
});

