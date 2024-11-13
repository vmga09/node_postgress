import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUsers, createUser, findUser, findUserById } from "../models/users.models.js";

const getAllUsers = async (req, res) => {
    const users = await getUsers();
    res.status(200).json(users);
}

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await findUser(email);
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashpassword = bcrypt.hashSync(password, salt);

  try {
    const result = await createUser({
      username,
      email,
      password: hashpassword,
    });
    console.log(result[0].email);

    const token = jwt.sign({ email : result[0].email , role_id : result[0].role_id}, process.env.JWT_SECRET, {
      expiresIn: "1h"});

    return res.status(201).json({ email, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {

    const {email, password} = req.body;
    // Valida que los campos esten completos
    if(!email || !password){
        return res.status(400).json({error: "All fields are required"});
    }

    
    try {
        // Busca el usuario
        const user = await findUser(email);
        // Valida que el usuario exista, si no existe retorna un error
    if(!user){
        return res.status(400).json({error: "User or password is incorrect"});
    }

    // Valida que la contraseña sea correcta
    const isMatch = bcrypt.compareSync(password, user.password);
    // Si la contraseña no es correcta retorna un error
    if(!isMatch){
        return res.status(400).json({error: "User or password is incorrect"});
    }
    // Genera el token
    const token = jwt.sign({email: user.email, rid: user.role_id}, process.env.JWT_SECRET, {expiresIn: "1h"});

    console.log(user)
   // retorna el token y el email
    return res.status(200).json({email: user.email, token});
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
        
    }
    }





const profile = async (req, res) => {
    try {
        const user = await findUser(req.user);
        return res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
        
    }
}


const updateUserVet = async (req, res ) => {
    console.log(req.params);
    try {
        let {uid} = req.params;  
         uid = parseInt(uid);
         console.log(uid);

        const user = await findUserById(uid);
        console.log(user);

        if(!user){
            return res.status(400).json({error: "User not found"});
        }

        const result = await updateUserVet(uid);
        console.log(result);
        return res.status(200).json(result);

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
        
    }
}    


export { getAllUsers, register, login, profile, updateUserVet };