require("dotenv").config()
const express = require("express")
const {userModle} = require("../modle/modles")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router()
userRouter.use(express.json())

userRouter.post("/add",async(req,res)=>{
    try{
        let haspass = await bcrypt.hash(req.body.pass,5)
        let obj={
            name:req.body.name,
            email:req.body.email,
            pass:haspass
        }
        let user = new userModle(obj)
        await user.save()
        res.send({msg:`new user has added to db ...`})
    }catch(err){
        res.send({err:`${err.message}`})
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
        let user =await userModle.findOne({email:req.body.email})
        let token = jwt.sign({userid:user._id},process.env.secretKEY,{expiresIn:"1h"})
        res.send({name:user.name,token:token})
    }catch(err){
        res.send({err:`${err.message}`})
    }
})

module.exports={userRouter}
