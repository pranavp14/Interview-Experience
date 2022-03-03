const express = require("express");
// require("./db/conn");
const db = require('./db/conn');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require("body-parser");
const { param } = require("./routes/add");

dotenv.config({ path: './env' });

const app = express();
const port = process.env.PORT || 5001;

const template_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");

// app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

const HTMLContentViewer = require('html-content-viewer');
//Initialization
HTMLContentViewer.init();

hbs.registerHelper('trimString', function(passedString, startstring, endstring) {
    var theString = passedString.substring( startstring, endstring );
    return new hbs.SafeString(theString)
 });
const publicDirectory = path.join(__dirname, './public');
const assetsDirectory = path.join(__dirname, './assets');
app.use(express.static(publicDirectory));
app.use(express.static(assetsDirectory));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');


//Define routes

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/add', require('./routes/add'));
app.get('/read/:id', (req, res) => {
    // console.log(req.params.id)
    db.query(`SELECT * FROM experience WHERE id=${req.params.id}`, function (err, rows) {

        if (err) {
            // req.flash('error', err); 
            console.log("Error while retreving data " + err)
            // res.render('list',{page_title:"Users - Node.js",data:''});   
        } else {
            //     for(var key in rows){

            var key = 0;
            for (var atr in rows[key]) {
                //  console.log(typeof atr);
                if (typeof rows[key][atr] == 'string' || rows[key][atr] instanceof String)
                    rows[key][atr] = rows[key][atr].replace(/(?:\r\n|\r|\n)/g, ' <br />');
                // rows[key][atr]=rows[key][atr].replace(/(?:')/g, '`');
                // rows[key][atr]=rows[key][atr].replace(/(?:')/g');
                //    rows[key][atr] = ` ${rows[key][atr]} `;
            }

            //    }
            console.log(rows);
            res.render('read', { data: rows });
        }

    });
})
app.post('/search', (req, res) => {
    console.log("Search value is Here..........")
    console.log(`${req.body.searchvalue}`)
    db.query('SELECT * FROM experience WHERE CompanyName=?', [req.body.searchvalue], function (err, rows) {

        if (err) {

            console.log("Error while retreving data " + err)

        }
        else if (req.body.searchvalue == 0 || rows.length == 0) { res.redirect('/') }
        else {

            //  console.log(rows);
            //  console.log("Seepterting---------------------------")

            res.render('index', { data: rows });
        }

    });
})


app.listen(port, () => {
    console.log("server is running");
})