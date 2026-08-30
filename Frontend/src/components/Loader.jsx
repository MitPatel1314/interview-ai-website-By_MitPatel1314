import React from 'react'

const Loader = ({ title = "Loading...", subtitle }) => {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center gap-5 px-6 text-center">
            <div className="relative flex h-16 w-16 items-center justify-center">
                <span className="pulse-ring absolute inset-0 rounded-full border-2 border-accent" />
                <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-line border-t-accent" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="max-w-sm text-sm leading-relaxed text-muted">{subtitle}</p>}
        </main>
    )
}

export default Loader
