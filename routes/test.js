var express = require('express');
var router = express.Router();

router.get('/page/:name', function(req, res) {
    res.render("test/" + req.params.name);
});
module.exports = router;
