import Clients  from "../models/Clients.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const registerClientController = {};

// Registrar un nuevo cliente
registerClientController.registerClient = async (req, res) => {
const{name,email,password,phone,address,DUI} = req.body;


try {
    let existingClient;
    try {
        const existingClient = await Clients.find({email});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al buscar cliente existente' });
        
    }if (existingClient) {
        return res.status(400).json({ message: 'El cliente ya existe' });
        
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: 'Error al encriptar la contraseña' });
    }
    // Crear un nuevo cliente
    const newClient = new Clients({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        DUI
    });

    try {
         await newClient.save();
        
    } catch (error) {
       console.error(error);
        return res.status(500).json({ message: 'Error al guardar el cliente' });
    }

    //Generar token JWT

    let token;
    try {
        token = jwt.sign({ id: newClient._id }, config.JWT.secret, { expiresIn: config.JWT.expires });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al generar el token' });
        
    }
    res.cookie('authtoken', token)
    res.status(201).json({message: 'Cliente registrado exitosamente', });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el cliente' });
    
}
}
export default registerClientController;