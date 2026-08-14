import app  from "./app.js";
import http from "http";
import {Server} from "socket.io";
import { initializeSocket } from "./sockets/socket.js";
import { socketAuth } from "./sockets/socketAuth.js";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});  

io.use(socketAuth) // middleware for validating the jwt

initializeSocket(io);// we are passing the io obejct which is the server to the initializeSocket(io) and using this object we regular monitor the http server like any request for the "Connection"

server.listen(3000,()=>{
    console.log("Server Started");
});

 /*          server.js

                │

                ▼

      Node HTTP Server

         /          \

        ▼            ▼

    Express      Socket.IO

*/  