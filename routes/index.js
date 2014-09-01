var express = require('express');
var service = require('../model/service/service');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res) {
    service.getAppointments(function(err, doc) {
      res.render('index', {title: "MCode分享会 - 首页", data: doc});
    });
});

router.get('/score', function(req, res) {
  service.getCurrent(function(err, doc) {
    res.render('score', {
      title: "MCode分享会 - 评分",
      data: doc
    });
  });
});


router.post('/doscore', function(req, res) {
  service.doScore(req.body.scores) ? res.json({success: true}) : res.json({success: false});
});

module.exports = router;
