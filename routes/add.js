const express = require("express");
const router = express.Router();
const db = require('../db/conn');
const bcrypt = require("bcryptjs");
const alert = require('alert');

const bodyParser = require("body-parser");
const { redirect } = require("express/lib/response");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());

router.post('/experience', (req, res) => {

    var conDB = db;
    // console.log(req.body);

    const { StudentName, CompanyName, mode, campus, jobRole, package, placeDate, intershipOffer, email, round1, experience1, round2, experience2, round3, experience3, round4, experience4, round5, experience5, message, source, level } = req.body;
    conDB.query('INSERT INTO students SET ?', { name: StudentName, email: email, companyName: CompanyName }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            console.log('success', 'Added data into Students Table');
            res.end();
        }
    })
    conDB.query('INSERT INTO company SET ?', { email: email, internshipOffer: intershipOffer, mode: mode, campus: campus, jobRole: jobRole, package: package, placeDate: placeDate, level: level }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            console.log('success', 'Added data into companyTable');
            res.end();
        }
    })

    // -----------------round table insertion startzzzzz---------------------------
    arr = Object.values(req.body)
    var len = arr.length;
    console.log(len)
    for (let i = 0; i < arr.length - 12; i += 2) {
        console.log(arr[i + 9]);
        console.log(arr[i + 10]);
    }
    for (let i = 0; i < arr.length - 12; i++) {


        conDB.query('INSERT INTO round SET ?', {
            email: email,
            round: arr[i++ + 9],
            experience: arr[i + 9],
        }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                console.log('success', 'Added data into Round Table');
                res.end();
            }
        })

    }

    // ---- -------------round table insertion   endszzz---------------------------


    conDB.query('INSERT INTO message SET ?', { email: email, message: message, source: source }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            console.log('success', 'Added data into MEssageTable');
            res.end();
        }
    })

})

router.get('/', function(req, res, next) {
    console.log("Inside the get request to db");
    db.query('SELECT * FROM experience', function(err, rows) {

        if (err) {
            // req.flash('error', err); 
            console.log("Error while retreving data " + err)
                // res.render('list',{page_title:"Users - Node.js",data:''});   
        } else {

            // console.log(rows)
            console.log("Seepterting---------------------------")
                // for (var j = 0; j < rows.length; j++){

            //     console.log(rows[j]);

            //     }
            res.render('index', { data: rows });
        }

    });

});

module.exports = router;