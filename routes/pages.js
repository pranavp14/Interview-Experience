const express = require("express");
const db = require('../db/conn');
const router = express.Router();
const hbs = require('hbs');
hbs.registerHelper('trimString', function(passedString, startstring, endstring) {
    var theString = passedString.substring( startstring, endstring );
    return new hbs.SafeString(theString)
 });
router.get('/',(req,res)=>{


    db.query('SELECT * FROM experience',function(err,rows)     {
    
        if(err){
         // req.flash('error', err); 
         console.log("Error while retreving data "+err)
         // res.render('list',{page_title:"Users - Node.js",data:''});   
        }else{
            
         // console.log(rows)
         console.log("Seepterting---------------------------")
         // for (var j = 0; j < rows.length; j++){
             
         //     console.log(rows[j]);
             
         //     }
            res.render('index',{data:rows});
        }
                            
         });
    // res.render('index');
});

router.get('/register',(req,res)=>{
    res.render('register');
});

router.get('/experience',(req,res)=>{
    res.render('experience');
});

module.exports = router;