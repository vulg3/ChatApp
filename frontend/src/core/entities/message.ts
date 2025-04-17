export interface Message {
    _id: string
    role: "user" | "model"
    content: string
    createdAt?: Date
}
