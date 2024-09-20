const express = require('express')
const fs = require('fs')
const users = require("./MOCK_DATA.json")
const mongoose = require("mongoose")
const router = require('./routes/user')


const app = express()
const PORT = 8000

mongoose.connect("mongodb://127.0.0.1:27017/testdb")
.then(() => console.log("connected to database"))
.catch(err => {
    console.log("Mongo error", err);
    console.error(err);
});



app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    fs.appendFile(  
        "log.txt",
        `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
        (err,data)=>{
            next()
        }
    )
})

app.get("/",(req,res)=>{
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.firstname}</li>`).join("")}
    </ul>`;
    res.send(html); 
})
app.get("/",(req,res)=>{
    res.setHeader("MY NAME","RAKSHIT")
    return res.json(users)
})

app.route("/")
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

app.post('/', async (req,res)=>{
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

app.listen(PORT,()=> console.log(`Server started at Port: ${PORT}`))

module.exports = router