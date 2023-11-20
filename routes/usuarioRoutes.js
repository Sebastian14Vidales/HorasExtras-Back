import express from "express";
import { crearUsuario, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from "../controllers/usuarioControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// Creación, Registro y Confirmación de Usuarios
router.post('/', crearUsuario); //Crea un nuevo usuario
router.post('/login', autenticar); //Autenticar los usuarios
router.get('/confirmar/:token', confirmar); //Autenticar los usuarios
router.post('/forgot-password', olvidePassword); //Recuperar Contraseña
// router.get('/forgot-password/:token', comprobarToken); //Recuperar Contraseña
// router.post('/forgot-password/:token', nuevoPassword); //Escribir Contraseña nueva
router.route('/forgot-password/:token').get(comprobarToken).post(nuevoPassword);
router.get('/perfil', checkAuth, perfil);

export default router;