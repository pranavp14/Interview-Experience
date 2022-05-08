const express = require("express");
const db = require('../db/conn');
const router = express.Router();
const hbs = require('hbs');
const HTMLContentViewer = require('html-content-viewer');
//Initialization
HTMLContentViewer.init();

hbs.registerHelper('trimString', function(passedString, startstring, endstring) {
    var theString = passedString.substring(startstring, endstring);
    return new hbs.SafeString(theString)
});
router.get('/', (req, res) => {


    // db.query('SELECT * FROM   company , message ,students WHERE   students.email=message.email AND  students.email=company.email', function(err, mainData) {

    //     if (err) {
    //         console.log("Error while retreving data " + err)
    //     } else {

    //         // for (var key in rows) {


    //         //     for (var atr in rows[key]) {

    //         //         if (typeof rows[key][atr] == 'string' || rows[key][atr] instanceof String)
    //         //             rows[key][atr] = rows[key][atr].replace(/(?:\r\n|\r|\n)/g, ' <br />');

    //         //     }

    //         // }
    //         console.log("-------------------------getting data from query--------------")
    //         console.log(mainData);

    //         res.render('index', { data: mainData });
    //         // res.render('index');
    //     }

    // });
    db.query('  SELECT students.sid,  students.email ,round.round,round.experience, students.companyName, students.name , company.placeDate , company.jobRole,company.campus FROM  students JOIN company ON students.email=company.email JOIN round ON students.email=round.email WHERE (round.round,round.experience , round.id ) IN (select round.round,round.experience, MIN(round.id) FROM round GROUP BY round.email) ', function(err, roundData) {

        if (err) {
            console.log("Error while retreving data " + err)
        } else {
            console.log("-------------------------getting   Round   data from query--------------")
            console.log(roundData);

            res.render('index', { data: roundData });
        }

    });

});

router.get('/register', (req, res) => {
    res.render('register');
});

// router.get('/experience', (req, res) => {
//     res.render('experience');
// });

module.exports = router;