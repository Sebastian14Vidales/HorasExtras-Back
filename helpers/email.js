import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos;
    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"Empresa del Caquetá 👨‍💻 - Administrador" <admin@empresadelcaqueta.com>', // sender address
        to: email, // list of receivers
        subject: "Empresa del Caquetá - Confirma tu cuenta ✔", // Subject line
        text: "Comprueba tu cuenta", // plain text body
        html: `<p style="font-size: 18px; color: #333; font-family: Arial;">Hola ${nombre}, comprueba tu cuenta en Empresa del Caquetá</p>
        <p style="font-size: 16px; color: #555; font-family: Arial;">Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:</p>

        <a href="${process.env.FRONTEND_URL}/confirm/${token}" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-family: Arial; font-size: 16px; margin-top: 10px;">Comprobar Cuenta</a>
                
        <p style="font-size: 14px; color: #777; font-family: Arial;">Si tú no creaste esta cuenta, puedes ignorar este correo.</p>
        `, // html body
    });
}

export const emailForgotPassword = async (datos) => {
    const { email, nombre, token } = datos;
    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"Empresa del Caquetá 👨‍💻 - Administrador" <admin@empresadelcaqueta.com>', // sender address
        to: email, // list of receivers
        subject: "Empresa del Caquetá - Olvidaste tu password ✔", // Subject line
        text: "Comprueba tu password", // plain text body
        html: `<p style="font-size: 18px; color: #333; font-family: Arial;">Hola ${nombre}, comprueba tu cuenta en Empresa del Caquetá</p>
        <p style="font-size: 16px; color: #555; font-family: Arial;">Olvidaste tu contraseña, para ello, debes ingresar el siguiente enlace para modificarla:</p>

        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-family: Arial; font-size: 16px; margin-top: 10px;">Reestablecer Password</a>
                
        <p style="font-size: 14px; color: #777; font-family: Arial;">Si tú no creaste esta cuenta, puedes ignorar este correo.</p>
        `, // html body
    });
}