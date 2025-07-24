import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../sendEmail.js";

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
    let {fullname ,email, password, role} = req.body;
        if( !fullname || !email || !password) {
         return res.status(400).json({message:"All fields are required"});

        }
        const existingUser = await user.findOne({email});

        if(existingUser) {
            return res.status(409).json({message:"User already exists"});
        }

        let hashedPassword = await bcrypt.hash(password, 10);
    await user.create({
        fullname,
        email,
        password : hashedPassword,
        role
    });

    const welcomeMail =`
   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #bfdbe4ff; padding: 20px; border-radius: 5px;">
      <h1><center>Welcome to Our Platform </center> <img scr="https://res.cloudinary.com/dh8dtvvy6/image/upload/v1752755027/Blog_pictures/vdktuipzojruyrasa9hw.jpg" width="70px"/></h1>
      <p>Hi ${fullname},</p>\n\n
      <p>Welcome to our platform! We're excited to have you on board.\n\n</p>
      <ol>
        <li>Explore our features and services.</li>
        <li>Stay updated with our latest news.</li>
        <li>Feel free</li>
        </ol>
        <p>Best regards,\n\n</p>
        <p>The Team</p>
        </p> contact us at:< href="mailto:${process.env.EMAIL_USER}
        
    <div>
    `;

    await sendEmail(email, "Welcome to Our Platform",welcomeMail);

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