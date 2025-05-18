/*
Colección Clientes:

nombre string Nombre completo del cliente
correo string Correo electrónico
Contrasenia String Contraseña encriptada del cliente
telefono string Número de contacto
direccion string Dirección física o de envío
DUI String Este campo puede ser nulo


*/ 

import { Schema,model } from "mongoose";

const clientSchema = new Schema({
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
    DUI:{
        type: String,
        required: false,
        trim: true,
    }
},
{
    timestamps:true,
    strict:false





});

const Clients = model('Clients',clientSchema);
export default Clients;