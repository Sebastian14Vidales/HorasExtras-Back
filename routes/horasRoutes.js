import express from "express"
import {
    obtenerTodasHorasExtras,
    obtenerHorasExtras,
    nuevaHoraExtra,
    obtenerHoraExtra,
    editarHoraExtra,
    eliminarHoraExtra
} from "../controllers/horasController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get('/alluser', checkAuth, obtenerTodasHorasExtras)
router.route('/').get(checkAuth, obtenerHorasExtras).post(checkAuth, nuevaHoraExtra)
router.route('/:id').get(checkAuth, obtenerHoraExtra).put(checkAuth, editarHoraExtra).delete(checkAuth, eliminarHoraExtra);


export default router;
