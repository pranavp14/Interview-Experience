const express = require("express");
require("./db/conn");

const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
const hbs = require('hbs');

dotenv.config({ path: './env'});

const app = express();
const port = process.env.PORT || 5001;

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine','hbs');

app.use('/auth',require('./routes/auth'));

//Define routes

app.use('/',require('./routes/pages'));

app.listen(port, ()=>{
    console.log("server is running");
})