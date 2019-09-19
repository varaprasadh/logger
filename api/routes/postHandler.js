const express=require('express');
const Router=express.Router();
const User=require('../model/user');
const geoip=require('geoip-lite');

const uuidv1 = require('uuid/v1');


//create user 

Router.post('/create/user/',(req,res)=>{
   let body=req.body;
   let {username,password,}=body;
   let role=body.role||"user"
   let uid=uuidv1();
   User.findOne({username}).then(record=>{
      if(record==null){
         let user = new User({
            uid,
            username,
            password,
            role,
            sessions: []
         });
         user.save().then(record => {
            console.log(record);
            console.log("user created");
            res.jsonp({
               uid: uid,
               success: true
            });
         }).catch(err => {
            res.jsonp({
               success: false
            })
         })
      }else{
         throw new Error("username already exists");
      }
   }).catch(err=>{
      res.jsonp({
         success:false,
         error:"user already exists"
      }); 
   })
});
//delete user;
Router.post("/delete/user",(req,res)=>{
   let {username,password}=req.body;
   console.log(req.body);
   User.deleteOne({username,password}).then((done)=>{
      console.log(done);
      res.jsonp({
         success:true
      });
   }).catch(err=>{
      res.jsonp({
         success:"false"
      })
   })
});

//delete session record 
Router.post("/delete/session", (req, res) => {
   let {username,password,id}=req.body;

   console.log(req.body);

   User.findOne({
      username,password
   }).then(record=>{  
      if(record!=null){
          record.sessions=[...record.sessions.filter(session=>session._id!=id)];
          record.save().then(record=>{
               res.jsonp({
                  status: true
               }); 
          }).catch(err=>{
             res.jsonp({
                status: false
             });
          })
          
      
      }else{
         throw new Error("something not found");
      }

   }).catch(err=>{
      console.log(err);
      res.jsonp({
         status:false,
      });
   })

})


Router.post('/upload',(req,res)=>{
   let obj=req.body;
   let uid=obj.uid||null;
   var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var geo= geoip.lookup(ip);
   var country =geo?geo.country:"N/A";
  

   User.findOne({uid}).then(record=>{
      console.log(record);
      let session={...obj,ip,country,dateTime:Date.now()}
      console.log("debug session data",session);
      if(record==null){
        
        User.findOne({role:"admin"}).then(record=>{
         console.log("putting into admin",record.sessions[0]);
         record.sessions.push(session);
         record.save().then(record=>{
            console.log("record saved",record);
         })
        });
      }else{
          record.sessions.push(session);
          record.save().then(record => {
             console.log("record saved", record);
          })

      }
   });

   
   // user.save().then(()=>{
   //    // console.log("object added");
   // });

   res.end();
});

module.exports=Router;
 
