import mongoose from "mongoose";
import { type } from "os";
const Schema = mongoose.Schema;

const userSchema = Schema({
    fullname: {
        type: String, 
        require: true 
    },
    email:{
        type: String, 
        require: true 
    },
    password:{
        type: String, 
        require: true 
    },
    role: {
        type: String,
        enum: ["Admin", "Librarian", "Member"],
        default: "Member"
    }
},{timestamps: true})

const User = mongoose.model('user',userSchema);

export default User;