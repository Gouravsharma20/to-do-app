require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();

//db connection
const db = require("./db/connection");
const port = process.env.PORT || 4000;

// requiring routing
const GroupRoutes = require("./routes/GroupRoutes");
const NoteRoutes = require("./routes/NoteRoutes");

//Middlewares
app.use(express.json());

// Updated CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/", (req, res) => {
  res.send("To do app backend is running");
});

//Routes
app.use("/api/group", GroupRoutes);
app.use("/api/note", NoteRoutes);

app.listen(port, () => {
  console.log("Server is running at port:", port);
  console.log("Environment:", process.env.NODE_ENV);
});