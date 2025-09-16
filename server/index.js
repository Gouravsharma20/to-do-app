const express = require("express");
const cors = require("cors")
const app = express();

//db connection
const db = require("./db/connection")
const port = process.env.PORT || 4000

// requiring routing
const GroupRoutes = require("./routes/GroupRoutes")
const NoteRoutes = require("./routes/NoteRoutes")

//Middlewares
app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(port,()=>{
    console.log("Server is running at port: ", port)
});


//Routes 

app.use("/api/group", GroupRoutes);
app.use("/api/note", NoteRoutes);