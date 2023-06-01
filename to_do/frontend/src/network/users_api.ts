import { User } from "../models/users"
import { fetchData } from "./notes_api"

export async function getLoggedInUsers(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" })
    return response.json()
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function signIn(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })

    return response.json()
}

export async function logOut() {
    await fetchData("/api/users/logout", {method: "POST"})
}