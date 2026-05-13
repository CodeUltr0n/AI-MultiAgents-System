import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:{type:String,default:'TODO'},
    createdBy:{type:mongoose.Schema.ObjectId,ref:"User"},
    assignedTo:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        default:null
    },

    priority:String,
    helpfulNotes:String,
    Deadline:Date,
    relatedSkills:[String],
    createdAt:{type:Date,default:Date.now}
})

export default mongoose.model('Token',tokenSchema)