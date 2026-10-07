import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  GraduationCap,
  Mail,
  Check,
  Copy,
  MapPin,
  Terminal,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Cloud,
  Volume2,
  VolumeX,
  Activity,
  Zap,
  GitBranch,
  Server,
  Play,
  RefreshCw,
  Sliders,
  Globe,
  ExternalLink
} from 'lucide-react';

/* --------------------------------------------------------------------------
   CUSTOM SVG ICONS FOR CONSISTENCY
   -------------------------------------------------------------------------- */
const LinkedInIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

/* --------------------------------------------------------------------------
   WEB AUDIO API SOUND ENGINE (Futuristic Cyber Synthesizer)
   -------------------------------------------------------------------------- */
class CyberSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  hover() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch (e) {}
  }

  click() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(840, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.065);
    } catch (e) {}
  }

  pulse() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  success() {
    if (!this.enabled || !this.ctx) return;
    try {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.04 + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.04);
        osc.stop(this.ctx.currentTime + i * 0.04 + 0.18);
      });
    } catch (e) {}
  }
}

const soundEngine = new CyberSoundEngine();

/* --------------------------------------------------------------------------
   GLOBAL CONSTANTS & DATA ARSENAL
   -------------------------------------------------------------------------- */
const FRAME_COUNT = 64;
const BG_COLOR = '#f00603';

const SKILLS_DATA = [
  { name: 'React 18 / Next.js', category: 'frontend', level: 95, exp: '3+ yrs', desc: 'Core UI framework, SSR, RSC, Hooks architecture, Suspense' },
  { name: 'Module Federation', category: 'frontend', level: 93, exp: '2+ yrs', desc: 'Enterprise micro-frontends, dynamic remote bundling, runtime isolation' },
  { name: 'TypeScript', category: 'frontend', level: 90, exp: '3+ yrs', desc: 'Strict type safety, custom utility generics, interface segregation' },
  { name: 'Storybook & MUI', category: 'frontend', level: 92, exp: '2+ yrs', desc: 'Shared cross-squad design systems, token governance, automated visual tests' },
  { name: 'Redux Toolkit', category: 'frontend', level: 88, exp: '3+ yrs', desc: 'Global state, RTK Query, normalized entity caching, middleware' },
  { name: 'Tailwind CSS & Vite', category: 'frontend', level: 92, exp: '3+ yrs', desc: 'Instant HMR, micro-bundle optimizations, responsive design' },
  
  { name: 'Node.js & Express', category: 'backend', level: 88, exp: '3+ yrs', desc: 'RESTful microservices, event-driven async stream processing, JWT auth' },
  { name: 'Python', category: 'backend', level: 86, exp: '3+ yrs', desc: 'Backend microservices, ML pipelines, automation scripts, Pandas' },
  { name: 'Java & Hibernate', category: 'backend', level: 80, exp: '2 yrs', desc: 'Enterprise servlets, ORM entity lifecycle management, JDBC pools' },
  { name: 'MySQL & Oracle', category: 'backend', level: 85, exp: '2.5 yrs', desc: 'Relational schemas, ACID transactions, query tuning, indexing' },
  { name: 'MongoDB & Redis', category: 'backend', level: 82, exp: '2 yrs', desc: 'NoSQL document stores, distributed caching, pub/sub messaging' },

  { name: 'AWS Lambda', category: 'cloud', level: 88, exp: '2+ yrs', desc: 'Serverless compute, event-driven triggers, API Gateway, CloudWatch' },
  { name: 'Docker Containers', category: 'cloud', level: 84, exp: '2+ yrs', desc: 'Multi-stage container builds, microservice orchestration, Docker Compose' },
  { name: 'GitHub Actions CI/CD', category: 'cloud', level: 85, exp: '2+ yrs', desc: 'Automated test runners, lint pipelines, zero-downtime deployment workflows' },
  { name: 'AWS S3 & CloudFront', category: 'cloud', level: 86, exp: '2+ yrs', desc: 'Edge CDN distribution, assets caching, CORS security policies' },

  { name: 'NLP & LLM APIs', category: 'ai', level: 88, exp: '2 yrs', desc: 'Prompt engineering, token streaming, RAG embeddings, OpenAI & Anthropic SDKs' },
  { name: 'Transformer Models', category: 'ai', level: 84, exp: '2 yrs', desc: 'Attention mechanisms, BERT tokenizers, fine-tuning, sequence classification' },
  { name: 'Vector Search & RAG', category: 'ai', level: 82, exp: '1.5 yrs', desc: 'Dense vector embeddings, semantic retrieval, ChromaDB & Pinecone integration' },
  { name: 'Prompt Orchestration', category: 'ai', level: 87, exp: '2 yrs', desc: 'Few-shot prompt chaining, structured JSON outputs, deterministic guards' },
  { name: 'TensorFlow & NumPy', category: 'ai', level: 80, exp: '2 yrs', desc: 'Neural network training, tensor math, data normalization, model evaluation' }
];

const CAREER_DATA = {
  inspiron: {
    id: 'inspiron',
    role: 'Software Engineer',
    company: 'InspironLabs Pvt. Ltd.',
    period: '04/2025 → PRESENT · ACTIVE',
    location: 'Bengaluru, India',
    badge: 'ACTIVE PRODUCTION',
    metrics: [
      { label: 'Bundle Cut', value: '-42%', detail: 'Via Webpack Module Federation' },
      { label: 'Deploy Autonomy', value: '100%', detail: 'Zero cross-squad lock-in' },
      { label: 'Design Uniformity', value: '99.4%', detail: 'Storybook token adoption' }
    ],
    architecture: 'Micro-Frontend Federation & Serverless',
    description:
      'Spearheading enterprise modular frontend architecture, decoupled domain remotes, shared design systems, and AWS Lambda microservices.',
    nodes: [
      { id: 'shell', label: 'Host Shell Container', status: 'ONLINE', chunk: '72 KB', type: 'shell' },
      { id: 'clinical', label: 'Clinical Domain MFE', status: 'ACTIVE', chunk: '140 KB', type: 'remote' },
      { id: 'billing', label: 'Patient Billing MFE', status: 'ACTIVE', chunk: '115 KB', type: 'remote' },
      { id: 'storybook', label: 'Design System (Tokens)', status: 'SHARED', chunk: '45 KB', type: 'shared' },
      { id: 'lambda', label: 'AWS Lambda Service', status: 'SERVERLESS', chunk: 'Sub-20ms', type: 'backend' }
    ]
  },
  immverse: {
    id: 'immverse',
    role: 'AI / ML Engineering Intern',
    company: 'ImmverseAI Innovations',
    period: '12/2023 → 06/2024',
    location: 'Nagpur, India',
    badge: 'AI & NLP RESEARCH',
    metrics: [
      { label: 'User Retention', value: '+22%', detail: 'NLP assistant session duration' },
      { label: 'Avg Latency', value: '240ms', detail: 'Token streaming throughput' },
      { label: 'Intent Accuracy', value: '99.2%', detail: 'Fine-tuned prompt benchmarks' }
    ],
    architecture: 'Neural Transformer & Token Pipeline',
    description:
      'Researched and integrated state-of-the-art NLP models, prompt chaining architectures, and high-throughput conversational agents.',
    pipeline: [
      { step: '01', title: 'Input Stream', sub: 'Context sanitization' },
      { step: '02', title: 'Embeddings', sub: 'High-dim vector search' },
      { step: '03', title: 'Attention Block', sub: 'Transformer weight match' },
      { step: '04', title: 'LLM Engine', sub: 'Generative streaming' }
    ]
  },
  asterisc: {
    id: 'asterisc',
    role: 'Full Stack Java Developer Intern',
    company: 'Asterisc Technocrat',
    period: '10/2022 → 12/2023',
    location: 'Nagpur, India',
    badge: 'ENTERPRISE QA & ORM',
    metrics: [
      { label: 'UAT Defect Drop', value: '-15%', detail: 'Rigorous automated QA tests' },
      { label: 'DB Latency', value: '< 18ms', detail: 'Indexed query optimization' },
      { label: 'Reliability', value: '99.9%', detail: 'Stable production releases' }
    ],
    architecture: 'JSP / Servlet / Hibernate ORM & Relational DBs',
    description:
      'Engineered modular enterprise Java web applications, relational schemas, automated validations, and defect-free production pipelines.',
    pipeline: [
      { step: '01', title: 'HTTP Dispatcher', sub: 'Servlet request routing' },
      { step: '02', title: 'Hibernate L2', sub: 'Entity cache hit (92%)' },
      { step: '03', title: 'SQL Pool', sub: 'Connection lease < 4ms' },
      { step: '04', title: 'ACID Commit', sub: 'Zero phantom reads' }
    ]
  }
};

export default function App() {
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const skillCanvasRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEyeContact, setIsEyeContact] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Time & Telemetry State
  const [localTime, setLocalTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setLocalTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Career Console Active Role
  const [activeCareer, setActiveCareer] = useState('inspiron');
  const [activeModuleNode, setActiveModuleNode] = useState('shell');
  const [isSimulatingBus, setIsSimulatingBus] = useState(false);

  // AI Pipeline Simulator
  const [aiPrompt, setAiPrompt] = useState('Analyze patient clinical symptoms and summarize risk factors');
  const [aiStreaming, setAiStreaming] = useState(false);
  const [aiOutput, setAiOutput] = useState('System ready. Click "Execute Neural Flow" to simulate streaming token inference.');

  // Interactive Terminal State
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'sys', text: 'SAGAR.OS v4.2 [Bengaluru Kernel Initialized]' },
    { type: 'sys', text: 'Type "help" or click diagnostic chips to inspect system architecture.' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // Skills Active Category Filter
  const [skillCategory, setSkillCategory] = useState('all');
  const [inspectedSkill, setInspectedSkill] = useState(SKILLS_DATA[0]);

  // Frame assets storage
  const framesRef = useRef([]);
  const centerFrameRef = useRef(null);

  // Mouse & Animation State
  const mouseRef = useRef({ x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 });
  const auraRef = useRef({ x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 });
  const angleRef = useRef(0);
  const cursorDotRef = useRef(null);
  const cursorAuraRef = useRef(null);

  // Shortest-path circular angular lerp
  const lerpAngle = (current, target, factor) => {
    let diff = (target - current) % (2 * Math.PI);
    if (diff < -Math.PI) diff += 2 * Math.PI;
    if (diff > Math.PI) diff -= 2 * Math.PI;
    return current + diff * factor;
  };

  // Toggle Sound with Synth Init
  const toggleSound = () => {
    soundEngine.init();
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundEngine.enabled = nextState;
    if (nextState) soundEngine.success();
  };

  const handleSoundHover = () => {
    setIsHovered(true);
    if (soundEnabled) soundEngine.hover();
  };

  const handleSoundLeave = () => {
    setIsHovered(false);
  };

  const handleSoundClick = () => {
    if (soundEnabled) soundEngine.click();
  };

  // Preload all 64 WebP frames + center.webp
  useEffect(() => {
    let loaded = 0;
    const frames = [];
    const baseUrl = import.meta.env.BASE_URL || '/';

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const padded = String(i).padStart(2, '0');
      img.src = `${baseUrl}frames/frame_${padded}.webp`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= FRAME_COUNT + 1) {
          setIsLoaded(true);
        }
      };
      frames.push(img);
    }
    framesRef.current = frames;

    const centerImg = new Image();
    centerImg.src = `${baseUrl}center.webp`;
    centerImg.onload = () => {
      loaded++;
      setLoadedCount(loaded);
      if (loaded >= FRAME_COUNT + 1) {
        setIsLoaded(true);
      }
    };
    centerFrameRef.current = centerImg;
  }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
      }
      const bgCanvas = bgCanvasRef.current;
      if (bgCanvas) {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 60 FPS Canvas Render Loop (Hero Character)
  useEffect(() => {
    if (!isLoaded) return;

    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cssWidth = canvas.clientWidth || window.innerWidth;
      const cssHeight = canvas.clientHeight || window.innerHeight;

      // Smooth custom cursor aura trailing (lerp)
      const aura = auraRef.current;
      const mouse = mouseRef.current;
      aura.x += (mouse.x - aura.x) * 0.22;
      aura.y += (mouse.y - aura.y) * 0.22;
      if (cursorAuraRef.current) {
        cursorAuraRef.current.style.transform = `translate(${aura.x}px, ${aura.y}px)`;
      }

      // Character Face Center in CSS pixels
      const faceCenterX = cssWidth * 0.505;
      const faceCenterY = cssHeight * 0.44;

      const dx = mouse.x - faceCenterX;
      const dy = mouse.y - faceCenterY;
      const dist = Math.hypot(dx, dy);

      // Deadzone threshold for direct eye contact (~12% of screen dimension)
      const deadzone = Math.min(cssWidth, cssHeight) * 0.12;

      let currentFrame;

      if (dist < deadzone) {
        currentFrame = centerFrameRef.current;
        setIsEyeContact(true);
      } else {
        setIsEyeContact(false);
        const targetAngle = Math.atan2(dy, dx);
        angleRef.current = lerpAngle(angleRef.current, targetAngle, 0.26);

        let normalizedAngle = angleRef.current % (2 * Math.PI);
        if (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;

        const frameIndex = Math.round((normalizedAngle / (2 * Math.PI)) * FRAME_COUNT) % FRAME_COUNT;
        currentFrame = framesRef.current[frameIndex];
      }

      // Single frame drawing with object-fit: cover
      if (currentFrame && currentFrame.complete) {
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, width, height);

        const imgRatio = currentFrame.naturalWidth / currentFrame.naturalHeight || (16 / 9);
        const canvasRatio = width / height;

        let drawW, drawH, drawX, drawY;

        if (canvasRatio > imgRatio) {
          drawW = width;
          drawH = width / imgRatio;
          drawX = 0;
          drawY = (height - drawH) / 2;
        } else {
          drawH = height;
          drawW = height * imgRatio;
          drawX = (width - drawW) / 2;
          drawY = 0;
        }

        ctx.drawImage(currentFrame, drawX, drawY, drawW, drawH);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isLoaded]);

  // Ambient Dynamic Cyber Matrix Canvas (Keeps whole site feeling responsive)
  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    if (!bgCanvas) return;
    const ctx = bgCanvas.getContext('2d');
    let bgAnimId;

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.1
    }));

    const renderBg = () => {
      ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      const mouse = mouseRef.current;

      // Draw faint grid dots & laser links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = bgCanvas.width;
        if (p.x > bgCanvas.width) p.x = 0;
        if (p.y < 0) p.y = bgCanvas.height;
        if (p.y > bgCanvas.height) p.y = 0;

        // Interactive mouse connection
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(254, 60, 1, ${0.35 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.4})`;
        ctx.fill();
      }

      bgAnimId = requestAnimationFrame(renderBg);
    };

    renderBg();
    return () => cancelAnimationFrame(bgAnimId);
  }, []);

  // Copy email to clipboard helper
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sagar.bangade.dev@gmail.com');
    setCopiedEmail(true);
    if (soundEnabled) soundEngine.success();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Run Bus Simulation in Inspiron MFE Console
  const handleTriggerBus = () => {
    setIsSimulatingBus(true);
    if (soundEnabled) soundEngine.pulse();
    setTimeout(() => {
      setIsSimulatingBus(false);
      if (soundEnabled) soundEngine.success();
    }, 1800);
  };

  // Run AI LLM Inference Simulation
  const handleRunAiInference = () => {
    setAiStreaming(true);
    setAiOutput('Initializing token stream across transformer layers...');
    if (soundEnabled) soundEngine.pulse();

    const sampleResponses = [
      `[Token 0x4F]: Vector similarity match: 0.962.\nDetected entities: { ClinicalRisk: "Low", Specialty: "Oncology", ContextWindow: "4096 tokens" }.\nResponse: Verified safe diagnostic parameters. Module Federation payload dispatched with sub-220ms inference latency.`,
      `[Token 0x8A]: Context retrieved from vector database.\nIntent: Multi-tenant clinical routing.\nAction: Seamlessly routed to Clinical Domain MFE without monolith dependency regressions.`
    ];

    setTimeout(() => {
      const selected = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      setAiOutput(selected);
      setAiStreaming(false);
      if (soundEnabled) soundEngine.success();
    }, 1100);
  };

  // Interactive Terminal Command Execution
  const executeTerminalCmd = (cmdText) => {
    const clean = cmdText.trim().toLowerCase();
    if (!clean) return;

    if (soundEnabled) soundEngine.click();
    const newEntry = { type: 'user', text: `$ ${clean}` };
    let responseEntry = { type: 'res', text: '' };

    switch (clean) {
      case 'help':
        responseEntry.text = 'Available commands: [status] [mfe] [ai] [skills] [contact] [clear]';
        break;
      case 'status':
        responseEntry.text = `Node: 0xSAGAR // Status: ONLINE // Station: InspironLabs (Bengaluru) // Engine: React 18 + AWS Lambda`;
        break;
      case 'mfe':
        responseEntry.text = `Micro-Frontends Active: [Host Shell], [Clinical MFE], [Patient Billing MFE], [Storybook DS]. Bundle savings: -42%.`;
        break;
      case 'ai':
        responseEntry.text = `Degree: B.Tech in Artificial Intelligence. Capabilities: NLP Transformers, Prompt Engineering, LLM APIs.`;
        break;
      case 'skills':
        responseEntry.text = `Top Arsenal: React, Next.js, Webpack Module Federation, AWS Lambda, Node.js, Python, TypeScript.`;
        break;
      case 'contact':
        responseEntry.text = `Email: sagar.bangade.dev@gmail.com | LinkedIn: /in/sagar-bangade | Location: Bengaluru, India`;
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        responseEntry.text = `Command not recognized: "${clean}". Type "help" for diagnostic commands.`;
    }

    setTerminalHistory((prev) => [...prev, newEntry, responseEntry]);
    setTerminalInput('');
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    executeTerminalCmd(terminalInput);
  };

  // Filtered skills list
  const filteredSkills = useMemo(() => {
    if (skillCategory === 'all') return SKILLS_DATA;
    return SKILLS_DATA.filter((s) => s.category === skillCategory);
  }, [skillCategory]);

  return (
    <div className={`app-root ${isHovered ? 'cursor-hover' : ''}`}>
      {/* Background Interactive Ambient Canvas */}
      <canvas ref={bgCanvasRef} className="background-matrix-canvas" />

      {/* Loading Screen */}
      <div className={`loading-overlay ${isLoaded ? 'hidden' : ''}`}>
        <div className="loader-text">Initializing Creative Architecture · Sagar Bangade</div>
        <div className="loader-bar-container">
          <div
            className="loader-bar-fill"
            style={{ width: `${Math.round((loadedCount / (FRAME_COUNT + 1)) * 100)}%` }}
          />
        </div>
      </div>

      {/* Custom Magnetic Cursor */}
      <div ref={cursorDotRef} className="custom-cursor-dot" />
      <div ref={cursorAuraRef} className="custom-cursor-aura" />

      {/* Fixed Frosted-Glass Navigation HUD */}
      <header className="header-nav">
        <a
          href="#hero"
          className="nav-link"
          onMouseEnter={handleSoundHover}
          onMouseLeave={handleSoundLeave}
          onClick={handleSoundClick}
        >
          [00 // HERO]
        </a>
        <a
          href="#about"
          className="nav-link"
          onMouseEnter={handleSoundHover}
          onMouseLeave={handleSoundLeave}
          onClick={handleSoundClick}
        >
          [01 // DIAGNOSTICS]
        </a>
        <a
          href="#experience"
          className="nav-link"
          onMouseEnter={handleSoundHover}
          onMouseLeave={handleSoundLeave}
          onClick={handleSoundClick}
        >
          [02 // ARCHITECTURE]
        </a>
        <a
          href="#work"
          className="nav-link"
          onMouseEnter={handleSoundHover}
          onMouseLeave={handleSoundLeave}
          onClick={handleSoundClick}
        >
          [03 // BENTO LABS]
        </a>
        <a
          href="#skills"
          className="nav-link"
          onMouseEnter={handleSoundHover}
          onMouseLeave={handleSoundLeave}
          onClick={handleSoundClick}
        >
          [04 // RADAR]
        </a>
        <a
          href="#contact"
          className="nav-link"
          onMouseEnter={handleSoundHover}
          onMouseLeave={handleSoundLeave}
          onClick={handleSoundClick}
        >
          [05 // UPLINK]
        </a>
      </header>

      {/* Top Floating Telemetry Badges (Audio SFX + Tracking Status) */}
      <div className="top-hud-bar">
        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className={`sfx-toggle-pill ${soundEnabled ? 'active' : ''}`}
          onMouseEnter={handleSoundHover}
          onMouseLeave={handleSoundLeave}
          title={soundEnabled ? 'Click to Mute Audio' : 'Click to Enable Cyber Sound FX'}
        >
          {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span>{soundEnabled ? 'AUDIO FX: ON' : 'AUDIO FX: OFF'}</span>
          {soundEnabled && (
            <div className="equalizer-waves">
              <span className="eq-bar bar-1" />
              <span className="eq-bar bar-2" />
              <span className="eq-bar bar-3" />
            </div>
          )}
        </button>

        {/* Eye Contact / Head Tracking Badge */}
        <div className="tracking-badge">
          <div
            className="badge-pulse"
            style={{
              backgroundColor: isEyeContact ? '#f59e0b' : '#22c55e',
              boxShadow: isEyeContact ? '0 0 10px #f59e0b' : '0 0 10px #22c55e'
            }}
          />
          <span>{isEyeContact ? 'Eye Contact Locked' : 'Head Tracking Live'}</span>
        </div>
      </div>

      {/* =====================================================================
          00. HERO SECTION (Cursor-Tracking 3D Head Engine)
          ===================================================================== */}
      <section id="hero" className="hero-section">
        <div className="canvas-container">
          <canvas ref={canvasRef} className="hero-canvas" />
        </div>

        <div className="hero-content">
          <div className="hero-badge-pill">
            <span style={{ color: '#22c55e' }}>●</span>
            <span>Software Engineer @ InspironLabs</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>IST: {localTime || '10:45 PM'}</span>
          </div>

          <p className="greeting-text">Hi, I'm</p>
          <h1 className="name-heading">Sagar</h1>

          <div className="title-tagline">
            <span>Full Stack Engineer</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span className="company-highlight">InspironLabs</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span style={{ color: '#38bdf8' }}>B.Tech in AI</span>
          </div>

          <p className="bio-text">
            Specializing in Micro-Frontends, Serverless Cloud Architectures, and Design Systems.
            B.Tech in Artificial Intelligence. Making big applications feel small.
          </p>

          <div className="cta-group">
            <a
              href="#experience"
              className="btn-primary"
              onMouseEnter={handleSoundHover}
              onMouseLeave={handleSoundLeave}
              onClick={handleSoundClick}
            >
              <span>Explore Architecture Deck</span>
              <ArrowUpRight className="btn-icon" />
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              onMouseEnter={handleSoundHover}
              onMouseLeave={handleSoundLeave}
              onClick={handleSoundClick}
            >
              <span>Secure Uplink</span>
            </a>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll into Creative Deck</span>
          <ChevronDown size={14} />
        </div>
      </section>

      {/* =====================================================================
          PORTFOLIO BODY (Interactive Non-Boring Architecture)
          ===================================================================== */}
      <main className="portfolio-body">
        <div className="section-container">

          {/* -----------------------------------------------------------------
              01. SYSTEM DIAGNOSTICS & TELEMETRY (About Me & Cyber Terminal)
              ----------------------------------------------------------------- */}
          <section id="about" className="deck-section">
            <div className="section-header">
              <div className="header-meta-pill">
                <Activity size={13} style={{ color: '#fe3c01' }} />
                <span>SYS.01 // SYSTEM DIAGNOSTICS &amp; IDENTITY</span>
              </div>
              <h2 className="section-title">Engineer Telemetry</h2>
              <p className="section-desc">
                Full-stack engineer in Bengaluru bridging high-throughput Micro-Frontends with intelligent
                machine learning capabilities.
              </p>
            </div>

            <div className="about-grid">
              {/* HUD Terminal Card */}
              <div className="hud-card">
                <div className="hud-header">
                  <div className="hud-title">
                    <Terminal size={14} />
                    <span>SYSTEM.PROFILE // 0xSAGAR</span>
                  </div>
                  <div className="status-online-pill">
                    <span className="active-dot" />
                    <span>ONLINE · PRIME EFFICIENCY</span>
                  </div>
                </div>

                <div className="hud-fields">
                  <div>
                    <div className="hud-field-label">Designation</div>
                    <div className="hud-field-value">Sagar Eknath Bangade</div>
                  </div>
                  <div>
                    <div className="hud-field-label">Current Role</div>
                    <div className="hud-field-value">Software Engineer</div>
                  </div>
                  <div>
                    <div className="hud-field-label">Guild / Company</div>
                    <div className="hud-field-value" style={{ color: '#fe3c01' }}>InspironLabs Pvt. Ltd.</div>
                  </div>
                  <div>
                    <div className="hud-field-label">Location Base</div>
                    <div className="hud-field-value">Bengaluru, India 🇮🇳</div>
                  </div>
                  <div>
                    <div className="hud-field-label">Academic Engine</div>
                    <div className="hud-field-value">B.Tech in Artificial Intelligence</div>
                  </div>
                  <div>
                    <div className="hud-field-label">Core Specialization</div>
                    <div className="hud-field-value">Micro-Frontends &amp; Serverless</div>
                  </div>
                </div>

                {/* Live Ability Matrix */}
                <div className="ability-matrix">
                  <div className="ability-title">Production Efficiency Matrix</div>

                  <div className="ability-item">
                    <div className="ability-header">
                      <span>Frontend Architecture (React 18 / MFE / Storybook)</span>
                      <span style={{ color: '#fe3c01' }}>95%</span>
                    </div>
                    <div className="ability-bar-bg">
                      <div className="ability-bar-fill" style={{ width: '95%' }} />
                    </div>
                  </div>

                  <div className="ability-item">
                    <div className="ability-header">
                      <span>Backend &amp; Serverless APIs (Node / Python / Lambda)</span>
                      <span style={{ color: '#fe3c01' }}>88%</span>
                    </div>
                    <div className="ability-bar-bg">
                      <div className="ability-bar-fill" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div className="ability-item">
                    <div className="ability-header">
                      <span>Cloud Orchestration (AWS / Docker / CI/CD Pipelines)</span>
                      <span style={{ color: '#fe3c01' }}>82%</span>
                    </div>
                    <div className="ability-bar-bg">
                      <div className="ability-bar-fill" style={{ width: '82%' }} />
                    </div>
                  </div>

                  <div className="ability-item">
                    <div className="ability-header">
                      <span>AI / ML Chakra (NLP Transformers / Prompt Engineering)</span>
                      <span style={{ color: '#fe3c01' }}>85%</span>
                    </div>
                    <div className="ability-bar-bg">
                      <div className="ability-bar-fill" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Cyber Terminal Console */}
              <div className="cyber-terminal-card">
                <div className="terminal-header-bar">
                  <div className="terminal-traffic-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <div className="terminal-title-text">
                    <span>sagar@kernel ~ zsh interactive-console</span>
                  </div>
                  <span className="terminal-badge">LIVE REPL</span>
                </div>

                <div className="terminal-quick-chips">
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', alignSelf: 'center' }}>QUICK RUN:</span>
                  <button onClick={() => executeTerminalCmd('status')} className="term-chip" onMouseEnter={handleSoundHover}>status</button>
                  <button onClick={() => executeTerminalCmd('mfe')} className="term-chip" onMouseEnter={handleSoundHover}>mfe</button>
                  <button onClick={() => executeTerminalCmd('ai')} className="term-chip" onMouseEnter={handleSoundHover}>ai</button>
                  <button onClick={() => executeTerminalCmd('skills')} className="term-chip" onMouseEnter={handleSoundHover}>skills</button>
                  <button onClick={() => executeTerminalCmd('clear')} className="term-chip" onMouseEnter={handleSoundHover}>clear</button>
                </div>

                <div className="terminal-body">
                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className={`term-line ${item.type}`}>
                      {item.type === 'user' ? (
                        <span style={{ color: '#fe3c01', fontWeight: 600 }}>{item.text}</span>
                      ) : item.type === 'sys' ? (
                        <span style={{ color: '#38bdf8' }}>{item.text}</span>
                      ) : (
                        <span style={{ color: '#22c55e' }}>{item.text}</span>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleTerminalSubmit} className="terminal-input-row">
                  <span className="term-prompt-symbol">❯</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type 'help' or click chips above..."
                    className="term-input-field"
                  />
                  <button type="submit" className="term-submit-btn" onMouseEnter={handleSoundHover}>
                    Run
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              02. CAREER ARCHITECTURE CONSOLE (Interactive Simulator!)
              ----------------------------------------------------------------- */}
          <section id="experience" className="deck-section">
            <div className="section-header">
              <div className="header-meta-pill">
                <GitBranch size={13} style={{ color: '#fe3c01' }} />
                <span>SYS.02 // ARCHITECTURE CONSOLE</span>
              </div>
              <h2 className="section-title">Production Systems &amp; Career</h2>
              <p className="section-desc">
                Select an engineering station below to inspect live architectural topologies, micro-frontend
                module federations, and serverless pipelines.
              </p>
            </div>

            {/* Station Selector Deck */}
            <div className="station-selector-grid">
              {Object.values(CAREER_DATA).map((item) => {
                const isActive = activeCareer === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveCareer(item.id);
                      if (soundEnabled) soundEngine.click();
                    }}
                    onMouseEnter={handleSoundHover}
                    className={`station-tab-card ${isActive ? 'active' : ''}`}
                  >
                    <div className="station-card-top">
                      <span className="station-number">// 0{item.id === 'inspiron' ? 1 : item.id === 'immverse' ? 2 : 3}</span>
                      <span className="station-badge">{item.badge}</span>
                    </div>

                    <h3 className="station-company">{item.company}</h3>
                    <div className="station-role">{item.role}</div>

                    <div className="station-period">
                      <span className="active-dot" style={{ opacity: isActive ? 1 : 0.4 }} />
                      <span>{item.period}</span>
                    </div>

                    <div className="station-metrics-row">
                      {item.metrics.map((m, mi) => (
                        <div key={mi} className="mini-metric">
                          <span className="metric-val">{m.value}</span>
                          <span className="metric-lbl">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Sandbox for Active Station */}
            <div className="console-sandbox-card">
              {activeCareer === 'inspiron' && (
                <div className="mfe-sandbox-wrapper">
                  <div className="sandbox-header-row">
                    <div>
                      <div className="sandbox-tag">MICRO-FRONTEND FEDERATION TOPOLOGY</div>
                      <h3 className="sandbox-title">InspironLabs Enterprise Shell &amp; Remotes</h3>
                    </div>
                    <button
                      onClick={handleTriggerBus}
                      disabled={isSimulatingBus}
                      className="btn-primary"
                      style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                      onMouseEnter={handleSoundHover}
                    >
                      {isSimulatingBus ? (
                        <>
                          <RefreshCw size={14} className="spin-icon" />
                          <span>Pulsing Federated Bus...</span>
                        </>
                      ) : (
                        <>
                          <Play size={14} />
                          <span>Simulate Module Bus</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Interactive Visual Node Diagram */}
                  <div className="mfe-node-diagram">
                    {CAREER_DATA.inspiron.nodes.map((node) => {
                      const isNodeActive = activeModuleNode === node.id;
                      return (
                        <div
                          key={node.id}
                          onClick={() => {
                            setActiveModuleNode(node.id);
                            if (soundEnabled) soundEngine.click();
                          }}
                          onMouseEnter={handleSoundHover}
                          className={`mfe-node-box ${node.type} ${isNodeActive ? 'selected' : ''} ${isSimulatingBus ? 'pulsing' : ''}`}
                        >
                          <div className="node-type-label">{node.type.toUpperCase()}</div>
                          <div className="node-title">{node.label}</div>
                          <div className="node-chunk-badge">{node.chunk}</div>
                          <span className="node-status-indicator">{node.status}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Node Telemetry Inspector */}
                  <div className="node-inspector-panel">
                    <div className="inspector-title">
                      <Sliders size={14} style={{ color: '#fe3c01' }} />
                      <span>INSPECTING NODE: {activeModuleNode.toUpperCase()}</span>
                    </div>

                    <div className="inspector-grid">
                      <div>
                        <strong>Federation Protocol:</strong> Webpack 5 Module Federation / Vite Remotes
                      </div>
                      <div>
                        <strong>Shared Singletons:</strong> React 18.3, Redux Toolkit, Material-UI 5
                      </div>
                      <div>
                        <strong>Runtime Isolation:</strong> Zero Cascading CSS or Variable Collisions
                      </div>
                      <div>
                        <strong>CI/CD Autonomy:</strong> Deploys independently to S3/CloudFront without host builds
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeCareer === 'immverse' && (
                <div className="ai-sandbox-wrapper">
                  <div className="sandbox-header-row">
                    <div>
                      <div className="sandbox-tag">NEURAL NLP &amp; TOKEN PIPELINE SIMULATOR</div>
                      <h3 className="sandbox-title">ImmverseAI Conversational Pipeline</h3>
                    </div>
                    <button
                      onClick={handleRunAiInference}
                      disabled={aiStreaming}
                      className="btn-primary"
                      style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                      onMouseEnter={handleSoundHover}
                    >
                      {aiStreaming ? (
                        <>
                          <RefreshCw size={14} className="spin-icon" />
                          <span>Streaming Tokens...</span>
                        </>
                      ) : (
                        <>
                          <Zap size={14} />
                          <span>Execute Neural Flow</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Neural Flow Visual Steps */}
                  <div className="pipeline-flow-steps">
                    {CAREER_DATA.immverse.pipeline.map((step, idx) => (
                      <div key={idx} className={`pipeline-step-box ${aiStreaming ? 'active-pulse' : ''}`}>
                        <div className="step-num">{step.step}</div>
                        <div className="step-name">{step.title}</div>
                        <div className="step-sub">{step.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Prompt Tester */}
                  <div className="ai-prompt-tester">
                    <div className="tester-header">
                      <span>Interactive Prompt Streamer:</span>
                      <div className="prompt-presets">
                        <button onClick={() => setAiPrompt('Analyze clinical symptom record')} className="preset-btn">Sample 1</button>
                        <button onClick={() => setAiPrompt('Synthesize conversational dialog')} className="preset-btn">Sample 2</button>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="prompt-input"
                    />

                    <div className="ai-output-box">
                      <div className="output-tag">// INFERENCE STREAM:</div>
                      <pre className="output-pre">{aiOutput}</pre>
                    </div>
                  </div>
                </div>
              )}

              {activeCareer === 'asterisc' && (
                <div className="enterprise-sandbox-wrapper">
                  <div className="sandbox-header-row">
                    <div>
                      <div className="sandbox-tag">ENTERPRISE TRANSACTION &amp; ORM LIFECYCLE</div>
                      <h3 className="sandbox-title">Asterisc Technocrat Data Layer</h3>
                    </div>
                    <span className="hud-field-value" style={{ color: '#22c55e', fontSize: '0.85rem' }}>
                      ACID COMPLIANT · 99.9% UPTIME
                    </span>
                  </div>

                  <div className="pipeline-flow-steps">
                    {CAREER_DATA.asterisc.pipeline.map((step, idx) => (
                      <div key={idx} className="pipeline-step-box">
                        <div className="step-num">{step.step}</div>
                        <div className="step-name">{step.title}</div>
                        <div className="step-sub">{step.sub}</div>
                      </div>
                    ))}
                  </div>

                  <div className="node-inspector-panel">
                    <div className="inspector-title">
                      <Database size={14} style={{ color: '#fe3c01' }} />
                      <span>QUALITY ASSURANCE &amp; ZERO-DEFECT ARCHITECTURE</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                      Engineered modular Java Servlet applications and Hibernate caching protocols that cut
                      UAT defect rates by 15% through strict automated regression suites and zero phantom reads.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* -----------------------------------------------------------------
              03. 3D TILT BENTO SHOWCASE (Projects)
              ----------------------------------------------------------------- */}
          <section id="work" className="deck-section">
            <div className="section-header">
              <div className="header-meta-pill">
                <Layers size={13} style={{ color: '#fe3c01' }} />
                <span>SYS.03 // BENTO ENGINEERING LABS</span>
              </div>
              <h2 className="section-title">Key Projects &amp; Platforms</h2>
              <p className="section-desc">
                High-impact production systems engineered for micro-frontend modularity, serverless cloud
                scale, and intelligent architectures.
              </p>
            </div>

            <div className="bento-grid">
              {/* Project Bento Card 1 */}
              <div
                className="bento-card featured"
                onMouseEnter={handleSoundHover}
                onMouseLeave={handleSoundLeave}
              >
                <div className="bento-card-header">
                  <span className="bento-tag">MICRO-FRONTEND &amp; DESIGN SYSTEM</span>
                  <div className="live-status-pill">PRODUCTION GRADE</div>
                </div>

                <h3 className="bento-title">Healthcare Platform 2.0</h3>
                <p className="bento-desc">
                  Architectural transformation of a legacy monolithic clinical portal into decoupled,
                  independently deployed Micro-Frontends via Webpack Module Federation. Engineered a unified
                  Storybook design system guaranteeing pixel-perfect UI consistency across all clinical squads.
                </p>

                <div className="bento-telemetry-row">
                  <div className="telemetry-pill">
                    <span className="telemetry-number">-93%</span>
                    <span className="telemetry-label">Initial Chunk Size (320KB)</span>
                  </div>
                  <div className="telemetry-pill">
                    <span className="telemetry-number">0</span>
                    <span className="telemetry-label">Cross-MFE Regressions</span>
                  </div>
                  <div className="telemetry-pill">
                    <span className="telemetry-number">100%</span>
                    <span className="telemetry-label">Storybook Token Match</span>
                  </div>
                </div>

                <div className="bento-tech-pills">
                  {['React 18', 'Next.js', 'Module Federation', 'Storybook', 'Material-UI', 'Redux Toolkit'].map((tech) => (
                    <span key={tech} className="exp-skill-pill">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Project Bento Card 2 */}
              <div
                className="bento-card"
                onMouseEnter={handleSoundHover}
                onMouseLeave={handleSoundLeave}
              >
                <div className="bento-card-header">
                  <span className="bento-tag">SERVERLESS &amp; CLOUD SCALE</span>
                  <div className="live-status-pill">MULTI-RUNTIME</div>
                </div>

                <h3 className="bento-title">Scalable E-Learning Platform</h3>
                <p className="bento-desc">
                  Modernized core backend services supporting heavy concurrent student traffic across 3
                  distinct runtimes (Node.js, Python, PHP). Built event-driven AWS Lambda microservices feeding
                  a high-performance, cost-effective data pipeline with zero server management overhead.
                </p>

                <div className="bento-telemetry-row">
                  <div className="telemetry-pill">
                    <span className="telemetry-number">10K+</span>
                    <span className="telemetry-label">Concurrent Students</span>
                  </div>
                  <div className="telemetry-pill">
                    <span className="telemetry-number">&lt; 90ms</span>
                    <span className="telemetry-label">Lambda P95 Latency</span>
                  </div>
                </div>

                <div className="bento-tech-pills">
                  {['AWS Lambda', 'Node.js', 'Python', 'PHP', 'MySQL', 'Serverless APIs'].map((tech) => (
                    <span key={tech} className="exp-skill-pill">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Project Bento Card 3: AI Intelligence Engine */}
              <div
                className="bento-card"
                onMouseEnter={handleSoundHover}
                onMouseLeave={handleSoundLeave}
              >
                <div className="bento-card-header">
                  <span className="bento-tag">NLP &amp; LLM ARCHITECTURE</span>
                  <div className="live-status-pill">INTELLIGENT AGENT</div>
                </div>

                <h3 className="bento-title">Conversational AI Assistant</h3>
                <p className="bento-desc">
                  Developed conversational transformer pipelines and prompt orchestrations boosting user
                  session duration by +22%. Leveraged vector embeddings for instant semantic context retrieval
                  and real-time streaming response generation.
                </p>

                <div className="bento-telemetry-row">
                  <div className="telemetry-pill">
                    <span className="telemetry-number">+22%</span>
                    <span className="telemetry-label">Session Engagement</span>
                  </div>
                  <div className="telemetry-pill">
                    <span className="telemetry-number">240ms</span>
                    <span className="telemetry-label">Mean Stream Latency</span>
                  </div>
                </div>

                <div className="bento-tech-pills">
                  {['Python', 'NLP', 'LLM APIs', 'Vector Embeddings', 'Prompt Engineering'].map((tech) => (
                    <span key={tech} className="exp-skill-pill">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              04. TECHNICAL ARSENAL (Interactive Skill Radar & Matrix)
              ----------------------------------------------------------------- */}
          <section id="skills" className="deck-section">
            <div className="section-header">
              <div className="header-meta-pill">
                <Cpu size={13} style={{ color: '#fe3c01' }} />
                <span>SYS.04 // TECHNICAL ARSENAL</span>
              </div>
              <h2 className="section-title">Skills &amp; Technology Radar</h2>
              <p className="section-desc">
                Interactive skill matrix. Filter by domain or click any node to inspect production tenure
                and architectural role.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="skills-filter-bar">
              {[
                { id: 'all', label: 'All Technologies' },
                { id: 'frontend', label: 'Frontend & MFE' },
                { id: 'backend', label: 'Backend & APIs' },
                { id: 'cloud', label: 'Cloud & DevOps' },
                { id: 'ai', label: 'AI / ML Chakra' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSkillCategory(cat.id);
                    if (soundEnabled) soundEngine.click();
                  }}
                  onMouseEnter={handleSoundHover}
                  className={`skill-cat-btn ${skillCategory === cat.id ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Interactive Grid with Live Telemetry Inspector */}
            <div className="skills-interactive-container">
              <div className="skills-grid-modern">
                {filteredSkills.map((skill) => {
                  const isSelected = inspectedSkill.name === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onClick={() => {
                        setInspectedSkill(skill);
                        if (soundEnabled) soundEngine.click();
                      }}
                      onMouseEnter={() => {
                        handleSoundHover();
                        setInspectedSkill(skill);
                      }}
                      className={`skill-tile-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="tile-top">
                        <span className="tile-name">{skill.name}</span>
                        <span className="tile-level">{skill.level}%</span>
                      </div>

                      <div className="tile-bar-track">
                        <div className="tile-bar-fill" style={{ width: `${skill.level}%` }} />
                      </div>

                      <div className="tile-meta">
                        <span>{skill.category.toUpperCase()}</span>
                        <span>{skill.exp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inspected Skill HUD Tooltip */}
              <div className="skill-inspector-box">
                <div className="inspected-header">
                  <Sparkles size={16} style={{ color: '#fe3c01' }} />
                  <span>INSPECTED TECH: {inspectedSkill.name}</span>
                </div>
                <div className="inspected-metric-row">
                  <div>
                    <span className="ins-label">MASTERY</span>
                    <span className="ins-val" style={{ color: '#fe3c01' }}>{inspectedSkill.level}%</span>
                  </div>
                  <div>
                    <span className="ins-label">EXPERIENCE</span>
                    <span className="ins-val">{inspectedSkill.exp}</span>
                  </div>
                  <div>
                    <span className="ins-label">DOMAIN</span>
                    <span className="ins-val">{inspectedSkill.category.toUpperCase()}</span>
                  </div>
                </div>
                <p className="inspected-desc">{inspectedSkill.desc}</p>
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              05. DIRECT SECURE UPLINK (Contact)
              ----------------------------------------------------------------- */}
          <section id="contact" className="deck-section" style={{ marginBottom: '40px' }}>
            <div className="contact-card">
              <span className="header-meta-pill" style={{ margin: '0 auto 12px' }}>
                <ShieldCheck size={13} style={{ color: '#22c55e' }} />
                <span>SYS.05 // SECURE DIRECT UPLINK</span>
              </span>

              <h2 className="contact-info-title">Let's Build Something Exceptional</h2>
              <p className="contact-info-sub">
                Always open to architecting high-performance web applications, micro-frontend migrations,
                or discussing full-stack engineering opportunities.
              </p>

              <div className="contact-methods">
                <button
                  onClick={handleCopyEmail}
                  className="contact-pill-btn primary"
                  onMouseEnter={handleSoundHover}
                  onMouseLeave={handleSoundLeave}
                >
                  {copiedEmail ? <Check size={18} /> : <Copy size={18} />}
                  <span>{copiedEmail ? 'Email Copied to Clipboard!' : 'sagar.bangade.dev@gmail.com'}</span>
                </button>

                <a
                  href="mailto:sagar.bangade.dev@gmail.com"
                  className="contact-pill-btn"
                  onMouseEnter={handleSoundHover}
                  onMouseLeave={handleSoundLeave}
                  onClick={handleSoundClick}
                >
                  <Mail size={18} style={{ color: '#fe3c01' }} />
                  <span>Send Me an Email ↗</span>
                </a>
              </div>

              <div className="social-links" style={{ justifyContent: 'center' }}>
                <a
                  href="https://www.linkedin.com/in/sagar-bangade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="LinkedIn Profile"
                  onMouseEnter={handleSoundHover}
                  onMouseLeave={handleSoundLeave}
                  onClick={handleSoundClick}
                >
                  <LinkedInIcon size={20} />
                </a>

                <a
                  href="https://github.com/sagarbangade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="GitHub Profile"
                  onMouseEnter={handleSoundHover}
                  onMouseLeave={handleSoundLeave}
                  onClick={handleSoundClick}
                >
                  <GitHubIcon size={20} />
                </a>
              </div>

              <div className="uplink-coords-badge">
                <MapPin size={12} style={{ color: '#fe3c01' }} />
                <span>BENGALURU, INDIA · COORDINATES: 12.9716° N, 77.5946° E · STATUS: AVAILABLE</span>
              </div>
            </div>

            <div className="footer-bar">
              <p>
                © {new Date().getFullYear()} Sagar Eknath Bangade · Software Engineer @ InspironLabs.
                Crafted with 60 FPS Canvas Engine, Web Audio API, &amp; Vite.
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
