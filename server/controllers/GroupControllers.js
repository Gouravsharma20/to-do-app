// get all groupdata

const { default: mongoose } = require("mongoose")
const Group = require("../models/GroupModel")
const Note = require("../models/NoteModel")

const getAllGroupData = async (req, res) => {
    try {
        const GroupData = await Group.find().sort({createdAt: -1});
        return res.status(200).json({success:true,data:GroupData})
    }
    catch (err) {
        console.log(`Error fetching all groups`,err)
        return res.status(500).json({success:false, Error: err.message })
    }
}

const createGroup = async (req, res) => {
    try {
        const { name, color } = req.body;
        if (!name || !color) {
            console.error(`Both name and color are required to create group`)
            return res.status(400).json({
                success:false,
                Error: "Both name and colour are required"
            })
        }
        const validColors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF']
        if (!validColors) {
            console.error( `invalid color provided : ${color}`)
            return res.status(400).json({
                success:false,
                Error: "Invalid color selected"
            })
        }
        const trimmedName = name.trim()
        if (trimmedName.length < 2 || trimmedName.length > 51) {
            console.error(`invalid name length ${trimmedName.length}, must be 3-50`)
            return res.status(400).json({
                success:false,
                Error: "group name must be between 3-50 characters"
            })
        }
        const existingGroup = await Group.findOne({name:trimmedName});
        if (existingGroup) {
            console.error(`duplicate group name exists as ${existingGroup}`)
            return res.status(409).json({
                success:false,
                Error:"Group Name Already exists"
            })
        }
        const newGroup = await Group.create({
            name: trimmedName,
            color
        });
        console.log(`Group created successfully: ${trimmedName}`)
        
        return res.status(201).json({
            success:true,
            data:newGroup
        })
    }
    catch (err) {
        console.error("Error creating group : " ,err)
        return res.status(500).json({
            success:false,
            Error: err.message
        })
    }
}
module.exports = {
    getAllGroupData,
    createGroup
}