const body = window.document.body;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request === "getBody")
      sendResponse({body: body.innerHTML});
  });