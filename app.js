const express = require("express");
// require("./db/conn");

const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require("body-parser");

dotenv.config({ path: './env'});

const app = express();
const port = process.env.PORT || 5001;

const publicDirectory = path.join(__dirname,'./public');
const assetsDirectory = path.join(__dirname,'./assets');
app.use(express.static(publicDirectory));
app.use(express.static(assetsDirectory));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine','hbs');


//Define routes

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.use('/experience',(req,res)=>{
    res.render('experience');
})
app.use('/',(req,res)=>{
    res.render('index');
})

app.listen(port, ()=>{
    console.log("server is running");
})