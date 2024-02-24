import usersModel from "../models/UsersModel.js";
import { encrypt, verified } from "../middlewares/encrypt.js";
import { compare } from "bcrypt";

//Metodos CRUD

//Mostrar todos los registros
export const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.findAll()
        res.json(users) 
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar todos los registros
export const getAllUsersxRole = async (req, res) => {
    try {
        const users = await usersModel.findAll({
            where:{role:req.body.role}
        })
        res.json(users) 
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar un registro
export const getUsers = async (req, res) => {
    try {
        const users = await usersModel.findAll({
            where:{username:req.body.username}
        })
        res.json(users)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear un registro
export const createUsers = async(req, res) => {
    
    console.log(req.body)
    try {        
        let pass =  req.body.password;
        let hpass = await encrypt(pass);
        req.body.password = hpass;
        await usersModel.create(req.body)
        res.json({
            "message":"Registro creado correctamente"
        })
    } catch (error ) {
        res.json({message: error.message})
    }
}

//Actualizar
export const updateUsers = async(req, res) => {
    try {
        console.log(req.body)
        let pass =  req.body.password;
        //console.log(pass)
        if (pass){
            let pass =  req.body.password;
            let hpass = await encrypt(pass);
            req.body.password = hpass;
        }

        await usersModel.update(req.body, {
            where: {username: req.body.username}
        })

        res.json({
            "message":"Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}


//Eliminar
export const deleteUsers = async(req, res) => {
    console.log(req.params.id)
    try {
        usersModel.destroy({
            where: {id_number: req.params.id}     })
    } catch (error) {
        res.json({message: error.message})
    }
}


export const validateUser = async (username) => {
    let user= {};
    try {
        const resUser = await usersModel.findOne({
            attributes: ['role','password'],
            where:{username:username}
        })
        
        if(resUser){
            user.role = resUser.dataValues.role
            user.passHash = resUser.dataValues.password
  
            return user
        }else{
            return user = {}
        }
  
    } catch (error) {
        return error.message
    }
  }
