import ClientsModel from "../models/Clients.js";

const ClientsController = {};

// Mostrar todos los clientes

ClientsController.getClients = async (req, res) => {
    try {
        const clients = await ClientsModel.find();
        res.json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener clientes" });
    }
}
// Mostrar cliente por ID
ClientsController.getClientsById = async (req,res) => {
    try {
        const client = await ClientsModel.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener cliente" });
        
    }
    
}

//Eliminar cliente

ClientsController.deleteCliente = async (req,res) => {

    try {
        const deleteClient = await ClientsModel.findByIdAndDelete(req.params.id);
        if (!deleteClient) {
            return res.status(404).json({ message: "Cliente no encontrado" });
            
        }
        res.json({ message: "Cliente eliminado" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar cliente" });
        
    }
}

// Actualizar cliente (sin contraseña)
ClientsController.updateClient = async (req, res) => {
    try {
        const {name,email,phone,address,DUI} = req.body;
        const client = await ClientsModel.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, address, DUI },
            { new: true }
        );
        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json({ message: "Cliente actualizado", client }); 
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Error al actualizar cliente" });
        
    }
}

export default ClientsController;