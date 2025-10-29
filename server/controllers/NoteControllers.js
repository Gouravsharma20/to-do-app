// get all groupdata

const { default: mongoose } = require("mongoose")
const Group = require("../models/GroupModel")
const Note = require("../models/NoteModel")

const getAllNoteData = async (req, res) => {
    try {
        const noteData = await Note.find().sort({createdAt:1})
        console.log(`Notes :${noteData}`)
        return res.status(200).json({success:true , data:noteData})
    }
    catch (err) {
        console.error(`Error creating notes`)
        return res.status(500).json({success:false , Error: err.message })
    }
}
const createNote = async (req, res) => {
    try {
        const { groupId, content } = req.body;
        if(!mongoose.Types.ObjectId.isValid(groupId)) {
            console.error(`invalid object fomat ${groupId}`)
            return res.status(400).json({success:false,error:"Invalid group id format"})
        }
        if (!groupId || !content) {
            console.error("missing required field - groupId or content")
           return res.status(400).json({success:false, Error: "please add content" })
        }
        const trimmedcontent = content.trim();
        const group = await Group.findById(groupId);
        if(!group) {
            console.error(`Group ${group} doesnt exists`)
            return res.status(404).json({success:false,Error: "Group Doesnt exists"})
        }   
        
        const note = await Note.create({
            groupId,
            content: trimmedcontent
        })
        console.log(`Group content: ${content}`)
        return res.status(201).json({success:true,data:note})
    }
    catch (err) {
        console.error("Error creating notes")
        return res.status(400).json({success:false, Error: err.message })
    }
}

const getNoteByGroupId = async(req,res) => {
    try {
        const {groupId} = req.params;
        if(!mongoose.Types.ObjectId.isValid(groupId)) {
            console.error(`Invalid group id as ${groupId} `)
            return res.status(400).json({success:true,error:"Group does not exists"})
        }
        const group = await Group.findById(groupId);

        if(!group) {
            console.error(`Group ${group} doesnt exists`)
            return res.status(404).json({Error: "Group doesnt exists"})
        }
        const notes = await Note.find({groupId:groupId}).sort({createdAt:1})
        console.log(`Notes :${notes}`)
        return res.status(200).json({success:true,data:notes})

    }
    catch (err) {
        console.error("notes cannot be created")
        return res.status(500).json({success:false,Error: err.message})
    }
}

module.exports = {
    getAllNoteData,
    createNote,
    getNoteByGroupId
}