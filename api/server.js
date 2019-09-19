const express=require('express');
const app=express();
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');

const mongoose=require('mongoose');
const getConnection=require('./dbConnection');

const postHandler=require('./routes/postHandler');
const getHandler=require('./routes/getHandler');


const PORT=process.env.PORT ||9992;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(postHandler);
app.use(getHandler);


app.use(express.static(path.join(__dirname,"public")));

getConnection().then((connection) => {
    console.log(connection.db);
    //after getting database connection start the server

    app.listen(PORT, () => {
        console.log(`server listening at port ${PORT}`);
    });

}).catch(err => {
    console.log(err)
})

