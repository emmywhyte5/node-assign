import book from "../models/book.js";

const createbook = async (req, res) => {
    try {
        let { title,isbn, author_id,published_date, status } = req.body;

        const newBook = await book.create({
            title,
            isbn,
            published_date,
            author_id,
            status
        });

        res.status(201).json({ message: "Book created successfully", newBook });
    } catch (error) {
        console.error("Error in createbook:", error);
        return res.status(500).json({ message: "Internal server error" });  
        
    }
  
}

const del1book = async (req, res) => {
    try {
         let { id } = req.params;

        const delbook = await book.findByIdAndDelete(id);

        if (!delbook) return res.status(404).json({ message: "No book found" });

    res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error in del1book:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
   
}

const get1book = async (req, res) => {
    try{
         const mybook = await book.find();
         if (!mybook) return res.status(404).json({ message: "No book found" });
        res.status(200).send(mybook);
    }catch (error) {
        console.error("Error in get1book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const update1book = async (req, res) => {
   try{
     let { id } = req.params;

        let newData = req.body;

        let updatedbook = await book.findByIdAndUpdate(id, newData, { new: true });

        if (!updatedbook) return res.status(404).json({ message: "Book not found" });

        res.status(200).json({ message: "Book updated successfully" });
   }catch (error) {
       console.error("Error in update1book:", error);
       return res.status(500).json({ message: "Internal server error" });
   }
}

const getAllbooks = async (req,res)=>{
    try {
        const myBook = await book.find()

    res.status(200).send(myBook)  
    } catch (error) {
        if(!myBook) return res.status(404).json({message:"No book found"});
    }
}
export {
    createbook,
    del1book,
    get1book,
    update1book,
    getAllbooks
}