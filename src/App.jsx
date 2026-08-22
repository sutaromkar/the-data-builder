import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronDown, ChevronRight, Check, ArrowRight, Play,
  Database, Cloud, GitBranch, Layers, Zap,
  Code2, Terminal, BarChart3, Workflow, Star, Phone, MessageCircle,
  MapPin, Mail, User, Briefcase, GraduationCap, TrendingUp, Target,
  BookOpen, Award, Users
} from "lucide-react";

/* ----------------------------- shared bits ----------------------------- */

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Inter', sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  html { scroll-behavior: smooth; }
  @keyframes flow { to { stroke-dashoffset: -200; } }
  @keyframes floatY { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
  @keyframes pulseGlow { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
  @keyframes reveal { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  .reveal { animation: reveal .7s ease forwards; }
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; }
  }
`;

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? undefined : 0,
        animation: shown ? `reveal .7s ease ${delay}ms forwards` : "none",
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, tone = "orange" }) {
  const tones = {
    orange: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    indigo: "text-indigo-300 border-indigo-400/30 bg-indigo-400/10",
  };
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full border ${tones[tone]}`}>
      {children}
    </span>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.07] hover:border-orange-400/30 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

function GradientBorder({ children, className = "" }) {
  return (
    <div className={`relative rounded-2xl p-[1px] bg-gradient-to-br from-orange-400/60 via-white/10 to-indigo-500/60 ${className}`}>
      <div className="rounded-2xl bg-zinc-950 h-full w-full">{children}</div>
    </div>
  );
}

/* ------------------------------- data ------------------------------- */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Course", href: "#course" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Career Support", href: "#career-support" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const WHY_CARDS = [
  { icon: Terminal, title: "100% Hands-On Learning", body: "Work on practical data engineering tasks and real-world pipeline development." },
  { icon: Target, title: "Industry-Focused Curriculum", body: "Learn the technologies and concepts used in modern Data Engineering roles." },
  { icon: Workflow, title: "End-to-End AWS Pipeline", body: "Build complete ETL pipelines using Python, SQL, PySpark and AWS services." },
  { icon: MessageCircle, title: "1:1 Doubt Support", body: "Personalized support to help you push through every technical roadblock." },
  { icon: BookOpen, title: "Interview Preparation", body: "Prepare for SQL, Python and technical Data Engineer interview rounds." },
  { icon: Briefcase, title: "Placement Guidance", body: "Career support continues beyond the curriculum — resume, interview, placement." },
];

const MODULES = [
  {
    n: "01", key: "python", title: "Python", sub: "Basic → Advanced", icon: Code2,
    topics: ["Fundamentals & data types", "Operators, conditionals, loops", "Lists, tuples, sets, dicts", "String handling & functions",
      "File ops, CSV & JSON", "Exception handling & logging", "Pandas",
      "OOP", "Generators, decorators, iterators", "List comprehensions", "Performance optimization"],
  },
  {
    n: "02", key: "sql", title: "SQL", sub: "Basic → Advanced", icon: Database,
    topics: ["DBMS/RDBMS, keys & constraints", "DDL · DML · DQL · TCL · DCL", "Joins & subqueries", "CTEs & recursive CTEs",
      "Window functions", "GROUP BY / HAVING, set ops", "Views & materialized views", "Indexes & query optimization",
      "CASE WHEN, pivot/unpivot", "MERGE / UPSERT", "Stored procedures & triggers", "Cursors & error handling"],
  },
  {
    n: "03", key: "spark", title: "Spark & PySpark", sub: "Big Data Processing", icon: Zap,
    topics: ["Spark architecture, driver & executors", "Cluster manager, DAG, lazy evaluation", "SparkSession & SparkContext", "RDDs — transformations & actions",
      "Persistence, caching, partitions", "DataFrames, schema & Spark SQL", "Broadcast vs. shuffle joins", "Join & performance tuning, skew handling",
      "Window functions in Spark", "Structured Streaming", "spark-submit & cluster deployment", "S3 / Glue / EMR integration"],
  },
  {
    n: "04", key: "aws", title: "AWS Cloud Data Stack", sub: "S3 · Glue · Redshift · Lambda", icon: Cloud,
    topics: ["S3 buckets, storage classes, lifecycle", "IAM users, roles, policies", "Lambda functions & event triggers", "Glue Data Catalog & crawlers",
      "Glue ETL jobs & Glue Studio", "Job bookmarks, workflows, triggers", "Redshift architecture & COPY command", "Distribution & sort keys",
      "Redshift Spectrum", "EC2 instance types & security groups", "EventBridge & API Gateway", "Query performance tuning"],
  },
  {
    n: "05", key: "bigdata", title: "Big Data Foundations", sub: "Core Concepts", icon: Layers,
    topics: ["Volume, velocity, variety", "Distributed computing", "Data lake vs. data warehouse", "Batch vs. streaming processing",
      "Hadoop ecosystem", "ETL architecture"],
  },
  {
    n: "06", key: "capstone", title: "Capstone ETL Pipeline", sub: "Production-Style Project", icon: GitBranch,
    topics: ["Source data via Python & APIs", "S3 raw layer ingestion", "PySpark / Glue transformation", "Data validation",
      "S3 curated layer", "Load into Redshift", "Lambda & Step Functions orchestration", "Analytics-ready output"],
  },
];

const JOURNEY = ["Learn Python", "Master SQL", "Learn Big Data", "Master PySpark", "Learn AWS Data Services", "Build End-to-End ETL", "Prepare for Interviews", "Get Job Ready"];

const CAREER = [
  { icon: Award, title: "Resume Building", points: ["ATS-friendly templates", "Project & skills showcase", "1:1 resume review"] },
  { icon: Users, title: "LinkedIn Optimization", points: ["Professional Data Engineer profile", "Recruiter-ready positioning"] },
  { icon: MessageCircle, title: "Interview Preparation", points: ["Mock technical interviews", "HR & behavioral coaching", "SQL & Python coding practice"] },
  { icon: Briefcase, title: "Placement Support", points: ["Job referrals", "Hiring drives", "Guidance until placement"] },
  { icon: TrendingUp, title: "Career Mentorship", points: ["Support beyond your first role", "Long-term growth guidance"] },
];

const BENEFITS = [
  { big: "4 Months", small: "Course Duration" },
  { big: "6", small: "Core Modules" },
  { big: "100%", small: "Hands-On Projects" },
  { big: "1:1", small: "Doubt Support" },
];

const WHO_FOR = [
  { icon: GraduationCap, title: "Freshers", body: "Build strong fundamentals and become job-ready from day one." },
  { icon: Briefcase, title: "Working Professionals", body: "Upgrade existing skills and move toward Data Engineering." },
  { icon: Code2, title: "Software Developers", body: "Transition into Data Engineering using Python, SQL, Spark and AWS." },
  { icon: BarChart3, title: "Data Analysts", body: "Move from analytics toward Data Engineering and cloud technologies." },
  { icon: BookOpen, title: "Students", body: "Build practical projects and industry-relevant skills early." },
];

const TESTIMONIALS = [
  { name: "Sagar Ghadge", role: "Before: Support Analyst → After: Data Engineer", quote: "Placeholder testimonial — swap in a real student quote and photo here.", rating: 4 },
  { name: "Omkar Sutar", role: "Before: Fresh Graduate → After: Junior Data Engineer", quote: "Placeholder testimonial — swap in a real student quote and photo here.", rating: 4 },
  { name: "Sangram D.", role: "Before: Manual QA → After: Cloud Data Engineer", quote: "Placeholder testimonial — swap in a real student quote and photo here.", rating: 4.5 },
];

const FAQS = [
  ["What is the duration of the AWS Data Engineer course?", "The program runs for 4 months across 6 core modules, combining live instruction with hands-on project work."],
  ["Is this course suitable for freshers?", "Yes. The curriculum starts from Python and SQL fundamentals before progressing to Spark and AWS."],
  ["Do I need prior AWS knowledge?", "No prior AWS experience is required — the AWS Cloud Data Stack module is built for beginners in cloud."],
  ["Will I learn Python from basics?", "Yes, Module 01 takes you from Python fundamentals to advanced topics like OOP, decorators and generators."],
  ["Will SQL be covered from basic to advanced?", "Yes, including joins, window functions, CTEs, indexing and query optimization."],
  ["Will I learn PySpark?", "Yes, a full module is dedicated to Spark architecture and PySpark for big data processing."],
  ["Will I build real-world projects?", "Yes, including a production-style end-to-end ETL pipeline as your capstone project."],
  ["Is there 1:1 doubt support?", "Yes, every student gets personalized 1:1 doubt-clearing support throughout the program."],
  ["Is interview preparation included?", "Yes, including SQL and Python coding practice and mock technical interviews."],
  ["Do you provide placement assistance?", "Yes — resume building, LinkedIn optimization, referrals and continuous placement guidance."],
  ["What AWS services are covered?", "S3, Lambda, IAM, Glue, Redshift and EC2, with Step Functions for orchestration."],
  ["Will I build an end-to-end ETL pipeline?", "Yes, the capstone project combines Python, SQL, PySpark, S3, Glue, Redshift and Lambda into one pipeline."],
];

/* ----------------------------- pipeline svg ----------------------------- */

function PipelineFlow() {
  const stages = ["Python", "SQL", "PySpark", "AWS", "Warehouse"];
  return (
    <div className="w-full">
      <svg viewBox="0 0 760 140" className="w-full h-auto">
        <defs>
          <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        <line x1="70" y1="70" x2="690" y2="70" stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="6 8" opacity="0.5" />
        <line x1="70" y1="70" x2="690" y2="70" stroke="#fb923c" strokeWidth="2" strokeDasharray="4 220" style={{ animation: "flow 3.5s linear infinite" }} />
        {stages.map((s, i) => {
          const x = 70 + i * (620 / (stages.length - 1));
          return (
            <g key={s} style={{ animation: `floatY ${3 + i * 0.3}s ease-in-out infinite` }}>
              <circle cx={x} cy="70" r="30" fill="#0f172a" stroke={i === stages.length - 1 ? "#818cf8" : "#fb923c"} strokeWidth="1.5" />
              <circle cx={x} cy="70" r="30" fill="url(#flowGrad)" opacity="0.08" />
              <text x={x} y="118" textAnchor="middle" fill="#cbd5e1" fontSize="13" fontFamily="Inter, sans-serif">{s}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------- sections ------------------------------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-zinc-950/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-display font-bold text-lg text-white">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-slate-950 text-sm">TDB</span>
          THE DATA BUILDER
        </a>
        <nav className="hidden lg:flex items-center gap-7 font-body text-sm text-slate-300">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-orange-400 transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a href="#enroll" className="font-body text-sm font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 hover:brightness-110 transition">Enroll Now</a>
        </div>
        <button className="lg:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-zinc-950 border-t border-white/10 px-6 py-4 flex flex-col gap-4 font-body text-slate-300">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="hover:text-orange-400">{l.label}</a>
          ))}
          <a href="#enroll" onClick={() => setOpen(false)} className="text-center font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950">Enroll Now</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-zinc-950 pt-16 pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.16),_transparent_60%)]" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16">

        <Reveal>
          <Eyebrow>
            Python · SQL · Spark / PySpark · AWS
          </Eyebrow>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mt-6 max-w-3xl leading-tight">
            Become a{" "}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              Job-Ready
            </span>{" "}
            AWS Data Engineer
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="font-body text-slate-300 text-lg mt-6 max-w-2xl">
            A complete, job-focused program that takes you from programming
            fundamentals to building production-grade data pipelines on AWS.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#enroll"
              className="font-body font-semibold px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 hover:brightness-110 transition flex items-center gap-2"
            >
              Enroll Now <ArrowRight size={18} />
            </a>

            <a
              href="#curriculum"
              className="font-body font-semibold px-7 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/5 transition flex items-center gap-2"
            >
              View Curriculum <ChevronDown size={18} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 max-w-2xl">
            {[
              "4 Months Duration",
              "6 Core Modules",
              "100% Hands-On",
              "1:1 Doubt Support",
            ].map((s) => (
              <div
                key={s}
                className="font-body text-sm text-slate-300 border-l-2 border-orange-400/50 pl-3"
              >
                {s}
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "4", label: "Months, Cohort-Based" },
    { value: "1:1", label: "Mentorship from Data Engineers" },
    { value: "100%", label: "Hands-On, Project-Led" },
    { value: "6", label: "Core Modules, Job-Focused" },
  ];
  return (
    <section className="bg-zinc-900 border-y border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="text-center sm:text-left">
            <p className="font-display font-bold text-3xl sm:text-4xl bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">{s.value}</p>
            <p className="font-body text-xs sm:text-sm text-slate-400 mt-1">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <Eyebrow tone="indigo">Why Data Builder</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-4 max-w-2xl">Everything You Need to Become a Data Engineer</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {WHY_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-slate-200 p-7 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center text-orange-500 mb-4">
                  <c.icon size={22} />
                </div>
                <h3 className="font-display font-semibold text-slate-900 text-lg">{c.title}</h3>
                <p className="font-body text-slate-500 text-sm mt-2 leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseOverview() {
  const rows = [
    ["Duration", "4 Months"], ["Modules", "6 Core Modules"], ["Learning Mode", "Hands-On"],
    ["Support", "1:1 Doubt Support"], ["Projects", "End-to-End ETL Projects"],
  ];
  return (
    <section id="course" className="bg-zinc-950 py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <Eyebrow>Course Overview</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-4">AWS Data Engineer</h2>
          <p className="font-body text-slate-300 mt-5 leading-relaxed">
            Learn the complete Data Engineering journey — from Python and SQL fundamentals to Big Data, Spark/PySpark and AWS cloud data services.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <GradientBorder>
            <dl className="divide-y divide-white/10 p-2">
              {rows.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-6 py-4">
                  <dt className="font-body text-sm text-slate-400">{k}</dt>
                  <dd className="font-display font-semibold text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </GradientBorder>
        </Reveal>
      </div>
    </section>
  );
}

function ModuleCard({ m, open, onToggle }) {
  return (
    <GlassCard className="overflow-hidden">
      <button onClick={onToggle} className="w-full text-left p-6 flex items-start gap-4">
        <span className="font-mono text-orange-400/70 text-sm mt-1">{m.n}</span>
        <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-orange-500/20 to-indigo-500/20 flex items-center justify-center text-orange-300">
          <m.icon size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-white text-lg">{m.title}</h3>
          <p className="font-body text-slate-400 text-sm">{m.sub}</p>
        </div>
        <ChevronDown size={20} className={`text-slate-400 transition-transform mt-2 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 reveal">
          {m.highlight && (
            <div className="mb-4 rounded-xl border border-orange-400/30 bg-orange-400/10 px-4 py-3 font-body text-sm text-orange-200">{m.highlight}</div>
          )}
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {m.topics.map((t) => (
              <li key={t} className="font-body text-sm text-slate-300 flex items-start gap-2">
                <Check size={14} className="text-orange-400 mt-1 shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </GlassCard>
  );
}

function Curriculum() {
  const [openKey, setOpenKey] = useState("python");
  return (
    <section id="curriculum" className="bg-zinc-950 py-24 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <Eyebrow>Curriculum</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-4">Six Modules, One Job-Ready Skill Set</h2>
          <p className="font-body text-slate-400 mt-3">Tap any module to view the full syllabus.</p>
        </Reveal>
        <div className="flex flex-col gap-4 mt-10">
          {MODULES.map((m, i) => (
            <Reveal key={m.key} delay={i * 60}>
              <ModuleCard m={m} open={openKey === m.key} onToggle={() => setOpenKey(openKey === m.key ? null : m.key)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningJourney() {
  return (
    <section className="bg-zinc-950 py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <Eyebrow>Learning Journey</Eyebrow>
          <h2 className="font-display font-bold text-3xl text-white mt-4">Eight Stages From Zero to Job-Ready</h2>
        </Reveal>
        <div className="mt-14 overflow-x-auto">
          <div className="flex gap-3 min-w-max pb-4">
            {JOURNEY.map((step, i) => (
              <Reveal key={step} delay={i * 70}>
                <div className="w-44 shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-orange-400 text-sm">{String(i + 1).padStart(2, "0")}</span>
                    {i < JOURNEY.length - 1 && <div className="h-px flex-1 bg-gradient-to-r from-orange-400/50 to-transparent" />}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 h-24 flex items-center">
                    <p className="font-display text-sm text-white">{step}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerSupport() {
  return (
    <section id="career-support" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <Eyebrow tone="indigo">Career Support</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-4">We Don't Stop at Training</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {CAREER.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-slate-200 p-7 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center text-orange-500 mb-4">
                  <c.icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-slate-900">{c.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {c.points.map((p) => (
                    <li key={p} className="font-body text-sm text-slate-500 flex items-start gap-2">
                      <Check size={13} className="text-orange-400 mt-1 shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="bg-zinc-950 py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
        {BENEFITS.map((b, i) => (
          <Reveal key={b.small} delay={i * 80}>
            <p className="font-display font-bold text-3xl bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">{b.big}</p>
            <p className="font-body text-sm text-slate-400 mt-2">{b.small}</p>
          </Reveal>
        ))}
        <Reveal delay={400}>
          <p className="font-display font-bold text-lg text-white leading-tight">Python + SQL<br />+ Spark + AWS</p>
          <p className="font-body text-sm text-slate-400 mt-2">Industry Technology Stack</p>
        </Reveal>
      </div>
    </section>
  );
}

function WhoIsThisFor() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <Eyebrow tone="indigo">Who Is This Course For</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-4">Built for Every Starting Point</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-12">
          {WHO_FOR.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-slate-200 p-6 text-center hover:border-orange-300 hover:shadow-lg transition-all">
                <div className="w-11 h-11 mx-auto rounded-xl bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center text-orange-500 mb-3">
                  <w.icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-slate-900">{w.title}</h3>
                <p className="font-body text-sm text-slate-500 mt-2">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <Eyebrow tone="indigo">Testimonials</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-4">What Students Say</h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="h-full rounded-2xl border border-slate-200 p-7 flex flex-col hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100 transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="font-body text-slate-600 text-sm italic leading-relaxed flex-1">"{t.quote}"</p>
                <p className="font-display font-semibold text-slate-900 mt-6">{t.name}</p>
                <p className="font-body text-xs text-slate-500">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-zinc-950 py-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-display font-bold text-3xl text-white mt-4">Frequently Asked Questions</h2>
        </Reveal>
        <div className="mt-10 flex flex-col gap-3">
          {FAQS.map(([q, a], i) => (
            <Reveal key={q} delay={i * 40}>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between text-left px-5 py-4">
                  <span className="font-body text-sm sm:text-base text-white pr-4">{q}</span>
                  <ChevronDown size={18} className={`text-orange-400 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="font-body text-sm text-slate-400 px-5 pb-4">{a}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const GOOGLE_FORM_VIEW_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdhr9EkDM1-JId3FZrowpGss7rHGdmAhYAQLGehCgtBsTL6dA/viewform?usp=header";

function EnrollmentForm() {
  return (
    <section id="enroll" className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="text-center">
          <Eyebrow tone="indigo">Admissions</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-4">Start Your Data Engineering Journey</h2>
          <p className="font-body text-slate-500 mt-3">Fill out the enrollment form and a counsellor will reach out to confirm your free session.</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={GOOGLE_FORM_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-semibold px-7 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 hover:brightness-110 transition"
            >
              Book a Free Counselling Session
            </a>
            <a href="tel:9119442191" className="font-body font-semibold px-7 py-3 rounded-full border border-slate-300 text-slate-700 hover:border-orange-400 transition flex items-center gap-2">
              <MessageCircle size={16} /> WhatsApp / Call Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative bg-zinc-950 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,146,60,0.15),_transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Ready to Become a Job-Ready AWS Data Engineer?</h2>
          <p className="font-mono text-sm text-orange-300 mt-5">Learn Python → Master SQL → Learn PySpark → Master AWS → Build Projects → Prepare for Interviews</p>
          <div className="flex flex-wrap justify-center gap-4 mt-9">
            <a href="#enroll" className="font-body font-semibold px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 hover:brightness-110 transition">Enroll Now</a>
            <a href="#enroll" className="font-body font-semibold px-7 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/5 transition">Talk to a Counsellor</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    ["Home", "Course", "Curriculum"],
    ["Career Support", "About", "Contact"],
    ["Privacy Policy", "Terms & Conditions"],
  ];
  return (
    <footer id="contact" className="bg-zinc-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display font-bold text-white text-lg">THE DATA BUILDER</p>
          <p className="font-body text-sm text-slate-400 mt-2">AWS Data Engineer Training</p>
          <p className="font-body text-sm text-slate-400 mt-4 flex items-center gap-2"><Phone size={14} /> +91 7709 348 242 / +91 9158 280 087</p>
        </div>
        {cols.map((col, i) => (
          <div key={i}>
            {col.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="block font-body text-sm text-slate-400 hover:text-orange-400 mb-3 transition">{l}</a>
            ))}
          </div>
        ))}
      </div>
      <p className="font-body text-xs text-slate-600 text-center mt-14">© {new Date().getFullYear()} Data Builder. All rights reserved.</p>
    </footer>
  );
}

/* -------------------------------- page -------------------------------- */

export default function DataBuilderSite() {
  return (
    <div className="font-body bg-zinc-950 min-h-screen">
      <style>{FONT_STYLE}</style>
      <Navbar />
      <Hero />
      <StatsBar />
      <WhyChooseUs />
      <CourseOverview />
      <Curriculum />
      <LearningJourney />
      <CareerSupport />
      <Benefits />
      <WhoIsThisFor />
      <Testimonials />
      <FAQ />
      <EnrollmentForm />
      <FinalCTA />
      <Footer />
    </div>
  );
}
