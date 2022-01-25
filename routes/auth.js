const express = require("express");
const authcontroller=require('../controllers/auth');
const router = express.Router();
const db = require('../db/conn');

const mysql = require('mysql2');
const path = require('path');

const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({extended: false});
router.use(bodyParser.json());

router.post('/register',authcontroller.register)


module.exports = router;