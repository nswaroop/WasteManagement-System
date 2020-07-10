var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var app= express();
var bodyParser = require("body-parser")
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "jimmy1999",
    database : "project",
    insecureAuth : true
  });
connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
});

  app.post('/signup', function (req, res) {
      console.log("hi");
      var uname=req.body.uname
    var name=req.body.name
    var dob=req.body.dob
    var gender=req.body.gender
    var state=req.body.state
    var district=req.body.district
    var email=req.body.email
    var username=req.body.username
    var password=req.body.password    
    var p=req.body.p    
      console.log("hii");
    connection.query("INSERT INTO public VALUES ('"+name+"','"+dob+"','"+gender+"','"+email+"','"+state+"','"+district+"','"+username+"','"+password+"')", function (err, result, fields) {
    
     if (err) {throw err,
      res.send({log :"0"}),
      console.log("hi");
    };
      
      console.log("result :"+result);
      });
      if(p==1)
      {
        connection.query('update public set name= "'+name+'" , dob="'+dob+'" ,  gender= "'+gender+'" , email="'+email+'" , p_state= "'+state+'" , p_district="'+district+'" , p_username= "'+username+'" , p_password="'+password+'"  where username= "'+uname+'" ', function (err, result, fields) {
    
          if (err) {throw err,
           res.send({log :"0"}),
           console.log("hi");
         };
           
           console.log("result :"+result);
           });
      }
  });


  app.post('/profile', function (req, res) {
    var name=req.body.name
       connection.query('SELECT * from public', function (error, results, fields) {
        if (error) throw error;
        var length=results.length
     
        for(i=0;i<length;i++)
        {
          if(value==results[i].p_username)
          {
            console.log(name);
            res.send({name : results[i].name,dob : results[i].dob,gender : results[i].email,state :results[i].p_state,district : results[i].district  })
            res.end()

          }
        }      
       });
  });

app.listen(8001);