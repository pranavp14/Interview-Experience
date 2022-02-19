const express = require("express");
// const authcontroller=require('../controllers/auth');
const router = express.Router();
const db = require('../db/conn');
const bcrypt = require("bcryptjs");
const alert = require('alert')
// const mysql = require('mysql2');
// const path = require('path');

const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({extended: false});
router.use(bodyParser.json());

router.post('/experience',(req,res)=>{
    
    var conDB = db;
    console.log(req.body);
       
    const{ StudentName, CompanyName, mode, campus, jobRole, package, placeDate, intershipOffer, email, round1, experience1, round2, experience2, round3, experience3, round4, experience4, round5, experience5, message, source, level} = req.body;
    conDB.query('INSERT INTO experience SET ?',{StudentName : StudentName, CompanyName: CompanyName, mode: mode, campus: campus, jobRole: jobRole, package: package, placeDate: placeDate, intershipOffer: intershipOffer, email: email, round1: round1, experience1: experience1, round2: round2, experience2: experience2, round3: round3, experience3 : experience3, round4: round4, experience4: experience4, round5: round5, experience5: experience5, message: message, source: source, level: level}, (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            // alert('success', 'You have successfully add experience!');
            return res.render('index')
        }
})
})

module.exports = router;