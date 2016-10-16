// Checking page title

    //Creating Elements
var useRealData = true;

setTimeout(function(){
    //$('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">');

	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.upvote { color: green; font-size: 14px};';
	document.getElementsByTagName('head')[0].appendChild(style);

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.downvote { color: red; font-size: 14px };';
    document.getElementsByTagName('head')[0].appendChild(style);

	var t = document.getElementsByClassName("r");
	for (var i = 0; i < t.length; i++){
		var url = t[i].childNodes[0].href;
		var domain = extractDomain(url);
        
        var up = 0;
        var down = 0;
        if (useRealData){
            $.get(
                "https://the-one.herokuapp.com/api/reviews/score/" + domain,
                {paramOne : 1, paramX : 'abc'},
                function(data) {
                   up = data.up;
                   down = data.down;
                }
            );
        }
        else{
            up = getVotes()
            down = getVotes()
        }

		var upnode = document.createElement("span"); 
		var q = document.createTextNode("  " + up.toString());       // Create a text node
        upnode.appendChild(q);
        upnode.className += "upvote st";
		t[i].appendChild(upnode);

        var downnode = document.createElement("span"); 
        var q = document.createTextNode(" " + down.toString());       // Create a text node
        downnode.appendChild(q);
        downnode.className += "downvote st";
        t[i].appendChild(downnode);

	}
    console.log("done");

}, 1000);


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

function httpGet(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function getVotes(){
    return Math.round((100 + Math.random()*5000));
}