const express = require("express");
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: '../env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect( (error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('server connected...')
    }
})

module.exports = db;




