const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/crud_db").then(()=>{
   console.log("db connected");
}).catch((error)=>{
    console.log("db connection failed", error)
})
