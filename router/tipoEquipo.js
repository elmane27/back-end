const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');

const router = Router();

router.get('/', async function(req, res) {
    try{
        const tipos = await TipoEquipo.find();
        if (tipos.length === 0) {
            res.send("No hay tipos de equipo registrados");
        } else {
            res.send(tipos);
        }       
    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error, error: ' + error);
    }
});

router.get('/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const tipo = await TipoEquipo.findOne({ _id: id });
        if (!tipo) {
            res.send('El tipo de equipo no existe');
        } else {
            res.send(tipo);
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error, error: ' + error);
    }
});

router.post('/', async function(req, res) {
        
    const nombre = req.body.nombre;
    const estado = req.body.estado || "Activo";

    if (nombre === '') {
        res.send('El nombre es obligatorio');
    }
    
    try {
        const tipo = await TipoEquipo.findOne({ nombre });
        if (tipo) {
            res.send('El tipo de equipo ya existe');
        } else {
            const data ={
                nombre,
                estado
            }
            const tipo = new TipoEquipo(data);
            await tipo.save();
            res.send(tipo);
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al guardar el tipo de equipo, error: ' + error);
    }    
});

router.put('/:id', async function(req, res) {
    try {
        const { id } = req.params;
        const nombre = req.body.nombre;
        const estado = req.body.estado || "Activo";

        const data = {
            nombre,
            estado,
            fechaActualizacion: Date.now()
        }
        
        const tipo = await TipoEquipo.findByIdAndUpdate({ _id: id }, data, { new: true });

        if (!tipo) {
            res.send('El tipo de equipo no existe');
        } else {
            res.send(tipo);
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error, error: ' + error);
    }
});

router.delete('/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const tipo = await TipoEquipo.findOne({ _id: id });
        if (!tipo) {
            res.send('El tipo de equipo no existe');            
        } else {
            await TipoEquipo.findByIdAndDelete(id);            
            res.send(tipo);
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al eliminar el estado de equipo, error: ' + error);
    }
});


module.exports = router;