const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');

const router = Router();

router.get('/', async function(req, res) {
    try{
        const estados = await EstadoEquipo.find();
        if (estados.length === 0) {
            res.status(404).send("No hay estados de equipo registrados");
        } else {
            res.send(estados);
        }       
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error, error: ' + error);
    }
});

router.get('/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const estado = await EstadoEquipo.findOne({ _id: id });
        if (!estado) {
            res.status(404).send('El estado de equipo no existe');
        } else {
            res.send(estado);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error, error: ' + error);
    }
});

router.post('/', async function(req, res) {

    const nombre = req.body.nombre;
    const status = req.body.estado || "Activo";

    if (nombre === '') {
       return res.status(400).send('El nombre es obligatorio');
    }
    
    try {
        const estado = await EstadoEquipo.findOne({ nombre });
        if (estado) {
            res.status(400).send('El estado de equipo ya existe');
        } else {
            const data ={
                nombre,
                estado: status
            }
            const estado = new EstadoEquipo(data);
            await estado.save();
            res.send(estado, 'Estado de equipo creado exitosamente', 201);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al guardar el estado de equipo, error: ' + error);
    }
});

router.put('/:id', async function(req, res) {
    try {
        const id = req.params.id;
        const nombre = req.body.nombre;
        const status = req.body.estado || "Activo";

        const data = {
            nombre,
            estado: status,
            fechaActualizacion: Date.now()
        }

        const estado = await EstadoEquipo.findOneAndUpdate({ _id: id }, data, { new: true });
        
        if (!estado) {
            res.status(404).send('El estado de equipo no existe');
        } else {
            res.send(estado);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error, error: ' + error);
    }
});

router.delete('/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const estado = await EstadoEquipo.findOne({ _id: id });
        if (!estado) {
            res.status(404).send('El estado de equipo no existe');
        } else {
            await EstadoEquipo.findByIdAndDelete(id);            
            res.send(estado, 'Estado de equipo eliminado exitosamente', 200);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al eliminar el estado de equipo, error: ' + error);
    }
});

module.exports = router;