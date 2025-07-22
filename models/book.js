import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = Schema({
    title: {
        type: String, 
        require: true 
    },
    isbn:{
        type: String, 
        require: true 
    },
    published_date:{
        type: Date, 
        require: true 
    },
    status: {
        type: String,
        enum: ["Available","Borrowed"],
        default: "User"
    }
},{timestamps: true})

const Book = mongoose.model('book',bookSchema);

export default Book;