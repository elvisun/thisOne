var getURL = "https://the-one.herokuapp.com/api/reviews/score/www.google.com";
var postURL = "https://the-one.herokuapp.com/api/reviews";

var testServer = {
  "domain": "www.google.com",
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
	serverData.generalRating = 1;
	updateData(serverData);
});

$("#downgeneral").click(function (){
	var serverData = testServer;
	serverData.generalRating = 2;
	updateData(serverData);
});


//content votes
$("#upcontent").click(function (){
	var serverData = testServer;
	serverData.contentRating = 1;
	updateData(serverData);
});

$("#downcontent").click(function (){
	var serverData = testServer;
	serverData.contentRating = 2;
	updateData(serverData);
});


//experience votes
$("#upexperience").click(function (){
	var serverData = testServer;
	serverData.uxRating = 1;
	updateData(serverData);
});

$("#downexperience").click(function (){
	var serverData = testServer;
	serverData.uxRating = 2;
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
	  $( "#upGeneralVote" ).html( data.up );
	  $( "#downGeneralVote" ).html( data.down );
  	  $( "#upContentVote" ).html( data.contentUp );
	  $( "#downContentVote" ).html( data.contentDown );
  	  $( "#upExperienceVote" ).html( data.uxUp );
	  $( "#downExperienceVote" ).html( data.uxDown );
	  console.log(data);
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