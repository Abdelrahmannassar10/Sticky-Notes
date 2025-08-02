import {User} from '../../DB/models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
export const signUp = async (req,res,next) => {
    try {
        const { name,email, password ,phone,age } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            throw new Error('User already exists',{cause: 400});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: bcrypt.hashSync(password,10), phone, age });
        res.status(201).json({message: 'User added successfully',  success: true });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message ,success: false });
    }
};
export const login =async(req,res ,next)=>{
    try {
        const {email ,password}=req.body ;
        const userExist =await User.findOne({email});
        console.log("userExist",userExist);
        
        if(!userExist){
            throw Error("invalid email or password ",{cause:401});
        }
        const matched =bcrypt.compareSync(password,userExist.password);
        if (!matched){
            throw Error("invalid email or password ",{cause:401});
        }
        const token = jwt.sign({ id: userExist._id }, 'assignment_secret_token', { expiresIn: '1h' });
        res.status(201).json({message: 'Login successful',  token: token });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message ,success: false,stack: error.stack }); 
    }
};
export const updatedUser = async (req, res, next) => {
try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload.id;
    const { name, email, age } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        throw Error("User not found", { cause: 404 });
    }
    if (email === user.email) {
    throw Error("Email already exists", { cause: 400 });
    }
    await User.findByIdAndUpdate(userId, { name, email, age });
    res.status(200).json({ message: "User updated" });
} catch (error) {
    res.status(error.cause || 500).json({ message: error.message, success: false });
}
};
export const deleteUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw Error("User not found", { cause: 404 });
        }
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};
export const getUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.id;
        const user = await User.findById(userId).select("-__v");
        if (!user) {
            throw Error("User not found", { cause: 404 });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};
