const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true}
},{
    versionKey:false
})

const noteSchema = mongoose.Schema({
    tilte:{type:String,required:true},
    body:{type:String,required:true},
    auther:{type:String,required:true}
},{
    versionKey:false
})

const userModle = mongoose.model('user',userSchema)
const noteModle = mongoose.model('note',noteSchema)

module.exports={userModle,noteModle}