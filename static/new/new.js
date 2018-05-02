function newButton(data){
  console.log(data);
  new(data[0], data[1]);
}

function new(width, height)
{
  createLayer();
  selectLayer(1);
}
