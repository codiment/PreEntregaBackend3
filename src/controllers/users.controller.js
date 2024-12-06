import { usersService } from "../services/index.js"

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

//Modificacion nuestra:
const createUser = async(req,res)=>{
    const newUser = req.body;
    const user = await usersService.create(newUser)
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:newUser})
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.delete(userId);
    if (result.deletedCount === 0) {
        return res.status(500).send({status: "error", error: "Failed to delete user"});
    }
    res.send({status:"success",message:"User deleted"})
}

export default {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}