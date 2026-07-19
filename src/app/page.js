"use client";
import { useState, useEffect, useRef } from "react";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #080B12;
    --surf:     #0D1117;
    --card:     #111827;
    --card2:    #161f2e;
    --bdr:      #1c2a3a;
    --bdr2:     #253549;
    --blue:     #3B82F6;
    --blue-d:   rgba(59,130,246,0.12);
    --blue-g:   rgba(59,130,246,0.06);
    --emerald:  #10B981;
    --purple:   #8B5CF6;
    --amber:    #F59E0B;
    --rose:     #F43F5E;
    --text:     #F1F5F9;
    --text-s:   #8898B8;
    --text-m:   #3D5070;
    --mono:     'JetBrains Mono', monospace;
    --display:  'Syne', sans-serif;
    --body:     'Inter', sans-serif;
    --nav:      64px;
    --r:        10px;
  }

  html { scroll-behavior: smooth; font-size: 16px; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--body);
    line-height: 1.7;
    overflow-x: hidden;
  }

  ::selection { background: rgba(59,130,246,0.3); color: var(--text); }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--bdr2); border-radius: 3px; }

  /* ─ Animations ─────────────────── */
  @keyframes blink   { 50% { opacity: 0; } }
  @keyframes float   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
  @keyframes spin    { to { transform:rotate(360deg); } }
  @keyframes glow    { 0%,100%{opacity:.8;} 50%{opacity:.3;} }
  @keyframes slideIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* ─ Reusable ────────────────────── */
  .fade-up { opacity:0; transform:translateY(28px); transition:opacity .65s ease, transform .65s ease; }
  .fade-up.visible { opacity:1; transform:none; }

  .btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    background:var(--blue); color:#fff;
    padding:12px 26px; border-radius:8px;
    font-size:15px; font-weight:600;
    font-family:var(--body); border:none; cursor:pointer; text-decoration:none;
    transition:transform .15s, box-shadow .15s, opacity .15s;
  }
  .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(59,130,246,.35); opacity:.92; }

  .btn-ghost {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent; color:var(--text);
    padding:11px 24px; border-radius:8px;
    border:1px solid var(--bdr2);
    font-size:15px; font-weight:500;
    font-family:var(--body); cursor:pointer; text-decoration:none;
    transition:border-color .2s, background .2s, transform .15s;
  }
  .btn-ghost:hover { border-color:var(--blue); background:var(--blue-d); transform:translateY(-2px); }

  .btn-resume {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent; color:var(--emerald);
    padding:11px 24px; border-radius:8px;
    border:1px solid rgba(16,185,129,.35);
    font-size:15px; font-weight:500;
    font-family:var(--body); cursor:pointer; text-decoration:none;
    transition:border-color .2s, background .2s, transform .15s, box-shadow .2s;
  }
  .btn-resume:hover { border-color:var(--emerald); background:rgba(16,185,129,.1); transform:translateY(-2px); box-shadow:0 6px 20px rgba(16,185,129,.2); }

  /* ─ Project Cards ────────────────── */
  .project-card {
    background: var(--card);
    border: 1px solid var(--bdr);
    border-radius: 16px;
    padding: 26px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: border-color .3s cubic-bezier(.2,.8,.2,1),
                transform .3s cubic-bezier(.2,.8,.2,1),
                box-shadow .3s cubic-bezier(.2,.8,.2,1);
  }
  .project-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,.025) 0%, transparent 60%);
    pointer-events: none;
    opacity: 0;
    transition: opacity .3s;
  }
  .project-card:hover::before { opacity: 1; }
  .project-card .pc-expand {
    opacity: 0;
    transform: translateY(4px);
    transition: opacity .25s, transform .25s;
  }
  .project-card:hover .pc-expand {
    opacity: 1;
    transform: translateY(0);
  }

  /* ─ Project Modal ────────────────── */
  @keyframes backdropIn  { from{opacity:0} to{opacity:1} }
  @keyframes modalSlideIn { from{opacity:0;transform:scale(.94) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes shimmerSlide {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 900;
    background: rgba(6,8,15,.78);
    backdrop-filter: blur(14px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: backdropIn .25s ease;
  }
  .modal-panel {
    position: relative;
    background: linear-gradient(145deg, #111827, #0d1525);
    border-radius: 20px;
    width: 100%; max-width: 920px;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalSlideIn .3s cubic-bezier(.2,.8,.2,1);
    scrollbar-width: thin;
  }
  .modal-panel::-webkit-scrollbar { width: 4px; }
  .modal-panel::-webkit-scrollbar-track { background: transparent; }
  .modal-panel::-webkit-scrollbar-thumb { background: var(--bdr2); border-radius: 4px; }
  .modal-close {
    position: absolute; top: 20px; right: 20px; z-index: 10;
    width: 36px; height: 36px;
    background: rgba(255,255,255,.06); border: 1px solid var(--bdr2);
    border-radius: 50%; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: var(--text-s);
    transition: background .2s, color .2s, transform .2s;
  }
  .modal-close:hover { background: rgba(255,255,255,.12); color: var(--text); transform: scale(1.1) rotate(90deg); }
  .metric-chip {
    background: rgba(255,255,255,.04);
    border: 1px solid var(--bdr);
    border-radius: 10px;
    padding: 14px 16px;
    transition: border-color .2s, transform .2s;
  }
  .metric-chip:hover { transform: translateY(-2px); }

  /* ─ Skills ──────────────────────── */
  .skill-pill {
    background:rgba(255,255,255,.04); border:1px solid var(--bdr);
    color:var(--text-s); border-radius:6px;
    padding:5px 12px; font-size:12.5px;
    font-family:var(--mono);
    transition:background .2s, color .2s, border-color .2s, transform .15s;
    cursor:default;
  }
  .skill-pill:hover { background:var(--blue-d); color:var(--text); border-color:rgba(59,130,246,.3); transform:translateY(-1px); }

  @keyframes skillShimmer {
    0%   { background-position: -300% 0; }
    100% { background-position: 300% 0; }
  }
  @keyframes orbitDot {
    0%   { transform: rotate(0deg) translateX(22px) rotate(0deg); opacity:1; }
    50%  { opacity:.4; }
    100% { transform: rotate(360deg) translateX(22px) rotate(-360deg); opacity:1; }
  }
  @keyframes tagPop {
    0%   { transform: scale(.85); opacity:0; }
    100% { transform: scale(1);   opacity:1; }
  }

  .sk-card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    cursor: default;
    transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
  }
  .sk-card:hover { transform: translateY(-6px) scale(1.01); }

  .sk-card-inner {
    position: relative;
    border-radius: 16px;
    padding: 26px 24px 22px;
    background: var(--card);
    border: 1px solid var(--bdr);
    overflow: hidden;
    transition: border-color .35s;
    height: 100%;
  }
  .sk-card:hover .sk-card-inner { border-color: transparent; }

  .sk-card-border {
    position: absolute; inset: 0;
    border-radius: 16px;
    padding: 1px;
    opacity: 0;
    transition: opacity .35s;
    pointer-events: none;
    z-index: 2;
  }
  .sk-card:hover .sk-card-border { opacity: 1; }

  .sk-card-shine {
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,.04) 50%, transparent 70%);
    background-size: 300% 100%;
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s;
  }
  .sk-card:hover .sk-card-shine {
    opacity: 1;
    animation: skillShimmer 1.6s ease infinite;
  }

  .sk-blob {
    position: absolute;
    width: 140px; height: 140px;
    border-radius: 50%;
    filter: blur(48px);
    opacity: 0;
    top: -40px; right: -30px;
    transition: opacity .4s;
    pointer-events: none;
  }
  .sk-card:hover .sk-blob { opacity: .18; }

  .sk-icon-wrap {
    width: 46px; height: 46px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    margin-bottom: 16px;
    position: relative;
    transition: transform .3s cubic-bezier(.22,1,.36,1);
  }
  .sk-card:hover .sk-icon-wrap { transform: scale(1.12) rotate(-4deg); }

  .sk-orbit {
    position: absolute; inset: -4px;
    border-radius: 50%;
  }
  .sk-orbit::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    width: 6px; height: 6px;
    border-radius: 50%;
    margin: -3px 0 0 -3px;
    animation: orbitDot 2.8s linear infinite;
    opacity: 0;
    transition: opacity .3s;
  }
  .sk-card:hover .sk-orbit::after { opacity: 1; }

  .sk-tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11.5px; font-family: var(--mono);
    padding: 4px 10px; border-radius: 5px;
    border: 1px solid var(--bdr);
    color: var(--text-s);
    background: rgba(255,255,255,.03);
    transition: background .2s, color .2s, border-color .2s, transform .2s;
    white-space: nowrap;
    animation: tagPop .3s ease both;
  }
  .sk-tag:hover { transform: translateY(-2px) scale(1.04); }

  .sk-count {
    position: absolute; top: 22px; right: 22px;
    font-family: var(--mono); font-size: 11px;
    color: var(--text-m);
    opacity: 0;
    transition: opacity .3s;
  }
  .sk-card:hover .sk-count { opacity: 1; }

  .sk-divider {
    height: 1px;
    margin: 14px 0 16px;
    transition: background .35s;
  }

  .hack-card {
    background:var(--card); border:1px solid var(--bdr);
    border-radius:12px; padding:24px 26px;
    position:relative; overflow:hidden;
    transition:transform .22s, box-shadow .22s, border-color .22s;
  }
  .hack-card:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,.35); }
  .hack-card::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(255,255,255,.015) 0%,transparent 60%);
    pointer-events:none;
  }

  .tag {
    display:inline-flex; align-items:center;
    font-size:11px; font-family:var(--mono); font-weight:500;
    padding:3px 9px; border-radius:4px;
  }

  .nav-btn {
    background:none; border:none; cursor:pointer;
    font-family:var(--body); font-size:14px; font-weight:500;
    color:var(--text-s); padding:6px 2px;
    transition:color .2s;
  }
  .nav-btn:hover { color:var(--text); }

  .contact-link {
    display:inline-flex; align-items:center; gap:9px;
    background:var(--card); border:1px solid var(--bdr);
    color:var(--text-s); padding:13px 22px; border-radius:10px;
    font-size:14px; font-weight:500; text-decoration:none;
    font-family:var(--body);
    transition:border-color .2s, color .2s, transform .2s, box-shadow .2s;
  }
  .contact-link:hover { border-color:var(--blue); color:var(--text); transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,.3); }

  .achieve-card {
    background: linear-gradient(135deg, var(--card), rgba(255,255,255,0.02));
    border: 1px solid var(--bdr);
    border-radius: 18px;
    padding: 24px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
    transition: all .35s ease;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .achieve-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(59,130,246,0.45);
    box-shadow: 0 20px 40px rgba(59,130,246,0.15);
  }

  @media(max-width:768px) {
    .hero-cols { flex-direction:column !important; gap:48px !important; }
    .about-grid { grid-template-columns:1fr !important; }
    .nav-desktop { display:none !important; }
    .nav-mob-btn { display:flex !important; }
    .contact-row { flex-direction:column !important; align-items:stretch !important; }
    .contact-link { justify-content:center; }
  }
  @media(min-width:769px) {
    .nav-mob-btn { display:none !important; }
    .mob-menu   { display:none !important; }
  }

  @media(prefers-reduced-motion:reduce) {
    *,*::before,*::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    cat: "Languages",
    icon: "⌨️",
    color: "#3B82F6",
    tags: ["Python", "C++", "JavaScript", "TypeScript", "Java"],
  },
  {
    cat: "AI / ML",
    icon: "🤖",
    color: "#8B5CF6",
    tags: ["TensorFlow", "PyTorch", "Scikit-learn", "LangChain", "XGBoost", "RAG", "Multi-Agent", "LLM Integration"],
  },
  {
    cat: "Web & Backend",
    icon: "⚙️",
    color: "#10B981",
    tags: ["FastAPI", "Node.js", "REST APIs", "JWT Auth", "Microservices", "WebSockets", "Postman"],
  },
  {
    cat: "Frontend",
    icon: "🖥️",
    color: "#F59E0B",
    tags: ["React.js", "Next.js", "Tailwind CSS", "Socket.IO", "Streamlit"],
  },
  {
    cat: "Databases",
    icon: "🗄️",
    color: "#06B6D4",
    tags: ["PostgreSQL", "MongoDB", "Redis", "PostGIS", "SQL"],
  },
  {
    cat: "DevOps & Cloud",
    icon: "☁️",
    color: "#F43F5E",
    tags: ["Docker", "Kubernetes", "AWS EC2", "AWS S3", "CI/CD", "GitHub Actions"],
  },
  {
    cat: "Blockchain",
    icon: "⛓️",
    color: "#F59E0B",
    tags: ["BNB Smart Chain", "NFT Minting", "Solidity basics"],
  },
  {
    cat: "Tools & Libs",
    icon: "🔧",
    color: "#10B981",
    tags: ["NumPy", "Pandas", "Git", "Linux", "MCP Protocol", "YOLOv8", "Mapbox"],
  },
];

const PROJECTS = [
  {
    emoji: "🚆",
    bg: "rgba(59,130,246,0.12)",
    accent: "#3B82F6",
    badge: "Java · Full Stack",
    name: "RailConnect – Smart Railway Reservation",
    desc: "Full-stack railway reservation platform automating the complete ticket booking lifecycle with an intelligent seat allocation engine, concurrent booking safety, and unique PNR generation.",
    stack: ["Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "React.js", "Tailwind CSS", "Swagger"],
    featured: true,
    details: {
      type: "Individual", status: "Complete",
      github: null,
      problem: "Traditional railway booking systems suffer from seat conflicts under concurrent load, manual coach management, and insecure authentication — making them fragile at enterprise scale.",
      contributions: [
        "Designed an intelligent seat allocation engine that auto-generates coaches and prevents race-condition double-bookings",
        "Implemented PNR generation system with unique, collision-free ticket identifiers",
        "Built role-based access control (RBAC) using Spring Security + JWT for admin and passenger portals",
        "Developed full booking lifecycle: search → reserve → cancel → refund with atomic DB transactions",
        "Exposed RESTful APIs documented via Swagger UI for admin and client consumers",
      ],
      metrics: [
        { label: "Booking Lifecycle", value: "Fully Automated" },
        { label: "Auth", value: "JWT + Spring Security" },
        { label: "Concurrency", value: "Race-condition safe" },
        { label: "Project Type", value: "Individual" },
      ],
      stackDetails: [
        "Java 21 + Spring Boot 3 for core backend services",
        "Spring Security with stateless JWT authentication",
        "PostgreSQL with optimistic locking for seat reservation",
        "React.js + Tailwind CSS + ShadCN/UI frontend",
        "Swagger / OpenAPI 3 documentation",
      ],
    },
  },
  {
    emoji: "💳",
    bg: "rgba(244,63,94,0.12)",
    accent: "#F43F5E",
    badge: "AI/ML · FinTech",
    name: "Real-Time Fraud Detection System",
    desc: "AI-powered platform detecting fraudulent transactions via dynamic risk scoring — analyzing behavior, device fingerprints, and geolocation with XGBoost + Random Forest inference.",
    stack: ["Python", "FastAPI", "Docker", "PostgreSQL", "XGBoost", "Random Forest", "Redis", "Kafka"],
    featured: true,
    details: {
      type: "Individual", status: "Complete",
      github: null,
      problem: "Rule-based fraud detectors miss novel attack patterns and flag too many false positives, causing genuine customers to be blocked while sophisticated fraud slips through.",
      contributions: [
        "Built dynamic risk scoring engine combining XGBoost + Random Forest ensemble models",
        "Engineered behavioral analytics features: transaction velocity, geo-deviation, device fingerprinting",
        "Developed low-latency FastAPI inference layer with sub-50ms response times",
        "Containerized full stack with Docker Compose for reproducible deployment",
        "Designed roadmap integrating Redis for feature caching and Kafka for real-time event streaming",
      ],
      metrics: [
        { label: "Inference Latency", value: "< 50ms" },
        { label: "Model", value: "XGBoost + RF Ensemble" },
        { label: "Signals", value: "Behavior + Geo + Device" },
        { label: "Deployment", value: "Dockerized Microservice" },
      ],
      stackDetails: [
        "XGBoost + Random Forest ensemble for risk scoring",
        "FastAPI for low-latency REST inference endpoints",
        "PostgreSQL for transaction history and audit logs",
        "Docker Compose for portable service orchestration",
        "Redis (roadmap) for sub-ms feature cache; Kafka for event ingestion at scale",
      ],
    },
  },
  {
    emoji: "🚌",
    bg: "rgba(16,185,129,0.12)",
    accent: "#10B981",
    badge: "GenAI · RAG",
    name: "VoltTransit – AI Emergency RAG Engine",
    desc: "Safety-critical AI assistant generating verified emergency response checklists for EV transit operators using Retrieval-Augmented Generation with hallucination prevention.",
    stack: ["FastAPI", "LangChain", "ChromaDB", "Sentence Transformers", "Python", "Docker"],
    featured: true,
    details: {
      type: "Individual", status: "Ongoing",
      github: null,
      problem: "LLMs hallucinate safety-critical procedures, making them dangerous for emergency response in public transit. Operators need verifiable, source-traced checklists — not LLM guesses.",
      contributions: [
        "Implemented section-aware semantic chunking of EV safety manuals for precise retrieval",
        "Built vector search pipeline with ChromaDB + Sentence Transformers and similarity thresholding",
        "Engineered hallucination prevention: responses trace back to source document passages",
        "Added Retrieval@K evaluation framework to measure retrieval quality",
        "Designed human-escalation mechanism for edge cases below confidence threshold",
      ],
      metrics: [
        { label: "Architecture", value: "RAG Pipeline" },
        { label: "Hallucination Guard", value: "Source Tracing" },
        { label: "Escalation", value: "Human-in-the-loop" },
        { label: "Status", value: "Ongoing" },
      ],
      stackDetails: [
        "LangChain orchestration with custom RAG chain",
        "ChromaDB vector store for EV manual embeddings",
        "Sentence Transformers for semantic similarity scoring",
        "FastAPI backend with Docker containerization",
        "Retrieval@K eval + similarity threshold gating",
      ],
    },
  },
  {
    emoji: "🎟️",
    bg: "rgba(245,158,11,0.1)",
    accent: "#F59E0B",
    badge: "Distributed Systems · Backend",
    name: "Distributed Event-Driven Ticketing Engine",
    desc: "High-performance flash-sale pipeline with strict consistency — decouples inventory reservation from async payment settlement using Kafka, Redis, and the Transactional Outbox Pattern.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Apache Kafka", "Debezium", "Docker", "Prometheus", "Grafana"],
    details: {
      type: "Individual", status: "Complete",
      github: null,
      problem: "Flash sales cause thundering-herd gridlock: connection pool exhaustion, race-condition double-bookings, and distributed transaction bottlenecks that lead to overselling under load.",
      contributions: [
        "Designed Redis Lua scripting for atomic inventory allocation, eliminating race conditions",
        "Implemented Transactional Outbox Pattern via Debezium CDC for guaranteed at-least-once event delivery",
        "Separated high-speed inventory reservation from async payment settlement with Kafka topics",
        "Built Distributed Saga compensation logic for payment failure rollback",
        "Configured Prometheus + Grafana observability stack with custom flash-sale dashboards",
      ],
      metrics: [
        { label: "Target Throughput", value: "10,000+ RPS" },
        { label: "Overselling Rate", value: "0.00%" },
        { label: "Event Delivery", value: "At-least-once" },
        { label: "Observability", value: "Prometheus + Grafana" },
      ],
      stackDetails: [
        "Kafka Connect + Debezium for WAL-tailing CDC",
        "Redis with atomic Lua scripts for inventory reservation",
        "PostgreSQL with Transactional Outbox for event sourcing",
        "Spring Boot Saga orchestration for payment compensation",
        "Prometheus metrics + Grafana dashboards for SLA monitoring",
      ],
    },
  },
  {
    emoji: "🏥",
    bg: "rgba(139,92,246,0.1)",
    accent: "#8B5CF6",
    badge: "GenAI · Healthcare",
    name: "AI Multi-Agent Healthcare Platform",
    desc: "Multi-agent LangChain system assisting clinicians in diabetes risk assessment — orchestrating specialist agents for report analysis, risk prediction, and emergency alerting.",
    stack: ["LangChain", "FastAPI", "PostgreSQL", "MongoDB", "Python"],
    details: {
      type: "Team", status: "Complete",
      github: null,
      problem: "Clinicians waste hours manually reviewing patient reports and lack an automated system to flag high-risk diabetes cases for immediate escalation.",
      contributions: [
        "Developed the Report Analyzer agent for extracting clinical insights from medical PDFs",
        "Built the Master Orchestrator agent coordinating specialist sub-agents in a pipeline",
        "Engineered the Alert Agent for real-time emergency escalation on high-risk predictions",
        "Implemented secure FastAPI backend with JWT authentication and HIPAA-aligned data handling",
        "Integrated PostgreSQL + MongoDB hybrid storage for structured vitals and unstructured report data",
      ],
      metrics: [
        { label: "Project Type", value: "Team Project" },
        { label: "Agent Architecture", value: "Multi-Agent (LangChain)" },
        { label: "Auth", value: "JWT Secured" },
        { label: "Storage", value: "PostgreSQL + MongoDB" },
      ],
      stackDetails: [
        "LangChain multi-agent orchestration with tool-use",
        "FastAPI with JWT auth for secure clinical API endpoints",
        "PostgreSQL for structured patient vitals and history",
        "MongoDB for unstructured medical report storage",
        "Python ML models for diabetes risk probability scoring",
      ],
    },
  },
  {
    emoji: "🧬",
    bg: "rgba(6,182,212,0.1)",
    accent: "#06B6D4",
    badge: "Bioinformatics · Web3",
    name: "VA-2 Genomic Data Analysis Platform",
    desc: "AI + blockchain platform combining Evo 2 genomic foundation model fine-tuning with BNB Smart Chain provenance for secure, ownership-tracked genomic research.",
    stack: ["FastAPI", "PostgreSQL", "Evo 2", "Python", "BNB Smart Chain"],
    details: {
      type: "Team", status: "Complete",
      github: null,
      problem: "Genomic research outputs lack verifiable ownership and chain-of-custody, making it impossible to attribute discoveries or prevent data theft in collaborative environments.",
      contributions: [
        "Fine-tuned the Evo 2 genomic foundation model for variant-specific sequence analysis",
        "Built genomic preprocessing pipelines: quality filtering, sequence normalization, variant calling",
        "Designed and implemented FastAPI backend endpoints for genomic data submission and retrieval",
        "Integrated BNB Smart Chain for blockchain-backed NFT minting of research outputs",
        "Designed PostgreSQL schema for multi-user genomic dataset management",
      ],
      metrics: [
        { label: "Foundation Model", value: "Evo 2 (Fine-tuned)" },
        { label: "Blockchain", value: "BNB Smart Chain" },
        { label: "Hackathon", value: "🏅 4th Place — International" },
        { label: "Type", value: "Team Project" },
      ],
      stackDetails: [
        "Evo 2 genomic foundation model with task-specific fine-tuning",
        "FastAPI for RESTful genomic data ingestion and analysis APIs",
        "BNB Smart Chain + NFT minting for research provenance",
        "PostgreSQL relational schema for multi-user dataset tracking",
        "Python bioinformatics pipeline: FASTQ processing + variant annotation",
      ],
    },
  },
  {
    emoji: "💧",
    bg: "rgba(59,130,246,0.08)",
    accent: "#3B82F6",
    badge: "Smart India Hackathon · Mobile",
    name: "Groundwater Resource Evaluation System",
    desc: "SIH mobile app enabling government agencies to monitor groundwater via DWLR station data — featuring GIS maps, real-time analytics, and alert interfaces for Android and iOS.",
    stack: ["React Native", "Expo", "TypeScript", "Expo Router"],
    details: {
      type: "Team", status: "Complete",
      github: null,
      problem: "Government groundwater agencies rely on manual DWLR readings with no centralized dashboard, making it impossible to detect water-level anomalies or trigger timely alerts.",
      contributions: [
        "Designed and built the entire React Native dashboard from scratch",
        "Implemented interactive GIS-based map for visualizing DWLR station coverage",
        "Built real-time water-level charts with trend analytics and anomaly highlighting",
        "Developed alert notification system for groundwater level threshold breaches",
        "Ensured cross-platform compatibility for both Android and iOS via Expo",
      ],
      metrics: [
        { label: "Platform", value: "Android + iOS" },
        { label: "Event", value: "Smart India Hackathon" },
        { label: "Frontend", value: "React Native + Expo" },
        { label: "Type", value: "Team Project" },
      ],
      stackDetails: [
        "React Native with Expo managed workflow",
        "TypeScript for type-safe component development",
        "Expo Router for file-based navigation",
        "GIS integration for DWLR station mapping",
        "Charting libraries for real-time water level visualization",
      ],
    },
  },
];

const HACKATHONS = [
  {
    name: "BNB Chain Hackathon",
    org: "BNB Chain — International",
    result: "🏅 4th Place — DSCI Track",
    type: "gold",
    desc: "Honored for the VA-2 Genomic Platform combining Evo 2 fine-tuning with blockchain-based NFT ownership. Competed globally.",
  },
  {
    name: "Cyber Hackathon",
    org: "Nagpur Police Commissionerate",
    result: "🥈 5th Place / 40 Teams",
    type: "silver",
    desc: "Top 5 among 40 finalist teams solving real-world cybersecurity challenges posed by the Nagpur Police.",
  },
  {
    name: "Smart India Hackathon (SIH)",
    org: "Ministry of Education, India",
    result: "🇮🇳 National Participant",
    type: "blue",
    desc: "India's largest hackathon — tackled problem statements issued by government ministries and PSUs.",
  },
  {
    name: "Enigma",
    org: "Collegiate Tech Hackathon",
    result: "💡 Participant",
    type: "purple",
    desc: "Built rapid prototypes for challenging tech problem statements under tight collegiate competition conditions.",
  },
  {
    name: "HACKHAZARD '25",
    org: "Innovation Build Challenge",
    result: "⚡ Participant",
    type: "emerald",
    desc: "Fast-paced full-stack build challenge — designed, built and pitched complete solutions in hours.",
  },
];

const ACHIEVEMENTS = [
  {
    icon: "🏛️",
    title: "ACM Chapter Secretary",
    desc: "Secretary of ACM Student Chapter at YCCE. Previously served as Webmaster, managing the chapter website and organizing technical events, workshops, and coding activities for 200+ members.",
  },
  {
    icon: "🥇",
    title: "BNB Hackathon — 4th Place",
    desc: "Received an Honorable Mention in the DSCI Track at the International BNB Chain Hackathon for developing a blockchain-powered genomic analysis platform.",
  },
  {
    icon: "🛡️",
    title: "Cyber Hackathon — Top 5",
    desc: "Secured a Top 5 position among 40 finalist teams in the Nagpur Police Commissionerate Cybersecurity Hackathon.",
  },
  {
    icon: "🍃",
    title: "MongoDB Python Developer Path",
    desc: "Successfully completed MongoDB University's Python Developer learning path covering CRUD operations, aggregation pipelines, indexing, schema design, and MongoDB-Python integration.",
  },
  {
    icon: "💻",
    title: "DSA in C++ Certification",
    desc: "Completed Data Structures & Algorithms training focused on sorting, searching, trees, graphs, dynamic programming, and advanced problem-solving techniques.",
  },
  {
    icon: "🌊",
    title: "Smart India Hackathon",
    desc: "Developed a Real-Time Groundwater Resource Evaluation platform using DWLR data to support groundwater monitoring, analytics, and sustainable water management.",
  },
  {
    icon: "🏐",
    title: "Volleyball & Travel",
    desc: "Active volleyball player and avid traveler. These experiences strengthen teamwork, adaptability, leadership, and discipline beyond engineering.",
  },
];

const RESULT_STYLE = {
  gold:    { bg:"rgba(245,158,11,.12)",   color:"#FCD34D", bdr:"rgba(245,158,11,.25)"   },
  silver:  { bg:"rgba(148,163,184,.1)",   color:"#94A3B8", bdr:"rgba(148,163,184,.2)"   },
  blue:    { bg:"rgba(59,130,246,.1)",    color:"#93C5FD", bdr:"rgba(59,130,246,.2)"    },
  purple:  { bg:"rgba(139,92,246,.1)",    color:"#C4B5FD", bdr:"rgba(139,92,246,.2)"    },
  emerald: { bg:"rgba(16,185,129,.1)",    color:"#6EE7B7", bdr:"rgba(16,185,129,.2)"    },
};

const TECH_MARQUEE = [
  "Python", "FastAPI", "React", "Next.js", "Node.js", "Docker",
  "PostgreSQL", "MongoDB", "LangChain", "TensorFlow", "AWS", "Kubernetes",
  "TypeScript", "XGBoost", "Redis", "JWT", "CI/CD", "YOLOv8",
  "Tailwind", "REST APIs", "Git", "Linux", "Postman", "Pandas",
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useFade() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function FadeBox({ children, delay = 0, style = {} }) {
  const { ref, vis } = useFade();
  return (
    <div
      ref={ref}
      className="fade-up"
      style={{
        ...(vis ? { opacity: 1, transform: "none" } : {}),
        transitionDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "2.5px",
      textTransform: "uppercase", color: "var(--blue)",
      marginBottom: 12, display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ width: 20, height: 1, background: "var(--blue)", display: "inline-block" }} />
      {children}
    </p>
  );
}

function Typewriter() {
  const phrases = [
    "Full-Stack Developer.",
    "AI / ML Engineer.",
    "Backend Architect.",
    "Open Source Contributor.",
    "Hackathon Competitor.",
    "Problem Solver.",
  ];
  const [txt, setTxt] = useState("");
  const [pi, setPi] = useState(0);
  const [del, setDel] = useState(false);
  const ci = useRef(0);

  useEffect(() => {
    const phrase = phrases[pi];
    const id = setTimeout(() => {
      if (!del) {
        ci.current++;
        setTxt(phrase.slice(0, ci.current));
        if (ci.current === phrase.length) setTimeout(() => setDel(true), 1800);
      } else {
        ci.current--;
        setTxt(phrase.slice(0, ci.current));
        if (ci.current === 0) { setDel(false); setPi((p) => (p + 1) % phrases.length); }
      }
    }, del ? 36 : 62);
    return () => clearTimeout(id);
  }, [txt, del, pi]);

  return (
    <p style={{
      fontFamily: "var(--mono)", fontSize: "clamp(14px,1.8vw,19px)",
      color: "var(--emerald)", marginBottom: 28, minHeight: 28,
    }}>
      {">"}&nbsp;{txt}
      <span style={{
        display: "inline-block", width: 2, height: "1em",
        background: "var(--emerald)", verticalAlign: "text-bottom",
        marginLeft: 2, animation: "blink 0.9s step-end infinite",
      }} />
    </p>
  );
}

function ProfileOrb() {
  return (
    <div style={{ position: "relative", width: 360, height: 360, flexShrink: 0 }}>
      <div style={{
        position: "absolute", inset: -16,
        borderRadius: "50%", border: "1px dashed rgba(59,130,246,.3)",
        animation: "spin 22s linear infinite",
      }} />
      <div style={{
        position: "absolute", inset: -8,
        borderRadius: "50%", border: "1px solid rgba(59,130,246,.12)",
      }} />
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, rgba(59,130,246,.25), rgba(16,185,129,.1) 60%, transparent 80%)",
        filter: "blur(20px)", animation: "glow 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "relative", width: "100%", height: "100%",
        borderRadius: "50%", border: "1.5px solid rgba(59,130,246,.45)",
        background: "linear-gradient(145deg, #1a2740 0%, #0d1525 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", animation: "float 7s ease-in-out infinite",
      }}>
        <img
          src="/hero.PNG"
          alt="Himanshu Chavan"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.innerHTML =
              `<span style="font-size:90px;user-select:none;">👨‍💻</span>`;
          }}
        />
      </div>
      <div style={{
        position: "absolute", bottom: 14, right: 14,
        width: 20, height: 20, borderRadius: "50%",
        background: "#4ade80", border: "3px solid #080B12",
        boxShadow: "0 0 8px #4ade80", animation: "glow 2.5s ease-in-out infinite",
      }} />
      {[
        { label: "React.js",  top: -14,  left: -50,  c: "#3B82F6", dur: 4.6 },
        { label: "FastAPI",   bottom: 20, left: -56,  c: "#10B981", dur: 5.2 },
        { label: "Docker",    top: 10,   right: -54, c: "#06B6D4",  dur: 4.4 },
        { label: "Langchain", bottom: 20, right: -60, c: "#fb5223", dur: 5.8 },
      ].map((ch) => (
        <div key={ch.label} style={{
          position: "absolute",
          top: ch.top, bottom: ch.bottom, left: ch.left, right: ch.right,
          background: "rgba(8,11,18,.9)", border: `1px solid ${ch.c}44`,
          borderRadius: 7, padding: "5px 11px",
          fontSize: 11, fontFamily: "var(--mono)", color: ch.c,
          whiteSpace: "nowrap", backdropFilter: "blur(8px)",
          animation: `float ${ch.dur}s ease-in-out infinite`,
        }}>
          {ch.label}
        </div>
      ))}
    </div>
  );
}

// ─── SKILL CARD ───────────────────────────────────────────────────────────────
function SkillCard({ s, large = false }) {
  const [hovered, setHovered] = useState(false);

  const gradMap = {
    "#3B82F6": "linear-gradient(135deg,#3B82F6,#6366F1)",
    "#8B5CF6": "linear-gradient(135deg,#8B5CF6,#EC4899)",
    "#10B981": "linear-gradient(135deg,#10B981,#06B6D4)",
    "#F59E0B": "linear-gradient(135deg,#F59E0B,#EF4444)",
    "#06B6D4": "linear-gradient(135deg,#06B6D4,#3B82F6)",
    "#F43F5E": "linear-gradient(135deg,#F43F5E,#F59E0B)",
  };
  const grad = gradMap[s.color] || `linear-gradient(135deg,${s.color},#3B82F6)`;

  return (
    <div
      className="sk-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? `0 20px 60px ${s.color}22, 0 4px 20px rgba(0,0,0,.4)` : "0 2px 12px rgba(0,0,0,.25)",
      }}
    >
      <div
        className="sk-card-border"
        style={{
          background: grad,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
          opacity: hovered ? 1 : 0,
          transition: "opacity .35s",
        }}
      />

      <div className="sk-card-inner">
        <div className="sk-blob" style={{ background: s.color }} />
        <div className="sk-card-shine" />

        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
          <div
            className="sk-icon-wrap"
            style={{
              background: hovered ? `${s.color}22` : "rgba(255,255,255,.05)",
              border: `1px solid ${hovered ? s.color + "44" : "var(--bdr)"}`,
              transition: "background .3s, border-color .3s",
            }}
          >
            <div className="sk-orbit">
              <style>{`.sk-orbit::after { background: ${s.color}; }`}</style>
            </div>
            <span style={{ position:"relative", zIndex:1 }}>{s.icon}</span>
          </div>

          <div style={{
            fontFamily:"var(--mono)", fontSize:11,
            background: hovered ? `${s.color}18` : "rgba(255,255,255,.03)",
            border: `1px solid ${hovered ? s.color + "33" : "var(--bdr)"}`,
            color: hovered ? s.color : "var(--text-m)",
            borderRadius:5, padding:"3px 9px",
            transition:"all .3s",
          }}>
            {s.tags.length} tools
          </div>
        </div>

        <div style={{
          fontFamily:"var(--display)", fontSize: large ? 18 : 15,
          fontWeight:800, letterSpacing:"-.4px",
          background: hovered ? grad : "none",
          WebkitBackgroundClip: hovered ? "text" : "unset",
          WebkitTextFillColor: hovered ? "transparent" : s.color,
          color: hovered ? "transparent" : s.color,
          transition:"color .3s",
          marginBottom: 4,
        }}>
          {s.cat}
        </div>

        <div
          className="sk-divider"
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${s.color}66, transparent)`
              : "var(--bdr)",
          }}
        />

        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {s.tags.map((t, ti) => (
            <span
              key={t}
              className="sk-tag"
              style={{
                animationDelay: `${ti * 0.04}s`,
                borderColor: hovered ? `${s.color}28` : "var(--bdr)",
                color: hovered ? "var(--text)" : "var(--text-s)",
                background: hovered ? `${s.color}0d` : "rgba(255,255,255,.03)",
              }}
            >
              <span style={{
                width: 4, height: 4, borderRadius:"50%", flexShrink:0,
                background: hovered ? s.color : "var(--text-m)",
                transition:"background .3s",
                display:"inline-block",
              }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────
function ProjectModal({ project: p, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const d = p.details;
  const accent = p.accent;

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-panel" style={{ border: `1px solid ${accent}30` }}>

        {/* ── Accent top bar ── */}
        <div style={{
          height: 3,
          background: `linear-gradient(90deg, ${accent}, ${accent}55, transparent)`,
          borderRadius: "20px 20px 0 0",
        }} />

        {/* ── Close btn ── */}
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* ── Header ── */}
        <div style={{ padding: "32px 36px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: p.bg, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 24, flexShrink: 0,
              border: `1px solid ${accent}30`,
            }}>{p.emoji}</div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: 11, padding: "3px 10px",
                  borderRadius: 4, background: `${accent}18`,
                  color: accent, border: `1px solid ${accent}30`,
                }}>{p.badge}</span>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: 11, padding: "3px 10px",
                  borderRadius: 4,
                  background: d.status === "Ongoing" ? "rgba(245,158,11,.12)" : "rgba(16,185,129,.1)",
                  color: d.status === "Ongoing" ? "#F59E0B" : "#10B981",
                  border: `1px solid ${d.status === "Ongoing" ? "rgba(245,158,11,.25)" : "rgba(16,185,129,.2)"}`,
                }}>{d.status === "Ongoing" ? "⟳ Ongoing" : "✓ Complete"}</span>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: 11, padding: "3px 10px",
                  borderRadius: 4, background: "rgba(255,255,255,.04)",
                  color: "var(--text-s)", border: "1px solid var(--bdr)",
                }}>{d.type} Project</span>
              </div>
              <h2 style={{
                fontFamily: "var(--display)", fontSize: "clamp(18px,2.5vw,24px)",
                fontWeight: 800, letterSpacing: "-.5px", color: "var(--text)",
              }}>{p.name}</h2>
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}33, var(--bdr), transparent)`, margin: "0 0 28px" }} />

          {/* ── Body: 60/40 split ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 28,
          }}>
            {/* LEFT — Problem + Contributions */}
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", gap: 28 }}>
              <div>
                {/* Problem */}
                <div style={{
                  background: `${accent}0a`, border: `1px solid ${accent}20`,
                  borderRadius: 12, padding: "18px 20px", marginBottom: 22,
                }}>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 11, color: accent,
                    letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ fontSize: 14 }}>🔍</span> The Problem
                  </div>
                  <p style={{ fontSize: 13.5, color: "var(--text-s)", lineHeight: 1.75 }}>{d.problem}</p>
                </div>

                {/* Contributions */}
                <div>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-s)",
                    letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ fontSize: 14 }}>🏗️</span> Core Contributions
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {d.contributions.map((c, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                          background: `${accent}18`, border: `1px solid ${accent}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10, color: accent, fontFamily: "var(--mono)", fontWeight: 700,
                          marginTop: 1,
                        }}>{i + 1}</div>
                        <p style={{ fontSize: 13.5, color: "var(--text-s)", lineHeight: 1.65, margin: 0 }}>{c}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT — Metrics + Stack Details */}
              <div>
                {/* Metrics */}
                <div style={{ marginBottom: 22 }}>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-s)",
                    letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ fontSize: 14 }}>⚡</span> Key Metrics
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {d.metrics.map((m) => (
                      <div key={m.label} className="metric-chip" style={{ borderColor: `${accent}20` }}>
                        <div style={{ fontSize: 11, color: "var(--text-m)", fontFamily: "var(--mono)", marginBottom: 4 }}>{m.label}</div>
                        <div style={{ fontSize: 13, color: accent, fontWeight: 600, fontFamily: "var(--mono)" }}>{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack Details */}
                <div>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-s)",
                    letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ fontSize: 14 }}>🛠️</span> Stack Details
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {d.stackDetails.map((s, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 10, alignItems: "flex-start",
                        fontSize: 12.5, color: "var(--text-s)", lineHeight: 1.6,
                      }}>
                        <span style={{ color: accent, flexShrink: 0, marginTop: 1 }}>▸</span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer: Tech chips + GitHub ── */}
          <div style={{
            marginTop: 28, paddingTop: 24,
            borderTop: "1px solid var(--bdr)",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.stack.map((t) => (
                <span key={t} style={{
                  fontSize: 11.5, fontFamily: "var(--mono)",
                  color: "var(--text-s)",
                  background: `${accent}0c`,
                  border: `1px solid ${accent}25`,
                  borderRadius: 5, padding: "4px 10px",
                }}>{t}</span>
              ))}
            </div>
            {d.github ? (
              <a
                href={d.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: `${accent}18`, border: `1px solid ${accent}40`,
                  color: accent, borderRadius: 8, padding: "9px 18px",
                  fontSize: 13, fontWeight: 600, fontFamily: "var(--body)",
                  textDecoration: "none",
                  transition: "background .2s, transform .2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}28`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${accent}18`; e.currentTarget.style.transform = ""; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            ) : (
              <span style={{
                fontSize: 12, fontFamily: "var(--mono)", color: "var(--text-m)",
                padding: "9px 14px", background: "rgba(255,255,255,.03)",
                border: "1px solid var(--bdr)", borderRadius: 8,
              }}>🔒 Private Repository</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeBand() {
  const full = [...TECH_MARQUEE, ...TECH_MARQUEE];

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,.08)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        padding: "22px 0",
        background:
          "linear-gradient(90deg, rgba(59,130,246,.08), rgba(255,255,255,.02), rgba(59,130,246,.08))",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 48,
          width: "max-content",
          animation: "marquee 25s linear infinite",
        }}
      >
        {full.map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--mono)",
              fontSize: 14,
              fontWeight: 700,
              color: "#F8FAFC",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 10,
              textShadow: "0 0 10px rgba(255,255,255,.15)",
            }}
          >
            <span
              style={{
                color: "#60A5FA",
                fontSize: 18,
                textShadow: "0 0 12px rgba(96,165,250,.7)",
              }}
            >
              ✦
            </span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const FILTER_TABS = ["all", "AI/ML", "Backend", "Java", "Blockchain", "Mobile"];
  const FILTER_MAP = {
    "AI/ML":      (p) => ["AI/ML · FinTech","GenAI · RAG","GenAI · Healthcare"].includes(p.badge) || p.stack.some(s=>["XGBoost","LangChain","ChromaDB","Random Forest"].includes(s)),
    "Backend":    (p) => ["Distributed Systems · Backend"].includes(p.badge) || p.stack.some(s=>["FastAPI","Spring Boot","Docker","Kafka","Redis"].includes(s)),
    "Java":       (p) => ["Java · Full Stack","Distributed Systems · Backend"].includes(p.badge) || p.stack.some(s=>["Java","Spring Boot","Spring Security"].includes(s)),
    "Blockchain": (p) => p.badge.includes("Web3") || p.stack.some(s=>["BNB Smart Chain","BNB Chain","NFT"].includes(s)),
    "Mobile":     (p) => p.badge.includes("Mobile") || p.stack.some(s=>["React Native","Expo","Expo Router"].includes(s)),
  };
  const filtered = activeTab === "all" ? PROJECTS : PROJECTS.filter(FILTER_MAP[activeTab]);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* ── NAV ───────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "var(--nav)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%",
        background: scrolled ? "rgba(8,11,18,.92)" : "rgba(8,11,18,.4)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid var(--bdr)",
        zIndex: 200, transition: "background .4s",
      }}>
        <button
          onClick={() => scrollTo("hero")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "var(--display)", fontSize: 20, fontWeight: 800,
            color: "var(--text)", letterSpacing: "-0.5px",
          }}
        >
          Himanshu<span style={{ color: "var(--blue)" }}>.</span>
        </button>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["about","skills","projects","hackathons","contact"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-btn" style={{ textTransform: "capitalize" }}>
              {id}
            </button>
          ))}
          {/* ── Certificates link ── */}
          <a
            href="/certificates"
            style={{
              fontFamily: "var(--body)", fontSize: 14, fontWeight: 500,
              color: "var(--text-s)", textDecoration: "none",
              padding: "6px 2px", transition: "color .2s",
              display: "inline-flex", alignItems: "center", gap: 5,
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-s)"}
          >
          Certificates
          </a>
          <a
            href="/Himanshu_Resume.pdf"
            download
            className="btn-resume"
            style={{ padding: "7px 18px", fontSize: 13 }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mob-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", fontSize: 22 }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mob-menu" style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 199,
          background: "rgba(8,11,18,.97)", backdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--bdr)", padding: "20px 5%",
          display: "flex", flexDirection: "column", gap: 18,
          animation: "slideIn .25s ease",
        }}>
          {["about","skills","projects","hackathons","contact"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-btn" style={{ textAlign: "left", fontSize: 16, textTransform: "capitalize" }}>
              {id}
            </button>
          ))}
          {/* ── Certificates link mobile ── */}
          <a
            href="/certificates"
            style={{
              fontFamily: "var(--body)", fontSize: 16, fontWeight: 500,
              color: "var(--text-s)", textDecoration: "none",
              textAlign: "left", display: "flex", alignItems: "center", gap: 6,
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-s)"}
          >
            Certificates
          </a>
          <a href="/Himanshu_Resume.pdf" download className="btn-resume" style={{ textAlign: "center", justifyContent: "center" }}>
            ⬇ Download Resume
          </a>
        </div>
      )}

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          minHeight: "100vh", display: "flex", alignItems: "center",
          padding: "calc(var(--nav) + 60px) 5% 80px",
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(59,130,246,.18) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
        }} />
        <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"rgba(59,130,246,.1)", filter:"blur(90px)", top:-80, right:-60, pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:350, height:350, borderRadius:"50%", background:"rgba(16,185,129,.07)", filter:"blur(80px)", bottom:0, left:"8%", pointerEvents:"none" }} />

        <div
          className="hero-cols"
          style={{
            position: "relative", display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 64, width: "100%", maxWidth: 1100,
          }}
        >
          {/* Left */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(59,130,246,.1)", border: "1px solid rgba(59,130,246,.22)",
              borderRadius: 20, padding: "5px 15px", fontSize: 12.5, fontWeight: 500,
              color: "#93C5FD", fontFamily: "var(--mono)", marginBottom: 24,
              animation: "fadeUp .7s ease .1s both",
            }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 6px #4ade80", display:"inline-block" }} />
              Open to internships &amp; collaborations
            </div>

            <h1 style={{
              fontFamily: "var(--display)", fontSize: "clamp(42px,6.5vw,74px)",
              fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 18,
              animation: "fadeUp .7s ease .22s both",
            }}>
              Hi, I'm<br />
              <span style={{ color: "var(--blue)" }}>Himanshu</span>{" "}
              <span style={{ color: "var(--text-m)", fontWeight: 400 }}>Chavan</span>
            </h1>

            <div style={{ animation: "fadeUp .7s ease .34s both" }}>
              <Typewriter />
            </div>

            <p style={{
              fontSize: 16.5, color: "var(--text-s)", lineHeight: 1.8,
              maxWidth: 520, marginBottom: 42,
              animation: "fadeUp .7s ease .46s both",
            }}>
              CS undergrad at <strong style={{ color: "var(--text)" }}>YCCE Nagpur</strong> who loves
              shipping products — from AI agents to full-stack web apps to blockchain platforms.
              I pick the right tool for the problem, not the other way around.
            </p>

            <div style={{
              display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52,
              animation: "fadeUp .7s ease .58s both",
            }}>
              <button onClick={() => scrollTo("projects")} className="btn-primary">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                View Projects
              </button>
              <a href="/Himanshu_Resume.pdf" download className="btn-resume">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume
              </a>
              <button onClick={() => scrollTo("contact")} className="btn-ghost">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Say Hello
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: "flex", gap: 36, flexWrap: "wrap",
              paddingTop: 28, borderTop: "1px solid var(--bdr)",
              animation: "fadeUp .7s ease .7s both",
            }}>
              {[
                { n: "8+",   l: "Projects" },
                { n: "25+",  l: "Hackathons" },
                { n: "7.83", l: "CGPA" },
                { n: "2×",   l: "Podiums" },
                { n: "300+", l: "LinkedIn" },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ fontFamily:"var(--display)", fontSize:28, fontWeight:700, lineHeight:1 }}>{s.n}</div>
                  <div style={{ fontSize:12, color:"var(--text-s)", marginTop:5, fontFamily:"var(--mono)" }}>{s.l}</div>
                </div>
              ))}
              {/* Certificates stat — links to /certificates */}
              <a href="/certificates" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ cursor: "pointer" }}>
                  <div style={{ fontFamily:"var(--display)", fontSize:28, fontWeight:700, lineHeight:1, color:"var(--blue)" }}>20+</div>
                  <div style={{ fontSize:12, color:"var(--text-s)", marginTop:5, fontFamily:"var(--mono)" }}>Certs ↗</div>
                </div>
              </a>
            </div>
          </div>

          {/* Profile */}
          <div style={{ animation: "fadeUp .9s ease .3s both" }}>
            <ProfileOrb />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────────────── */}
      <MarqueeBand />

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "100px 5%", background: "var(--surf)" }}>
        <FadeBox>
          <SectionLabel>About me</SectionLabel>
          <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-1.5px", marginBottom:48 }}>
            A developer who ships,<br />
            <span style={{ color:"var(--blue)" }}>not just codes.</span>
          </h2>
        </FadeBox>

        <FadeBox delay={0.1}>
          <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start" }}>
            <div>
              {[
                <>I'm a <strong style={{color:"var(--text)"}}>Computer Science undergraduate at YCCE Nagpur</strong> (2023–2027) who builds across the entire stack. Whether it's a Python ML pipeline, a React dashboard, a FastAPI microservice, or a blockchain contract — I pick the tool the problem needs.</>,
                <>My projects span <strong style={{color:"var(--text)"}}>AI/ML, full-stack web development, geospatial systems, legal tech, bioinformatics, and Web3</strong>. I care deeply about system design, clean APIs, and code that actually ships to production.</>,
                <>Beyond code, I serve as <strong style={{color:"var(--text)"}}>Secretary of the ACM Student Chapter</strong> at YCCE, organize technical events, and compete regularly in national and international hackathons. When not at a keyboard, I play volleyball and travel.</>,
              ].map((p, i) => (
                <p key={i} style={{ color:"var(--text-s)", fontSize:16, lineHeight:1.85, marginBottom:20 }}>{p}</p>
              ))}

              <div style={{ display:"flex", gap:12, marginTop:8 }}>
                <a href="https://github.com/Himanshujchavan" target="_blank" rel="noreferrer" className="btn-ghost" style={{padding:"9px 18px", fontSize:13}}>GitHub ↗</a>
                <a href="https://linkedin.com/in/chavan-himanshu" target="_blank" rel="noreferrer" className="btn-ghost" style={{padding:"9px 18px", fontSize:13}}>LinkedIn ↗</a>
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ background:"var(--card)", border:"1px solid var(--bdr)", borderRadius:12, padding:"22px 24px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div>
                    <div style={{ fontFamily:"var(--display)", fontSize:18, fontWeight:700 }}>YCCE, Nagpur</div>
                    <div style={{ color:"var(--text-s)", fontSize:13.5, marginTop:4 }}>B.Tech — Computer Science &amp; Engineering</div>
                  </div>
                  <span style={{ fontSize:12, color:"var(--text-m)", fontFamily:"var(--mono)", whiteSpace:"nowrap" }}>2023–2027</span>
                </div>
                <span style={{ fontFamily:"var(--mono)", fontSize:12, background:"rgba(59,130,246,.12)", color:"#93C5FD", border:"1px solid rgba(59,130,246,.2)", borderRadius:5, padding:"3px 10px" }}>CGPA 7.83 / 10.0</span>
              </div>

              {[
                { icon:"🧠", title:"AI & Machine Learning", desc:"Multi-agent systems, LLM integration, RAG pipelines, predictive modeling." },
                { icon:"🌐", title:"Full-Stack Development", desc:"React/Next.js frontends, FastAPI/Node.js backends, database design." },
                { icon:"⛓️", title:"Web3 & Blockchain", desc:"Smart contracts, NFT minting, BNB Chain, decentralized ownership." },
                { icon:"🛰️", title:"Systems & DevOps", desc:"Dockerized microservices, CI/CD, AWS, Kubernetes, scalable architecture." },
              ].map((c) => (
                <div key={c.title} style={{
                  background:"var(--card)", border:"1px solid var(--bdr)", borderRadius:10,
                  padding:"16px 20px", display:"flex", gap:14, alignItems:"flex-start",
                }}>
                  <span style={{ fontSize:22, flexShrink:0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontFamily:"var(--display)", fontSize:15, fontWeight:700, marginBottom:3 }}>{c.title}</div>
                    <div style={{ fontSize:13, color:"var(--text-s)" }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeBox>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────────── */}
      <section id="skills" style={{ padding: "100px 5%", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"rgba(59,130,246,.05)", filter:"blur(120px)", top:"20%", left:"50%", transform:"translateX(-50%)", pointerEvents:"none" }} />

        <FadeBox>
          <SectionLabel>Tech Stack</SectionLabel>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:52 }}>
            <div>
              <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-1.5px", marginBottom:10 }}>
                Tools I'm comfortable with.
              </h2>
              <p style={{ color:"var(--text-s)", fontSize:16 }}>
                Broad enough to pick up any stack, deep enough to architect solutions.
              </p>
            </div>
            <div style={{ fontFamily:"var(--mono)", fontSize:13, color:"var(--text-m)", whiteSpace:"nowrap", paddingBottom:4 }}>
              {SKILLS.reduce((a,s)=>a+s.tags.length,0)}{" "}
              <span style={{ color:"var(--blue)" }}>technologies</span>
            </div>
          </div>
        </FadeBox>

        <FadeBox delay={0.08}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
            {SKILLS.slice(0,2).map((s) => (
              <SkillCard key={s.cat} s={s} large />
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
            {SKILLS.slice(2).map((s) => (
              <SkillCard key={s.cat} s={s} />
            ))}
          </div>
        </FadeBox>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────────── */}
      <section id="projects" style={{ padding: "100px 5%", background: "var(--surf)" }}>
        <FadeBox>
          <SectionLabel>Projects</SectionLabel>
          <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-1.5px", marginBottom:12 }}>
            Things I&apos;ve shipped.
          </h2>
          <p style={{ color:"var(--text-s)", fontSize:16, marginBottom:6 }}>
            From distributed systems to AI pipelines to mobile apps — full spectrum engineering.
          </p>
          <p style={{ color:"var(--text-m)", fontSize:13.5, fontFamily:"var(--mono)", marginBottom:32, display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ color:"var(--blue)" }}>↗</span> Click any card to explore the full architecture.
          </p>

          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:40 }}>
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab===tab ? "var(--blue)" : "var(--card)",
                  color: activeTab===tab ? "#fff" : "var(--text-s)",
                  border: `1px solid ${activeTab===tab ? "var(--blue)" : "var(--bdr)"}`,
                  borderRadius: 6, padding: "7px 16px", fontSize: 13,
                  fontFamily: "var(--mono)", fontWeight: 500, cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </FadeBox>

        <FadeBox delay={0.1}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:20 }}>
            {filtered.map((p) => {
              const isFeat = !!p.featured;
              return (
                <div
                  key={p.name}
                  className="project-card"
                  onClick={() => setSelectedProject(p)}
                  style={{
                    borderColor: isFeat ? `${p.accent}33` : "var(--bdr)",
                    background: isFeat
                      ? "linear-gradient(145deg,#111827,#0d1525)"
                      : "var(--card)",
                    "--card-accent": p.accent,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = p.accent + "55";
                    e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
                    e.currentTarget.style.boxShadow = `0 20px 48px ${p.accent}18, 0 4px 16px rgba(0,0,0,.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isFeat ? `${p.accent}33` : "var(--bdr)";
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  {/* Featured ribbon */}
                  {isFeat && (
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, ${p.accent}, ${p.accent}55, transparent)`,
                      borderRadius: "16px 16px 0 0",
                    }} />
                  )}

                  {/* Top row: icon + badge + expand hint */}
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize: 20, background: p.bg,
                      border: `1px solid ${p.accent}25`,
                    }}>{p.emoji}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="tag" style={{
                        background:`${p.accent}18`, color:p.accent,
                        border:`1px solid ${p.accent}30`,
                      }}>{p.badge}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <div style={{
                    fontFamily:"var(--display)", fontSize:16.5, fontWeight:700,
                    marginBottom: 10, color:"var(--text)", letterSpacing: "-.3px",
                    lineHeight: 1.3,
                  }}>{p.name}</div>

                  {/* Description */}
                  <p style={{
                    fontSize: 13, color:"var(--text-s)", lineHeight:1.75,
                    flex:1, marginBottom:20,
                  }}>{p.desc}</p>

                  {/* Stack pills */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom: 18 }}>
                    {p.stack.slice(0, 5).map((t) => (
                      <span key={t} style={{
                        fontSize: 10.5, fontFamily:"var(--mono)",
                        color:"var(--text-m)",
                        background:`${p.accent}0a`,
                        border:`1px solid ${p.accent}20`,
                        borderRadius: 4, padding:"3px 8px",
                      }}>{t}</span>
                    ))}
                    {p.stack.length > 5 && (
                      <span style={{
                        fontSize: 10.5, fontFamily:"var(--mono)",
                        color:"var(--text-m)",
                        background:"rgba(255,255,255,.03)",
                        border:"1px solid var(--bdr)",
                        borderRadius: 4, padding:"3px 8px",
                      }}>+{p.stack.length - 5} more</span>
                    )}
                  </div>

                  {/* Click-to-expand CTA */}
                  <div className="pc-expand" style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontSize: 12, fontFamily: "var(--mono)",
                    color: p.accent, borderTop: `1px solid ${p.accent}20`,
                    paddingTop: 14, marginTop: "auto",
                  }}>
                    <span>↗</span>
                    <span>Explore deep-dive</span>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeBox>
      </section>

      {/* ── PROJECT MODAL ──────────────────────────────────────────────────── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* ── HACKATHONS ────────────────────────────────────────────────────── */}
      <section id="hackathons" style={{ padding: "100px 5%" }}>
        <FadeBox>
          <SectionLabel>Hackathons</SectionLabel>
          <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-1.5px", marginBottom:12 }}>
            Built under pressure.
          </h2>
          <p style={{ color:"var(--text-s)", fontSize:16, marginBottom:48 }}>
            National and international stages — shipping products in 24–48 hours.
          </p>
        </FadeBox>

        <FadeBox delay={0.1}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
            {HACKATHONS.map((h) => {
              const rs = RESULT_STYLE[h.type] || RESULT_STYLE.blue;
              return (
                <div key={h.name} className="hack-card">
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:rs.color, borderRadius:"12px 12px 0 0" }} />
                  <div style={{ fontFamily:"var(--display)", fontSize:17, fontWeight:700, marginBottom:5, marginTop:4 }}>{h.name}</div>
                  <div style={{ fontSize:12.5, color:"var(--text-m)", marginBottom:12, fontFamily:"var(--mono)" }}>{h.org}</div>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:12, fontFamily:"var(--mono)", fontWeight:500, padding:"4px 10px", borderRadius:5, marginBottom:14, background:rs.bg, color:rs.color, border:`1px solid ${rs.bdr}` }}>
                    {h.result}
                  </span>
                  <p style={{ fontSize:13.5, color:"var(--text-s)", lineHeight:1.65 }}>{h.desc}</p>
                </div>
              );
            })}

            <div className="hack-card" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", minHeight:180, borderStyle:"dashed" }}>
              <div style={{ fontSize:28, marginBottom:10 }}>∞</div>
              <div style={{ fontFamily:"var(--display)", fontSize:15, fontWeight:700, marginBottom:6 }}>More every semester</div>
              <p style={{ fontSize:13, color:"var(--text-s)" }}>Actively competing and building — new challenges every few months.</p>
            </div>
          </div>
        </FadeBox>
      </section>

      {/* ── ACHIEVEMENTS ──────────────────────────────────────────────────── */}
      <section
        id="achievements"
        style={{ padding: "80px 5%", background: "var(--surf)", position: "relative" }}
      >
        <FadeBox>
          <SectionLabel>Leadership · Achievements</SectionLabel>
          <h2 style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(24px,3.5vw,38px)",
            fontWeight: 800, letterSpacing: "-1px", marginBottom: 12,
          }}>
            Beyond the keyboard.
          </h2>
          <p style={{ color: "var(--text-s)", maxWidth: 650, lineHeight: 1.7, marginBottom: 40 }}>
            Leadership roles, hackathon achievements, certifications, and continuous learning
            experiences that have shaped my growth as an engineer.
          </p>
        </FadeBox>

        <FadeBox delay={0.1}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
            gap: 18,
          }}>
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.title}
                className="achieve-card"
              >
                {/* Radial glow */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(circle at top right, rgba(59,130,246,0.08), transparent 60%)",
                  pointerEvents: "none",
                }} />

                {/* Icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24,
                  background: "rgba(59,130,246,.12)",
                  border: "1px solid rgba(59,130,246,.2)",
                  flexShrink: 0, position: "relative",
                }}>
                  {a.icon}
                </div>

                {/* Content */}
                <div style={{ position: "relative" }}>
                  <div style={{
                    fontFamily: "var(--display)", fontSize: 17,
                    fontWeight: 700, marginBottom: 8, color: "var(--text)",
                  }}>
                    {a.title}
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-s)", lineHeight: 1.75, margin: 0 }}>
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeBox>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "100px 5% 120px" }}>
        <FadeBox>
          <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "center" }}>
            <SectionLabel>Contact</SectionLabel>
            <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(28px,4vw,46px)", fontWeight:800, letterSpacing:"-1.5px", marginBottom:16 }}>
              Let's build something<br />
              <span style={{ color:"var(--blue)" }}>great together.</span>
            </h2>
            <p style={{ color:"var(--text-s)", fontSize:16, maxWidth:440, margin:"0 auto 44px" }}>
              Open to internships, freelance projects, and interesting collaborations. Drop a message — I reply fast.
            </p>

            <div className="contact-row" style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap", marginBottom:24 }}>
              <a href="mailto:hc.himanshuchavan@gmail.com" className="contact-link">
                <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                hc.himanshuchavan@gmail.com
              </a>
            </div>

            <div className="contact-row" style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
              <a href="https://github.com/Himanshujchavan" target="_blank" rel="noreferrer" className="contact-link">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="https://linkedin.com/in/chavan-himanshu" target="_blank" rel="noreferrer" className="contact-link">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href="/Himanshu_Resume.pdf" download className="btn-resume">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </FadeBox>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: "1px solid var(--bdr)", padding: "24px 5%",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 10,
      }}>
        <p style={{ fontSize:13, color:"var(--text-m)" }}>
          © 2025 Himanshu Chavan · Nagpur, India
        </p>
        <p style={{ fontSize:13, color:"var(--text-m)", fontFamily:"var(--mono)" }}>
          CS @ YCCE · <span style={{ color:"var(--blue)" }}>Open to opportunities</span>
        </p>
      </footer>
    </>
  );
}