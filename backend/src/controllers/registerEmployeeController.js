import EmployeeModel from '../models/Employees.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const registerEmployeeController = {};

// Register a new employee
registerEmployeeController.registerEmployee = async (req, res) => {
    const { name, email, password, phone, address, position, hire_date, salary, dui } = req.body;

    try {
        // Check if the employee already exists
        let existingEmployee;
        try {
            existingEmployee = await EmployeeModel.findOne({ email });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al buscar empleado existente' });
        }
        if (existingEmployee) {
            return res.status(400).json({ message: 'El empleado ya existe' });
        }

        // Hash the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al encriptar la contraseña' });
        }

        // Create a new employee
        const newEmployee = new EmployeeModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            position,
            hire_date,
            salary,
            dui
        });

        try {
            await newEmployee.save();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al guardar el empleado' });
        }

        // Generate JWT token
        let token;
        try {
            token = jwt.sign({ id: newEmployee._id }, config.JWT.secret, { expiresIn: config.JWT.expires });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al generar el token' });
        }

        res.cookie('authtoken', token);
        res.status(200).json({ message: 'Empleado registrado con éxito' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el empleado' });
    }
}
export default registerEmployeeController ;

