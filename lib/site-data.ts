export interface NavItem {
  id: string;
  num: string;
  name: string;
  href: string;
  title: string;
  category: 'primary' | 'secondary' | 'action';
  description: string;
  image: string;
  sublinks?: { name: string; href: string; desc: string }[];
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    id: 'work',
    num: '01',
    name: 'WORK',
    href: '/work',
    title: 'SELECTED WORK & CASE STUDIES',
    category: 'primary',
    description: 'Proven AI systems, sovereign cloud platforms, and sensory digital flagship experiences.',
    image: '/images/arass_frontier_build_lab.jpg',
    sublinks: [
      { name: 'Selected Work', href: '/work', desc: 'Featured enterprise builds' },
      { name: 'Case Studies', href: '/work', desc: 'Technical specifications & impact' },
      { name: 'Client Outcomes', href: '/work', desc: 'Validated performance benchmarks' },
    ],
  },
  {
    id: 'solutions',
    num: '02',
    name: 'SOLUTIONS',
    href: '/services',
    title: 'ENGINEERING & PRODUCT DISCIPLINES',
    category: 'primary',
    description: 'AI Systems, Web & Software, Enterprise Automation, and Sensory Digital Experiences.',
    image: '/images/arass_discovery_quantum_cleanroom.jpg',
    sublinks: [
      { name: 'AI Systems', href: '/services', desc: 'Sub-10ms neural decision engines' },
      { name: 'Software & Web', href: '/services', desc: 'High-performance sovereign platforms' },
      { name: 'Automation', href: '/services', desc: 'Intelligent multi-agent orchestration' },
      { name: 'Digital Experiences', href: '/services', desc: '60fps sensory digital universes' },
    ],
  },
  {
    id: 'products',
    num: '03',
    name: 'PRODUCTS',
    href: '/work',
    title: 'PROPRIETARY PLATFORMS & VENTURES',
    category: 'primary',
    description: 'Sovereign digital products, financial ledgers, and developer ecosystems built by ARASS.',
    image: '/images/arass_venture_materials.jpg',
    sublinks: [
      { name: 'Platforms', href: '/work', desc: 'Sovereign enterprise infrastructure' },
      { name: 'Ventures', href: '/ventures', desc: 'Spinoff technology companies' },
      { name: 'Developer Tooling', href: '/services', desc: 'High-throughput APIs & SDKs' },
    ],
  },
  {
    id: 'lab',
    num: '04',
    name: 'LAB',
    href: '/labs',
    title: 'ARASS RESEARCH & EXPERIMENTS',
    category: 'primary',
    description: 'High-security experimental infrastructure across 6 scientific domains.',
    image: '/images/arass_labs_robotics.jpg',
    sublinks: [
      { name: 'Research', href: '/labs', desc: 'Foundational theory to prototype' },
      { name: 'Experiments', href: '/labs', desc: 'Live physical-digital cleanrooms' },
      { name: 'Engineering', href: '/labs', desc: 'Hardware & robotics interfaces' },
    ],
  },
  {
    id: 'company',
    num: '05',
    name: 'COMPANY',
    href: '/about',
    title: 'ABOUT THE ARASS INSTITUTION',
    category: 'primary',
    description: 'A global technology and experience company engineering what the future requires.',
    image: '/images/arass_institutional_monolith.jpg',
    sublinks: [
      { name: 'About ARASS', href: '/about', desc: 'Our mission & philosophy' },
      { name: 'Our Approach', href: '/about', desc: 'Permanent multi-decade rigor' },
      { name: 'Global Hubs', href: '/about', desc: 'Geneva, Zurich, London, SF' },
    ],
  },
  {
    id: 'insights',
    num: '06',
    name: 'INSIGHTS',
    href: '/insights',
    title: 'LATEST THINKING & RESEARCH',
    category: 'primary',
    description: 'Institutional research, technoeconomic evaluations, and engineering notes.',
    image: '/images/arass_insights_fusion.jpg',
    sublinks: [
      { name: 'Articles', href: '/insights', desc: 'Editorial deep-tech analysis' },
      { name: 'Research Notes', href: '/insights', desc: 'Engineering breakthroughs' },
      { name: 'Case Studies', href: '/insights', desc: 'Production methodologies' },
    ],
  },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    id: 'ventures',
    num: '07',
    name: 'VENTURES',
    href: '/ventures',
    title: 'THE VENTURE FACTORY',
    category: 'secondary',
    description: 'Translating breakthrough research into sovereign technological enterprises.',
    image: '/images/arass_venture_materials.jpg',
  },
  {
    id: 'labs',
    num: '08',
    name: 'LABS',
    href: '/labs',
    title: 'RESEARCH FRONTIERS',
    category: 'secondary',
    description: 'High-security experimental infrastructure across 6 scientific domains.',
    image: '/images/arass_labs_robotics.jpg',
  },
  {
    id: 'technologies',
    num: '09',
    name: 'TECHNOLOGIES',
    href: '/technologies',
    title: 'TECHNOLOGY SYSTEMS',
    category: 'secondary',
    description: '2D technical schematics, computational architecture, and system blueprints.',
    image: '/images/arass_frontier_build_lab.jpg',
  },
  {
    id: 'tech-review',
    num: '10',
    name: 'TECH REVIEW',
    href: '/tech-review',
    title: 'TECHNOLOGY SYSTEMS AUDIT',
    category: 'secondary',
    description: 'Verifiable technology readiness level audits and peer evaluations.',
    image: '/images/arass_frontier_build_lab.jpg',
  },
  {
    id: 'contact',
    num: '11',
    name: 'CONTACT',
    href: '/contact',
    title: 'INSTITUTIONAL ACCESS',
    category: 'action',
    description: 'Direct inquiry gateway for enterprise partners and ambitious technology builders.',
    image: '/images/arass_contact_sanctuary.jpg',
  },
];

// Venture Data Dossiers
export interface Venture {
  id: string;
  name: string;
  code: string;
  domain: string;
  stage: string;
  subtitle: string;
  capitalCommitted: string;
  leadArchitect: string;
  status: string;
  readinessLevel: string;
  summary: string;
  description: string;
  breakthrough: string;
  image: string;
  metrics: { label: string; value: string; unit?: string; detail: string }[];
  specifications: string[];
  breakthroughTimeline: { year: string; milestone: string }[];
  technologies: string[];
  patents: string[];
}

export const VENTURES_DATA: Venture[] = [
  {
    id: 'aeon-synthesis',
    name: 'AEON SYNTHESIS',
    code: 'VNT-01',
    domain: 'NEUROMORPHIC COMPUTING',
    stage: 'ACTIVE PILOT',
    subtitle: 'Non-Von Neumann Analog Neural Hardware',
    capitalCommitted: '$450M',
    leadArchitect: 'DR. K. VANCE',
    status: 'ACTIVE PILOT',
    readinessLevel: 'TRL-7',
    summary: 'Sub-nanosecond analog neuromorphic hardware executing continuous neural inference.',
    description:
      'Aeon Synthesis develops non-Von Neumann computing substrates that mimic biological neural networks with atomic-scale precision. Operating at sub-nanosecond clock cycles with 10,000x the energy efficiency of traditional GPU clusters.',
    breakthrough:
      'Monolithic 3D phase-change memory integrated directly onto analog CMOS synaptic crossbars, achieving sub-nanosecond matrix multiplication.',
    image: '/images/arass_discovery_quantum_cleanroom.jpg',
    metrics: [
      { label: 'ENERGY EFFICIENCY', value: '0.04', unit: 'pJ/op', detail: '12,000x gain vs H100 architectures' },
      { label: 'BANDWIDTH', value: '48', unit: 'TB/s', detail: 'Ultra-low latency direct memory mesh' },
      { label: 'ACTIVE NODES', value: '256', unit: 'Cores', detail: 'Wafer-scale integrated prototype' },
      { label: 'CLOCK LATENCY', value: '0.8', unit: 'ns', detail: 'Continuous asynchronous inference' },
    ],
    specifications: [
      '300mm Monolithic Neuromorphic Wafer Substrate',
      'Phase-Change Material Synaptic Weight Elements',
      'Direct Photonic Waveguide Interconnect Bus',
      'Operating Voltage: 0.4V Sub-Threshold Analog Matrix',
    ],
    breakthroughTimeline: [
      { year: '2024', milestone: 'First 16-core analog neuromorphic test silicon validated' },
      { year: '2025', milestone: 'Full wafer-scale 256-core substrate demonstrated at CERN' },
      { year: '2026', milestone: 'Commercial production deployment with sovereign partners' },
    ],
    technologies: ['Phase-Change Memory (PCM)', 'Spiking Neural Networks (SNN)', 'Cryogenic Silicon', 'Direct Photonic Interconnects'],
    patents: ['EP3948201B1 — Analog Weight Storage', 'US11849202B2 — Synaptic Interconnect Mesh'],
  },
  {
    id: 'chronos-dynamics',
    name: 'CHRONOS DYNAMICS',
    code: 'VNT-02',
    domain: 'DETERMINISTIC NETWORKS',
    stage: 'COMMERCIAL DEPLOYMENT',
    subtitle: 'Microsecond Distributed Consensus Matrix',
    capitalCommitted: '$320M',
    leadArchitect: 'DR. M. SEIDEL',
    status: 'COMMERCIAL DEPLOYMENT',
    readinessLevel: 'TRL-8',
    summary: 'Sovereign distributed consensus operating with microsecond finality and zero transaction rollback.',
    description:
      'Chronos Dynamics provides cryptographic consensus frameworks for critical national infrastructure, energy grids, and cross-border settlement networks.',
    breakthrough:
      'Zero-copy memory mapped cryptographic Raft engine delivering 1.2M transactions/second with mathematical safety proofs.',
    image: '/images/arass_frontier_build_lab.jpg',
    metrics: [
      { label: 'FINALITY LATENCY', value: '42', unit: 'μs', detail: 'Deterministic Raft-Consensus' },
      { label: 'THROUGHPUT', value: '1.2M', unit: 'tx/s', detail: 'Zero-copy shared memory architecture' },
      { label: 'FAULT TOLERANCE', value: 'Byzantine', unit: 'Safe', detail: 'Provable cryptographic safety' },
      { label: 'NODE SCALE', value: '1,024', unit: 'Nodes', detail: 'Global sovereign network cluster' },
    ],
    specifications: [
      'Formally Verified Rust Consensus Engine Core',
      'Hardware Security Module (HSM) Cryptographic Attestation',
      'RDMA Low-Latency Network Serialization Protocol',
      'Real-Time Zero-Knowledge State Proof Generator',
    ],
    breakthroughTimeline: [
      { year: '2023', milestone: 'Consensus engine mathematically proved by Oxford Institute' },
      { year: '2025', milestone: 'Integrated across 4 European interbank settlement systems' },
      { year: '2026', milestone: 'Global deployment across sovereign cloud networks' },
    ],
    technologies: ['Zero-Knowledge Cryptography', 'Rust Core Runtime', 'Hardware Security Modules (HSM)', 'Asynchronous BFT'],
    patents: ['WO2025091823A1 — Deterministic Low-Latency Ordering', 'US11902831B1 — Fault Tolerant State Replication'],
  },
  {
    id: 'helios-fusion',
    name: 'HELIOS POWER MATRIX',
    code: 'VNT-03',
    domain: 'DEEP ENERGY SYSTEMS',
    stage: 'PROTOTYPE DEMONSTRATION',
    subtitle: 'High-Field Superconducting Magnet Assemblies',
    capitalCommitted: '$780M',
    leadArchitect: 'DR. R. AL-MANSOOR',
    status: 'PROTOTYPE PHASE',
    readinessLevel: 'TRL-6',
    summary: 'High-field superconducting magnet architectures for compact magnetic confinement fusion.',
    description:
      'Helios designs high-temperature superconducting (HTS) tape magnets creating magnetic fields exceeding 22 Tesla in ultra-compact form factors, accelerating the timeline to net-positive fusion power.',
    breakthrough:
      'High-Temperature Superconducting REBCO tape wound into modular, demountable high-flux magnet coils generating 22.4 Tesla continuous field.',
    image: '/images/arass_insights_fusion.jpg',
    metrics: [
      { label: 'MAGNETIC FIELD', value: '22.4', unit: 'Tesla', detail: 'High-Temperature Superconductor' },
      { label: 'OPERATING TEMP', value: '20', unit: 'Kelvin', detail: 'Closed-loop neon cryocooling' },
      { label: 'Q-FACTOR TARGET', value: '> 15', unit: 'Q', detail: 'Net positive electricity generation' },
      { label: 'CONTINUOUS TEST', value: '1,000', unit: 'Hours', detail: 'Stress validated quench protection' },
    ],
    specifications: [
      'REBCO Rare-Earth Barium Copper Oxide Superconducting Tape',
      'Cryogenic Neon-Loop Refrigeration System',
      'Ultra-Fast Solid-State Magnetic Quench Protection Circuit',
      'Finite-Element Magnetohydrodynamic Plasma Simulators',
    ],
    breakthroughTimeline: [
      { year: '2024', milestone: '20 Tesla HTS magnet coil stress tested for 1,000 hours' },
      { year: '2025', milestone: 'Full vacuum vessel assembly integrated with cryocooler' },
      { year: '2027', milestone: 'First plasma ignition demonstration' },
    ],
    technologies: ['REBCO Superconducting Tape', 'High-Flux Magnetic Shielding', 'Liquid Metal Divertors', 'AI Plasma Equilibrium Control'],
    patents: ['EP4102931A1 — Cryogenic Quench Protection', 'US12049182B2 — High-Field Compact Coils'],
  },
];

export const VENTURES = VENTURES_DATA;

// Lab Research Domains
export interface LabDomain {
  id: string;
  code: string;
  name: string;
  focus: string;
  description: string;
  leadFacility: string;
  keyPersonnel: string;
  programsCount: number;
  image: string;
  specifications: string[];
  activeTheses: string[];
}

export const LAB_DOMAINS: LabDomain[] = [
  {
    id: 'domain-01',
    code: 'DOMAIN 01',
    name: 'NEUROMORPHIC & QUANTUM SYSTEMS',
    focus: 'Non-von Neumann computing substrates and photonic quantum interconnects.',
    description:
      'Designing analog neuromorphic processing nodes and optical switching matrices that execute tensor contractions at the physical limits of thermodynamics.',
    leadFacility: 'ZURICH QUANTUM CLEANROOM',
    keyPersonnel: 'DR. K. VANCE (CHIEF SCIENTIST)',
    programsCount: 14,
    image: '/images/arass_discovery_quantum_cleanroom.jpg',
    specifications: [
      'Dilution Refrigerator Array (10 mK Base Temp)',
      'Sub-Picosecond Laser Interferometry',
      'Ultra-High Vacuum Deposition Chamber',
    ],
    activeTheses: ['Room-Temperature Polariton Lattices', 'Sub-Nanosecond Spiking Neural Hardware'],
  },
  {
    id: 'domain-02',
    code: 'DOMAIN 02',
    name: 'BIO-SYNTHETIC & ADVANCED MATERIALS',
    focus: 'Molecular manufacturing and self-repairing structural polymers.',
    description:
      'Developing carbon-nanotube reinforced structural lattices and biological substrate interfaces for extreme environment deployment.',
    leadFacility: 'GENEVA MATERIALS LAB',
    keyPersonnel: 'DR. S. NAIR (LEAD MATERIALS PHYSICIST)',
    programsCount: 9,
    image: '/images/arass_venture_materials.jpg',
    specifications: [
      'Scanning Tunneling Electron Microscope (0.05 nm Resolution)',
      'High-Pressure Sintering Autoclaves (10,000 Bar)',
    ],
    activeTheses: ['Self-Healing Carbon Composites', 'Engineered Biopolymer Substrates'],
  },
  {
    id: 'domain-03',
    code: 'DOMAIN 03',
    name: 'AUTONOMOUS ROBOTICS & ACTUATION',
    focus: 'High-degree-of-freedom robotic manipulation and physical multi-agent coordination.',
    description:
      'Engineering physical humanoid actuation systems, high-torque density magnetic motors, and decentralized swarm coordination algorithms.',
    leadFacility: 'TOKYO ADVANCED FABRICATION LAB',
    keyPersonnel: 'DR. T. TAKAHASHI (ROBOTICS DIRECTOR)',
    programsCount: 18,
    image: '/images/arass_labs_robotics.jpg',
    specifications: [
      'Multi-Axis Dynamometer Test Cells',
      '1,000 Hz Real-Time Optical Motion Capture Rig',
    ],
    activeTheses: ['Sub-Millimeter Tactile Sensors', 'Dynamic Whole-Body Robotic Control'],
  },
  {
    id: 'domain-04',
    code: 'DOMAIN 04',
    name: 'SOVEREIGN SOFTWARE & DISTRIBUTED SYSTEMS',
    focus: 'Fault-tolerant consensus architectures and formal verification engines.',
    description:
      'Formally proving mathematical properties of distributed consensus protocols and compiler toolchains for zero-downtime sovereign infrastructure.',
    leadFacility: 'SAN FRANCISCO COMPUTATION HUB',
    keyPersonnel: 'DR. M. SEIDEL (SYSTEMS ARCHITECT)',
    programsCount: 22,
    image: '/images/arass_frontier_build_lab.jpg',
    specifications: [
      'Air-Gapped Formal Verification Compute Cluster',
      'Hardware-in-the-Loop Fault Injection Simulators',
    ],
    activeTheses: ['Zero-Copy Deterministic Raft', 'Formally Verified Cryptographic Microkernels'],
  },
  {
    id: 'domain-05',
    code: 'DOMAIN 05',
    name: 'DEEP ENERGY & COMPACT FUSION',
    focus: 'High-temperature superconducting magnets and magnetic plasma confinement.',
    description:
      'Designing superconducting magnetic coils exceeding 22 Tesla to enable compact magnetic confinement fusion systems.',
    leadFacility: 'OXFORD FUSION FACILITY',
    keyPersonnel: 'DR. R. AL-MANSOOR (PLASMA DIRECTOR)',
    programsCount: 7,
    image: '/images/arass_insights_fusion.jpg',
    specifications: [
      '24 Tesla Pulsed Magnetic Field Solenoids',
      'Liquid Helium Closed-Loop Cryostat',
    ],
    activeTheses: ['24-Tesla HTS Tape Coils', 'AI Closed-Loop Magnetohydrodynamic Control'],
  },
  {
    id: 'domain-06',
    code: 'DOMAIN 06',
    name: 'CIVILIZATION-SCALE INFRASTRUCTURE',
    focus: 'Orbital logistics and planetary data telecommunication networks.',
    description:
      'Building ultra-reliable laser communication terminals and planetary telemetry meshes for resilient global connectivity.',
    leadFacility: 'GLOBAL GOVERNANCE HUB',
    keyPersonnel: 'DR. E. HOLM (INFRASTRUCTURE CHAIR)',
    programsCount: 11,
    image: '/images/arass_mission_infrastructure.jpg',
    specifications: [
      'Atmospheric Optical Laser Transmission Range',
      'Orbital Telemetry Simulators',
    ],
    activeTheses: ['Laser Satellite Meshes', 'Planetary Sensor Telemetry Networks'],
  },
];

// Insights Articles
export interface InsightArticle {
  id: string;
  number: string;
  domain: string;
  classification: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  abstract: string;
  image: string;
  author: { name: string; title: string; affiliation: string; institution: string };
  metrics: { label: string; value: string }[];
  pullQuote: string;
  sections: { heading: string; content: string }[];
  keyTheses: string[];
  fullContent: string[];
  citations: string[];
  references: string[];
}

export const INSIGHTS_DATA: InsightArticle[] = [
  {
    id: 'briefing-01',
    number: 'BRIEFING 01',
    domain: 'NEURAL INFRASTRUCTURE',
    classification: 'INSTITUTIONAL RESEARCH',
    title: 'THE CRISIS OF DETERMINISM IN AUTONOMOUS SYSTEMS',
    subtitle: 'Why probabilistic deep learning models must be coupled with sovereign deterministic microkernels.',
    date: 'OCTOBER 2026',
    readTime: '12 MIN READ',
    abstract:
      'As AI systems are deployed across mission-critical aerospace, energy, and financial networks, the unpredictability of pure transformer architectures introduces unacceptable tail-risk. This briefing outlines the mathematical foundations for hybrid deterministic-neural engines.',
    image: '/images/arass_insights_fusion.jpg',
    author: {
      name: 'Dr. Evelyn Vance',
      title: 'Principal Systems Architect',
      affiliation: 'ARASS Neural Systems Laboratory',
      institution: 'ARASS INSTITUTE',
    },
    metrics: [
      { label: 'LATENCY BOUND', value: '< 10ms' },
      { label: 'FORMAL SAFETY', value: '100% PROVEN' },
      { label: 'INFERENCE EFFICIENCY', value: '14,000x' },
    ],
    pullQuote: 'A system that cannot prove its boundaries cannot be trusted with civilization-scale infrastructure.',
    sections: [
      {
        heading: '01 / The Failure of Pure Probabilistic Models',
        content:
          'Modern generative architectures achieve high empirical performance under common distributions. However, in adversarial edge environments, hallucination and catastrophic failure remain mathematically unavoidable. Mission-critical systems demand deterministic upper bounds on latency and memory state transitions.',
      },
      {
        heading: '02 / Hybrid Deterministic-Neural Kernels',
        content:
          'By isolating neural weights within formally verified microkernel envelopes, ARASS architectures ensure safety invariants are guaranteed while maintaining sub-10ms response loops.',
      },
    ],
    keyTheses: [
      'Pure probabilistic inference fails under out-of-distribution physical telemetry.',
      'Deterministic microkernels provide formal verification guarantees within bounded latency.',
      'Sovereign architectures eliminate third-party cloud vulnerabilities at scale.',
    ],
    fullContent: [
      'Modern enterprise software has reached a critical inflection point where generative capability exceeds operational verification. For mission-critical infrastructure, latency guarantees and provable safety invariants take precedence over emergent creativity.',
      'ARASS engineers combine custom neuromorphic inference kernels with formally verified Rust state machines to achieve sub-10ms decision loops with zero probability of undefined behavior.',
    ],
    citations: [
      'Vance, E. et al. (2026) "Deterministic Verification Bounds for Autonomous Inference Matrices", ARASS Journal of Deep Systems, 14(2), pp. 104-128.',
      'Max Planck Institute for Informatics (2025) "Formal Methods in Real-Time Neuromorphic Actuation", MPI-CS-TR-2025-08.',
    ],
    references: [
      'IEEE Transactions on Autonomous Systems, Vol. 48, Issue 3, pp. 210-224 (2026).',
      'ACM Symposium on Principles of Distributed Computing (PODC 2025).',
    ],
  },
  {
    id: 'briefing-02',
    number: 'BRIEFING 02',
    domain: 'SOVEREIGN COMPUTING',
    classification: 'STRATEGIC EVALUATION',
    title: 'THE END OF CLOUD VENDOR HEGEMONY',
    subtitle: 'Architecting sovereign on-premises and edge computing infrastructure for global enterprises.',
    date: 'SEPTEMBER 2026',
    readTime: '9 MIN READ',
    abstract:
      'Commercial reliance on centralized hyper-scalers creates systemic geopolitical and cost vulnerabilities. We evaluate the economics and engineering prerequisites for sovereign, self-hosted enterprise infrastructure.',
    image: '/images/arass_discovery_quantum_cleanroom.jpg',
    author: {
      name: 'Marcus Lindqvist',
      title: 'Director of Infrastructure',
      affiliation: 'ARASS Distributed Systems Directorate',
      institution: 'ARASS INSTITUTE',
    },
    metrics: [
      { label: 'PAYBACK HORIZON', value: '18 MONTHS' },
      { label: 'BANDWIDTH SAVINGS', value: '88%' },
      { label: 'SECURITY POSTURE', value: 'AIR-GAPPED' },
    ],
    pullQuote: 'True digital sovereignty is achieved only when the compiling toolchain and physical hardware are owned in full.',
    sections: [
      {
        heading: '01 / The Hidden Cost of Centralized Hyper-Scalers',
        content:
          'Egress tariffs, recurring vendor lock-in, and unpredictable API deprecations represent an escalating tax on enterprise engineering agility.',
      },
      {
        heading: '02 / Deploying Sovereign Edge Infrastructure',
        content:
          'High-density compute appliances deployed directly at enterprise premises yield full compliance and dramatic cost reduction.',
      },
    ],
    keyTheses: [
      'Hyper-scaler pricing models penalize high-throughput inference workloads at scale.',
      'Sovereign hardware clusters achieve amortized payback within 18 months.',
      'Decentralized cryptographic verification eliminates central points of failure.',
    ],
    fullContent: [
      'True institutional sovereignty requires owning the physical compute, network layer, and compiled binaries. By deploying optimized bare-metal infrastructure, ambitious enterprises regain total control over their data, latency, and long-term cost curve.',
    ],
    citations: [
      'Lindqvist, M. (2026) "Technoeconomics of Sovereign Compute Deployment", ARASS Institutional Briefings, 8(1), pp. 45-62.',
    ],
    references: [
      'Harvard Business Review: The Economics of Cloud Repatriation (2025).',
      'European Sovereign Infrastructure Directive Report (2026).',
    ],
  },
];

export interface TechReview {
  id: string;
  code: string;
  name: string;
  domain: string;
  trl: number;
  rating: string;
  status: string;
  assessor: string;
  lastAudited: string;
  summary: string;
  evaluationRubrics: { rubricName: string; score: number; maxScore: number; feedback: string }[];
  technicalFidelity: 'HIGH' | 'MEDIUM-HIGH' | 'MEDIUM' | 'LOW';
}

export const TECH_REVIEWS_DATA: TechReview[] = [
  {
    id: 'rev-ts-01',
    code: 'TS-01',
    name: 'COMPUTATIONAL INTELLIGENCE',
    domain: 'Photonic Mesh Tensor Interconnect',
    trl: 7,
    rating: 'A+',
    status: 'VERIFIED & AUDITED',
    assessor: 'ARASS Advanced Computing Directorate',
    lastAudited: '2026-07-14',
    summary: 'Silicon photonic waveguide mesh evaluated for matrix tensor multiplications. Demonstrated sub-nanosecond processing latency with zero thermal dissipation in passive operations.',
    evaluationRubrics: [
      { rubricName: 'Waveguide Propagation Loss', score: 94, maxScore: 100, feedback: 'Negligible signal loss across 12-channel meshes.' },
      { rubricName: 'Optical-to-Electrical Conversion Delay', score: 98, maxScore: 100, feedback: 'Latency meets or exceeds simulated models at sub-2.4ns.' },
      { rubricName: 'Dynamic Matrix Multiplier Fidelity', score: 90, maxScore: 100, feedback: 'Acoustic vibrational interference minor but within tolerances.' }
    ],
    technicalFidelity: 'HIGH'
  },
  {
    id: 'rev-ts-03',
    code: 'TS-03',
    name: 'ENERGY SYSTEMS',
    domain: 'Quasi-Isodynamic REBCO Stellarator Magnet Mesh',
    trl: 6,
    rating: 'A',
    status: 'UNDER ACTIVE CALIBRATION',
    assessor: 'ARASS High-Energy Physics Group',
    lastAudited: '2026-08-01',
    summary: 'Superconducting 3D REBCO magnetic field grids evaluated for steady-state continuous plasma containment. Attained steady-state peak field parameters of 26.4 Tesla.',
    evaluationRubrics: [
      { rubricName: 'Superconducting Coherence Limit', score: 88, maxScore: 100, feedback: 'Excellent cryogenic stability in nitrogen-helium envelopes.' },
      { rubricName: 'Magnetic Field Topology Symmetry', score: 92, maxScore: 100, feedback: 'Symmetric geometry eliminates plasma edge perturbation modes.' },
      { rubricName: 'Plasma Energy Confinement (Q-factor)', score: 85, maxScore: 100, feedback: 'Preliminary target Q > 3.5 is mathematically model-consistent.' }
    ],
    technicalFidelity: 'MEDIUM-HIGH'
  },
  {
    id: 'rev-ts-05',
    code: 'TS-05',
    name: 'AUTONOMOUS SYSTEMS',
    domain: 'Neuromorphic Proprioceptive Actuator Network',
    trl: 7,
    rating: 'A-',
    status: 'VERIFIED & AUDITED',
    assessor: 'ARASS Robotics and Autonomous Agents Unit',
    lastAudited: '2026-07-29',
    summary: 'Wafer-scale proprioceptive actuator control loops evaluated in real-time humanoid gait simulation and mechanical mockups. Achieved control loop updates under 0.8 ms.',
    evaluationRubrics: [
      { rubricName: 'Actuator Proprioception Response', score: 95, maxScore: 100, feedback: 'Under-millisecond sensory loops verify real-time stabilization.' },
      { rubricName: 'Edge Neuromorphic Compute Efficiency', score: 89, maxScore: 100, feedback: 'Onboard wafer consumes less than 12W under high dynamic load.' },
      { rubricName: 'Payload Stress Endurance Test', score: 91, maxScore: 100, feedback: 'Sustained 140kg payload loads without mechanical structural anomalies.' }
    ],
    technicalFidelity: 'HIGH'
  }
];

