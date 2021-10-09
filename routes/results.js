const { json } = require('express');
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

 router.get('/json', async function(req, res, next) {
    var results = await new Promise((resolve, reject) => {
        pool.query('SELECT * from SortRun', [], (error, results) => {
            if (error) {
                req.err = error;
                reject(error);
                res.status(500).send();
            } else {
                res.send(results.map(row => JSON.parse(row.jsonString)));
            }
        });
    });
 });

 router.get('/json/:submissionId', async function(req, res, next) {
    var results = await new Promise((resolve, reject) => {
        pool.query('SELECT jsonString FROM SortRun where submissionId = ?', [req.params.submissionId], (error, results) => {
            if (error) {
                req.err = error;
                reject(error);
                res.status(500).send();
            } else {
                res.send(results.map(row => JSON.parse(row.jsonString)));
                resolve(results);
            }
        });
    });
 });

module.exports = router;

