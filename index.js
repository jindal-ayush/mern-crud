const express = require('express');
const mongoose = require('mongoose')
const app = express();
app.use(express.urlencoded({extended: false})); 
app.use(express.json())
const port = 8000;

mongoose.connect('mongodb://localhost:27017/testdb')    
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true,
    },
    lastName:{
       type: String
    }, 
    
    email:{
        type: String,
        require: true,
        unique: true,
    }, 
    jobTitle:{
        type: String,
    }, 
    gender:{
        type: String,
    },
},
  {timestamps: true}
);

const User = mongoose.model("user", userSchema)

app.get('/users', async(req,res)=>{
    const allDbUsers = await User.find({})
   const html = `
   <ul>
   ${allDbUsers.map(users =>`<li>${users.firstName} - ${users.email}</li>`).join('')}
   </ul>
   `;
    res.send(html)
})
app.get('/api/users', async(req, res)=>{
        const allDbUsers = await User.find({})
return  res.json(allDbUsers);
})

app.get("/api/users/:id", async(req, res)=>{
    const user = await User.findById(req.params.id)
    return res.json(user);
})

app.post("/api/users", async(req, res)=>{
    const body = req.body;
    console.log('body', body);
    if(
        !body ||
        !body.first_name||
        !body.last_name||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return res.status(400).json({"msg": "bad request"})
}
const result  = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
})
return res.status(201).json({msg: "sucess"})
})


app.patch("/api/users/:id",async (req, res)=>{
        await User.findByIdAndUpdate(req.params.id, {lastName: 'changed'})
        return  res.json({statur: "success"})
    })
app.delete("/api/users/:id",async (req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({status : "success"})
})

app.listen(port ,(req, res)=>{
    console.log(`server is started on ${port}`)
})













// const express = require('express');
// const mongoose = require('mongoose')
// const app = express();
// const userRouter = require('./routes/user')
// app.use(express.urlencoded({extended: false}));

// const port = 8000;

// mongoose.connect('mongodb://localhost:27017/testdb')
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));


// app.listen(port ,(req, res)=>{
//     console.log(`server is started on ${port}`)
// })
