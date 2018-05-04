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

var neigh = [[-1,0],[1,0],[0,-1],[0,1]];

/* A fill function that fills from a point */
function fillFromPoint(context, p1, rI, gI, bI){
  var frontier = [];
  var width = context.canvas.clientWidth;
  var height = context.canvas.clientHeight;
  var data = context.getImageData(0, 0, width, height);
  var pos = (p1.y * width + p1.x) * 4;
  frontier.push(p1);
  var r = data[pos];
  var g = data[pos + 1];
  var b = data[pos + 2];

  while (frontier.length){
    var point, left, right;
    point = frontier.pop();
    pos = (point.y * width + point.x) * 4;

    if (data[pos] == r && data[pos + 1] == g&& data[pos + 2] == b){
      for (var i=0; i < neigh.length; i++){
        var tPosX = point.x + height[i][0];
        var tPosY = point.y + height[i][0];
        if (tPosX >= 0 && tPosX < width && tPosY >= 0 || tPosY < height){
          frontier.push(new Point(tPosX, tPosY));
          data[pos] = rI;
          data[pos + 1] = gI;
          data[pos + 2] = bI;
        }
      }
    }
  }
  context.putImageData(data, 0, 0);
  //return context;
}
