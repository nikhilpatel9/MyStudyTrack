import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";
export const register = async (req,res )=>{
    try{
    const {name ,email ,password} =req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All Credential are required"
        })
    }
    
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            success:false,
            message:"user already exist with this email"
        })
    }
    
    const hashedPassword = await bcrypt.hash(password,10);
    await User.create({
        name,
        email,
        password:hashedPassword
    })
    return res.status(201).json({
            success:true,
            message:"Account created successfully."
    })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User Registration failed"
        })
    }
} 

export const signin = async (req,res)=>{
    try{
        const { email, password } = req.body;
        if(!email || !password ){
            return res.status(400).json({
                success:false,
                message:"enter all the credentials"
            })
        }
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({
                success:false,
                message:"email or password are incorrect"
            })
        }
        
        const isPasswordSame = await bcrypt.compare(password,user.password);
        
        if(!isPasswordSame){
            return res.status(400).json({
                success:false,
                message:"email or password are incorrect"
            })
        }
    
        generateToken(res,user,`Welcome back ${user.name}`)
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}