var mongoose = require('../db/mongodb');
var Schema = mongoose.Schema;

var AppointSchema = new Schema({
    name: {type: String},
    date: {type: Date},
    scores: {type: Array, default: []},
    period: {type: Number}
});

mongoose.model('appointment', AppointSchema);
var Appointment = mongoose.model("appointment");

module.exports = Appointment;