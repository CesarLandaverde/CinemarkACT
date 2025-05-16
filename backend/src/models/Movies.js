/*
Movie:
titulo 
descripcion 
director 
genero 

anio number Año de lanzamiento
duracion 
imagen



*/



import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    director: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: [String],
        required: true,
       
    },
    year: {
        type: Number,
        required: true,
        
    },
    duration: {
        type: Number,
        required: true,
       
    },
    img: {
        type: String,
        required: true,
        trim: true,
    }
},
{
    timestamps: true,
    strict: false,
});

export default model('Movie', movieSchema);

