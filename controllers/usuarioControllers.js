import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailForgotPassword } from "../helpers/email.js";

const crearUsuario = async (request, response) => {
    const { email } = request.body;
    const existeUsuario = await Usuario.findOne({ email })

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return response.status(400).json({ msg: error.message })
    }
    try {
        const usuario = new Usuario(request.body);
        usuario.token = generarId();
        await usuario.save();

        // Enviar el email de confirmación una vez el usuario se almacena en la BD, entonces...
        const {email, nombre, token} = usuario;
        emailRegistro({
            email,
            nombre,
            token
        })
        response.json({msg:"Usuario creado correctamente. Revisa tu email para confirmar tu cuenta"})

    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (request, response) => {
    const { email, password } = request.body;

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error('Este usuario no existe');
        return response.status(404).json({ msg: error.message })
    }
    // Comprobar si está confirmado

    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return response.status(403).json({ msg: error.message })
    }
    // Comprobar su password
    if (await usuario.comprobarPassword(password)) {
        // console.log('Es correcto');
        response.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })

    } else {
        const error = new Error('Tu contraseña es incorrecta');
        return response.status(403).json({ msg: error.message })
    }
}

const confirmar = async (request, response) => {

    const { token } = request.params; //Vamos a leer de la URL
    const usuarioConfirmar = await Usuario.findOne({ token }); //Buscamos al a persona con el token
    if (!usuarioConfirmar) { //Si no existe entonces...
        const error = new Error('Token no válido'); //Token no válido
        return response.status(403).json({ msg: error.message })
    }
    //Si existe
    try {
        // console.log(usuarioConfirmar); confirmado = false
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        // console.log(usuarioConfirmar); confirmado = true
        await usuarioConfirmar.save(); //Almancenamos en la BD
        response.json({ msg: "Usuario confirmado Correctamente" }) //Y confirmamos de que se hizo correctamente

    } catch (error) {
        console.log('Hubo un error');

    }

}

const olvidePassword = async (request, response) => {
    const { email } = request.body;

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error('Este usuario no existe');
        return response.status(404).json({ msg: error.message })
    }

    try {
        usuario.token = generarId();
        await usuario.save();

        // Enviar el email
        // Enviar el email de confirmación una vez el usuario se almacena en la BD, entonces...
        const {email, nombre, token} = usuario;
        emailForgotPassword({
            email,
            nombre,
            token
        })

        response.json({ msg: "Hemos enviado un email con las instrucciones" })
    } catch (error) {
        console.log(error);

    }
}

const comprobarToken = async (request, response) => {
    const { token } = request.params;

    // Comprobar que el token exista
    const tokenValido = await Usuario.findOne({ token });
    if (tokenValido) {
        response.json({ msg: "Token VALIDO" })

    } else {
        const error = new Error('Token NO VALIDO');
        return response.status(404).json({ msg: error.message })
    }
}

const nuevoPassword = async (request, response) => {
    const { token } = request.params;
    const { password } = request.body; //el password que se escribe en el formulario

    // Comprobar que el token exista
    const usuario = await Usuario.findOne({ token });

    if (usuario) {
        usuario.password = password; //el nuevo password va a sobreescribir el password de la BD de usuario.password
        usuario.token = "";
        try {
            await usuario.save();
            response.json({ msg: "Password modificado correctamente" })
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error('Token NO VALIDO');
        return response.status(404).json({ msg: error.message })
    }
}

const perfil = async (request, response) => {
    const { usuario } = request;

    response.json(usuario)
    
}

export {
    crearUsuario,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}