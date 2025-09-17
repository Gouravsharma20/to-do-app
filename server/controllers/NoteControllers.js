// get all groupdata

const Group = require("../models/GroupModel")
const Note = require("../models/NoteModel")

const getAllNoteData = async (req, res) => {
    try {
        const noteData = await Note.find()
        return res.status(200).json(noteData)
    }
    catch (err) {
        return res.status(500).json({ Error: err.message })
    }
}
const createNote = async (req, res) => {
    try {
        const { groupId, content } = req.body;
        const group = await Group.findById(groupId);
        if(!group) {
            return res.status(404).json({Error: "Group Doesnt exists"})
        }   
        if (!groupId || !content || content.trim() === "") {
            
           return res.status(404).json({ Error: "please add content" })
        }
        const note = await Note.create({
            groupId,
            content: content.trim()
        })
        return res.status(201).json(note)
    }
    catch (err) {
        return res.status(400).json({ Error: err.message })
    }
}

const getNoteByGroupId = async(req,res) => {
    try {
        const {groupId} = req.params;
        const group = await Group.findById(groupId);

        if(!group) {
            return res.status(404).json({Error: "Group doesnt exists"})
        }

        const notes = await Note.find({groupId:groupId}).sort({createdAt: -1})

        return res.status(200).json(notes)

    }
    catch (err) {
        return res.status(500).json({ Error: err.message})
    }
}

module.exports = {
    getAllNoteData,
    createNote,
    getNoteByGroupId
}