import { Message } from "../../../core/entities/message"
import { apiService } from "../../apiService"

export class ChatEndpoint {
    static getChat = "/chat/getChat"
    static updateChat = "/chat/updateChat"
    static deleteChat(id: string) {
        return `/chat/deleteChat/${id}`
    }
}
export interface GetChatResponse {
    email: string
    data: {
        _id: string
        title: string
        messages: Message[]
    }[]
}

export interface UpdateChatRequest {
    _id: string
    title: string
    messages: Message[]
}


export const chatService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getChat: builder.query<GetChatResponse, void>({
            query: () => ({
                url: ChatEndpoint.getChat
            })
        }),
        updateChat: builder.mutation<void, UpdateChatRequest>({
            query: (body) => ({
                url: ChatEndpoint.updateChat,
                method: "POST",
                body
            })
        }),
        deleteChat: builder.mutation<void, string>({
            query: (id) => ({
                url: ChatEndpoint.deleteChat(id),
                method: "DELETE"
            })
        })
    })
})

export const { useGetChatQuery, useDeleteChatMutation, useUpdateChatMutation } = chatService