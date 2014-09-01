Appointment = require("../schema/appointment");
Score = require("../schema/score");

var Service = {};


Math.avg = function(nums) {
  var sum = 0;
  for(var m = 0; m < nums.length; m++) {
    sum += parseFloat(nums[m]);
  }
  return (sum/nums.length).toFixed(2);
}

Service.getAppointments = function(callback) {
  Appointment.find({}, null, {sort: [["date", 1]]}, function(err, doc) {
    for(var m in doc) {
      doc[m].avg = Math.avg(doc[m].scores);
    }
    typeof(callback) == "function" && callback(err, doc);
  });
}

Service.getCurrent = function(callback) {
  var today = new Date(global.current_share_day);
  Appointment.find({date: today}, function(err, doc) {
    typeof(callback) == "function" && callback(err, doc);
  });
}

// Ajax
Service.doAppoint = function() {
  var appoint = new Appointment({
    name: "renyi2",
    date: "2014-8-11",
    period: 1
  });
  appoint.save();
}

// Ajax
Service.doScore = function(items) {
  var status = true;
  for(var m in items) {
    var data = items[m];
    try{
      Appointment.findByIdAndUpdate(data._id, {
        $push: {scores: parseFloat(data.score)}
      }, {
        safe: true,
        upsert: true
      }, function(err, model) {});
    }
    catch(err) {
      status = false;
    }
  }
  return status;
}

module.exports = Service;

