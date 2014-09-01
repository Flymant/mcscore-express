var mongoose = require('../db/mongodb');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
    name: {type: String},
    score: {type: Number},
    adate: {type: Date}
});

mongoose.model('score', ScoreSchema);
var Score = mongoose.model("score");

module.exports = Score;