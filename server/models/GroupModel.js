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
        enum:['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF']
    }

} , {
    timestamps:true
}
);



const Group = mongoose.model("Group",groupSchema);
module.exports = Group;