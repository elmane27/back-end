const validarInventario = (req) => {
    
    const error = [];

    if (req.serial === '') {
        error.push('El serial es obligatorio');
    } else if (req.modelo === '') {
        error.push('El modelo es obligatorio');
    } else if (req.descripcion === '') {
        error.push('La descripcion es obligatoria');
    } else if (req.foto === '') {
        error.push('La foto es obligatoria');
    } else if (req.fechaCompra === '') {
        error.push('La fecha de compra es obligatoria');
    } else if (req.precio === '') {
        error.push('El precio es obligatorio');
    } else if (req.usuario === '') {
        error.push('El usuario es obligatorio');        
    } else if (req.marca === '') {
        error.push('La marca es obligatoria');
    } else if (req.tipoEquipo === '') {
        error.push('El tipo de equipo es obligatorio');
    } else if (req.estadoEquipo === '') {
        error.push('El estado del equipo es obligatorio');
    } else if (req.color === '') {
        error.push('El color es obligatorio');
    }

    return error;
}

module.exports = validarInventario;