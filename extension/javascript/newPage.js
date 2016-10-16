// Checking page title
console.log("running");
if (true) {
	console.log("in if");
    //Creating Elements
    setTimeout(function(){
    	var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '.conditionalFormat { color: #F00; }';
		document.getElementsByTagName('head')[0].appendChild(style);

    	var t = document.getElementsByClassName("r");
    	for (var i = 0; i < t.length; i++){
    		var url = t[i].childNodes[0].href;
    		var domain = extractDomain(url);
    		console.log(domain);

			var textnode = document.createElement("span"); 
			var q = document.createTextNode("  " + "5.0");       // Create a text node
			textnode.appendChild(q);
			textnode.className += "conditionalFormat"
			t[i].appendChild(textnode);
		}

    }, 2000);
}


function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}