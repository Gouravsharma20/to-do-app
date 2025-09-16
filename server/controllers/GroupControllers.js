// get all groupdata

const { default: mongoose } = require("mongoose")
const Group = require("../models/GroupModel")
const Note = require("../models/NoteModel")

const getAllGroupData = async (req, res) => {
    try {
        const GroupData = await Group.find()
        return res.status(200).json(GroupData)
    }
    catch (err) {
        return res.status(400).json({ Error: err.message })
    }
}

const createGroup = async (req, res) => {
    try {
        const { name, color } = req.body;
        if (!name || !color) {
            return res.status(400).json({ Error: "Both name and colour are required" })
        }
        const newGroup = await Group.create({
            name: name.trim(),
            color
        });
        return res.status(201).json(newGroup)
    }
    catch (err) {
        return res.status(400).json({ Error: err.message })
    }
}

const getNotesForSpecificGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(groupId)){
            return res.status(400).json({Error: "invalid group id format"})
        }
        const group = await Group.findById(groupId)
        if (!group) {
            return res.status(404).json({ ERROR: "Group not found" })
        }
        const notes = await Note.find({ groupId }).sort({ createdAt: 1 });
        return res.status(200).json(notes);
    }
    catch (err) {
        return res.status(400).json({ Error: err.message })
    }

}

module.exports = {
    getAllGroupData,
    createGroup,
    getNotesForSpecificGroup
}