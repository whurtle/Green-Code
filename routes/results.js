var express = require('express');
var mysql = require('mysql');
var router = express.Router();

// gets the config settings for the db
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
};

// creates a pool to handle query requests.
const pool = mysql.createPool(sqlConfig);

/* GET results listing. */
router.get('/', async function(req, res, next) {
    var codes = await new Promise(function (resolve, reject) {
        const query = 'SELECT * FROM Code';
        pool.query(query, function (error, results) {
            if (error) {
                req.err = error;
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
    res.render('Results', { data: codes });
 });

 router.get('/:submissionId', async function(req, res, next) {
    res.render('graphsJson', { data: req.params.submissionId });
 });

 router.get('/json/:submissionId', async function(req, res, next) {
    var results = await new Promise((resolve, reject) => {
        pool.query('SELECT jsonString FROM Code where submissionId = ?', [req.params.submissionId], (error, results) => {
            if (error) {
                req.err = error;
                reject(error);
                res.status(500).send();
            } else {
                res.send(JSON.parse(results[0].jsonString));
                resolve(results);
            }
        });
    });
 });

module.exports = router;

