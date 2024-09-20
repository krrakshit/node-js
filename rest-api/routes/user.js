const express = require("express")

const router = express.Router()


router.use((req,res,next)=>{
    fs.appendFile(  
        "log.txt",
        `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
        (err,data)=>{
            next()
        }
    )
})

router.get("/users",(req,res)=>{
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.firstname}</li>`).join("")}
    </ul>`;
    res.send(html); 
})
router.get("/api/users",(req,res)=>{
    res.setHeader("MY NAME","RAKSHIT")
    return res.json(users)
})

router.route("/api/users/:id")
.get((req,res)=>{
    const id = Number(req.params.id)  
    const user = users.find((user) => user.id === id)
    if(!user) return res.status(404).json({error:"user not found"})
    return res.json(user)
})
.patch((req,res)=>{
    return res.json({status:"pending"})
})
.delete((req,res) => {
    return res.json({status:"deleted"})
})

router.post('/api/users', async (req,res)=>{
    const body = req.body

    if(
       !body ||
       !body.firstname ||
       !body.lastname ||
       !body.email ||
       !body.gender
    ){
        return res.status(400).json({msg: "All fields are required..."})
    }

    try {
        const result =  await User.create({
            firstname:body.first_name,
            lastname:body.last_name,
            email:body.email,
            gender:body.gender,
        })
        console.log("result",result)
        return res.status(201).json({msg:"success"})
    } catch (err) {
        console.log("Error creating user", err)
        return res.status(500).json({msg: "Error creating user"})
    }
})

module.exports = router