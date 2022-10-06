const { Schema, model } = require("mongoose");

const InventarioSchema = Schema({
   serial: {
        type: String,
        required: true,
        unique: true,
   },
   modelo: {
        type: String,
        required: true
   },
   descripcion: {
        type: String,
        required: false,
   },
   color: {
        type: String,
        required: false,
   },
   foto: {
        type: String,
        required: true,
   },
   fechaCompra: {
        type: Date,
        required: false,
    },
    precio: {
        type: Number,
        required: false,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: "Marca",
        required: true,
    },
    tipoEquipo: {
        type: Schema.Types.ObjectId,
        ref: "TipoEquipo",
        required: true,
    },
    estadoEquipo: {
        type: Schema.Types.ObjectId,
        ref: "EstadoEquipo",
        required: true,
    }
}, {
    versionKey: false
});

module.exports = model("Inventario", InventarioSchema);
