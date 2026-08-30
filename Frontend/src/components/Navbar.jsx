import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    return (
        <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-[#07080d]/75 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5">
                <Link to="/" className="flex items-center gap-2.5 no-underline">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-brand text-white shadow-[0_8px_20px_rgba(225,3,77,0.35)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                    </span>
                    <span className="font-display text-[1.05rem] font-bold tracking-tight text-primary">
                        Interview<span className="text-accent">AI</span>
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-2 rounded-full border border-line bg-panel/80 px-3 py-1.5 sm:flex">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-[0.7rem] font-bold text-accent">
                            {(user?.username || "U").slice(0, 1).toUpperCase()}
                        </span>
                        <span className="max-w-[140px] truncate text-xs font-medium text-primary">{user?.username}</span>
                    </div>
                    <button
                        type="button"
                        onClick={onLogout}
                        className="cursor-pointer rounded-lg border border-line bg-transparent px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-accent/40 hover:text-primary"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar
