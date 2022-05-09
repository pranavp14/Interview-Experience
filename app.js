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
app.get('/read/:email', (req, res) => {
    let email = req.params.email;
    console.log(email)
    var queryy = "SELECT *   FROM   students inner join message ON message.email= '" + email + "' inner join company ON  company.email='" + email + "' WHERE  students.email= '" + email + "'"
    console.log(queryy)
    db.query((queryy), function(err, sData) {

            if (err) {
                console.log("Error while retreving data " + err)
            }
            console.log(sData)
            console.log("SData is completed-- -- -- -- -- --------- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            db.query(("select * from round where round.email= '" + email + "'"), function(err, rData) {
                console.log(email);

                if (err) {
                    console.log("Error while retreving data " + err)
                }
                console.log(rData)
                res.render('read', { sData: sData, rData: rData });
            })
        })
        /// for round Data

});
app.post('/search', (req, res) => {
    console.log("Search value is Here..........")
    console.log(`
            $ { req.body.searchvalue }
            `)
    db.query('SELECT * FROM experience WHERE CompanyName=?', [req.body.searchvalue], function(err, rows) {

        if (err) {

            console.log("Error while retreving data " + err)

        } else if (req.body.searchvalue == 0 || rows.length == 0) { res.redirect('/') } else {

            //  console.log(rows);
            //  console.log("Seepterting---------------------------")

            // res.render('index', { data: rows, });
        }

    });
})


app.listen(port, () => {
    console.log("server is running");
})