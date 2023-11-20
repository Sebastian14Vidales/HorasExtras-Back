import mongoose from "mongoose";

const registrarHorasSchema = mongoose.Schema({
    asunto: {
        type: String,
        trim: true,
        required: true,
    },
    descripcion: {
        type: String,
        trim: true,
        required: true,
    },
    fechaHoraInicio: {
        type: Date,
        default: Date.now(),
    },
    fechaHoraFin: {
        type: Date,
        default: Date.now(),
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    timestamps: true,
});

const RegistrarHora = mongoose.model('RegistrarHora', registrarHorasSchema);

export default RegistrarHora