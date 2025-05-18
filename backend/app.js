
import express from 'express';
import cookieParser from "cookie-parser";
import EmployeesRoutes from '../backend/src/routes/employees.js';
import RegisterEmployeRoutes from '../backend/src/routes/registerEmployees.js';
import ClientsRoutes from '../backend/src/routes/clients.js';
import RegisterClientRoutes from '../backend/src/routes/registerClients.js';
import PasswordRecoveryRoute from '../backend/src/routes/passwordRecovery.js';



const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/employees', EmployeesRoutes);
app.use('/api/registerEmployees', RegisterEmployeRoutes);
app.use('/api/clients', ClientsRoutes);
app.use('/api/registerClients', RegisterClientRoutes);
app.use('/api/passwordRecovery',PasswordRecoveryRoute);




export default app;