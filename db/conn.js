const express = require("express");
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
const { rootCertificates } = require("tls");

dotenv.config({ path: '../env' });

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database:  'interview',
    multipleStatements: true
});


db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('server connected...')
    }
})


module.exports = db;