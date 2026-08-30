import React, { useState } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams, Link } from 'react-router'
import Navbar from '../../../components/Navbar.jsx'
import Loader from '../../../components/Loader.jsx'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Roadmap', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="overflow-hidden rounded-xl border border-line bg-panel/80 transition-colors hover:border-accent/30">
            <button type="button" className="flex w-full cursor-pointer items-center gap-3 bg-transparent px-4 py-3.5 text-left" onClick={() => setOpen(o => !o)}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-xs font-bold text-accent">Q{index + 1}</span>
                <p className="m-0 flex-1 text-sm leading-snug text-primary">{item.question}</p>
                <span className={`flex items-center text-muted transition-transform ${open ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </button>
            {open && (
                <div className="flex flex-col gap-4 border-t border-line px-4 pt-3 pb-4">
                    <div className="flex flex-col gap-[0.4rem]">
                        <span className="w-fit rounded-full border border-intention/20 bg-intention/10 px-2.5 py-[0.15rem] text-[0.68rem] font-bold tracking-wider text-intention uppercase">Intention</span>
                        <p className="m-0 text-[0.86rem] leading-relaxed text-primary/90">{item.intention}</p>
                    </div>
                    <div className="flex flex-col gap-[0.4rem]">
                        <span className="w-fit rounded-full border border-severity-low/20 bg-severity-low/10 px-2.5 py-[0.15rem] text-[0.68rem] font-bold tracking-wider text-severity-low uppercase">Model Answer</span>
                        <p className="m-0 text-[0.86rem] leading-relaxed text-[#b8f0c8]">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className="relative flex flex-col gap-2 py-3 pl-14">
        <span className="absolute top-[1.05rem] left-[21px] h-3.5 w-3.5 rounded-full border-2 border-accent bg-card shadow-[0_0_12px_rgba(255,45,120,0.55)]" />
        <div className="flex flex-wrap items-center gap-[0.6rem]">
            <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-[0.1rem] text-[0.7rem] font-bold text-accent">Day {day.day}</span>
            <h3 className="m-0 text-[0.95rem] font-semibold text-primary">{day.focus}</h3>
        </div>
        <ul className="m-0 flex list-none flex-col gap-[0.35rem] p-0">
            {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-[0.845rem] leading-normal text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

const skillTagClass = {
    high: 'text-severity-high bg-severity-high/10 border-severity-high/25',
    medium: 'text-severity-medium bg-severity-medium/10 border-severity-medium/25',
    low: 'text-severity-low bg-severity-low/10 border-severity-low/25',
}

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, loading, downloadingPdf, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    if (loading || !report) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <Loader title="Loading your interview plan" subtitle="Pulling questions, skill gaps, and your prep roadmap." />
            </div>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'border-severity-low text-severity-low' :
            report.matchScore >= 60 ? 'border-severity-medium text-severity-medium' : 'border-severity-high text-severity-high'

    const scoreLabel =
        report.matchScore >= 80 ? 'Strong match for this role' :
            report.matchScore >= 60 ? 'Solid match — close the gaps' : 'Stretch role — follow the roadmap'

    return (
        <div className="min-h-screen font-sans text-primary">
            <Navbar />
            <div className="box-border flex w-full items-stretch p-4 md:p-6">
                <div className="glass-card mx-auto flex w-full max-w-[1280px] flex-col overflow-hidden rounded-3xl lg:flex-row">

                    <nav className="flex shrink-0 flex-col justify-between gap-4 border-b border-line px-4 py-5 lg:w-[220px] lg:border-r lg:border-b-0 lg:py-7">
                        <div>
                            <Link to="/" className="mb-4 inline-flex items-center gap-1 px-3 text-xs font-medium text-muted no-underline hover:text-primary">
                                ← All plans
                            </Link>
                            <p className="mb-2 px-3 text-[0.7rem] font-semibold tracking-widest text-muted uppercase">Sections</p>
                            <div className="flex gap-1 overflow-x-auto lg:flex-col">
                                {NAV_ITEMS.map(item => (
                                    <button
                                        key={item.id}
                                        className={`mb-0.5 flex shrink-0 cursor-pointer items-center gap-[0.6rem] rounded-lg border-none px-3 py-[0.65rem] text-left font-sans text-sm transition-colors ${activeNav === item.id ? 'bg-accent/10 text-accent' : 'bg-transparent text-muted hover:bg-panel hover:text-primary'}`}
                                        onClick={() => setActiveNav(item.id)}
                                    >
                                        <span className="flex shrink-0 items-center">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            disabled={downloadingPdf}
                            onClick={() => { getResumePdf(interviewId) }}
                            className="btn-primary w-full px-4 py-3 text-sm" >
                            <svg height={"0.8rem"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                            {downloadingPdf ? "Downloading..." : "Download resume"}
                        </button>
                    </nav>

                    <main className="max-h-none flex-1 overflow-y-auto px-5 pt-6 pb-16 lg:max-h-[calc(100vh-6.5rem)] lg:px-8 lg:pt-7 lg:pb-20">
                        {report.title && (
                            <p className="mb-4 text-xs font-semibold tracking-widest text-muted uppercase">{report.title}</p>
                        )}
                        {activeNav === 'technical' && (
                            <section className="min-h-full">
                                <div className="mb-6 flex items-baseline gap-3 border-b border-line pb-4">
                                    <h2 className="font-display m-0 text-[1.2rem] font-bold text-primary">Technical questions</h2>
                                    <span className="rounded-full border border-line bg-panel px-[0.6rem] py-[0.15rem] text-[0.8rem] text-muted">{report.technicalQuestions?.length || 0}</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {(report.technicalQuestions || []).map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'behavioral' && (
                            <section className="min-h-full">
                                <div className="mb-6 flex items-baseline gap-3 border-b border-line pb-4">
                                    <h2 className="font-display m-0 text-[1.2rem] font-bold text-primary">Behavioral questions</h2>
                                    <span className="rounded-full border border-line bg-panel px-[0.6rem] py-[0.15rem] text-[0.8rem] text-muted">{report.behavioralQuestions?.length || 0}</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {(report.behavioralQuestions || []).map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'roadmap' && (
                            <section className="min-h-full">
                                <div className="mb-6 flex items-baseline gap-3 border-b border-line pb-4">
                                    <h2 className="font-display m-0 text-[1.2rem] font-bold text-primary">Preparation roadmap</h2>
                                    <span className="rounded-full border border-line bg-panel px-[0.6rem] py-[0.15rem] text-[0.8rem] text-muted">{report.preparationPlan?.length || 0}-day plan</span>
                                </div>
                                <div className="relative flex flex-col">
                                    <span className="absolute top-0 bottom-0 left-7 w-0.5 rounded-sm bg-gradient-to-b from-accent to-accent/10" />
                                    {(report.preparationPlan || []).map((day) => (
                                        <RoadMapDay key={day.day} day={day} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    <aside className="flex shrink-0 flex-col gap-5 border-t border-line px-5 py-6 lg:w-[240px] lg:border-t-0 lg:border-l lg:py-7">

                        <div className="flex flex-col items-center gap-[0.6rem]">
                            <p className="m-0 self-start text-xs font-semibold tracking-widest text-muted uppercase">Match Score</p>
                            <div className={`relative flex h-[96px] w-[96px] flex-col items-center justify-center rounded-full border-4 ${scoreColor}`}>
                                <span className="text-[1.7rem] leading-none font-extrabold text-primary">{report.matchScore}</span>
                                <span className="-mt-0.5 text-xs text-muted">%</span>
                            </div>
                            <p className="m-0 text-center text-xs text-muted">{scoreLabel}</p>
                        </div>

                        <div className="h-px bg-line" />

                        <div className="flex flex-col gap-3">
                            <p className="m-0 text-xs font-semibold tracking-widest text-muted uppercase">Skill Gaps</p>
                            <div className="flex flex-wrap gap-2">
                                {(report.skillGaps || []).length === 0 && (
                                    <p className="m-0 text-sm text-muted">No major gaps flagged.</p>
                                )}
                                {(report.skillGaps || []).map((gap, i) => (
                                    <span key={i} className={`cursor-default rounded-full border px-[0.7rem] py-[0.3rem] text-[0.775rem] font-medium ${skillTagClass[gap.severity] || skillTagClass.medium}`}>
                                        {gap.skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Interview
