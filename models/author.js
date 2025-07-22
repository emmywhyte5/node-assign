import mongoose from "mongoose";
const Schema = mongoose.Schema;

const authorSchema = Schema({
    name: {
        type: String,
        require: true
    },
    bio:{
        type: String, 
        require: false
    },
    birthdate:{
        type: Date, 
        require: false
    },


},{timestamps: true})

const Author = mongoose.model('author', authorSchema);

export default Author;