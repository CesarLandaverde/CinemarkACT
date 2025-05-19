import modeloClientes from "../models/Clients.js";
import empleadoModelo from "../models/Employees.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Todos los campos son necesarios" });
    }

    try {
        let userFound = null;
        let userType = "";

        if (email === config.admin.email && password === config.admin.password) {
            userFound = { _id: "admin" };
            userType = "admin";
        } else {
            //onda para comoraa contrasena
            userFound = await empleadoModelo.findOne({ email });
            if (userFound) {
                userType = "employee";
                const isMatch = await bcrypt.compare(password, userFound.password);
                if (!isMatch) {
                    return res.status(401).json({ message: "Contraseña incorrecta" });
                }
            } else {
                //Si no es empelado busca en clientes 
                userFound = await modeloClientes.findOne({ email });
                if (userFound) {
                    userType = "client";

                    //compara las contras
                    const isMatch = await bcrypt.compare(password, userFound.password);
                    if (!isMatch) {
                        return res.status(401).json({ message: "Contra no valida" });
                    }
                } else {
                    //si noes ls anteriores busca si es cliente 
                    userFound = await modeloClientes.findOne({ email });
                    if (userFound) {
                        userType = "client";
                        const isMatch = await bcrypt.compare(password, userFound.password);
                        if (!isMatch) {
                            return res.status(401).json({ message: "Contra invalida mi bro" });
                        }
                    }
                }
            }
        }

        if (!userFound) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        //Generamos el tokencito 
        jwt.sign(
            {
                id: userFound._id,
                userType
            },
            config.JWT.secret,
            {
                expiresIn: config.JWT.expires
            },
            (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error generando token" });
                }

                res.cookie("authToken", token, { httpOnly: true });
                res.status(200).json({
                    message: `${userType} logeado con éxito`,
                    token
                });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export default loginController;
