var Match = require('../app/models/match.js');
var Clarifai = require('clarifai');
var PythonShell = require('python-shell');
var pyshell = new PythonShell('search.py'); // search.py opens two web browsers, one of a google search and the other of a sentiment analysis

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index.pug');
  });

  app.get('/landing', function(req, res) {
    res.render('landing.pug');
  });

  //enum set of names:
  //'donald_trump', 'hillary_clinton', 'barack_obama'
  app.get('/landing/donald_trump', function(req, res) {
    res.render('index.pug');
  }

  app.post('/search', function(req, res){
    var app1 = new Clarifai.App(
      'ThQZUpvaf0LjZFmFpNku6LtN3zVEP92P6UYBmGCl',
      'hUSoLveXXpCZU-cMHZ2N2MGI9gIJERUgQojsLR3H'
    );
    console.log(req.body);
    var nameOfURL = req.body.URL;

    app1.models.predict("TRUMP", [nameOfURL]).then(
      function(response) {
        console.log("YAY");
        console.log(response.status);
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
          console.log(req.body);
          if (response["outputs"][0]["data"]["concepts"][i]["value"] > max) {
            max = response["outputs"][0]["data"]["concepts"][i]["value"];
            name = response["outputs"][0]["data"]["concepts"][i]["name"];
          }
        }
        console.log(max);
        //match.name = name;
        console.log(name);
        if (max < 0.5) {
          console.log("Error: No match");
          name = null;
        } else {
          console.log("OKAY");
          //res.redirect('/landing');
          pyshell.send(name); // sends the name of the match to the python script
          name.replace(' ', '_');
        }
        res.redirect('/landing/' + name);
      },
      function(err) {

      }
    );
  });
}
