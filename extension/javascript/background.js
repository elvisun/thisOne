chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
    // LOG THE CONTENTS HERE

    // console.log(request.content);
    // var links = request.content.document.getElementsByTagName("a");
    // for(var i=0;i<links.length;i++)
    // {
    //     if(links[i].href)
    //     {
    //         links[i].style.color = hex;  
    //     }
    // }
    console.log(sendResponse);    
  });


<<<<<<< HEAD

// chrome.tabs.getSelected(null, function(tab) {

//   // Now inject a script onto the page
//   chrome.tabs.executeScript(tab.id, {
//        code: "chrome.extension.sendRequest({content: document.body.innerHTML}, function(response) { console.log('success'); });"
//      }, function() { console.log('done'); });

// });

// Now inject a script onto the page
chrome.tabs.executeScript(tab.id, {
   code: "chrome.extension.sendRequest({content: document.body.innerHTML}, function(response) { console.log('success'); });"
 }, function() { console.log('done'); });


// Checking page title
if (document.title.indexOf("Google") != -1) {
    //Creating Elements
    var btn = document.createElement("BUTTON")
    var t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    //Appending to DOM 
    document.body.appendChild(btn);
}
=======
>>>>>>> long
