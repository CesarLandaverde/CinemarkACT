import express from 'express';
const router = express.Router();    
import EmployeeController from '../controllers/registerEmployeeController.js';

// Route to register a new employee
router.route('/').post(EmployeeController.registerEmployee);

export default router;
    