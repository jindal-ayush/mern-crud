const express  = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
 const app = express();
 require("./db");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
 const PORT = 3000;

app.get('/',(req, res)=>{
    console.log("get request");
            res.send("GET request received");

});


app.post('/',(req, res)=>{
    mongoose.post()
    console.log("post request")
    res.send("Post request received");
});

app.put('/',(req, res)=>{
    console.log("put request");
    res.send("Put request received");
  
});

app.delete('/',(req, res)=>{
    console.log("delete request")
    res.send("Delete request received");
});

app.listen(PORT, ()=>{
    console.log(`port is running is ${3000}`);
})




// const http  = require('http');

// const myServer  = http.createServer((req, res)=>{
//     // console.log(req);
//     res.end("hello")
// });

// myServer.listen(3000, ()=>console.log('server is started'));
