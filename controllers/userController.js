import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const forLogin = async(req,res)=>{
    try {
        let {email, password} = req.body;

        const checkUser = await user.findOne({email});

        if(!checkUser) return res.status(404).json({message:"User not found"});

        let passwordMatch = await bcrypt.compare(password, checkUser.password);
        if(!passwordMatch) return res.status(400).json({message:"Invalid password"});

        // Generate JWT token
        const token = jwt.sign(
            { id: checkUser._id, role: checkUser.role },
            process.env.SECRET_KEY,
            { expiresIn: '3h' }
        );

        res.status(200).json({message:"Login successful", token});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const forSignup = async (req,res)=>{
    let {fullname,email,password, role} = req.body;

    let hashedPassword = await bcrypt.hash(password, 10)

    await user.create({
        fullname,
        email,
        password : hashedPassword,
        role
    });

    res.status(200).json({message:"Sign up successful"})
}

export const getAllusers = async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const get1User = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await user.findById(id);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const del1User = async (req, res) => {
    try {
        const { id } = req.params;
        await user.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const update1User = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await user.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// export const getAllposts = async (req, res) => {
//     try {
//         const posts = await user.find();
//         res.status(200).json(posts);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// export{
//     getAllusers,
//     get1User,
//     del1User,
//     update1User,
//     forLogin,

// }