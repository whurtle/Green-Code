var express = require('express');
var router = express.Router();

/* GET upload listing. */
router.get('/', function(req, res, next) {
    res.render('Upload', { title: 'Green-Code' });
});

module.exports = router;