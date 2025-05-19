import modeloCliente from '../models/Clients.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const logoutController ={};

logoutController.logout = async (req,res) => {
    res.clearCookie('authToken',{http:true});


    return res.json({message:"Sayonara exitoso:)"})
}


export default logoutController;