var Clarifai = require('clarifai');
var app = new Clarifai.App(
  'ThQZUpvaf0LjZFmFpNku6LtN3zVEP92P6UYBmGCl',
  'hUSoLveXXpCZU-cMHZ2N2MGI9gIJERUgQojsLR3H'
);
window.onload = transformIntoImageBytes

var nameOfURL = "http://pm.gc.ca/sites/pm/files/media/pm_trudeau_600x683.jpg";

/*app.inputs.create({
  url:""+nameOfURL, concepts: [
    {
      id:"donald trump",
      value:false
    }
  ]
});*/

app.inputs.create([
    {
      url: "https://samples.clarifai.com/metro-north.jpg",
      id: 'train1' // for initializing its concept
    },
    {
      url: "https://samples.clarifai.com/puppy.jpeg",
      id: 'puppy1' // for initializing its concept (ie creating a new concept)
    }
  ]).then(
    function(response) {
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );

app.models.train("TRUMP").then(
  function(response) {

  },
  function(err) {
    console.log("ERROR");
  }
);
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
    }
  },
  function(err) {

  }
);

//app.models.predict("TRUMP", {base64: transformIntoImageBytes()})

function transformIntoImageBytes(){

  var img = document.getElementById("uploadedImage")
  var canvas = document.getElementById("previewCanvas")

  var ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0);

  var mydataURL=canvas.toDataURL('image/png');

  mydataURL = mydataURL.substring(23,mydataURL.count)

  return mydataURL
}