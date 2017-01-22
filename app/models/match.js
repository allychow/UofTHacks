var mongoose = require('mongoose');

var matchSchema = mongoose.Schema({
  name: String,
  data: String
});

var Match = mongoose.model('Match', matchSchema);
module.exports = Match;
