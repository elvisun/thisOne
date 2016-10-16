var getURL = "https://the-one.herokuapp.com/api/reviews/score/www.google.com";
var postURL = "https://the-one.herokuapp.com/api/reviews";
var domainName = "";


var testServer = {
  "domain": domainName,
  "moneyFlag": false,
  "virusFlag": false,
  "linkBaitFlag": false,
  "uxRating": 0,
  "contentRating": 0,
  "generalRating": 0   // 1 is upvote, 2 is downvote, 0 is no vote
};


// general votes
$("#upgeneral").click(function (){
	var serverData = testServer;
	serverData.domain = domainName;
	serverData.generalRating = 1;
	resetServerProperties();
	updateData(serverData);
});

$("#downgeneral").click(function (){
	var serverData = testServer;
	serverData.domain = domainName;
	serverData.generalRating = 2;
	resetServerProperties();
	updateData(serverData);
});


//content votes
$("#upcontent").click(function (){
	var serverData = testServer;
	serverData.domain = domainName;
	serverData.contentRating = 1;
	resetServerProperties();
	updateData(serverData);
});

$("#downcontent").click(function (){
	var serverData = testServer;
	serverData.domain = domainName;
	serverData.contentRating = 2;
	resetServerProperties();
	updateData(serverData);
});


//experience votes
$("#upexperience").click(function (){
	var serverData = testServer;
	serverData.domain = domainName;
	serverData.uxRating = 1;
	resetServerProperties();
	updateData(serverData);
});

$("#downexperience").click(function (){
	var serverData = testServer;
	serverData.domain = domainName;
	serverData.uxRating = 2;
	resetServerProperties();
	updateData(serverData);
});


var getWebsiteURL = function(){
	console.log("get web URL");
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	    var url = tabs[0].url;
	    console.log("the URL is: " + url);

	    //parse URL here
	    // REGEX TO FIND DOMAIN NAME
	    var domain = url.match(/^[\w-]+:\/{2,}\[?([\w\.:-]+)\]?(?::[0-9]*)?/)[1];
	    // console.log(domain);
	    domainName = domain;
	    getData();

	});
}


var getData = function(){
	console.log("get data");
	getURL = "https://the-one.herokuapp.com/api/reviews/score/"+domainName;
	$.get( getURL, function( data ) {
	  $( "#upGeneralVote" ).html( data.up );
	  $( "#downGeneralVote" ).html( data.down );
  	  $( "#upContentVote" ).html( data.contentUp );
	  $( "#downContentVote" ).html( data.contentDown );
  	  $( "#upExperienceVote" ).html( data.uxUp );
	  $( "#downExperienceVote" ).html( data.uxDown );
	});
};

var updateData = function(theServer){
	postURL = "https://the-one.herokuapp.com/api/reviews";

	$.post( postURL, theServer, function(){
		/* some callback thing here */
		getData();
	});
}

var resetServerProperties = function(){
	testServer = {
	  "domain": getWebsiteURL(),
	  "moneyFlag": false,
	  "virusFlag": false,
	  "linkBaitFlag": false,
	  "uxRating": 0,
	  "contentRating": 0,
	  "generalRating": 0   // 1 is upvote, 2 is downvote, 0 is no vote
	};
}

var init = function(){
	getWebsiteURL();
	// getData();
};

init();