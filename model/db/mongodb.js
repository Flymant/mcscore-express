var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mcscore");

module.exports = mongoose;