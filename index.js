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
const servidor = app.listen(PORT, () => {
    console.log(`Consola corriendo en el puerto ${PORT}`);
    
})

// Socket.io
app.use(cors({ origin: '*' }));
import { Server } from "socket.io"

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('Conectado a socket.io');
    socket.on("ver_registro", (IdUser) => {
        console.log("Desde id_User: ",IdUser);
        socket.join(IdUser)              
    })

    socket.on('nueva_hora', (hora) => {
        console.log("NUEVA HORA:", hora);
        console.log("CREADOR HORA:", hora.creador);
        
        io.to("6578cd23bf4e2977e569dd7b").to(hora.creador).emit('hora_agregada', hora);
    })

    socket.on('eliminar_hora', (hora) => {
        io.to("6578cd23bf4e2977e569dd7b").to(hora.creador).emit('hora_eliminada', hora)
    })

    socket.on('editar_hora', (hora) => {
        io.to("6578cd23bf4e2977e569dd7b").to(hora.creador).emit('hora_editada', hora)
    })
})