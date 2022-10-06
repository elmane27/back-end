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
        res.status(500).send('Ocurrio un error al consultar inventarios');
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
            res.status(404).send('El inventario no existe');
        } else {
            res.send(inventario);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar inventario');
    }
});

router.post('/', async function(req, res) {
    try {

        const serialInv = await Inventario.findOne({ serial: req.body.serial });
        const modeloInv = await Inventario.findOne({ modelo: req.body.modelo });
        
        if (serialInv) {
            res.status(400).send('El serial ya existe');
        } else if (modeloInv) {
            res.status(400).send('El modelo ya existe');
        } else {        
            const error = validarInventario(req.body);
            if (error.length > 0) {
                res.status(400).send(error);
            } else {
                const inventario = new Inventario(req.body);
                await inventario.save();
                res.send(inventario);
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear inventario');
    }
});

router.put('/:id', async function(req, res) {
    try {
        const { id } = req.params;

        const inventarioExiste = await Inventario.findOne({ _id: id });

        if (!inventarioExiste) {
            return res.status(400).send('El inventario no existe');
        } else {

            const validaciones = validarInventario(req);
        
            if(validaciones.length > 0) {
                return res.status(400).send(validaciones);
            } else {
                const inventario = await Inventario.findByIdAndUpdate(id, {
                    serial: req.body.serial,
                    modelo: req.body.modelo,
                    descripcion: req.body.descripcion,
                    foto: req.body.foto,
                    color: req.body.color,
                    fechaCompra: req.body.fechaCompra,
                    precio: req.body.precio,
                    usuario: req.body.usuario._id,
                    marca: req.body.marca._id,
                    tipoEquipo: req.body.tipoEquipo._id,
                    estadoEquipo: req.body.estadoEquipo._id,
                }, { new: true });
                res.send(inventario);
            }           
        }
     } catch (error) {
         console.log(error);
         res.status(500).send('Ocurrio un error al consultar inventarios');
     }
});

router.delete('/:id', async function(req, res) {
    try {
        const { id } = req.params;

        const inventarioExiste = await Inventario.findOne({ _id: id });

        if (!inventarioExiste) {
            return res.status(400).send('El inventario no existe');
        } else {
            const inventario = await Inventario.findByIdAndDelete(id);
            res.send(inventario, 'Inventario eliminado', 200);            
        }
     } catch (error) {
         console.log(error);
         res.status(500).send('Ocurrio un error al consultar inventarios');
     }
});

module.exports = router;