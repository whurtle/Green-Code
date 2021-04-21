var express = require('express');
var router = express.Router();

/* GET results listing. */
router.get('/', function(req, res, next) {
    res.render('Results', { title: 'Green-Code' });
});

module.exports = router;