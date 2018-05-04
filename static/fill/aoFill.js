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
  var context = canvas.getContext('2d');
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  var data = context.getImageData(0, 0, width, height);
  var pos = (p1.y * width + p1.x) * 4;
  frontier.push(p1);
  var r = data[pos];
  var g = data[pos + 1];
  var b = data[pos + 2];

  while (frontier.length){
    var point, left, right;
    point = frontier.pop();
    console.log("Removing");
    pos = (point.y * width + point.x) * 4;

    if (data[pos] == r && data[pos + 1] == g && data[pos + 2] == b){
      console.log("Updating!");
      data[pos] = rI;
      data[pos + 1] = gI;
      data[pos + 2] = bI;
      data[pos + 3] = aI;
      for (var i=0; i < neigh.length; i++){
        var tPosX = point.x + neigh[i][0];
        var tPosY = point.y + neigh[i][0];
        if (tPosX >= 0 && tPosX < width && tPosY >= 0 && tPosY < height){
          var tPos = (tPosX * width + tPosY * 4);
          if (data[tPos] == r && data[tPos + 1] == g && data[tPos + 2] == b){
            console.log("Adding!");
            frontier.push(new Point(tPosX, tPosY));
          }
        }
      }
    }
  }
  return data;
}
