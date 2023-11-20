import RegistrarHora from "../models/RegistrarHora.js";

const obtenerTodasHorasExtras = async (request, response) => { //Para cuando el admin quiera ver todas la lista de las horas extras
    const horasExtras = await RegistrarHora.find();
    response.json(horasExtras);
}
const obtenerHorasExtras = async (request, response) => { //Para cuando el usuario quiera ver todas las horas extras de el usuario JUAN
    const horasExtras = await RegistrarHora.find().where('creador').equals(request.usuario);
    response.json(horasExtras);
}
const nuevaHoraExtra = async (request, response) => { //Cuando el usuario quiera crear una hora extra
    
    const horaExtra = new RegistrarHora(request.body);
    horaExtra.creador = request.usuario._id;

    try {
        const horaExtraAlmacenada = await horaExtra.save();
        response.json(horaExtraAlmacenada)
    } catch (error) {
        console.log(error);
    }
}
const obtenerHoraExtra = async (request, response) => { //Cuando el usuario o el admin quiera ver una registro en específico
    const { id } = request.params;

    try {
        const horasExtras = await RegistrarHora.findById(id);

        if (!horasExtras) { //Cuando tiene la misma longitud del id pero con un valor diferente y no coincide con ningún ID de la BD de la tabla registrarhoras
            const error = new Error("Hora extra no encontrada")
            return response.status(404).json({ msg: error.message })
        }
        if (horasExtras.creador.toString() !== request.usuario._id.toString()) { //Cuando no coincide el ID de la hora extra con el creador
            const error = new Error("Acción no válida")
            return response.status(401).json({ msg: error.message })
        }

        response.json(horasExtras) //El resultado de cuando hay una coincidencia entre ID del USER y ID de la HORA EXTRA

    } catch (error) {
        return response.status(404).json({ msg: "No es válido el ID" }) //Cuando excede o disminuye la longitud del ID y es totalmente diferente
    }

}
const editarHoraExtra = async (request, response) => { //para cuando el usuario quiera editar su registro
    const { id } = request.params;

    try {
        const horasExtras = await RegistrarHora.findById(id);

        if (!horasExtras) { //Cuando tiene la misma longitud del id pero con un valor diferente y no coincide con ningún ID de la BD de la tabla registrarhoras
            const error = new Error("Hora extra no encontrada")
            return response.status(404).json({ msg: error.message })
        }
        if (horasExtras.creador.toString() !== request.usuario._id.toString()) { //Cuando no coincide el ID de la hora extra con el creador
            const error = new Error("Acción no válida")
            return response.status(401).json({ msg: error.message })
        }

        horasExtras.nombre = request.body.nombre || horasExtras.nombre;
        horasExtras.descripcion = request.body.descripcion || horasExtras.descripcion;
        horasExtras.fechaHoraInicio = request.body.fechaHoraInicio || horasExtras.fechaHoraInicio;
        horasExtras.fechaHoraFin = request.body.fechaHoraFin || horasExtras.fechaHoraFin;

        try {
            const horasExtrasAlmacenadas = await horasExtras.save();
            response.json(horasExtrasAlmacenadas)
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        return response.status(404).json({ msg: "No es válido el ID" }) //Cuando excede o disminuye la longitud del ID y es totalmente diferente
    }

}
const eliminarHoraExtra = async (request, response) => { //para cuando el usuario quiera eliminar el registro
    const { id } = request.params;

    try {
        const horasExtras = await RegistrarHora.findById(id);

        if (!horasExtras) { //Cuando tiene la misma longitud del id pero con un valor diferente y no coincide con ningún ID de la BD de la tabla registrarhoras
            const error = new Error("Hora extra no encontrada")
            return response.status(404).json({ msg: error.message })
        }
        if (horasExtras.creador.toString() !== request.usuario._id.toString()) { //Cuando no coincide el ID de la hora extra con el creador
            const error = new Error("Acción no válida")
            return response.status(401).json({ msg: error.message })
        }

        try {
            await horasExtras.deleteOne();
            response.json({msg: "Hora extra eliminada"});
        } catch (error) {
            console.log(error);
            
        }
    } catch (error) {
        return response.status(404).json({ msg: "No es válido el ID" }) //Cuando excede o disminuye la longitud del ID y es totalmente diferente
    }
}

export {
    obtenerTodasHorasExtras,
    obtenerHorasExtras,
    nuevaHoraExtra,
    obtenerHoraExtra,
    editarHoraExtra,
    eliminarHoraExtra
}