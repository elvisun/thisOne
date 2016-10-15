var getURL = "https://the-one.herokuapp.com/api/reviews/score/www.google.com";
var postURL = "https://the-one.herokuapp.com/api/reviews";

var testServer = {
  "domain": "www.google.com",
  "moneyFlag": false,
  "virusFlag": false,
  "linkBaitFlag": false,
  "uxRating": 0,
  "contentRating": 0,
  "generalRating": 1   // 1 is upvote, 2 is downvote, 0 is no vote
};
/*
	increase upvotes
*/

$("#upgeneral").click(function (){
	var serverData = testServer;
	serverData.generalRating = 1;
	updateData(serverData);
});

$("#downgeneral").click(function (){
	var serverData = testServer;
	serverData.generalRating = 2;
	updateData(serverData);
});


$("#content").click(function(){
	alert("you clicked content");
});

$("#experience").click(function(){
	alert("you clicked experience");
});

var getData = function(){
	$.get( getURL, function( data ) {
	  $( "#upvotes" ).html( data.up );
	  $( "#downvotes" ).html( data.down );
	});
};

var updateData = function(theServer){
	$.post( postURL, theServer, function(){
		/* some callback thing here */
		getData();
	});
}


var init = function(){
	getData();
};

init();