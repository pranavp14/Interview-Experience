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
    var theString = passedString.substring(startstring, endstring);
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
app.get('/read/:sid', (req, res) => {
    sid = req.params.sid;
    // console.log(sid)
    db.query(`(SELECT * FROM students  WHERE students.sid=${sid} )`, function(err, sData) {
        if (err) {
            // req.flash('error', err); 
            console.log("Error while retreving data " + err)
        }

        email = sData[0].email;
        console.log(sData[0].email)
        db.query(`SELECT * FROM company WHERE company.email=${email} `, function(err, mainData) {

            console.log(mainData);
            res.render('read', { data: mainData });

        });


    })
});
app.post('/search', (req, res) => {
    console.log("Search value is Here..........")
    console.log(`${req.body.searchvalue}`)
    db.query('SELECT * FROM experience WHERE CompanyName=?', [req.body.searchvalue], function(err, rows) {

        if (err) {

            console.log("Error while retreving data " + err)

        } else if (req.body.searchvalue == 0 || rows.length == 0) { res.redirect('/') } else {

            //  console.log(rows);
            //  console.log("Seepterting---------------------------")

            res.render('index', { data: rows });
        }

    });
})


app.listen(port, () => {
    console.log("server is running");
})