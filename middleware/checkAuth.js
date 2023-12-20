import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (request, response, next) => {
    
    let token;

    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {

        try {
            // console.log('ENTRO EN EL TRY');
            
            token = request.headers.authorization.split(" ")[1];
            // console.log('PASO TOKEN');
            // console.log("TOKEN:  ",token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log('PASO DECODED');
            request.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v");
            // console.log(request.usuario);

        } catch (error) {
            
            return response.status(404).json({ msg: "Hubo un error" });
            
        }
        
    }

    if (!token) {
        const error = new Error('Token no válido');
        return response.status(401).json({ msg: error.message })
    }

    next();

}

export default checkAuth;