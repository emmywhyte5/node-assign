import Author from '../models/author.js';

const createauthor = async (req, res) => {
    try {
        let {name, bio, birthdate} = req.body;

        const newAuthor = await Author.create({
            name,
            bio,
            birthdate
        });
    } catch (error) {
        console.error("Error in createauthor:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
    

    res.status(201).json({ message: "Author created successfully" });

}
const del1author = async (req,res)=>{
    try {
        let {id} = req.params;

        const delauthor = await Author.findByIdAndDelete(id);
        if(!delauthor) return res.status(404).json({message:"No author found"});

        res.status(200).json({message:"author deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        console.error(error);
    }

    
}
const get1author = async (req,res)=>{
    try {
        const myauthor = await Author.find()
          if(!myauthor) return res.status(404).json({message:"No author found"});

        res.status(200).send(myauthor);
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        console.error(error);
    }
}

const update1author= async (req,res)=>{
    try {
        let {id} = req.params;

        let newData = req.body;

        let updatedauthor = await Author.findByIdAndUpdate(id, newData, {new:true});
        if(!updatedauthor) return res.status(404).json({message:"author not found"});

         res.status(200).json({message:"author updated successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        console.error(error);
    }
}

const getAllAuthors = async (req,res)=>{
    try {
        const myauthor = await Author.find()
        res.status(200).send(myauthor)

    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        console.error(error);
    }
}


export{
    createauthor,
    del1author,
    get1author,
    update1author,
    getAllAuthors
}