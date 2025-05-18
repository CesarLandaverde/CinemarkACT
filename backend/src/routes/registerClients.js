import express from 'express';
import registerClientController from '../controllers/registerClientController.js';
import passwordRecoveryController from '../controllers/passwordRecoveryController.js';


const router = express.Router();

router.post('/requestCode', registerClientController.registerClient);

router.post("/verifyCode",passwordRecoveryController.verifyCode);

router.post("/resetPassword",passwordRecoveryController.resetPassword);


export default router;