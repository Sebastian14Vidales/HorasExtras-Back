import express from "express";
import conectarDB from "./config/db.js"
import dotenv from "dotenv";
import cors from "cors"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import horasRoutes from "./routes/horasRoutes.js"

const app = express();
app.use(express.json());

dotenv.config(); //Para que dotenv me busque en el archivo .env las variables

conectarDB();

// Configurar CORS
const whiteList =[process.env.FRONTEND_URL]; //Que este localhost 4000 permita peticiones del 3000

const corsOptions = {
    origin: function(origin, callback) {
        console.log("ORIGIN: ",origin);
        
        if(!origin || whiteList.includes(origin)) {
            // Puede consultar la API
            callback(null, true);
        } else{
            // No está permitido
            callback(new Error("Error de Cors"))
        }
    }
}

app.use(cors(corsOptions))


// Routing - Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/horasextras', horasRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Consola corriendo en el puerto ${PORT}`);
    
})