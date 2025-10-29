const mongoose = require ("mongoose")

const noteSchema = mongoose.Schema({
    groupId: {
        type:mongoose.Schema.ObjectId,
        ref:"Group",
        required:true
    },
    content:{
        type:String,
        required:true,
        trim:true,
    }
    
    
},{timestamps:true})

noteSchema.index({createdAt:1});

const Note = mongoose.model("Note",noteSchema);

module.exports = Note;