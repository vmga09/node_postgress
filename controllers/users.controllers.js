import bcrypt from "bcryptjs";
import { getUsers, createUser, findUser } from "../models/users.models.js";

const getAllUsers = async (req, res) => {
    const users = await getUsers();
    console.log(users);
   // res.status(200).json(users);
}

const register = async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({error: "All fields are required"});
    }

    const user = await findUser(email);
    if(user){
        return res.status(400).json({error: "User already exists"});
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hashpassword =  bcrypt.hashSync(password, salt);

try {
    const result = await createUser({username, email, password: hashpassword});
    return res.status(201).json(result);
} catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message});
    
}
}

const login = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
        
    }
    }




export { getAllUsers, register, login };