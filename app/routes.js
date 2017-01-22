var Match = require('../app/models/match.js');
var Clarifai = require('clarifai');
var PythonShell = require('python-shell');

var app1 = new Clarifai.App( // allows access to our clarifai application
  'ThQZUpvaf0LjZFmFpNku6LtN3zVEP92P6UYBmGCl',
  'hUSoLveXXpCZU-cMHZ2N2MGI9gIJERUgQojsLR3H'
);

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

  app.get('/error', function(req, res) {
    res.render('404.pug');
  });

    app.post('/searchByBytes', function(req, res){

      console.log("sdf")
    // console.log(req.body);

    for(var k=0; k<4; k++){
      if(req.body.global["hiddenImageBytes"+String(count)].length==0){continue;}
      var imageBytes = req.body.global["hiddenImageBytes"+String(count)]
      console.log(req.body);
        // takes the url from the form

      app1.models.predict("TRUMP", imageBytes).then( // calls the predict function for our model
        function(response) {
          console.log(response)
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
           console.log(max);
          // console.log(name);
          if (max < 0.5) { // must be greater than a match of 0.5 to be considered a match
            console.log("Error: No match");
            name = null;
            res.redirect('/error');
          } else {
            // console.log("OKAY");
            // res.redirect('/landing');
            console.log(name);
            var pyshell = new PythonShell('search.py');
            pyshell.send(name); // sends the name of the match to the python script
            //name.replace(' ', '_'); // removes the whitespace in our concept names
            res.redirect('/landing/' + name); // redirects to the landing page no matter what

          }
        },
        function(err) { // error handling
          res.redirect('/error');
        }
      );
    }
  });

  app.post('/search', function(req, res){
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

          pyshell.send(name)  ; // sends the name of the match to the python script
          res.redirect('/landing/' + name); // redirects to the landing page no matter what

          //name.replace(' ', '_'); // removes the whitespace in our concept names
        }
      },
      function(err) { // error handling

      }
    );
  });

  app.post('/train', function(req,res){
    console.log("Testing")

    var imageByteArray = [req.body.hiddenImageBytes0,req.body.hiddenImageBytes1,req.body.hiddenImageBytes2,req.body.hiddenImageBytes3]
    var concept = req.body.concept0;

    console.log(imageByteArray[3])

    app1.inputs.create({
    base64:imageByteArray[0],
    concepts: [
      {
        id: concept,
        value: false
      }
    ]
    }).then(
      function(response) {
        // do something with response
      },
      function(err) {
        // there was an error
        res.redirect('/error');
      }
    );
    app1.inputs.create({
    base64:imageByteArray[1],
    concepts: [
      {
        id: concept,
        value: false
      }
    ]
    }).then(
      function(response) {
        // do something with response
      },
      function(err) {
        // there was an error
        res.redirect('/error');

      }
    );
    app1.inputs.create({
    base64:imageByteArray[2],
    concepts: [
      {
        id: concept,
        value: false
      }
    ]
    }).then(
      function(response) {
        // do something with response
      },
      function(err) {
        // there was an error
        res.redirect('/error');

      }
    );
    app1.inputs.create({
    base64:imageByteArray[3],
    concepts: [
      {
        id: concept,
        value: false
      }
    ]
    }).then(
      function(response) {
        // do something with response
      },
      function(err) {
        // there was an error
        res.redirect('/error');

      }
    );


    app1.models.train("TRUMP").then(
      function(response){
        console.log(response)

      },
      function(err){
        res.redirect('/error');

      }
    );
    res.redirect('/');
  });
}
