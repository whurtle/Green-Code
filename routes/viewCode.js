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
router.get('/:submissionId', async function (req, res) {
    var codes = await new Promise (function (resolve, reject) {
        const query = 'SELECT * FROM Code WHERE submissionId = ?';
        const values = [req.params.submissionId];
        console.log(values);

        pool.query(query, values, function (error, results) {
            if(error) {
                req.err = error;
                reject(error);
            } else {
                resolve(results);
            }
        });
    }); 
    res.render('viewCode', { view: codes });
});

module.exports = router;

