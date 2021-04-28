var express = require('express');
var router = express.Router();

/* GET upload listing. */
message =''
router.get('/', function(req, res, next) {
    // res.render('Upload', { title: 'Green-Code' });
    res.render('Upload', message);
});

module.exports = router;