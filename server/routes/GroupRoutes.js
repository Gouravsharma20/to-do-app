const express = require("express");
const router = express.Router();

const Group = require("../models/GroupModel");
const { getAllGroupData,createGroup,getNotesForSpecificGroup } = require("../controllers/GroupControllers");

// get group credentials
router.get("/",getAllGroupData)

// get notes from a specific group
router.get("/:groupId/notes",getNotesForSpecificGroup)

//create Group name

router.post("/",createGroup)




module.exports = router
