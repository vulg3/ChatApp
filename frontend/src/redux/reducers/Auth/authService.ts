import { apiService } from "../../apiService"

interface LoginRequest {
    idToken: string
}

interface LoginResponse {
    accsess_token: string
    refresh_token: string
}

export class AuthEndPoint {
    static login = "/auth/login"
}

export const authService = apiService.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: AuthEndPoint.login,
                method: "POST",
                body
            })
        })
    }),
    overrideExisting: false
})

export const { useLoginMutation } = authService