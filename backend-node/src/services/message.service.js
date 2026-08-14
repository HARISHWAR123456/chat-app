export async function sendMessage(api,conversationId,content){

    const response = await api.post("/conversations/send-message",{conversationId,content});

    return response;
}