/*
  By: aowolfie (Brandon Beckwith)
                      .
                     / V\
                   / '  /
                  < <  |
       .          /    |
      / \        /      |
     /  /      /        |
    |  |     /    \  \ /
     \  \   (      ) | |
      \  \__|   _/__/| |
       \____\______) \__)

*/

/* Point object for consistancy's sake */
function Point(x, y){ this.x = x; this.y = y; return this; }

var neigh = [[-1,0],[1,0],[0,-1],[0,1]];

/* A fill function that fills from a point */
function fillFromPoint(canvas, p1, rI, gI, bI, aI){
  var frontier = [];
  var width = canvas.width;
  var height = canvas.height;
  var context = canvas.getContext('2d');
  var imgData = context.getImageData(0, 0, width, height);
  console.log(imgData.data);
  var pos = (p1.y * width + p1.x) * 4;
  console.log(pos);
  frontier.push(p1);
  var r = imgData.data[pos];
  var g = imgData.data[pos + 1];
  var b = imgData.data[pos + 2];
  console.log(r + " " + g + " " + b); //This is the issue

  while (frontier.length){
    var point, left, right;
    point = frontier.pop();
    console.log("Removing");
    pos = (point.y * width + point.x) * 4;

    if (imgData.data[pos] == r && imgData.data[pos + 1] == g && imgData.data[pos + 2] == b){
      console.log("Updating!");
      imgData.data[pos] = rI;
      imgData.data[pos + 1] = gI;
      imgData.data[pos + 2] = bI;
      imgData.data[pos + 3] = aI;
      for (var i=0; i < neigh.length; i++){
        var tPosX = point.x + neigh[i][0];
        var tPosY = point.y + neigh[i][1];
        if (tPosX >= 0 && tPosX < width && tPosY >= 0 && tPosY < height){
          var tPos = (tPosX * width + tPosY * 4);
          if (imgData.data[tPos] == r && imgData.data[tPos + 1] == g && imgData.data[tPos + 2] == b){
            frontier.push(new Point(tPosX, tPosY));
          }
        }
      }
    }
  }
  //return imgData;
  context.putImageData(imgData,0,0  );
}
