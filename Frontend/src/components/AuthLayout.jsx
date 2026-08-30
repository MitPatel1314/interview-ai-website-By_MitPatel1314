import React from 'react'

const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <main className="relative flex min-h-screen w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />

            <section className="relative hidden w-[46%] flex-col justify-between px-12 py-12 lg:flex">
                <div className="flex items-center gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-brand text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                    </span>
                    <span className="font-display text-lg font-bold">Interview<span className="text-accent">AI</span></span>
                </div>

                <div>
                    <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-accent uppercase">AI interview coach</p>
                    <h2 className="font-display mb-4 max-w-md text-4xl leading-[1.15] font-extrabold tracking-tight">
                        Walk into every interview with a plan, not a guess.
                    </h2>
                    <p className="mb-8 max-w-sm text-sm leading-relaxed text-muted">
                        Paste a job description, add your profile, and get targeted questions, model answers, and a day-by-day prep roadmap.
                    </p>
                    <ul className="flex max-w-sm flex-col gap-3 text-sm text-primary">
                        <li className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                            <span className="h-2 w-2 rounded-full bg-accent" />
                            Role-matched technical &amp; behavioral questions
                        </li>
                        <li className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                            <span className="h-2 w-2 rounded-full bg-info-icon" />
                            Skill-gap tags with a match score
                        </li>
                        <li className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                            <span className="h-2 w-2 rounded-full bg-severity-low" />
                            Downloadable resume polish in one click
                        </li>
                    </ul>
                </div>

                <p className="text-xs text-muted">Built for internships, campus placements, and job switches.</p>
            </section>

            <section className="relative flex flex-1 items-center justify-center px-5 py-12">
                <div className="glass-card w-full max-w-[440px] rounded-3xl p-8">
                    <div className="mb-7 lg:hidden">
                        <span className="font-display text-lg font-bold">Interview<span className="text-accent">AI</span></span>
                    </div>
                    <h1 className="font-display mb-2 text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="mb-7 text-sm leading-relaxed text-muted">{subtitle}</p>
                    {children}
                </div>
            </section>
        </main>
    )
}

export default AuthLayout
