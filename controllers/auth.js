


exports.register = (req,res)=>{
    console.log(req.body);

    // const name = req.body.name;
    // const email = req.body.email;
    // const passingyr = req.body.passingYear;
    // const branch = req.body.branch;
    // const password = req.body.password;

    const{ name,emai,passingyr,branch,password } = req.body;

    debug.query()

    res.send("Form Sumbmitted");
}