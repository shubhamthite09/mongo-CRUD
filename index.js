require("dotenv").config()
const express = require("express")
const {connection} = require("./config/db")
const {userValidoter,tokenVerify} = require("./middleware/middle")
const {userRouter} = require("./routes/user")
const {noteRouter} = require("./routes/notes")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send({msg:`Welcome to home Page ...`})
})

app.use("/user/login",userValidoter)
app.use("/user",userRouter)
app.use("/note",tokenVerify)
app.use("/note",noteRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log(`connected to DB ...`)
    }catch(err){
        console.log(`${err} happned ...`)
    }
    console.log(`server is runinig on ${process.env.PORT}`)
})