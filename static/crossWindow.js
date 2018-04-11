function sendToSibling(iframe, action, data)
{
  parent.sendToIframe(iframe, action, data);
}

function sendToIframe(iframe, action, data)
{
  var stringData = "";
  if(data != null)
    for(var i = 0; i < data.length; i++)
      stringData+= data[i] + ",";

  document.getElementById(iframe).contentWindow.postMessage(action + "," + stringData, '*');
}
