require("dotenv").config()
const express = require("express")
const {noteModle} = require("../modle/modles")

const noteRouter = express.Router()
noteRouter.use(express.json())

noteRouter.post("/add",async(req,res)=>{
    try{
        let note = new noteModle(req.body)
        await note.save()
        res.send({msg:`new note has added to db ...`})
    }catch(err){
        res.send({err:`${err.message}`})
    }
})

noteRouter.get("/",async(req,res)=>{
    try{
        let note = await noteModle.find({auther:req.body.auther})
        res.send(note)
    }catch(err){
        res.send({err:`${err.message}`})
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    try{
        await noteModle.findByIdAndUpdate({_id:req.params.id},req.body)
        res.send({msg:`note has updated to db ...`})
    }catch(err){
        res.send({err:`${err.message}`})
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    try{
        await noteModle.findByIdAndDelete({_id:req.params.id})
        res.send({msg:`note has deleted to db ...`})
    }catch(err){
        res.send({err:`${err.message}`})
    }
})

module.exports={noteRouter}
