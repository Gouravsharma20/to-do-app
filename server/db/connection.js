const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Todo")
.then(()=>{
    console.log("Server is Connected to database")
})
.catch((err)=>{console.log`Error is ${err}`})

