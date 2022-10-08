const { Router } = require('express');
const validarInventario = require('../helpers/validar-inventario');
const Inventario = require('../models/Inventario');

const router = Router();

router.get('/', async function(req, res) {
    try {
       const inventario = await Inventario.find().populate([
           {
               path: 'usuario', Select: 'nombre email estado'
           },
           {
               path: 'marca', Select: 'nombre estado'
           },
           {
               path: 'tipoEquipo', Select: 'nombre estado'
           },
           {
               path: 'estadoEquipo', Select: 'nombre estado'
           }
       ]);
       res.send(inventario);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar inventarios');
    }
});

router.get('/:id', async function(req, res) {
    try {
        const inventario = await Inventario.findById(req.params.id).populate([
            {
                path: 'usuario', Select: 'nombre email estado'
            },
            {
                path: 'marca', Select: 'nombre estado'
            },
            {
                path: 'tipoEquipo', Select: 'nombre estado'
            },
            {
                path: 'estadoEquipo', Select: 'nombre estado'
            }
        ]);
        if (!inventario) {
            res.send('El inventario no existe');
        } else {
            res.send(inventario);
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar inventario');
    }
});

router.post('/', async function(req, res) {    
    try {

        const { error } = validarInventario(req.body);
        if (error) {
            res.send(error.details[0].message);
        } else {
            const inventario = new Inventario(req.body);
            await inventario.save();
            res.send(inventario);
        }

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al crear inventario');
    }
});

router.put('/:id', async function(req, res) {
    try {
        const { id } = req.params;

        const inventarioExiste = await Inventario.findOne({ _id: id });

        if (!inventarioExiste) {
            return res.send('El inventario no existe');
        } else {

            const validaciones = validarInventario(req);
        
            if(validaciones.length > 0) {
                res.send(validaciones);
            } else {                
                const inventario = await Inventario.findByIdAndUpdate(id, req.body, { new: true });
                res.status(200).json({
                    ok: true,
                    inventario,
                    msg: 'Inventario actualizado correctamente'
                });                
            }           
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al actualizar inventario: ' + error.message);
    }
});

router.delete('/:id', async function(req, res) {
    try {
        const { id } = req.params;

        const inventarioExiste = await Inventario.findOne({ _id: id });

        if (!inventarioExiste) {
            res.send('El inventario no existe');
        } else {
            const inventario = await Inventario.findByIdAndDelete(id);
            res.send(inventario);            
        }
     } catch (error) {
         console.log(error);
         res.send('Ocurrio un error al consultar inventarios');
     }
});

module.exports = router;