chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    // LOG THE CONTENTS HERE
    console.log(request.content);
  });

chrome.tabs.getSelected(null, function(tab) {

  // Now inject a script onto the page
  chrome.tabs.executeScript(tab.id, {
       code: "chrome.extension.sendRequest({content: document.body.innerHTML}, function(response) { console.log('success'); });"
     }, function() { console.log('done'); });
  alert(code);

});