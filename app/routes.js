var Match = require('../app/models/match.js');
var Clarifai = require('clarifai');
var PythonShell = require('python-shell');

module.exports = function(app) {

  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
   /*
  var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });

  app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

          var access_token = body.access_token,
              refresh_token = body.refresh_token;

          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };

          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
          });

          // we can also pass the token to the browser to make requests from there
          res.redirect('/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });

  app.get('/refresh_token', function(req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });
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
    res.render('landing.pug');
  });

  app.get('/landing/hillary%20clinton', function(req, res) {
    res.render('landing.pug');
  });

  app.get('/landing/barack%20obama', function(req, res) {
    res.render('landing.pug');
  });

    app.post('/searchByBytes', function(req, res){

      console.log("sdf")
    var app1 = new Clarifai.App( // allows access to our clarifai application
      'ThQZUpvaf0LjZFmFpNku6LtN3zVEP92P6UYBmGCl',
      'hUSoLveXXpCZU-cMHZ2N2MGI9gIJERUgQojsLR3H'
    );
    // console.log(req.body);
    var imageBytes = req.body.imageBytes;
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
        // console.log(max);
        // console.log(name);
        if (max < 0.5) { // must be greater than a match of 0.5 to be considered a match
          console.log("Error: No match");
          name = null;
        } else {
          // console.log("OKAY");
          // res.redirect('/landing');
          pyshell.send(name); // sends the name of the match to the python script

          //name.replace(' ', '_'); // removes the whitespace in our concept names
        }
        res.redirect('/landing/' + name); // redirects to the landing page no matter what
      },
      function(err) { // error handling

      }
    );
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
        } else {
          // console.log("OKAY");
          // res.redirect('/landing');
          var pyshell = new PythonShell('search.py'); // search.py opens two web browsers, one of a google search and the other of a sentiment analysis

          pyshell.send(name); // sends the name of the match to the python script

          //name.replace(' ', '_'); // removes the whitespace in our concept names
        }
        res.redirect('/landing/' + name); // redirects to the landing page no matter what
      },
      function(err) { // error handling

      }
    );
  });
}
