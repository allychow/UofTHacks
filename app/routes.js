var Match = require('../app/models/match.js');
var Clarifai = require('clarifai');
var PythonShell = require('python-shell');
var pyshell = new PythonShell('search.py'); // search.py opens two web browsers, one of a google search and the other of a sentiment analysis

var app1 = new Clarifai.App(
  'ThQZUpvaf0LjZFmFpNku6LtN3zVEP92P6UYBmGCl',
  'hUSoLveXXpCZU-cMHZ2N2MGI9gIJERUgQojsLR3H'
);

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index.pug');
  });

  app.get('/landing', function(req, res) {
    res.render('landing.pug');
  });

  app.post('/search', function(req, res){
    var nameOfURL = req.body;

    app1.models.predict("TRUMP", [""+nameOfURL]).then(
      function(response) {
        //var max = [];
        var max = 0;
        var name;
        //console.log(response[data]);
        for (var i = 0; i < (response["outputs"][0]["data"]["concepts"]).length; i++) {
          //max.push([response["outputs"][0]["data"]["concepts"][i]["name"],response["outputs"][0]["data"]["concepts"][i]["value"]]);
          //console.log("Name: "+ response["outputs"][0]["data"]["concepts"][i]["name"]);
          //console.log("Value: "+ response["outputs"][0]["data"]["concepts"][i]["value"]);
          //console.log(max[i][0]);
          //console.log(max[i][1]);
          if (response["outputs"][0]["data"]["concepts"][i]["value"] > max) {
            match.data = response["outputs"][0]["data"]["concepts"][i]["value"];
            match.name = response["outputs"][0]["data"]["concepts"][i]["name"];
          }
        }
        console.log(match.data);
        console.log(match.name);
        if (match.data < 0.5) {
          console.log("Error: No match");
          name = null;
        } else {
          console.log("OKAY");
          res.redirect('/landing');
          pyshell.send(match.name); // sends the name of the match to the python script

        }
      },
      function(err) {

      }
    );
  });
}
