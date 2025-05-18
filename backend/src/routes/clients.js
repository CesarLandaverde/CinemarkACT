import express from 'express';
import ClientController from '../controllers/ClientsController.js';
const router = express.Router();

router.route('/')
.get(ClientController.getClients)

router.route('/:id')
.get(ClientController.getClientsById)
.delete(ClientController.deleteCliente)
.put(ClientController.updateClient)

export default router;