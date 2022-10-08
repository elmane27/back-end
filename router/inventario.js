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

        const { serial, modelo, marca, tipoEquipo, estadoEquipo, usuario } = req.body;

        const inventarioExiste = await Inventario.findOne({ 
            $or: [
                { serial: serial },
                { modelo: modelo }
            ]
        });

        if (inventarioExiste) {
            res.send('El serial o modelo ya existe');
        }

        const usuarioExiste = await Inventario.findOne({ usuario: usuario, estado: "Activo" });
        const estadoExiste = await Inventario.findOne({ estadoEquipo: estadoEquipo, estado: "Activo" });
        const marcaExiste = await Inventario.findOne({ marca: marca, estado: "Activo" });
        const tipoExiste = await Inventario.findOne({ tipoEquipo: tipoEquipo, estado: "Activo" });

        if (usuarioExiste) {
            res.send('El usuario ya tiene un equipo asignado');
        } else if (estadoExiste) {
            res.send('El equipo ya se encuentra asignado');
        } else if (marcaExiste) {
            res.send('La marca no existe');
        } else if (tipoExiste) {
            res.send('El tipo de equipo no existe');
        } else {
            const inventario = new Inventario( req.body );
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
                const inventario = await Inventario.findByIdAndUpdate(id, {
                    serial: req.body.serial,
                    modelo: req.body.modelo,
                    descripcion: req.body.descripcion,
                    foto: req.body.foto,
                    color: req.body.color,
                    fechaCompra: req.body.fechaCompra,
                    precio: req.body.precio,
                    usuario: req.body.usuario,
                    marca: req.body.marca,
                    tipoEquipo: req.body.tipoEquipo,
                    estadoEquipo: req.body.estadoEquipo,
                }, { new: true });
                res.send(inventario);
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