const { Router } = require('express');
const Usuarios = require('../models/Usuarios');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const usuarios = await Usuarios.find();
        if (usuarios.length === 0) {
            res.send("No hay usuarios registrados");
        } else {
            res.send(usuarios);
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar usuarios');
    }
});

router.get('/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const usuario = await Usuarios.findOne({ _id: id });
        if (!usuario) {
            res.status(404).send('El usuario no existe');
        } else {
            res.send(usuario);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar el usuario');
    }
});

router.post('/', async function(req, res){
    const nombre = req.body.nombre;
    const email = req.body.email;
    const estado = req.body.estado || "Activo";
    
    // validar campos vacios
    if (nombre === '') {
        return res.status(400).send('El nombre es obligatorio');
    }

    if (email === '') {
        return res.status(400).send('El email es obligatorio');
    }

    try {
        const usuario = await Usuarios.findOne({ email });
        if (usuario) {
            res.status(400).send('El usuario ya existe');
        } else {
            const data = {
                nombre,
                email,
                estado
            }
            const usuario = new Usuarios(data);
            await usuario.save();
            res.send(usuario, 'Usuario creado exitosamente', 201);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al guardar el usuario');
    }
});

router.put('/:id', async function(req, res) {
    try {
        const { id } = req.params;
        const nombre = req.body.nombre;
        const email = req.body.email;
        const estado = req.body.estado || "Activo";

        // validar campos vacios
        if (nombre === '') {
            return res.status(400).send('El nombre es obligatorio');
        }

        if (email === '') {
            return res.status(400).send('El email es obligatorio');
        }

        const data = {
            nombre,
            email,
            estado,
            fechaActualizacion: Date.now()
        }

        const usuario = await Usuarios.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!usuario) {
            res.status(404).send('El usuario no existe');
        } else {
            res.send(usuario);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar el usuario');
    }
});

router.delete('/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const usuario = await Usuarios.findOne({ _id: id });
        if (!usuario) {
            res.status(404).send('El usuario no existe');
        } else {
            await Usuarios.findByIdAndDelete(id);
            res.send(usuario, 'Usuario eliminado exitosamente', 200);
        }
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al eliminar el usuario, error: ' + error);
    }
});

module.exports = router;