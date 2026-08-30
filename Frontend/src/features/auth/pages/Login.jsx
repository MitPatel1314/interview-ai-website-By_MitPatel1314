import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import AuthLayout from '../../../components/AuthLayout'
import Loader from '../../../components/Loader'

const Login = () => {

    const { loading, user, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSubmitting(true)
        const result = await handleLogin({ email, password })
        setSubmitting(false)
        if (result.ok) {
            navigate('/')
            return
        }
        setError(result.message)
    }

    if (loading) {
        return <Loader title="Checking your session" subtitle="Hang tight while we restore your workspace." />
    }

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to generate interview plans and pick up where you left off."
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="email" id="email" name='email' placeholder='you@example.com' required
                        className="field px-4 py-3 text-sm placeholder:text-muted" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <input
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="password" id="password" name='password' placeholder='Enter your password' required
                        className="field px-4 py-3 text-sm placeholder:text-muted" />
                </div>
                {error && <p className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-accent">{error}</p>}
                <button disabled={submitting} className="btn-primary mt-1 w-full py-3 text-sm">
                    {submitting ? "Signing in..." : "Sign in"}
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-muted">
                Don&apos;t have an account? <Link to={"/register"} className="font-semibold text-accent no-underline hover:underline">Create one</Link>
            </p>
        </AuthLayout>
    )
}

export default Login
