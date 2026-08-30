import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import Navbar from '../../../components/Navbar.jsx'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resumeName, setResumeName] = useState("")
    const [error, setError] = useState("")
    const [generating, setGenerating] = useState(false)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        setError("")

        if (!jobDescription.trim()) {
            setError("Job description is required.")
            return
        }

        if (!resumeFile && !selfDescription.trim()) {
            setError("Upload a resume or add a self-description.")
            return
        }

        setGenerating(true)
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        setGenerating(false)
        if (!data?._id) {
            setError(data?.error || "Could not generate the interview plan. Please try again.")
            return
        }
        navigate(`/interview/${data._id}`)
    }

    const scoreClass = (score) =>
        score >= 80 ? 'text-severity-low' : score >= 60 ? 'text-severity-medium' : 'text-severity-high'

    if (generating) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <main className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-5 px-6 text-center">
                    <div className="relative flex h-20 w-20 items-center justify-center">
                        <span className="pulse-ring absolute inset-0 rounded-full border-2 border-accent" />
                        <span className="h-12 w-12 animate-spin rounded-full border-[3px] border-line border-t-accent" />
                    </div>
                    <h1 className="font-display text-3xl font-bold tracking-tight">Crafting your strategy</h1>
                    <p className="max-w-md text-sm leading-relaxed text-muted">
                        The AI is reading the role, mapping your profile, and assembling questions, answers, and a prep roadmap. This usually takes about 30 seconds.
                    </p>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen font-sans text-primary">
            <Navbar />
            <div className="flex w-full flex-col items-center gap-10 px-5 py-10">

                <header className="text-center">
                    <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-accent uppercase">Personalized prep</p>
                    <h1 className="font-display mb-3 text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
                        Create your custom <span className="text-accent">interview plan</span>
                    </h1>
                    <p className="mx-auto max-w-[520px] text-[0.95rem] leading-relaxed text-muted">
                        Drop in the job description and your profile. We&apos;ll build targeted questions, model answers, and a day-by-day roadmap.
                    </p>
                </header>

                <div className="glass-card w-full max-w-[960px] overflow-hidden rounded-3xl">
                    <div className="flex min-h-[520px] flex-col lg:flex-row">

                        <div className="relative flex flex-1 flex-col gap-4 p-6">
                            <div className="mb-1 flex items-center gap-2">
                                <span className="flex items-center text-accent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2 className="flex-1 text-base font-semibold text-primary">Target Job Description</h2>
                                <span className="rounded-full border border-accent/30 bg-accent/15 px-2.5 py-[0.15rem] text-[0.68rem] font-semibold tracking-wide uppercase text-accent">Required</span>
                            </div>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                className="field min-h-[220px] w-full flex-1 resize-none px-4 py-3 font-sans text-sm leading-normal placeholder:text-muted lg:min-h-0"
                                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                                maxLength={5000}
                            />
                            <div className="absolute right-8 bottom-9 text-xs text-muted">{jobDescription.length} / 5000 chars</div>
                        </div>

                        <div className="hidden w-px shrink-0 bg-line lg:block" />
                        <div className="h-px w-full bg-line lg:hidden" />

                        <div className="flex flex-1 flex-col gap-3 p-6">
                            <div className="mb-1 flex items-center gap-2">
                                <span className="flex items-center text-accent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <h2 className="flex-1 text-base font-semibold text-primary">Your Profile</h2>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-primary">
                                    Upload Resume
                                    <span className="rounded-full border border-accent/30 bg-accent/15 px-2.5 py-[0.15rem] text-[0.68rem] font-semibold tracking-wide uppercase text-accent">Best Results</span>
                                </label>
                                <label className={`flex cursor-pointer flex-col items-center justify-center gap-[0.35rem] rounded-xl border-2 border-dashed px-4 py-6 transition-colors ${resumeName ? 'border-accent/50 bg-accent/10' : 'border-line bg-input hover:border-accent hover:bg-accent/5'}`} htmlFor='resume'>
                                    <span className="mb-1 text-accent">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                    </span>
                                    <p className="m-0 text-sm font-medium text-primary">{resumeName ? "Resume attached" : "Click to upload or drag & drop"}</p>
                                    <p className="m-0 text-xs text-muted">{resumeName || "PDF (Max 5MB)"}</p>
                                    <input
                                        ref={resumeInputRef}
                                        hidden
                                        type='file'
                                        id='resume'
                                        name='resume'
                                        accept='.pdf,application/pdf'
                                        onChange={(e) => setResumeName(e.target.files[0]?.name || "")}
                                    />
                                </label>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-muted">
                                <span className="h-px flex-1 bg-line" />
                                <span className="whitespace-nowrap">OR</span>
                                <span className="h-px flex-1 bg-line" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-primary" htmlFor='selfDescription'>Quick Self-Description</label>
                                <textarea
                                    value={selfDescription}
                                    onChange={(e) => { setSelfDescription(e.target.value) }}
                                    id='selfDescription'
                                    name='selfDescription'
                                    className="field h-24 w-full resize-none px-4 py-3 font-sans text-sm leading-normal placeholder:text-muted"
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                />
                            </div>

                            <div className="flex items-start gap-[0.6rem] rounded-xl border border-info-border bg-info-bg px-4 py-3">
                                <span className="mt-px shrink-0 text-info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                </span>
                                <p className="m-0 text-[0.8rem] leading-normal text-info-text">Either a <strong className="text-primary">Resume</strong> or a <strong className="text-primary">Self Description</strong> is required to generate a personalized plan.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-stretch justify-between gap-3 border-t border-line px-6 py-4 sm:flex-row sm:items-center">
                        <span className={`text-[0.8rem] ${error ? "text-accent" : "text-muted"}`}>
                            {error || "AI-powered strategy generation • ~30 seconds"}
                        </span>
                        <button
                            onClick={handleGenerateReport}
                            className="btn-primary px-6 py-3 font-sans text-[0.9rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                            Generate my interview strategy
                        </button>
                    </div>
                </div>

                <section className="flex w-full max-w-[960px] flex-col gap-4">
                    <div className="flex items-end justify-between">
                        <h2 className="font-display text-xl font-bold">Recent plans</h2>
                        {loading && <span className="text-xs text-muted">Refreshing...</span>}
                    </div>
                    {reports.length > 0 ? (
                        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {reports.map(report => (
                                <li
                                    key={report._id}
                                    className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-line bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <h3 className="m-0 text-[0.95rem] font-semibold leading-snug">{report.title || 'Untitled Position'}</h3>
                                    <p className="m-0 text-sm text-muted">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`m-0 text-[0.8rem] font-semibold ${scoreClass(report.matchScore)}`}>Match score {report.matchScore}%</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="rounded-2xl border border-dashed border-line px-5 py-8 text-center text-sm text-muted">
                            {loading ? "Loading your previous plans..." : "No plans yet. Generate your first strategy above."}
                        </p>
                    )}
                </section>

                <footer className="flex gap-6 pb-4">
                    <a href='#' className="text-[0.8rem] text-muted no-underline transition-colors hover:text-primary">Privacy Policy</a>
                    <a href='#' className="text-[0.8rem] text-muted no-underline transition-colors hover:text-primary">Terms of Service</a>
                    <a href='#' className="text-[0.8rem] text-muted no-underline transition-colors hover:text-primary">Help Center</a>
                </footer>
            </div>
        </div>
    )
}

export default Home
