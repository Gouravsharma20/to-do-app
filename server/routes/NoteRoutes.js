const express = require("express");
const router = express.Router();

const Note = require("../models/NoteModel");
const { getAllNoteData,createNote } = require("../controllers/NoteControllers");

//get entire note data
router.get("/",getAllNoteData)

//edit note data
router.post("/",createNote)

module.exports = router