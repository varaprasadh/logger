const mongoose=require('mongoose');
const config=require('./config.variables');

console.log(config.DB_URL);

mongoose.connect(config.DB_URL, {
    useNewUrlParser: true
});


function getConnection(){
   return new Promise((resolve,reject)=>{
        mongoose.connection.on('connected', () => {
            console.log("connected");
            resolve(mongoose.connection);
        });
        mongoose.connection.on('error',(err)=>{
            reject(new Error(err.message));
        });
    })
}

module.exports=getConnection;







