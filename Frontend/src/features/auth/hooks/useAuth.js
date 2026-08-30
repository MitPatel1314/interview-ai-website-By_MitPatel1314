import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";


const getErrorMessage = (err, fallback) =>
    err?.response?.data?.message || err?.message || fallback

export const useAuth = () => {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    const { user, setUser, loading } = context

    const handleLogin = async ({ email, password }) => {
        try {
            const data = await login({ email, password })
            if (!data?.user) {
                return { ok: false, message: "Login failed" }
            }
            setUser(data.user)
            return { ok: true }
        } catch (err) {
            return { ok: false, message: getErrorMessage(err, "Login failed") }
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        try {
            const data = await register({ username, email, password })
            if (!data?.user) {
                return { ok: false, message: "Registration failed" }
            }
            setUser(data.user)
            return { ok: true }
        } catch (err) {
            return { ok: false, message: getErrorMessage(err, "Registration failed") }
        }
    }

    const handleLogout = async () => {
        try {
            await logout()
        } catch {
            // still clear local session
        } finally {
            setUser(null)
        }
    }

    return { user, loading, handleRegister, handleLogin, handleLogout }
}
