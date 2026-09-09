export  namespace GetMessages{
    export interface Message {
    id: number;
    content: string;
    createdAt: string;
    sender: {
        id: number;
        username: string;
        email: string;
    };
}

export interface MessagePageResponse {
    messages: Message[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
}
}