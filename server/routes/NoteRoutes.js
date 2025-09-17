const express = require("express");
const router = express.Router();

const Note = require("../models/NoteModel");
const { getAllNoteData,createNote ,getNoteByGroupId} = require("../controllers/NoteControllers");

//get entire note data
router.get("/",getAllNoteData)

//edit note data
router.post("/",createNote)

//get notes by group-id
router.get("/group/:groupId",getNoteByGroupId)

module.exports = router