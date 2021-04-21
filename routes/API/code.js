var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const fileUpload = require('express-fileupload');
router.use(fileUpload());

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

/**
 * Gets all the orders if there is no id in query
 * @Returns json object containing all code files in DB
 */
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

    res.json({ success: (Array.isArray(codes) && codes.length > 0), codes: codes});
});

/**
 * Updates code data in database by submissionID
 * @returns 'fileUploaded' when files has been uplaoded into db
 */
// router.post('/upload', function (req, res) {
//     let sampleFile;

//     if(!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     sampleFile = req.files.sampleFile;
//     console.log(sampleFile);

//         pool.query('UPDATE Code SET codeString = ? WHERE submissionId = "1"', [sampleFile.data], (err, codes) => {
//             if(!err) {
//                 res.send("file Uploaded");
//             } else {
//                 console.log(err);
//             }
//         });
// });


router.post('/upload', function (req, res) {
    let sampleFile;

    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    sampleFile = req.files.sampleFile;
    console.log(sampleFile); 

    // onSignIn(googleUser);
    // console.log();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);

    // every time I used this to_date function, I got a really anoying error saying this function does not exist 
    // SQL> INSERT INTO Code VALUES(TO_DATE('?', \'DD/MM/YYYY\'));

    pool.query('INSERT INTO Code (userId, submissionNumber, codeString) VALUES (?, ?, ?)', [2, 2, sampleFile.data], (err, codes) => {
        if(!err) {
            res.send("file Uploaded");
        } else {
            console.log(err);
        }
    });
});


module.exports = router;


