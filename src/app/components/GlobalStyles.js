export const GLOBAL_CSS = `
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
