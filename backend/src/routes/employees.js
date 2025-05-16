import express from 'express';
import EmployeController from '../controllers/EmployeesController.js';
const router = express.Router();

router.route('/')
.get(EmployeController.getEmployees)

router.route('/:id')
.get(EmployeController.getEmployeeById)
.delete(EmployeController.deleteEmployee)
.put(EmployeController.updateEmployee)

export default router;