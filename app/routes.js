var Match = require('../app/models/match.js');
var Clarifai = require('clarifai');
var PythonShell = require('python-shell');

module.exports = function(app) {

  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */

  app.get('/', function(req, res) { // takes you to the initial page
    res.render('index.pug');
  });

  app.get('/landing', function(req, res) { // takes you to the landing page after a match is/isn't found
    res.render('landing.pug');
  });

  app.get('/error', function(req,res){
    res.render('404.pug');
  });
  //enum set of names:
  //'donald_trump', 'hillary_clinton', 'barack_obama'
  app.get('/landing/donald%20trump', function(req, res) {
    res.render('dtrump.pug');
  });

  app.get('/landing/hillary%20clinton', function(req, res) {
    res.render('hclinton.pug');
  });

  app.get('/landing/barack%20obama', function(req, res) {
    res.render('bobama.pug');
  });

  app.post('/search', function(req, res){
    var app1 = new Clarifai.App( // allows access to our clarifai application
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
          if (response["outputs"][0]["data"]["concepts"][i]["value"] > max) { // finds the greatest comparison value
            max = response["outputs"][0]["data"]["concepts"][i]["value"];
            name = response["outputs"][0]["data"]["concepts"][i]["name"];
          }
        }
        // console.log(max);
        // console.log(name);
        if (max < 0.5) { // must be greater than a match of 0.5 to be considered a match

          console.log("Error: No match");
          name = null;
          res.redirect('/error');

        } else {
          // console.log("OKAY");
          // res.redirect('/landing');
          var pyshell = new PythonShell('search.py'); // search.py opens two web browsers, one of a google search and the other of a sentiment analysis

          pyshell.send(name); // sends the name of the match to the python script

          //name.replace(' ', '_'); // removes the whitespace in our concept names
        }
        res.redirect('/landing/' + name); // redirects to the landing page no matter what
      },
      function(err){ // error handling
          res.redirect('/error');
      }
    );
  });
}
