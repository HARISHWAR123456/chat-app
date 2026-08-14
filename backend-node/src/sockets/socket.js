// socket -> is a specific socketobject for a single user so each and evry user will have a seperate socket object
import registerChatEvents from "./chat.socket.js"
import { createSpringApi } from "../services/api.service.js";

export function initializeSocket(io){

    io.on("connection",(socket)=>{
      console.log("User Connected :", socket.id);

      socket.api = createSpringApi(socket.token);

      registerChatEvents(socket,io);
    });
}

/* Who creates socket?
Socket.IO. Frameworks  create context objects and give them to your callback.
A socket object represents one live connection between one client and the server.*/
