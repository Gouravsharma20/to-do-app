const express = require("express");
const router = express.Router();

const Group = require("../models/GroupModel");
const { getAllGroupData,createGroup,getNotesForSpecificGroup } = require("../controllers/GroupControllers");

// get group credentials
router.get("/",getAllGroupData)

//create Group name

router.post("/",createGroup)




module.exports = router
