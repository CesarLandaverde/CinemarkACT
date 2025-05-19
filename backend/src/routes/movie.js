import express from "express"
import movieController from "../controllers/moviesControler.js"
import multer from "multer"


const router = express.Router();

const upload = multer({dest:"public/"})

router.route("/")
.get(movieController.getAllMovies)
.post(upload.single("img"), movieController.insertMovies);

router.route("/:id")
.put(upload.single("img"),movieController.putMovies);

export default router;