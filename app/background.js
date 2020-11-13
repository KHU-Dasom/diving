// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log('sender', sender);
//     console.log('sendResponse', sendResponse);
//   });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    chrome.runtime.sendMessage({
        msg: "something_completed", 
        data: {
            subject: "Loading",
            content: "Just completed!"
        }
    });
  });