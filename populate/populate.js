'use strict'

var http = require('http');
var fs = require('fs');

var getRandomRating = function (t){
  var a = Math.random();
  if (a < t) {
    return 1;
  }
  else {
    return 2;
  }
};


var getRandomFlag = function (t){
  var a = Math.random();
  if (a < t) {
    return true;
  }
  else {
    return false;
  }
};

var options = {
    hostname: 'the-one.herokuapp.com',
    path: '/api/reviews',
    method: 'POST',
    headers: {
            'Content-Type': 'application/json',
            }
          };

var data = require('./top500.json');

var loop1 = function(j, i) {
  if (j < 100){
    var req = http.request(options, function(res) {
      console.log('Status: ' + res.statusCode + '   ' + data[i]["FIELD1"]);
      //console.log('Headers: ' + JSON.stringify(res.headers));
      // res.setEncoding('utf8');
      // res.on('data', function (body) {
      //   //console.log('Body: ' + body);
      //   fs.writeFile("test.txt", body, function(err) {
      //     if(err) {
      //         return console.log(err);
      //     }
      //     //console.log("The file was saved!");
      //   }); 
      // });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    // req.write('{"string": result}');  ///RESULT HERE IS A JSON
    // console.log(data[i].FIELD1);
    var result = JSON.stringify({
      "domain": data[i].FIELD1,
      "moneyFlag": getRandomFlag(0.01),
      "virusFlag": getRandomFlag(0.01),
      "linkBaitFlag": getRandomFlag(0.05),
      "uxRating": getRandomRating(0.95),
      "contentRating": getRandomRating(0.8),
      "generalRating": getRandomRating(0.9)
    });
    console.log(result);
    req.write(result);
    req.end();
    loop1(j + 1, i);
  }
};


var loop2 = function(i) {
  if (i < data.length){
    loop1(0, i);
    loop2(i + 1)
  }
};

loop2(0);

