var Clarifai = require('clarifai');
//var PythonShell = require('python-shell');
//var pyshell = new PythonShell('search.py'); // search.py opens two web browsers, one of a google search and the other of a sentiment analysis

var app = new Clarifai.App(
  'ThQZUpvaf0LjZFmFpNku6LtN3zVEP92P6UYBmGCl',
  'hUSoLveXXpCZU-cMHZ2N2MGI9gIJERUgQojsLR3H'
);

var nameOfURL = "http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg";

app.models.predict("TRUMP", [nameOfURL]).then(
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
        max = response["outputs"][0]["data"]["concepts"][i]["value"];
        name = response["outputs"][0]["data"]["concepts"][i]["name"];
      }
    }
    console.log(max);
    console.log(name);
    if (max < 0.5) {
      console.log("Error: No match");
    } else {
      //res.redirect('/landing');
      //pyshell.send(name); // sends the name of the match to the python script

    }
  },
  function(err) {

  }
);
