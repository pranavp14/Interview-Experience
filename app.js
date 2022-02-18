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

const template_path = path.join(__dirname,"./templates/views");
const partials_path = path.join(__dirname,"./templates/partials");

// app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

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
app.use('/add',require('./routes/add'));


// app.use('/experience',(req,res)=>{
//     res.render('experience');
// })
// app.use('/',(req,res)=>{
//     res.render('index');
// })

app.listen(port, ()=>{
    console.log("server is running");
})