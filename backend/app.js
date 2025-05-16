
import express from 'express';
import cookieParser from "cookie-parser";
import EmployeesRoutes from '../backend/src/routes/employees.js';
import RegisterEmployeRoutes from '../backend/src/routes/registerEmployees.js';


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/employees', EmployeesRoutes);
app.use('/api/registerEmployees', RegisterEmployeRoutes);




export default app;