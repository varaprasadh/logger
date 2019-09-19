const mongoose=require('mongoose');

const session=new mongoose.Schema({
    session:Object,
    dateTime:Number,
    country:String,
    ip:String,
    url:String,
    host:String,
    userAgent:String
});

const UserSchema=new mongoose.Schema({
    uid:String,
    username:String,
    password:String,
    role:String,
    sessions:[session]
});

const User=mongoose.model('User',UserSchema);

module.exports=User;



