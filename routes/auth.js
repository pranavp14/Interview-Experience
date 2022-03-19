const express = require("express");
// const authcontroller=require('../controllers/auth');
const router = express.Router();
const db = require('../db/conn');
const bcrypt = require("bcryptjs");
const alert = require('alert')
    // const mysql = require('mysql2');
    // const path = require('path');

const bodyParser = require("body-parser");
const async = require("hbs/lib/async");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(bodyParser.json());

router.post('/register', (req, res) => {

    var conDB = db;
    console.log(req.body);

    const { name, email, password, password2 } = req.body;

    conDB.query('SELECT * FROM users WHERE email = ?', [email], async(err, result) => {
        if (err) {
            console.log("error occur");
            console.log(err);
        } else {
            if (result.length < 0) {
                alert('that email is already in used!')
                res.render('register', )
            } else {

                let hashedpassword = await bcrypt.hash(password, 8);
                console.log(hashedpassword);
                conDB.query('INSERT INTO users SET ?', { username: name, email: email, password: hashedpassword }, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);

                        console.log("User registered successfully")
                        return res.render('register')
                    }
                })
            }
        }
    })
})

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;


    var sql = 'SELECT * FROM users WHERE email =?';
    db.query(sql, [email], function(err, data, fields) {

        if (err) {
            throw err;
        } else {
            if (data.length > 0) {
                // req.body.loggedinUser= true;
                // req.body.email = email;
                const comparison = bcrypt.compare(password, data[0].password)
                if (comparison) {
                    console.log("login Successfully!")
                    res.render('experience');
                } else {
                    console.log("Email and password does not match!");
                    res.render('register', {
                        "code": 204,
                        "error": "Email and password does not match"
                    })
                }
            } else {
                alert("Your Email Address or password is wrong")
                res.render('register', { alertMsg: "Your Email Address or password is wrong" });
            }
        }
    })
})


module.exports = router;