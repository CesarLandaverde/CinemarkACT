import Employees from "../models/Employees.js";

const employeesController = {};

// Mostrar todos los empleados
employeesController.getEmployees = async (req, res) => {
    try {
        const employees = await Employees.find();
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener empleados" });
    }
}

// Mostrar empleado por ID
employeesController.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employees.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener empleado" });
    }
}
// Eliminar empleado
employeesController.deleteEmployee = async (req, res) => {
    try {
        const deleteEmployee = await Employees.findByIdAndDelete(req.params.id);
        if (!deleteEmployee) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        res.json({ message: "Empleado eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar empleado" });
    }
}

// Actualizar empleado (sin contraseña)
employeesController.updateEmployee = async (req, res) => {
    try {
        const { name, email, phone, address, position, hire_date, salary, dui } = req.body;
        const employee = await Employees.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, address, position, hire_date, salary, dui },
            { new: true }
        );
        if (!employee) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar empleado" });
    }
}

export default employeesController;
