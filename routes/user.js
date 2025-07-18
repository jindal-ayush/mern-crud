const express =  require('express');

const router =  express.Router();

// router.get('/users', async(req,res)=>{
//     const allDbUsers = await User.find({})
//    const html = `
//    <ul>
//    ${allDbUsers.map(users =>`<li>${users.firstName} - ${users.email}</li>`).join('')}
//    </ul>
//    `;
//    res.send(html)
// })
router.get('/', async(req, res)=>{
        const allDbUsers = await User.find({})
return  res.json(allDbUsers);
})

router.get("/:id", async(req, res)=>{
    const user = await User.findById(req.params.id)
    return res.json(user);
})

router.post("/", async(req, res)=>{
    const body = req.body;
    if(
        !body ||
        !body.first_name||
        !body.last_name||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
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
router.patch("/:id",async (req, res)=>{
      await User.findByIdAndUpdate(req.params.id, {lastName: 'changed'})
       return  res.json({statur: "success"})
})
router.delete("/:id",async (req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({status : "success"})
    console.log("delete request")
})


module.export = router;