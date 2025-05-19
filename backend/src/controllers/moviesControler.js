import MovieModel from "../models/Movies.js";
import{v2 as cloudinary} from "cloudinary"

import { config } from "../config.js";

cloudinary.config({

cloud_name: config.cloudinary.cloud_name,
api_key:config.cloudinary.cloudinary_api_key,
api_secret:config.cloudinary.cloudinary_api_secret
});

const movieController ={};

//CRUDS

movieController.getAllMovies = async (req,res) => {
    const movies = await MovieModel.find();
    res.json(movies);
    
};

movieController.insertMovies = async (req,res) => {
    const {title,description,director,genre,year,duration,img}= req.body;
    let imageURL ="";

    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path,
   {
    folder:"public",
    allowed_formats:["jpg","png", "jpeg"],
   });
   imageURL = result.secure_url;
    }

    const newMovie =new MovieModel({title,description,director,genre,year,duration,img:imageURL});
    newMovie.save();
    res.json({message:"Plicula guardada"})
    
};


//actu

movieController.putMovies = async (req,res) => {
     const {title,description,director,genre,year,duration,img}= req.body;
    let imageURL ="";

    //sube la nueva

    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path,
   {
    folder:"public",
    allowed_formats:["jpg","png", "jpeg"],
   });
   imageURL = result.secure_url;
}

//se actualiza el registro en la bd 
await MovieModel.findByIdAndUpdate(req.params.id,
    {title,description,director,genre,year,duration,img:imageURL},{new:true}
);

res.json({message:"PELI GUARDADA"})
}
export default movieController;