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

router.post('/register',(req,res)=>{
    
    var conDB = db;
    console.log(req.body);

    const{ name, email, passingyr, branch, password } = req.body;

    conDB.query('SELECT * FROM users WHERE email = ?',[email], async(err,result)=>{
        if(err){
            console.log("error occur");
            console.log(err);
        }
        else{
            if(result.length > 0){
                alert ('that email is already in used!')      
            res.render('register',)
           }
           else{

            let hashedpassword = await bcrypt.hash(password, 8);
            console.log(hashedpassword); 
            conDB.query('INSERT INTO users SET ?',{name: name, email: email, passingyr: passingyr, branch: branch, password: hashedpassword}, (err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(result);
                        // req.flash('success', 'You have successfully signup!');
                        return res.render('register')
                    }
            })
        }
       } 
    })
})

router.post('/login', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var sql='SELECT * FROM users WHERE email =? AND password =?';
    db.query(sql, [email, password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            // req.body.loggedinUser= true;
            req.body.email = email;
            console.log("login Successfully!")
            res.render('experience');
        }else{
            alert ("Your Email Address or password is wrong")  
            res.render('register',{alertMsg:"Your Email Address or password is wrong"});
        }
    })
})
       

module.exports = router;