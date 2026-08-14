export async function canJoinConversation(userId,conversationId, api){

    const response = await api.post("/conversations/can-join", {userId,conversationId});

        return response.allowed;
}

export async function getMessages(api,conversationId ,page = 0,size = 20){
    return await api.get("/conversations/get-messages",
        {
            params: {
                conversationId,
                page,
                size
            }
        })

}
