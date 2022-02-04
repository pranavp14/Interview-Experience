const express = require("express");
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const jws = require('jsonwebtoken');
dotenv.config({ path: '../env'});


exports.register = (req,res)=>{

    var conDB = db;
    console.log(req.body);

    const{ name, email, passingyr, branch, password } = req.body;

    conDB.query('SELECT * FROM `users` WHERE email = ?'[email], async(err,result)=>{
        if(err){
            console.log("error occur");
            console.log(err);
        }
        else{
            if(result.length > 0){
            return res.render('register', {
                message: "that email is already in use"
            });
           }
           else{

            let hashedpassword = await bcrypt.hash(password, 8);
            console.log(hashedpassword); 
            conDB.query('INSERT INTO users SET ?',{name: name, email: email, passingyr: passingyr, branch: branch, password: hashedpassword}, (err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(result);
                        return res.render('register',{
                            message: 'User Registerd'
                        });
                    }
            })
        }
       } 
    });

}

