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


