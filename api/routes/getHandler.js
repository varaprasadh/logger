const express = require('express');
const Router = express.Router();
const User = require('../model/user');
const path = require('path');

//for admin 

Router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/../", "public", "index.html"));

});
Router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, "/../", "public", "main.html"));
})
Router.get("/main/user",(req,res)=>{
    res.sendFile(path.join(__dirname,"/../","public","main_user.html"));
    
})
Router.get('/login/:username/:password', (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    
    User.findOne({
       username,password
    }).then(record=>{
        console.log("record debug",record);
        if(record!=null){
            console.log("getting inseide");
          if(record.role=="admin"){
              //send main page
              console.log("admin login")
            res.redirect('/main');
          }else if(record.role=="user"){
             //send to admin page.. 
             console.log("user login");
             res.redirect('/main/user');
          }

        }else{
           res.redirect('/');
        } 
    }).catch(err=>{
        console.log(err);
       res.redirect("/");
    })
   
});
Router.get('/getxlog/:username/:password', (req, res) => {
    let username = req.params.username;
    let password = req.params.password;

    User.findOne({
        username,
        password
    }).then(record=>{
        if(record!=null){
          console.log(record);
          res.jsonp({
              status:true,
              data:[...record.sessions]
          });
        }else{
            throw new Error("user data not found");
        }
    }).catch(err=>{
        res.jsonp({
            data:'',
            status:false
        })
    });

});

Router.get('/users',(req,res)=>{
   User.find({
           role: {
                   $ne: "admin"
            }
       }).then(records => {
       let userdata=records.map(record=>{
           let {username,password,uid}=record;
           return {username,password,uid}
       });
       res.jsonp({
           success:true,
           data:userdata
       });
   }).catch(err=>{
       res.jsonp({
           success:false
       })
   })

});



module.exports = Router;
