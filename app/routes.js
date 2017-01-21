var Match = require('../app/models/match.js');
var Clarifai = require('clarifai');
var PythonShell = require('python-shell');
var pyshell = new PythonShell('search.py'); // search.py opens two web browsers, one of a google search and the other of a sentiment analysis

module.exports = function(app) {

  app.get('/', function(req, res) { // takes you to the initial page
    res.render('index.pug');
  });

  app.get('/landing', function(req, res) { // takes you to the landing page after a match is/isn't found
    res.render('landing.pug');
  });

//<<<<<<< HEAD
  app.post('/search', function(req, res){ // takes the url in the search field and tests it against the clarifai
    var app1 = new Clarifai.App( // allows access to the clarifai app
//=======
  //enum set of names:
  //'donald_trump', 'hillary_clinton', 'barack_obama'
  app.get('/landing/donald_trump', function(req, res) {
    res.render('index.pug');
  }

  app.post('/search', function(req, res){
    var app1 = new Clarifai.App(
//>>>>>>> 80b6c596e29b9f2e8e8edfd54cdf0d592cd02893
      'ThQZUpvaf0LjZFmFpNku6LtN3zVEP92P6UYBmGCl',
      'hUSoLveXXpCZU-cMHZ2N2MGI9gIJERUgQojsLR3H'
    );
    // console.log(req.body);
    var nameOfURL = req.body.URL; // takes the url from the form

    app1.models.predict("TRUMP", [nameOfURL]).then( // calls the predict function for our model
      function(response) {
        // console.log("YAY");
        // console.log(response.status);
        var max = 0; // variable to store the max data value by concept
        var name; // stores the name of the person associated with the max data value
        //console.log(response[data]);
        for (var i = 0; i < (response["outputs"][0]["data"]["concepts"]).length; i++) { // runs through every concept
          // console.log(req.body);
          if (response["outputs"][0]["data"]["concepts"][i]["value"] > max) {
            max = response["outputs"][0]["data"]["concepts"][i]["value"];
            name = response["outputs"][0]["data"]["concepts"][i]["name"];
          }
        }
        console.log(max);
        console.log(name);
        if (max < 0.5) {
          console.log("Error: No match");
          name = null;
        } else {
          console.log("OKAY");
          //res.redirect('/landing');
          pyshell.send(name); // sends the name of the match to the python script
<<<<<<< HEAD
=======
          name.replace(' ', '_');
>>>>>>> 80b6c596e29b9f2e8e8edfd54cdf0d592cd02893
        }
        res.redirect('/landing/' + name);
      },
      function(err) {

      }
    );
  });
}
