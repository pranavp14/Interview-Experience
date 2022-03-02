const express = require("express");
const authcontroller = require('../controllers/auth');
const router = express.Router();
const db = require('../db/conn');

const mysql = require('mysql2');
const path = require('path');

const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(bodyParser.json());

router.post('/register', async(req, res) => {

    var conDB = db;
    console.log(req.body);

    const { name, email, passingyr, branch, password } = req.body;
    // let hashedpassword = await bcrypt.hash(password, 8);
    // console.log(hashedpassword); 
    conDB.query('INSERT INTO users SET ?', { name: name, email: email, passingyr: passingyr, branch: branch, password: password }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            return res.render('register', {
                message: 'User Registerd'
            });
        }
    })

    // conDB.query('SELECT * FROM `users` WHERE email = ?'[email], async(err,result)=>{
    //     if(err){
    //         console.log("error occur");
    //         console.log(err);
    //     }
    //     else{
    //         if(result.length > 0){
    //         return res.render('register', {
    //             message: "that email is already in use"
    //         });
    //        }
    //        else{

    //         let hashedpassword = await bcrypt.hash(password, 8);
    //         console.log(hashedpassword); 
    //         conDB.query('INSERT INTO users SET ?',{name: name, email: email, passingyr: passingyr, branch: branch, password: hashedpassword}, (err,result)=>{
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     console.log(result);
    //                     return res.render('register',{
    //                         message: 'User Registerd'
    //                     });
    //                 }
    //         })
    //     }
    //    } 
    // });
})

module.exports = router;