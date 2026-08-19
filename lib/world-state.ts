'use client';

export type SectionId =
  | 'hero'
  | 'discovery'
  | 'ecosystem'
  | 'labs'
  | 'ventures'
  | 'technologies'
  | 'frontier'
  | 'opencall'
  | 'horizon'
  | 'directive';

export interface ARASSWorldState {
  globalProgress: number; // 0.00 to 6.00 continuous across S01-S06
  normalizedProgress: number; // 0.0 to 1.0 full site
  activeSection: SectionId;
  sectionProgress: number; // 0.0 to 1.0 within current section
  scrollVelocity: number; // pixels per second
  scrollDirection: 1 | -1 | 0;
  mouseX: number; // -1 to 1 normalized
  mouseY: number; // -1 to 1 normalized
  pointerVelocity: number;
  isMobile: boolean;
  reducedMotion: boolean;
}

export interface DiscoveryStageInfo {
  id: string;
  number: string;
  title: string;
  message: string;
  startPct: number;
  endPct: number;
}

export const DISCOVERY_STAGES: DiscoveryStageInfo[] = [
  {
    id: 'discover',
    number: '01',
    title: 'DISCOVER',
    message: 'Find the problems others overlook.',
    startPct: 0.1,
    endPct: 0.23,
  },
  {
    id: 'research',
    number: '02',
    title: 'RESEARCH',
    message: "Explore what others haven't.",
    startPct: 0.23,
    endPct: 0.38,
  },
  {
    id: 'invent',
    number: '03',
    title: 'INVENT',
    message: "Create what doesn't exist.",
    startPct: 0.38,
    endPct: 0.53,
  },
  {
    id: 'build',
    number: '04',
    title: 'BUILD',
    message: 'Turn ideas into reality.',
    startPct: 0.53,
    endPct: 0.68,
  },
  {
    id: 'launch',
    number: '05',
    title: 'LAUNCH',
    message: 'Take technology into the world.',
    startPct: 0.68,
    endPct: 0.84,
  },
  {
    id: 'impact',
    number: '06',
    title: 'IMPACT',
    message: 'Change industries. Improve lives.',
    startPct: 0.84,
    endPct: 1.0,
  },
];

export interface EcosystemPillarInfo {
  id: string;
  number: string;
  systemName: string;
  title: string;
  statement: string;
  startPct: number;
  endPct: number;
}

export const ECOSYSTEM_STAGES: EcosystemPillarInfo[] = [
  {
    id: 'labs',
    number: '01',
    systemName: 'RESEARCH',
    title: 'ARASS LABS',
    statement: "Discover what others haven't.",
    startPct: 0.25,
    endPct: 0.35,
  },
  {
    id: 'technologies',
    number: '02',
    systemName: 'TECHNOLOGY',
    title: 'ARASS TECHNOLOGIES',
    statement: 'Turn research into technology.',
    startPct: 0.35,
    endPct: 0.45,
  },
  {
    id: 'ip',
    number: '03',
    systemName: 'IP',
    title: 'ARASS IP',
    statement: 'Protect what we create.',
    startPct: 0.45,
    endPct: 0.55,
  },
  {
    id: 'ventures',
    number: '04',
    systemName: 'VENTURES',
    title: 'ARASS VENTURES',
    statement: 'Build companies around breakthrough technology.',
    startPct: 0.55,
    endPct: 0.65,
  },
  {
    id: 'frontier',
    number: '05',
    systemName: 'FRONTIER',
    title: 'ARASS FRONTIER',
    statement: 'Bring exceptional minds into the system.',
    startPct: 0.65,
    endPct: 0.75,
  },
  {
    id: 'impact',
    number: '06',
    systemName: 'IMPACT',
    title: 'ARASS IMPACT',
    statement: 'Take what we build into the world.',
    startPct: 0.75,
    endPct: 0.85,
  },
];

export interface FrontierStageInfo {
  id: string;
  number: string;
  subTag: string;
  title: string;
  statement: string;
  startPct: number;
  endPct: number;
}

export const FRONTIER_STAGES: FrontierStageInfo[] = [
  {
    id: 'discover',
    number: '01',
    subTag: 'DISCOVER',
    title: 'FIND THE EXCEPTIONAL',
    statement: "Ideas begin with people who see possibilities others don't.",
    startPct: 0.1,
    endPct: 0.28,
  },
  {
    id: 'connect',
    number: '02',
    subTag: 'CONNECT',
    title: 'BRING MINDS TOGETHER',
    statement: 'Researchers, engineers, founders, institutions and capital converge.',
    startPct: 0.28,
    endPct: 0.46,
  },
  {
    id: 'build',
    number: '03',
    subTag: 'BUILD',
    title: 'TURN POSSIBILITY INTO REALITY',
    statement: 'Research becomes technology. Technology becomes intellectual property. Intellectual property becomes ventures.',
    startPct: 0.46,
    endPct: 0.64,
  },
  {
    id: 'frontier',
    number: '04',
    subTag: 'FRONTIER',
    title: 'ENTER THE SYSTEM',
    statement: 'ARASS is building an institution for people who intend to shape what comes next.',
    startPct: 0.64,
    endPct: 0.82,
  },
  {
    id: 'opencall',
    number: '05',
    subTag: 'OPEN CALL',
    title: 'BUILD WITH ARASS',
    statement: 'Researchers. Founders. Engineers. Inventors. Institutions. If you are building something that belongs to the future, we want to hear from you.',
    startPct: 0.82,
    endPct: 1.0,
  },
];

export interface HorizonStageInfo {
  id: string;
  number: string;
  subTag: string;
  title: string;
  statement: string;
  startPct: number;
  endPct: number;
}

export const HORIZON_STAGES: HorizonStageInfo[] = [
  {
    id: 'deep-intelligence',
    number: '01',
    subTag: 'DEEP INTELLIGENCE',
    title: 'AUTONOMOUS REASONING & COGNITIVE INFRASTRUCTURE',
    statement: 'Exploring future AI systems capable of autonomous scientific reasoning and complex physical modeling.',
    startPct: 0.1,
    endPct: 0.28,
  },
  {
    id: 'synthetic-matter',
    number: '02',
    subTag: 'SYNTHETIC MATTER',
    title: 'NEXT-GENERATION MATERIALS & QUANTUM CHEMISTRY',
    statement: 'Researching novel material structures and quantum-level chemical synthesis for next-century applications.',
    startPct: 0.28,
    endPct: 0.46,
  },
  {
    id: 'energy-density',
    number: '03',
    subTag: 'ENERGY DENSITY',
    title: 'ABUNDANT, CLEAN & SOVEREIGN POWER',
    statement: 'Investigating high-density energy frontiers and sovereign power architectures to sustain planetary growth.',
    startPct: 0.46,
    endPct: 0.64,
  },
  {
    id: 'bio-genesis',
    number: '04',
    subTag: 'BIO-GENESIS',
    title: 'REGENERATIVE BIOLOGY & HUMAN HEALTHSPAN',
    statement: 'Pioneering long-term biological research targeting molecular repair and extended human vitality.',
    startPct: 0.64,
    endPct: 0.82,
  },
  {
    id: 'planetary-harmony',
    number: '05',
    subTag: 'PLANETARY HARMONY',
    title: 'TECHNOLOGY AND CIVILIZATION IN BALANCE',
    statement: 'ARASS is building toward the technologies that could define the next century.',
    startPct: 0.82,
    endPct: 1.0,
  },
];

export interface DirectiveStageInfo {
  id: string;
  number: string;
  subTag: string;
  title: string;
  subtitle: string;
  statement: string;
  startPct: number;
  endPct: number;
}

export const DIRECTIVE_STAGES: DirectiveStageInfo[] = [
  {
    id: 'directive',
    number: '01',
    subTag: 'THE DIRECTIVE',
    title: 'TO BUILD WHAT THE FUTURE REQUIRES',
    subtitle: 'PURPOSE & INSTITUTIONAL IMPERATIVE',
    statement: 'ARASS was founded on a singular premise: the technologies that will define human civilization cannot be left to chance or short-term speculation. We exist to systematically discover, invent, and build the foundational systems of tomorrow.',
    startPct: 0.15,
    endPct: 0.3,
  },
  {
    id: 'principles',
    number: '02',
    subTag: 'THE PRINCIPLES',
    title: 'DISCIPLINE. SOVEREIGNTY. IMPACT.',
    subtitle: 'THE ARCHITECTURE OF SELECTION',
    statement: 'We evaluate breakthroughs not by current market trends, but by their capacity for fundamental transformation. We build deep IP, enforce sovereign control over core technologies, and scale only what creates enduring societal value.',
    startPct: 0.3,
    endPct: 0.45,
  },
  {
    id: 'institution',
    number: '03',
    subTag: 'THE INSTITUTION',
    title: 'BUILT BEYOND MARKET CYCLES',
    subtitle: 'MULTI-GENERATIONAL HORIZON',
    statement: 'Startups operate on quarterly lifecycles. ARASS is structured as a permanent institution—an enduring engine designed to continuously incubate, patent, and deploy frontier capabilities across decades.',
    startPct: 0.45,
    endPct: 0.6,
  },
  {
    id: 'convergence',
    number: '04',
    subTag: 'THE CONVERGENCE',
    title: 'EXCEPTIONAL MINDS. PLANETARY CAPITAL.',
    subtitle: 'THE GLOBAL COLLABORATIVE SYSTEM',
    statement: 'A unified network bringing together visionary researchers, elite engineers, pioneering founders, institutional partners, and strategic capital to execute on century-scale ambitions.',
    startPct: 0.6,
    endPct: 0.75,
  },
  {
    id: 'invitation',
    number: '05',
    subTag: 'THE INVITATION',
    title: 'ENTER THE ARASS ECOSYSTEM',
    subtitle: 'INSTITUTIONAL & FOUNDER ALIGNMENT',
    statement: 'Whether you are pioneering breakthroughs in deep labs, building high-impact ventures, or seeking strategic institutional alignment—ARASS is your gateway to shaping the future.',
    startPct: 0.75,
    endPct: 0.9,
  },
  {
    id: 'final-arrival',
    number: '06',
    subTag: 'FINAL ARRIVAL',
    title: 'THE ARASS DIRECTIVE',
    subtitle: 'THE FUTURE IS BUILT HERE',
    statement: 'The next era of technological civilization will belong to those who build it with intention.',
    startPct: 0.9,
    endPct: 1.0,
  },
];



