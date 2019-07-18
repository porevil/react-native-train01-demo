const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))


var formidable = require('formidable');
var path = require('path');
var fs = require("fs-extra");
app.use(express.static('upload'));


app.post('/uploads/', (req, res) =>{
    console.log("Upload File");

    try {
        var form = new formidable.IncomingForm();
        var newname = Date.now();
        form.parse(req, function (err, fields, files) {

            console.log(JSON.stringify(files));
            var oldpath = files.userfile.path;
            var newpath = path.join(__dirname, "./upload/" + newname.toString() + "." + files.userfile.name.split('.').pop());
            
            fs.move(oldpath, newpath, function (err) {
                if (err) throw err;

              var username = fields.username;
              var password =fields.password;
              console.log("username: " + username);
              console.log("password: " + password);
              res.json({result: "Upload Successfully"});

            });            
        });
    } catch (err) {
        console.log("err : " + err);
    }
});

app.get("/", (req, res)=>{
    res.end("Home")
})

app.get("/login", (req, res)=>{
    res.json(req.query)
})

app.post("/register", (req, res)=>{
    res.json(req.body)
})

app.listen(5000, ()=>{
    console.log("Server is running..")
})