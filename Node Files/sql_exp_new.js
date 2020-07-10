var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var app= express();
var bodyParser = require("body-parser");
var open=require('open')
var ArrayList=require('arraylist')
var rn = require('random-number');
var fs=require('fs');
var gen = rn.generator({
  min:  1
, max:  10000
, integer: true
})

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
app.post('/', function (req, res) {
  console.log('form');
    var username=req.body.username
    var password=req.body.password
    var type=req.body.type
    var login_success=0
    var p=req.body.p
    var name=req.body.name
     console.log(p);
     if(type=="authorities")
    {
      connection.query('SELECT * from authority', function (error, results, fields) {
        if (error) throw error;
        var length=results.length
        var flag=0;
        for(i=0;i<length;i++)
        {
            
            console.log('\nThe solution is: ', results[i].a_username , results[i].a_password);
            if(username==results[i].a_username)
            {
                if(password==results[i].a_password)
                {
                    flag=1;
                }
            }
           

            }
            if(flag==1)
            {
              console.log('valid');
              login_success=1;
              
              res.send({log : login_success })
                 res.end()
            }
            else{
              console.log(' not valid');
              res.send({log : login_success})
                res.end();  

        }
    });
    }
    else if(type=="survey")
    {
    connection.query('SELECT * from survey', function (error, results, fields) {
            if (error) throw error;
            var length=results.length
            var flag=0;
            for(i=0;i<length;i++)
            {
                
                console.log('\nThe solution is: ', results[i].s_username , results[i].s_password);
                if(username==results[i].s_username)
                {
                    if(password==results[i].s_password)
                    {
                        flag=1;
                    }
                }
          
            }
            if(flag==1)
            {
              console.log('valid');
              login_success=2;
              res.send({log : login_success })
              
                 res.end()
            }
            else{
              console.log(' not valid');
              res.send({log : login_success})
                res.end();  

            }
        });
    }
    else if(type=="public")
    {
    connection.query('SELECT * from public', function (error, results, fields) {
            if (error) throw error;
            var length=results.length
            var flag=0;
            for(i=0;i<length;i++)
            {
                
                console.log('\nThe solution is: ', results[i].p_username , results[i].p_password);
                if(username==results[i].p_username)
                {
                    if(password==results[i].p_password)
                    {
                        flag=1;
                    }
                }
                
            }
            if(flag==1)
                {
                  console.log('valid');
                  login_success=3;
                  res.send({log : login_success })
                  
                     res.end()
                }
                else{
                  console.log(' not valid');
                  res.send({log : login_success})
                    res.end();  
    
                }
        });
      
     
    }

    if(p==1)
    {
//
      var f1=req.body.f1
      var f2=req.body.f2
      var f3=req.body.f3
      var f4=req.body.f4
      var f5=req.body.f5
      var name=req.body.name
      var aname=""
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      // current year
      let year = date_ob.getFullYear();
      let d=year + "-" + month + "-" + date
      var id=gen()
      console.log(f1)
      console.log(f2)
      console.log(f3)
      console.log(f4)
      console.log(f5)
      console.log(name)
      connection.query('SELECT * from public', function (error, results, fields) {
       if (error) throw error;
       var length=results.length
    
       for(i=0;i<length;i++)
       {
         if(name==results[i].p_username)
         {
          
          state=results[i].p_state
          console.log(state);
         }
       }      
      });
          connection.query('SELECT * from authority', function (error, results, fields) {
        
        if (error) throw error;
        var length=results.length
     
        for(i=0;i<length;i++)
        {
              if(state==results[i].a_state)
          {
           
           aname=results[i].a_username
          
           console.log(aname);
          console.log("feedback insert")
           connection.query( "INSERT INTO feedback (a_username,p_username,f1,f2,f3,f4,f5,dt) VALUES ('"+aname+"','"+name+"','"+f1+"','"+f2+"','"+f3+"','"+f4+"','"+f5+"','"+d+"')", function (err, result, fields) {
    
            if (err) {throw err,
              console.log(err);
              console.log(sname);
           };
           console.log("complain inserted done")
              console.log("result :"+result);
             });

          }
        }      
       });

//
   
    }

    if(p==2)
    {
      var reason=req.body.value
      var district='hi'
      var sname='hh'
      var subject=req.body.subject
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      // current year
      let year = date_ob.getFullYear();
      let d=year + "-" + month + "-" + date
      var id=gen()
      console.log(subject)
      console.log(reason)
      console.log(date_ob)
      console.log(id)
      console.log(d)
      var name=req.body.name
      connection.query('SELECT * from public', function (error, results, fields) {
       if (error) throw error;
       var length=results.length
    
       for(i=0;i<length;i++)
       {
         if(name==results[i].p_username)
         {
          
          district=results[i].p_district
          console.log(district);
         }
       }      
      });
          connection.query('SELECT * from survey', function (error, results, fields) {
        
        if (error) throw error;
        var length=results.length
     
        for(i=0;i<length;i++)
        {
              if(district==results[i].s_district)
          {
           
           sname=results[i].s_username
          
           console.log(sname);
          console.log("complain insert")
           connection.query( "INSERT INTO complaint (subject,reason,c_date,s_username,p_username) VALUES ('"+subject+"','"+reason+"','"+d+"','"+sname+"','"+name+"')", function (err, result, fields) {
    
            if (err) {throw err,
              console.log(err);
              console.log(sname);
           };
           console.log("complain inserted done")
              console.log("result :"+result);
             });

          }
        }      
       });
    }

    if(p==3)
    {
      var list=new ArrayList;
         var name=req.body.name
         var pname=[]
         var subject=[]
         var reason=[]
         pname.push('hi');
      connection.query('SELECT * from complaint', function (error, results, fields) {
       if (error) throw error;
       var length=results.length
    
       for(i=0;i<length;i++)
       {
         if(name==results[i].s_username)
         {
           console.log(results[i].p_username);
           list.set(i,results[i].p_username)
           pname.push(results[i].p_username);
           subject.push(results[i].subject);
           reason.push(results[i].reason);
           
         }
       }
       console.log(list)
       console.log(pname);      
       console.log(subject);   
       console.log(reason);  
        res.send({pname : pname,subject : subject,reason : reason,list: list  })
           res.end()
 
      });
   
    }
//
//
if(p==4)
{
 // var value2=req.body.value2
  var value3=req.body.value3
  var value4=req.body.value4
  var value5=req.body.value5
  var value6=req.body.value6
  var value7=req.body.value7
  var value8=req.body.value8
  var value9=req.body.value9
  var value10=req.body.value10
  var value11=req.body.value11
  var value12=req.body.value12 
  var value13=req.body.value13
  var value14=req.body.value14
  var value15=req.body.value15
  var value16=req.body.value16
  var value17=req.body.value17
  var value18=req.body.value18
 var state="hi"

  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  let d=year + "-" + month + "-" + date
  console.log("hi")
  //console.log(value2)
  console.log(value3)
  console.log(value4)
  console.log(value5)
  console.log(value6)
  console.log(value7)
  console.log(value8)
  console.log(value9)
  console.log(value10)
  console.log(value11)
  console.log(value12)
  console.log(value13)
  console.log(value14)
  console.log(value15)
  console.log(value16)
  console.log(value17)
  var name=req.body.name
  var aname="v"
  connection.query('SELECT * from survey', function (error, results, fields) {
   if (error) throw error;
   var length=results.length

   for(i=0;i<length;i++)
   {
     if(name==results[i].s_username)
     {
      
      state=results[i].s_state
      console.log(state);
     }
   }      
  });
      connection.query('SELECT * from authority', function (error, results, fields) {
    
    if (error) throw error;
    var length=results.length
 
    for(i=0;i<length;i++)
    {
          if(state==results[i].a_state)
      {
       
       aname=results[i].a_username
      
       console.log(aname);
       connection.query( "INSERT INTO report(s_username,a_username,dt,o_waste,l_waste,s_waste,h_waste,r_waste,o_compliant,l_compliant,s_compliant,h_compliant,r_compliant,o_m,l_m,s_m,h_m,r_m,measure) VALUES ('"+name+"','"+aname+"','"+value2+"','"+value3+"','"+value4+"','"+value5+"','"+value6+"','"+value7+"','"+value8+"','"+value9+"','"+value10+"','"+value11+"','"+value12+"','"+value13+"','"+value14+"','"+value15+"','"+value16+"','"+value17+"','"+value18+"')", function (err, result, fields) {

        if (err) {throw err,
          console.log(err);
          console.log(sname);
       };
          console.log("result :"+result);
         });

      }
    }      
   });
   }
//

if(p==5)
{
  console.log("ur going to download")
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  let d=year + "-" + month + "-" + date
   var subject=req.body.subject;
   var reason=req.body.value;
   var name=req.body.name;
   var rn=gen()
   var r="\n ------------------"+"\n` Name of the complainer :"+name+" \n subject:  "+subject+ "\n Reason : "+reason+"\n Date of complain :"+d
   var file="complain"+name+".txt"
   fs.appendFile(file,r,function(err){
    if(err) throw err;
    console.log("downloaded")
    res.end();
    });
}
//
if(p==7)
{
  var name=req.body.name
      connection.query("delete  from complaint where p_username='"+name+"'", function (error, results, fields) {
       if (error) throw error;
       var length=results.length
        });
        connection.query("delete  from public where p_username='"+name+"'", function (error, results, fields) {
          if (error) throw error;
          var length=results.length
           });
}
 if(p==8)
 {
  var pname=req.body.pname
       
    console.log("hii");
        connection.query('update public set name= "'+pname+'"  where p_username= "'+name+'" ', function (err, result, fields) {
  
        if (err) {throw err,
         console.log(err);
       };
         
         console.log("result :"+result);
         });
 }

if(p==10)
{
  var name=req.body.name
  var value2=['hi']
  var value3=[]
  var value4=[]
  var value5=[]
  var value6=[]
  var value7=[]
  var value8=[]
  var value9=[]
  var value10=[]
  var value11=[]
  var value12=[] 
  var value13=[]
  var value14=[]
  var value15=[]
  var value16=[]
  var value17=[]
  var value18=[]
  var value19=[]
  var value20=[]
  var sum1=[]
  var n=req.body.n
  var sn
  var d
  connection.query('SELECT * from report', function (error, results, fields) {
    if (error) {throw error;
    console.log(error);
  }
    var length=results.length
 
    for(i=0;i<length;i++)
    {
      if(name==results[i].a_username)
      {
       value2.push(results[i].report_id);
        value3.push(results[i].s_username);
        value4.push(results[i].dt);
        value5.push(results[i].o_waste);
        value6.push(results[i].l_waste);
        value7.push(results[i].s_waste);
        value8.push(results[i].h_waste);
        value9.push(results[i].r_waste);
        value10.push(results[i].o_compliant);
        value11.push(results[i].l_compliant);
        value12.push(results[i].s_compliant);
        value13.push(results[i].h_compliant);
        value14.push(results[i].r_compliant);
        value15.push(results[i].o_m);
        value16.push(results[i].l_m);
        value17.push(results[i].s_m);
        value18.push(results[i].h_m);
        value19.push(results[i].r_m);
        value20.push(results[i].measure);
      }
    }
    console.log(value2)
    console.log(value3)
    console.log(value4)
    console.log(value5)
    console.log(value6)
    console.log(value7)
    console.log(value8)
    console.log(value9)
    console.log(value10)
    console.log(value11)
    console.log(value12)
    console.log(value13)
    console.log(value14)
    console.log(value15)
    console.log(value16)
    console.log(value17)
    console.log(value18)
    console.log(value19)
    console.log(value20) 
           
        connection.query('SELECT s_district from survey where s_username= (select s_username from report where (o_waste+l_waste+s_waste+h_waste+r_waste) =(select  max(o_waste+l_waste+s_waste+h_waste+r_waste) from report where a_username= "'+name+'" ))', function (error, results, fields) {
          if (error) {throw error;
          console.log(error);
        }
        var length=results.length
               sn=results
            console.log(sn);  
            connection.query('SELECT s_district from survey where s_username= (select s_username from report where (o_compliant+l_compliant+s_compliant+h_compliant+r_compliant) =(select  max(o_compliant+l_compliant+s_compliant+h_compliant+r_compliant) from report where a_username= "'+name+'" ))', function (error, results, fields) {
              if (error) {throw error;
              console.log(error);
            }
            var length=results.length
                   d=results
                console.log(d);  
                   
                res.send({value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20 })
                res.end()  
                if(n==1)
                {
                  console.log("ur going to download")

   var name=req.body.name;
     var r="\n ------------------"+"\n` Most waste collected :"+sn+" \n most no .of complains recieved:  "+d
        var file="Report"+name+".txt"
   fs.appendFile(file,r,function(err){
    if(err) throw err;
    console.log("downloaded")
    res.end();
    });
                }
                     
             });
                         
         });
   });
}

if(p==11)
{
  connection.query('SELECT avg(f1) as f1,avg(f2) as f2,avg(f3) as f3,avg(f4) as f4,avg(f5) as f5 from feedback group by a_username= "'+name+'" ', function (error, results, fields) {
    if (error) {throw error;
    console.log(error);
  }
  var length=results.length
         var f1=results.f1
         var f2=results.f2
         var f3=results.f3
         var f4=results.f4
         var f5=results.f5
      console.log(results);  
     
        console.log("ur going to download")

var name=req.body.name;
var r="\n ------------------"+"\n`How much would you rate for the health care Activities taken by Safe Waste Management Authorities? :"+f1+" \n How much would you rate for the Waste Transport Facilities done properly and by time ? Authorities? : "+f2+"\n`How much would you rate for the Waste collected and managed seperately based on  biodegradable and non-biodegradable? :"+f3+" \n How much would you rate for the health care Activities taken by Safe Waste Management Authorities?: "+f4+"How much would you rate for the health care Activities taken by Safe Waste Management Authorities? :"+f5
var file="FeedbackReport"+name+".txt"
fs.appendFile(file,r,function(err){
if(err) throw err;
console.log("downloaded hi")
res.end();
});
      
           
   });
}

//  console.log(username);
//  console.log(password);
//  console.log(type);
  });
  app.post('/signup', function (req, res) {
    var value=req.body.value
    
       connection.query('SELECT * from public', function (error, results, fields) {
        if (error) throw error;
        var length=results.length
        var flag=0;
        for(i=0;i<length;i++)
        {
            
            console.log('\nThe solution is: ', results[i].p_username , results[i].p_password);
            if(value==results[i].p_username)
            {
               flag=1;
            
            }
           
        }
      
          res.send({log : flag })
             res.end()
             console.log("flag"+flag);
            
       });

    
    console.log(value);
    

  });




app.listen(8000);