/*
 Empleados:



nombre string Nombre completo del empleado
correo string Correo electrónico profesional
contrasenia String Contraseña encriptada del empleado
telefono string Número de teléfono
direccion string Dirección física
puesto string Cargo o rol (ej. "vendedor", "gerente", etc.)
fecha_contratacion Date Fecha en que fue contratado
salario number Salario mensual o anual
DUI String El empleado debe ser mayor de edad
*/ 


import { Schema,model } from "mongoose";

const employeeSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type: String,
        required: true,
        trim: true,
    },
    address:{
        type: String,
        required: true,
        trim: true,
    },
    position:{
        type: String,
        required: true,
        trim: true,
    },
    hire_date:{
        type: Date,
        required: true,
        trim: true,
    },
    salary:{
        type: Number,
        required: true,
        trim: true,
    },
    dui:{
        
        type: String,
        required: false,
        trim: true,
    }



},{
    timestamps: true,
    strict: false,
});

const Employeemodel = model('Employee', employeeSchema);
export default Employeemodel;
