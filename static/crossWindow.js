function sendToSibling(iframe, action, data)
{
  parent.sendToIframe(iframe, action, data);
}

function sendToIframe(iframe, action, data)
{
  document.getElementById(iframe).contentWindow.postMessage(action + "," + data, '*');
}
