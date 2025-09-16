const mongoose = require ("mongoose")

const groupSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        maxlength:50,
        minlength:3
    },
    color:{
        type:String,
        required:true,
        enum:['#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#33F5FF', '#F5FF33', '#FF8C00', '#8A2BE2']
    }

} , {
    timestamps:true
}
);



const Group = mongoose.model("Group",groupSchema);
module.exports = Group;