const {Schema, model} = require("mongoose");

const EstadoEquipoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
        enum: ["Activo", "Inactivo"],
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now()
    }
}, {
    versionKey: false
});

module.exports = model("EstadoEquipo", EstadoEquipoSchema);