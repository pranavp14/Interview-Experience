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

    db.query('  SELECT  students.email ,round.round,round.experience, students.companyName, students.name , company.placeDate , company.jobRole,company.campus FROM  students JOIN company ON students.email=company.email JOIN round ON students.email=round.email WHERE (round.round,round.experience , round.id ) IN (select round.round,round.experience, MIN(round.id) FROM round GROUP BY round.email) ', function(err, roundData) {

        if (err) {
            console.log("Error while retreving data " + err)
        } else {
            // console.log("------getting Rounnd data from query-------")
            // console.log(roundData);
            res.render('index', { data: roundData });
        }

    });

});

router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;