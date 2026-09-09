import { canJoinConversation , getMessages} from "../services/conversation.service.js";
import { sendMessage }         from "../services/message.service.js"

export default function registerChatEvents(socket,io){

    socket.on("join-room", async (data) => {
        try {
            const allowed = await canJoinConversation(
                socket.user.id,
                data.conversationId,
                socket.api
            );

            console.log("Allowed:",allowed);
            
            if (!allowed) {
                return socket.emit("error", {
                    message: "Access denied"
                });
            }
            socket.join(data.conversationId); 

            socket.emit("joined-room", {
                conversationId: data.conversationId
            });

        } catch (error) {

            console.error("Failed to join room:",error);

            socket.emit("error", {
                message: "Unable to join conversation ,Please Try Again"
            });

        }

    });

    socket.on("chat-message",async (data)=> {

        console.log("chat messgae :", data);
        try{
       
            const message = await sendMessage( socket.api,data.conversationId,data.message);


console.log("Message saved by Spring:", message);

console.log(
    "Broadcasting to room:",
    data.conversationId
);

            io.to(String(data.conversationId)).emit("user-message", message);


        }catch(error){
            console.error("Failed to send message:",error);

        }
    })

    socket.on("typing", (data) => {
        if (!data.conversationId) {
            return;
        }

        if (typeof data.active !== "boolean") {
            return;
        }

        if (!socket.rooms.has(String(data.conversationId))) {
            return;
        }

        socket.to(data.conversationId).emit("typing",{
            userId: socket.user.id,
            active: data.active
        })
   });


   socket.on("leave-room", (data) => {

    if (!data?.conversationId) {
        return;
    }

    const conversationId = String(data.conversationId);

    socket.leave(conversationId);

    console.log(
        `User ${socket.user.id} left room ${conversationId}`
    );
});

    
}