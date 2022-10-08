const { Router } = require('express');
const Marca = require('../models/Marca');

const router = Router();

router.get('/', async function(req, res) {
    try{
        const marcas = await Marca.find();
        if (marcas.length === 0) {
            res.send("No hay estados de equipo registrados");
        } else {
            res.send(marcas);
        }       
    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error, error: ' + error);
    }    
});

router.get('/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const marca = await Marca.findOne({ _id: id });
        if (!marca) {
            res.send('La marca no existe');
        } else {
            res.send(marca);
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.post('/', async function(req, res) {
        
    const nombre = req.body.nombre;
    const estado = req.body.estado || "Activo";

    if (nombre === '' ) {
        res.send('El nombre es obligatorio');
    }
    
    try {
        const marca = await Marca.findOne({ nombre });
        if (marca) {
            res.send('La marca ya existe');
        } else {
            const data ={
                nombre,
                estado
            }
            const marca = new Marca(data);
            await marca.save();
            res.send(marca);
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al guardar la marca, error: ' + error);
    }   
});

router.put('/:id', async function(req, res) {
    try {
        const id = req.params.id;
        const nombre = req.body.nombre;
        const estado = req.body.estado || "Activo";

        const data = {
            nombre,
            estado,
            fechaActualizacion: Date.now()
        }

        const marca = await Marca.findOneAndUpdate({ _id: id }, data, { new: true });
        
        if (!marca) {
            res.send('La marca no existe');
        } else {
            res.send(marca);
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error, error: ' + error);
    }
});

router.delete('/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const marca = await Marca.findOne({ _id: id });
        if (!marca) {
            res.send('La marca no existe');
        } else {
            await Marca.findByIdAndDelete(id);
            res.send(marca);
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al eliminar la marca, error: ' + error);
    }
});

module.exports = router;