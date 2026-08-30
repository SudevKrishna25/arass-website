/**
 * ARASS EVENTS — Initial Development & Demo Seed Data
 */

import { hashPassword } from '../auth/password';

export function initialSeedData(db: any) {
  const now = new Date().toISOString();

  // 1. Super Admin Account
  const adminId = '11111111-1111-4111-a111-111111111111';
  db.users.set(adminId, {
    id: adminId,
    email: 'admin@arass.local',
    passwordHash: hashPassword('ARASS@Admin2026!'),
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    emailVerified: true,
    verificationToken: 'verify_test_token_123',
    resetToken: 'reset_test_token_123',
    resetTokenExpires: new Date(Date.now() + 86400000 * 7).toISOString(),
    createdAt: now,
    updatedAt: now,
  });

  db.profiles.set(adminId, {
    id: 'p-11111111-1111-4111-a111-111111111111',
    userId: adminId,
    name: 'ARASS Super Admin',
    skills: ['Architecture', 'Systems Engineering', 'Leadership'],
    bio: 'Lead Administrator for ARASS Global Technology Events Platform.',
    createdAt: now,
    updatedAt: now,
  });

  // 2. Sample Organizer & Evaluator
  const organizerId = '22222222-2222-4222-a222-222222222222';
  db.users.set(organizerId, {
    id: organizerId,
    email: 'organizer@arass.technology',
    passwordHash: hashPassword('Organizer@2026!'),
    role: 'ORGANIZER',
    status: 'ACTIVE',
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  });

  db.profiles.set(organizerId, {
    id: 'p-22222222-2222-4222-a222-222222222222',
    userId: organizerId,
    name: 'Dr. Marcus Vance',
    phone: '+1-555-0199',
    college: 'MIT Technology Institute',
    skills: ['AI Systems', 'Hackathon Operations', 'Curriculum Design'],
    createdAt: now,
    updatedAt: now,
  });

  const evaluatorId = '33333333-3333-4333-a333-333333333333';
  db.users.set(evaluatorId, {
    id: evaluatorId,
    email: 'evaluator@arass.technology',
    passwordHash: hashPassword('Evaluator@2026!'),
    role: 'EVALUATOR',
    status: 'ACTIVE',
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  });

  db.profiles.set(evaluatorId, {
    id: 'p-33333333-3333-4333-a333-333333333333',
    userId: evaluatorId,
    name: 'Elena Rostova',
    skills: ['Distributed Systems', 'Code Quality', 'AI Architecture'],
    createdAt: now,
    updatedAt: now,
  });

  // 3. Sample Participant

  // =========================================================================
  // 1. THE FIVE SOVEREIGN FOUNDERS (EXACT USER ACCOUNTS)
  // =========================================================================
  const founders = [
    {
      id: 'fnd-sudev-krishna-001',
      username: 'sudevkrishna',
      email: 'sudevkrishna@arass.technology',
      password: 'Arass@123-admin001',
      name: 'Sudev Krishna',
      role: 'SUPER_ADMIN',
      title: 'Founder & Executive Lead Architect',
      skills: ['Distributed Systems', 'Neural Architectures', 'Sovereign Systems Design'],
      bio: 'Executive Director and Systems Architect directing ARASS sovereign deep-technology initiatives.',
    },
    {
      id: 'fnd-abhinav-ajith-002',
      username: 'abhinavajith',
      email: 'abhinavajith@arass.technology',
      password: 'Arass@123-admin002',
      name: 'Abhinav Ajith',
      role: 'SUPER_ADMIN',
      title: 'Co-Founder & Head of Infrastructure',
      skills: ['Cloud Mesh', 'Zero-Trust Networks', 'High-Throughput Computing'],
      bio: 'Co-Founder overseeing global computing fabric, resilient infrastructure, and security enclaves.',
    },
    {
      id: 'fnd-abel-sangeeth-003',
      username: 'abelsangeeth',
      email: 'abelsangeeth@arass.technology',
      password: 'Arass@123-admin003',
      name: 'Abel Sangeeth',
      role: 'SUPER_ADMIN',
      title: 'Co-Founder & Head of AI Systems',
      skills: ['Deterministic Reasoning', 'Model Optimization', 'Multi-Agent Mesh'],
      bio: 'Co-Founder leading enterprise AI decision architectures and autonomous orchestration pipelines.',
    },
    {
      id: 'fnd-ryan-paul-004',
      username: 'ryanpaul',
      email: 'ryanpaul@arass.technology',
      password: 'Arass@123-admin004',
      name: 'Ryan Paul',
      role: 'SUPER_ADMIN',
      title: 'Co-Founder & Head of Product Engineering',
      skills: ['Sensory Experiences', 'Product Architecture', 'Spatial 2.5D Systems'],
      bio: 'Co-Founder directing digital product flagship engineering and sensory user environments.',
    },
    {
      id: 'fnd-sani-kuttan-005',
      username: 'sanikuttan',
      email: 'sanikuttan@arass.technology',
      password: 'Arass@123-admin005',
      name: 'Sani Kuttan',
      role: 'SUPER_ADMIN',
      title: 'Co-Founder & Head of Operations',
      skills: ['Operations Strategy', 'Global Partnerships', 'Institutional Scaling'],
      bio: 'Co-Founder orchestrating operational deployment, institutional partnerships, and platform growth.',
    },
  ];

  for (const f of founders) {
    db.users.set(f.id, {
      id: f.id,
      username: f.username,
      email: f.email,
      passwordHash: hashPassword(f.password),
      role: f.role,
      status: 'ACTIVE',
      emailVerified: true,
      createdAt: now,
      updatedAt: now,
    });

    db.profiles.set(f.id, {
      id: `p-${f.id}`,
      userId: f.id,
      name: f.name,
      skills: f.skills,
      bio: f.bio,
      createdAt: now,
      updatedAt: now,
    });
  }

  const participantId = '44444444-4444-4444-a444-444444444444';
  const participantUser = {
    id: participantId,
    email: 'alex.chen@sovereign-tech.org',
    passwordHash: hashPassword('Participant@2026!'),
    role: 'PARTICIPANT' as const,
    status: 'ACTIVE' as const,
    emailVerified: true,
    verificationToken: 'verify_test_token_123',
    resetToken: 'reset_test_token_123',
    resetTokenExpires: new Date(Date.now() + 86400000 * 7).toISOString(),
    createdAt: now,
    updatedAt: now,
  };
  db.users.set(participantId, participantUser);

  db.profiles.set(participantId, {
    id: 'p-44444444-4444-4444-a444-444444444444',
    userId: participantId,
    name: 'Alex Chen',
    college: 'Stanford University',
    course: 'Computer Science',
    year: 'Senior (2026)',
    skills: ['Next.js', 'PyTorch', 'Distributed Consensus', 'Rust'],
    github: 'https://github.com/alexchen',
    linkedin: 'https://linkedin.com/in/alexchen',
    createdAt: now,
    updatedAt: now,
  });

  // Judges & Conflict of Interest Seed Entities
  db.judges.set('judge-1', {
    id: 'judge-1',
    userId: evaluatorId,
    eventId: 'evt-arass-ideathon-2026',
    name: 'Elena Rostova',
    organization: 'ARASS Evaluation Board',
    status: 'ACTIVE',
    createdAt: now,
  });

  db.judges.set('judge-2', {
    id: 'judge-2',
    userId: 'user-judge-2',
    eventId: 'evt-arass-ideathon-2026',
    name: 'Dr. Evelyn Vance',
    organization: 'Quantum Systems Lab',
    status: 'ACTIVE',
    createdAt: now,
  });

  db.judgeConflicts.set('conf-1', {
    id: 'conf-1',
    judgeId: 'judge-2',
    eventId: 'evt-arass-ideathon-2026',
    submissionId: 'sub-synapse-rnd1',
    participantId: participantId,
    reason: 'Prior academic advisory relationship with submitting team.',
    createdAt: now,
  });

  // 4. Primary Organization: ARASS Technology Foundation
  const orgId = 'org-arass-technology-foundation';
  db.organizations.set(orgId, {
    id: orgId,
    name: 'ARASS Technology Foundation',
    slug: 'arass',
    website: 'https://arass.technology',
    createdAt: now,
    updatedAt: now,
  });

  db.organizationMembers.set('om-1', {
    id: 'om-1',
    organizationId: orgId,
    userId: adminId,
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    createdAt: now,
  });

  db.organizationMembers.set('om-2', {
    id: 'om-2',
    organizationId: orgId,
    userId: organizerId,
    role: 'ORGANIZER',
    status: 'ACTIVE',
    createdAt: now,
  });

  // 5. Flagship Event: ARASS IDEATHON 2026
  const ideathonId = 'evt-arass-ideathon-2026';
  db.events.set(ideathonId, {
    id: ideathonId,
    organizationId: orgId,
    slug: 'arass-ideathon-2026',
    name: 'ARASS IDEATHON 2026',
    shortDescription: 'Ideate. Innovate. Inspire. The flagship national ideathon for frontier technology.',
    description:
      'ARASS IDEATHON 2026 brings together ambitious engineers, researchers, and designers to conceive, architect, and prototype transformative solutions in artificial intelligence, spatial computing, and autonomous infrastructure.',
    eventType: 'IDEATHON',
    status: 'REGISTRATION_OPEN',
    mode: 'ONLINE',
    banner: '/images/arass_frontier_build_lab.jpg',
    logo: '/images/arass_institutional_monolith.jpg',
    registrationStart: new Date(Date.now() - 86400000 * 5).toISOString(),
    registrationEnd: new Date(Date.now() + 86400000 * 7).toISOString(),
    eventStart: new Date(Date.now() + 86400000 * 8).toISOString(),
    eventEnd: new Date(Date.now() + 86400000 * 14).toISOString(),
    timezone: 'UTC+05:30',
    minTeamSize: 1,
    maxTeamSize: 3,
    prizePool: 50000,
    createdBy: organizerId,
    createdAt: now,
    updatedAt: now,
  });

  // Event Registration Fields
  db.registrationFields.set('rf-1', {
    id: 'rf-1',
    eventId: ideathonId,
    label: 'College / University Name',
    type: 'COLLEGE',
    required: true,
    order: 1,
  });

  db.registrationFields.set('rf-2', {
    id: 'rf-2',
    eventId: ideathonId,
    label: 'Primary Technical Domain',
    type: 'SELECT',
    required: true,
    order: 2,
    options: ['AI Systems & Autonomous Agents', 'Distributed Infrastructure', 'Sensory UX & Spatial Interfaces'],
  });

  // Event 3 Complete Rounds
  const round1Id = 'rnd-ideathon-1';
  db.rounds.set(round1Id, {
    id: round1Id,
    eventId: ideathonId,
    name: 'Round 1: Idea Pitch & Problem Architecture',
    description: 'Submit an executive concept deck (PDF) outlining problem thesis, proposed system architecture, and viability.',
    order: 1,
    status: 'LIVE',
    startAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 3).toISOString(),
    submissionType: 'MIXED',
    maxAttempts: 3,
    createdAt: now,
    updatedAt: now,
  });

  const round2Id = 'rnd-ideathon-2';
  db.rounds.set(round2Id, {
    id: round2Id,
    eventId: ideathonId,
    name: 'Round 2: Prototype Architecture & Live Demo',
    description: 'Provide live software demonstration repository and functional sandbox walkthrough.',
    order: 2,
    status: 'SCHEDULED',
    startAt: new Date(Date.now() + 86400000 * 4).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 7).toISOString(),
    submissionType: 'URL',
    maxAttempts: 1,
    createdAt: now,
    updatedAt: now,
  });

  const round3Id = 'rnd-ideathon-3';
  db.rounds.set(round3Id, {
    id: round3Id,
    eventId: ideathonId,
    name: 'Round 3: Final Grand Jury Defense',
    description: 'Live presentation before the ARASS Technical Evaluation Board.',
    order: 3,
    status: 'SCHEDULED',
    startAt: new Date(Date.now() + 86400000 * 8).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 10).toISOString(),
    submissionType: 'TEXT',
    maxAttempts: 1,
    createdAt: now,
    updatedAt: now,
  });

  // Evaluation Criteria for Round 1
  const crit1Id = 'crit-1';
  db.evaluationCriteria.set(crit1Id, {
    id: crit1Id,
    roundId: round1Id,
    name: 'Technical Novelty & Innovation',
    description: 'Depth of technical formulation and breakthrough potential.',
    weight: 30,
    maxScore: 30,
    order: 1,
  });

  const crit2Id = 'crit-2';
  db.evaluationCriteria.set(crit2Id, {
    id: crit2Id,
    roundId: round1Id,
    name: 'Architectural Feasibility',
    description: 'System modularity, scalability, and execution rigor.',
    weight: 40,
    maxScore: 40,
    order: 2,
  });

  const crit3Id = 'crit-3';
  db.evaluationCriteria.set(crit3Id, {
    id: crit3Id,
    roundId: round1Id,
    name: 'Impact & Commercial Viability',
    description: 'Value proposition and tangible real-world relevance.',
    weight: 30,
    maxScore: 30,
    order: 3,
  });

  // Sample Team: SYNAPSE LABS
  const teamId = 'team-synapse-labs';
  db.teams.set(teamId, {
    id: teamId,
    eventId: ideathonId,
    name: 'Synapse Labs',
    code: 'SYN-2026-X',
    leaderId: participantId,
    status: 'ACTIVE',
    createdAt: now,
    updatedAt: now,
  });

  db.teamMembers.set('tm-1', {
    id: 'tm-1',
    teamId: teamId,
    userId: participantId,
    role: 'LEADER',
    status: 'ACTIVE',
    joinedAt: now,
  });

  // Sample Registration
  const regId = 'reg-synapse-1';
  db.registrations.set(regId, {
    id: regId,
    eventId: ideathonId,
    userId: participantId,
    teamId: teamId,
    status: 'VERIFIED',
    customValues: {
      'rf-1': 'Stanford University',
      'rf-2': 'AI Systems & Autonomous Agents',
    },
    submittedAt: now,
    createdAt: now,
    updatedAt: now,
  });

  // Sample Submission for Round 1
  const subId = 'sub-synapse-rnd1';
  db.submissions.set(subId, {
    id: subId,
    roundId: round1Id,
    eventId: ideathonId,
    teamId: teamId,
    participantId: participantId,
    title: 'Autonomous Multi-Agent Neural Consensus Architecture',
    description: 'A fault-tolerant orchestration platform for distributed AI reasoning and real-time decision pipelines.',
    url: 'https://github.com/arass-research/synapse-consensus',
    files: [
      {
        filename: 'Synapse_Architecture_Proposal.pdf',
        url: 'https://storage.arass.technology/submissions/Synapse_Architecture_Proposal.pdf',
        size: 2450000,
        mimeType: 'application/pdf',
      },
    ],
    version: 1,
    status: 'EVALUATED',
    submittedAt: now,
    createdAt: now,
    updatedAt: now,
  });

  // Sample Evaluation & Score
  const evalId = 'eval-1';
  db.evaluations.set(evalId, {
    id: evalId,
    roundId: round1Id,
    submissionId: subId,
    evaluatorId: evaluatorId,
    scores: {
      [crit1Id]: 28,
      [crit2Id]: 38,
      [crit3Id]: 27,
    },
    totalScore: 93,
    comments: 'Exceptional architectural rigor with well-defined mathematical boundaries and clear execution paths.',
    status: 'SUBMITTED',
    submittedAt: now,
    createdAt: now,
    updatedAt: now,
  });

  // Verifiable Demo Certificate: ARASS-IDEA-2026-000001
  const certId = 'cert-idea-000001';
  db.certificates.set(certId, {
    id: certId,
    certificateId: 'ARASS-IDEA-2026-000001',
    eventId: ideathonId,
    recipientUserId: participantId,
    recipientName: 'Alex Chen',
    teamId: teamId,
    type: 'WINNER',
    position: 'First Place // Grand Champion',
    status: 'ISSUED',
    issuedAt: now,
    verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  });

  // 6. Additional Flagship Events for Discovery
  db.events.set('evt-neural-hackathon-2026', {
    id: 'evt-neural-hackathon-2026',
    organizationId: orgId,
    slug: 'arass-neural-hackathon-2026',
    name: 'ARASS NEURAL HACKATHON 2026',
    shortDescription: '48-hour continuous build challenge for frontier AI models and autonomous systems.',
    description: 'Build real production-ready agents, perception engines, and automated developer tooling.',
    eventType: 'HACKATHON',
    status: 'SCHEDULED',
    mode: 'HYBRID',
    banner: '/images/arass_discovery_quantum_cleanroom.jpg',
    logo: '/images/arass_institutional_monolith.jpg',
    registrationStart: new Date(Date.now() + 86400000 * 2).toISOString(),
    registrationEnd: new Date(Date.now() + 86400000 * 15).toISOString(),
    eventStart: new Date(Date.now() + 86400000 * 16).toISOString(),
    eventEnd: new Date(Date.now() + 86400000 * 18).toISOString(),
    timezone: 'UTC',
    minTeamSize: 2,
    maxTeamSize: 4,
    prizePool: 100000,
    createdBy: organizerId,
    createdAt: now,
    updatedAt: now,
  });

  db.events.set('evt-quantum-coding-sprint', {
    id: 'evt-quantum-coding-sprint',
    organizationId: orgId,
    slug: 'kinetic-quantum-sprint',
    name: 'KINETIC QUANTUM SPRINT',
    shortDescription: 'High-speed algorithmic challenge and systems engineering speedrun.',
    description: 'Solve complex distributed routing, concurrency bottlenecks, and cryptographic primitives under strict clock limits.',
    eventType: 'CODING_CHALLENGE',
    status: 'REGISTRATION_OPEN',
    mode: 'ONLINE',
    banner: '/images/arass_mission_infrastructure.jpg',
    logo: '/images/arass_institutional_monolith.jpg',
    registrationStart: new Date(Date.now() - 86400000 * 3).toISOString(),
    registrationEnd: new Date(Date.now() + 86400000 * 4).toISOString(),
    eventStart: new Date(Date.now() + 86400000 * 5).toISOString(),
    eventEnd: new Date(Date.now() + 86400000 * 6).toISOString(),
    timezone: 'UTC',
    minTeamSize: 1,
    maxTeamSize: 1,
    prizePool: 30000,
    createdBy: organizerId,
    createdAt: now,
    updatedAt: now,
  });

  db.events.set('evt-aether-design-cup', {
    id: 'evt-aether-design-cup',
    organizationId: orgId,
    slug: 'aether-design-cup',
    name: 'AETHER DESIGN CUP',
    shortDescription: 'Spatial computing, interface architecture, and high-fidelity sensory design challenge.',
    description: 'Design the future of interactive computing, spatial user experiences, and minimalist software interfaces.',
    eventType: 'DESIGN_CHALLENGE',
    status: 'REGISTRATION_OPEN',
    mode: 'ONLINE',
    banner: '/images/arass_frontier_atrium.jpg',
    logo: '/images/arass_institutional_monolith.jpg',
    registrationStart: new Date(Date.now() - 86400000 * 1).toISOString(),
    registrationEnd: new Date(Date.now() + 86400000 * 10).toISOString(),
    eventStart: new Date(Date.now() + 86400000 * 11).toISOString(),
    eventEnd: new Date(Date.now() + 86400000 * 14).toISOString(),
    timezone: 'UTC',
    minTeamSize: 1,
    maxTeamSize: 2,
    prizePool: 40000,
    createdBy: organizerId,
    createdAt: now,
    updatedAt: now,
  });

  // 7. Phase 4 Live Competition Session & Telemetry
  db.competitionSessions.set('session-ideathon-2026', {
    id: 'session-ideathon-2026',
    eventId: ideathonId,
    status: 'LIVE',
    startedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    currentRoundId: round1Id,
    serverTime: now,
    createdAt: now,
    updatedAt: now,
  });

  // Live Announcements
  db.liveAnnouncements.set('ann-1', {
    id: 'ann-1',
    eventId: ideathonId,
    roundId: round1Id,
    title: 'Stage 01 Submissions Window is Live',
    message: 'Ensure all GitHub repositories are public and concept architecture decks are uploaded in PDF format.',
    priority: 'IMPORTANT',
    audience: 'ALL_PARTICIPANTS',
    publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    authorUserId: organizerId,
  });

  db.liveAnnouncements.set('ann-2', {
    id: 'ann-2',
    eventId: ideathonId,
    roundId: round1Id,
    title: 'Evaluation Rubric Briefing Available',
    message: 'The ARASS Technical Evaluation Board has published the exact weighting: Innovation (30%), Feasibility (40%), Impact (30%).',
    priority: 'INFO',
    audience: 'ALL_PARTICIPANTS',
    publishedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    authorUserId: organizerId,
  });

  // Assessment & Quiz Engine
  const assessId = 'assess-ideathon-1';
  db.assessments.set(assessId, {
    id: assessId,
    eventId: ideathonId,
    roundId: round1Id,
    title: 'Distributed Systems & Algorithmic Architecture Challenge',
    description: '40-minute timed knowledge & algorithmic architecture benchmark covering consensus algorithms and concurrency.',
    timeLimitMinutes: 40,
    totalMarks: 50,
    passingMarks: 35,
    randomizeQuestions: false,
    status: 'PUBLISHED',
    createdAt: now,
    updatedAt: now,
  });

  // Assessment Questions
  db.questions.set('q-1', {
    id: 'q-1',
    assessmentId: assessId,
    type: 'MCQ',
    text: 'In the Raft consensus algorithm, which condition must be met before a leader can commit a log entry from its current term?',
    options: [
      { id: 'opt-1-a', text: 'The entry must be stored on a majority of cluster nodes.' },
      { id: 'opt-1-b', text: 'All follower nodes must explicitly acknowledge the entry via heartbeat.' },
      { id: 'opt-1-c', text: 'The term number of all previous uncommitted entries must match.' },
      { id: 'opt-1-d', text: 'A random election timeout must expire without candidate pre-votes.' },
    ],
    correctAnswer: 'opt-1-a',
    marks: 10,
    negativeMarks: 2,
    difficulty: 'HARD',
    order: 1,
  });

  db.questions.set('q-2', {
    id: 'q-2',
    assessmentId: assessId,
    type: 'MCQ',
    text: 'What is the theoretical minimum number of nodes required to tolerate f Byzantine failures in a BFT network?',
    options: [
      { id: 'opt-2-a', text: '2f + 1' },
      { id: 'opt-2-b', text: '3f + 1' },
      { id: 'opt-2-c', text: '4f' },
      { id: 'opt-2-d', text: 'f + 2' },
    ],
    correctAnswer: 'opt-2-b',
    marks: 10,
    negativeMarks: 2,
    difficulty: 'MEDIUM',
    order: 2,
  });

  db.questions.set('q-3', {
    id: 'q-3',
    assessmentId: assessId,
    type: 'TRUE_FALSE',
    text: 'Under the CAP theorem, a distributed system experiencing a network partition can guarantee both strict linearizability (Consistency) and 100% Availability simultaneously.',
    options: [
      { id: 'opt-3-t', text: 'True' },
      { id: 'opt-3-f', text: 'False' },
    ],
    correctAnswer: 'opt-3-f',
    marks: 10,
    negativeMarks: 2,
    difficulty: 'EASY',
    order: 3,
  });

  db.questions.set('q-4', {
    id: 'q-4',
    assessmentId: assessId,
    type: 'CODE',
    text: 'Implement a thread-safe token bucket rate limiter in TypeScript supporting refill rate and burst capacity.',
    codeTemplate: 'class TokenBucketRateLimiter {\n  constructor(private rate: number, private capacity: number) {}\n  allow(): boolean {\n    // TODO: implement\n    return true;\n  }\n}',
    marks: 20,
    difficulty: 'HARD',
    order: 4,
  });

  // Sample Integrity / Anti-Cheat Telemetry
  db.integrityEvents.push({
    id: 'integ-1',
    eventId: ideathonId,
    participantId: participantId,
    type: 'TAB_SWITCH',
    severity: 'LOW',
    status: 'NORMAL',
    details: { durationMs: 1200, count: 1 },
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
  });

  db.integrityEvents.push({
    id: 'integ-2',
    eventId: ideathonId,
    participantId: 'user-part-flagged-99',
    type: 'PASTE',
    severity: 'MEDIUM',
    status: 'FLAGGED',
    details: { charCount: 4500, targetField: 'codeTemplate' },
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
  });

  // 8. Phase 5 Enterprise Operations: Check-in, Judges, Schedule & Sponsors
  db.checkIns.set('checkin-1', {
    id: 'checkin-1',
    eventId: ideathonId,
    participantId: participantId,
    teamId: teamId,
    method: 'QR',
    status: 'CHECKED_IN',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    checkedInBy: organizerId,
  });

  db.checkIns.set('checkin-2', {
    id: 'checkin-2',
    eventId: ideathonId,
    participantId: 'user-part-2',
    method: 'MANUAL',
    status: 'CHECKED_IN',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    checkedInBy: organizerId,
  });

  // Judges
  const judge1Id = 'judge-1';
  db.judges.set(judge1Id, {
    id: judge1Id,
    userId: evaluatorId,
    name: 'Dr. Evelyn Vance',
    email: 'evaluator@arass.technology',
    organization: 'Imperial College London // Distributed Systems Lab',
    expertise: ['Distributed Consensus', 'Fault Tolerance', 'Cryptographic Primitives'],
    workload: 4,
    status: 'ACTIVE',
  });

  const judge2Id = 'judge-2';
  db.judges.set(judge2Id, {
    id: judge2Id,
    name: 'Marcus Sterling',
    email: 'marcus.sterling@sovereign-ai.org',
    organization: 'Sovereign AI Research Institute',
    expertise: ['Neural Compilers', 'Autonomous Agents', 'Interface Architecture'],
    workload: 3,
    status: 'ACTIVE',
  });

  // Judge Assignments
  db.judgeAssignments.set('jassign-1', {
    id: 'jassign-1',
    judgeId: judge1Id,
    eventId: ideathonId,
    roundId: round1Id,
    submissionId: subId,
    status: 'COMPLETED',
  });

  // Judge Conflict Declaration (Marcus has conflict on Synapse Labs)
  db.judgeConflicts.set('jconf-1', {
    id: 'jconf-1',
    judgeId: judge2Id,
    eventId: ideathonId,
    submissionId: subId,
    participantId: participantId,
    reason: 'ORGANIZATION',
    declaredAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  });

  // Event Schedule & Sessions
  db.eventSessions.set('sess-1', {
    id: 'sess-1',
    eventId: ideathonId,
    title: 'Opening Keynote: Frontier Multi-Agent Consensus & Neural Systems',
    speaker: 'Dr. Evelyn Vance',
    venue: 'Virtual Main Stage / Auditorium Alpha',
    room: 'Stream Alpha',
    type: 'KEYNOTE',
    startAt: new Date(Date.now() - 86400000).toISOString(),
    endAt: new Date(Date.now() - 86400000 + 3600000 * 2).toISOString(),
  });

  db.eventSessions.set('sess-2', {
    id: 'sess-2',
    eventId: ideathonId,
    title: 'Technical Mentoring & Architecture Office Hours',
    speaker: 'ARASS Frontier Engineering Team',
    venue: 'Mentoring Rooms 1-4',
    room: 'Discord / Virtual Pods',
    type: 'MENTORING',
    startAt: new Date(Date.now() + 3600000).toISOString(),
    endAt: new Date(Date.now() + 3600000 * 4).toISOString(),
  });

  db.eventSessions.set('sess-3', {
    id: 'sess-3',
    eventId: ideathonId,
    title: 'Grand Finale Live Jury Demonstrations & Award Ceremony',
    speaker: 'Jury Panel & Founder Board',
    venue: 'Main Stage',
    room: 'Stream Prime',
    type: 'PRESENTATION',
    startAt: new Date(Date.now() + 86400000 * 2).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 2 + 3600000 * 3).toISOString(),
  });

  // Sponsors
  db.sponsors.set('spon-1', {
    id: 'spon-1',
    eventId: ideathonId,
    name: 'Sovereign AI Research Lab',
    logo: '/images/arass_institutional_monolith.jpg',
    website: 'https://sovereign.arass.technology',
    tier: 'TITLE',
    description: 'Providing GPU cluster access and foundation model API credits.',
  });

  db.sponsors.set('spon-2', {
    id: 'spon-2',
    eventId: ideathonId,
    name: 'Quantum Systems Alliance',
    logo: '/images/arass_mission_infrastructure.jpg',
    website: 'https://quantum.arass.technology',
    tier: 'GOLD',
    description: 'Escrow sponsorship and research grant allocation.',
  });

  // Mentors
  db.mentors.set('mentor-1', {
    id: 'mentor-1',
    eventId: ideathonId,
    name: 'Dr. Alan Thorne',
    expertise: ['Distributed Consensus', 'Raft / Paxos Optimization'],
    organization: 'MIT CSAIL',
    bio: 'Lead researcher in high-throughput asynchronous consensus protocols.',
    contact: 'alan.thorne@mit.edu',
  });

  db.mentors.set('mentor-2', {
    id: 'mentor-2',
    eventId: ideathonId,
    name: 'Elena Rostova',
    expertise: ['Autonomous Agent Pipelines', 'Verifiable Inference'],
    organization: 'ARASS Research Labs',
    bio: 'Systems architect specializing in low-latency agent orchestration.',
    contact: 'elena.rostova@arass.technology',
  });

  // 9. Phase 6 Production & Operations Seed Data

  // Incidents
  db.incidents.set('inc-1', {
    id: 'inc-1',
    eventId: ideathonId,
    reportedBy: organizerId,
    category: 'TECHNICAL',
    priority: 'HIGH',
    description: 'Minor latency spike detected on artifact storage upload node #4. Redundant mirror active.',
    status: 'RESOLVED',
    assignedOperatorId: organizerId,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    resolvedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  });

  db.incidents.set('inc-2', {
    id: 'inc-2',
    eventId: ideathonId,
    reportedBy: participantId,
    category: 'SUBMISSION',
    priority: 'MEDIUM',
    description: 'Participant requested re-upload confirmation due to university proxy firewall delay.',
    status: 'INVESTIGATING',
    assignedOperatorId: organizerId,
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  });

  // Support Tickets
  db.supportTickets.set('ticket-1', {
    id: 'ticket-1',
    eventId: ideathonId,
    participantId: participantId,
    category: 'TECHNICAL',
    priority: 'HIGH',
    status: 'RESOLVED',
    message: 'How should we specify custom neural compilation weights in our repository deliverables?',
    response: 'Include a weights.config.json in your root repository directory following the ARASS Model Schema v2.',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 7).toISOString(),
  });

  db.supportTickets.set('ticket-2', {
    id: 'ticket-2',
    eventId: ideathonId,
    participantId: participantId,
    category: 'TEAM',
    priority: 'MEDIUM',
    status: 'OPEN',
    message: 'Can we add an additional researcher to our squad roster before the final deadline closes?',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  });

  // Notifications for Alex Chen
  db.notifications.set('notif-1', {
    id: 'notif-1',
    userId: participantId,
    eventId: ideathonId,
    title: 'Stage 01 Submissions Window is Live',
    message: 'Your squad Synapse Labs is qualified for Stage 01. Submit your project deliverable before the deadline.',
    type: 'ROUND_STARTING',
    channel: 'IN_APP',
    read: false,
    actionUrl: '/events/arass-ideathon-2026/live',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  });

  db.notifications.set('notif-2', {
    id: 'notif-2',
    userId: participantId,
    eventId: ideathonId,
    title: 'Deliverable Version 1 Received',
    message: 'Your deliverable Autonomous Agent Neural Consensus Protocol was registered with cryptographic signature.',
    type: 'SUBMISSION_RECEIVED',
    channel: 'IN_APP',
    read: true,
    actionUrl: '/events/arass-ideathon-2026/live',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  });

  db.notifications.set('notif-3', {
    id: 'notif-3',
    userId: participantId,
    eventId: ideathonId,
    title: 'Championship Certificate Generated',
    message: 'Your official verified credential ARASS-IDEA-2026-000001 is ready for viewing and verification.',
    type: 'CERTIFICATE',
    channel: 'IN_APP',
    read: false,
    actionUrl: '/verify/certificate/ARASS-IDEA-2026-000001',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  });

  // Event FAQs
  db.eventFAQs.set('faq-1', {
    id: 'faq-1',
    eventId: ideathonId,
    category: 'General',
    question: 'Who is eligible to participate in the ARASS IDEATHON 2026?',
    answer: 'Students, researchers, engineers, and independent builders from accredited universities and research institutes globally.',
    sortOrder: 1,
  });

  db.eventFAQs.set('faq-2', {
    id: 'faq-2',
    eventId: ideathonId,
    category: 'Submissions',
    question: 'What formats are accepted for the project deliverable?',
    answer: 'Public GitHub repositories with open-source licenses, PDF concept whitepapers, architecture diagrams, and optional live interactive demo URLs.',
    sortOrder: 2,
  });

  db.eventFAQs.set('faq-3', {
    id: 'faq-3',
    eventId: ideathonId,
    category: 'Judging',
    question: 'How is the final score calculated?',
    answer: 'Submissions are scored on a 100-point normalized scale: Innovation (30%), Technical Feasibility (40%), and Global Scalability (30%).',
    sortOrder: 3,
  });

  // Event Rules
  db.eventRules.set('rule-1', {
    id: 'rule-1',
    eventId: ideathonId,
    category: 'ELIGIBILITY',
    ruleTitle: 'Team Composition & Squad Size',
    description: 'Teams must consist of 1 to 4 verified participants. Cross-institutional teams are permitted and encouraged.',
    sortOrder: 1,
  });

  db.eventRules.set('rule-2', {
    id: 'rule-2',
    eventId: ideathonId,
    category: 'IP',
    ruleTitle: 'Intellectual Property Ownership',
    description: 'All intellectual property created during the competition remains 100% owned by the submitting participant and their squad.',
    sortOrder: 2,
  });

  db.eventRules.set('rule-3', {
    id: 'rule-3',
    eventId: ideathonId,
    category: 'CONDUCT',
    ruleTitle: 'Academic Honesty & Anti-Plagiarism',
    description: 'Pre-existing boilerplate libraries are permitted if declared. Complete turnkey duplicates will be disqualified by the Integrity Board.',
    sortOrder: 3,
  });

  // Organizer Tasks
  db.organizerTasks.set('task-1', {
    id: 'task-1',
    eventId: ideathonId,
    title: 'Review Stage 01 Submissions Roster',
    description: 'Verify 42 submitted GitHub deliverables and validate repo accessibility.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    autoGenerated: true,
  });

  db.organizerTasks.set('task-2', {
    id: 'task-2',
    eventId: ideathonId,
    title: 'Confirm Jury Assignment Matrix',
    description: 'Assign remaining 3 unallocated project submissions to Dr. Evelyn Vance and Marcus Sterling.',
    status: 'TODO',
    priority: 'HIGH',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    autoGenerated: true,
  });

  db.organizerTasks.set('task-3', {
    id: 'task-3',
    eventId: ideathonId,
    title: 'Generate Grand Champion Certificates',
    description: 'Trigger Certificate Studio 3.0 batch pipeline for verified finalists.',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    autoGenerated: true,
  });

  // Event Checklist
  const checklistItems = [
    { key: 'chk-reg-open', title: 'Open Public Registration & Microsite', phase: 'BEFORE_EVENT', completed: true },
    { key: 'chk-jury-invite', title: 'Invite & Onboard Expert Jury Panel', phase: 'BEFORE_EVENT', completed: true },
    { key: 'chk-schedule-pub', title: 'Publish Keynote & Mentoring Schedule', phase: 'BEFORE_EVENT', completed: true },
    { key: 'chk-checkin-start', title: 'Launch Venue QR Check-In & Arrival Desk', phase: 'DURING_EVENT', completed: true },
    { key: 'chk-live-telemetry', title: 'Monitor Live Submissions & Anti-Cheat Feed', phase: 'DURING_EVENT', completed: true },
    { key: 'chk-jury-scoring', title: 'Supervise Jury Scoring & Variance Calibration', phase: 'AFTER_EVENT', completed: true },
    { key: 'chk-cert-issue', title: 'Issue Cryptographic Certificates of Honor', phase: 'AFTER_EVENT', completed: false },
    { key: 'chk-archive-event', title: 'Archive Event Artifacts & Final Ledger', phase: 'AFTER_EVENT', completed: false },
  ];

  checklistItems.forEach((item, idx) => {
    db.eventChecklist.set(`chk-${ideathonId}-${idx}`, {
      id: `chk-${ideathonId}-${idx}`,
      eventId: ideathonId,
      phase: item.phase as any,
      itemKey: item.key,
      title: item.title,
      completed: item.completed,
      completedAt: item.completed ? now : undefined,
      completedBy: item.completed ? organizerId : undefined,
    });
  });

  // 10. Website CMS Seed Data
  const defaultPages = [
    { id: 'page-home', slug: 'home', title: 'ARASS Home', description: 'Institutional technology platform.' },
    { id: 'page-work', slug: 'work', title: 'Selected Work & Platforms', description: 'Engineered builds and digital platforms.' },
    { id: 'page-solutions', slug: 'solutions', title: 'Architectural Solutions', description: 'Enterprise technology solutions.' },
    { id: 'page-products', slug: 'products', title: 'Flagship Digital Products', description: 'High-performance software platforms.' },
    { id: 'page-lab', slug: 'lab', title: 'ARASS Research Lab', description: 'Frontier AI and spatial computing experiments.' },
    { id: 'page-company', slug: 'company', title: 'Company & Institutional Mission', description: 'About ARASS Research & Technology.' },
    { id: 'page-insights', slug: 'insights', title: 'Insights & Technical Papers', description: 'Engineering perspectives and research papers.' },
    { id: 'page-contact', slug: 'contact', title: 'Start a Project', description: 'Engage with ARASS engineering team.' },
  ];

  defaultPages.forEach((p) => {
    db.pages.set(p.id, {
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      status: 'PUBLISHED',
      createdAt: now,
      updatedAt: now,
    });
  });

  // Default Navigation Items
  const defaultNav = [
    { id: 'nav-1', label: 'WORK', destination: '/work', order: 1, visibility: 'VISIBLE' },
    { id: 'nav-2', label: 'SOLUTIONS', destination: '/services', order: 2, visibility: 'VISIBLE' },
    { id: 'nav-3', label: 'PRODUCTS', destination: '/work', order: 3, visibility: 'VISIBLE' },
    { id: 'nav-4', label: 'LAB', destination: '/labs', order: 4, visibility: 'VISIBLE' },
    { id: 'nav-5', label: 'COMPANY', destination: '/about', order: 5, visibility: 'VISIBLE' },
    { id: 'nav-6', label: 'INSIGHTS', destination: '/insights', order: 6, visibility: 'VISIBLE' },
    { id: 'nav-7', label: 'EVENTS', destination: '/events', order: 7, visibility: 'VISIBLE' },
    { id: 'nav-8', label: 'START A PROJECT', destination: '/contact', order: 8, visibility: 'VISIBLE', isCta: true },
  ];

  defaultNav.forEach((nav) => {
    db.navigationItems.set(nav.id, {
      ...nav,
      visibility: nav.visibility as any,
      isSystemProtected: true,
    });
  });

  // Default Media Assets
  const initialMedia = [
    { id: 'med-1', filename: 'arass_frontier_atrium.jpg', mimeType: 'image/jpeg', sizeBytes: 1450000, url: '/images/arass_frontier_atrium.jpg', storageKey: 'images/arass_frontier_atrium.jpg', altText: 'ARASS Frontier Atrium' },
    { id: 'med-2', filename: 'arass_discovery_quantum_cleanroom.jpg', mimeType: 'image/jpeg', sizeBytes: 1650000, url: '/images/arass_discovery_quantum_cleanroom.jpg', storageKey: 'images/arass_discovery_quantum_cleanroom.jpg', altText: 'Quantum Cleanroom' },
    { id: 'med-3', filename: 'arass_frontier_build_lab.jpg', mimeType: 'image/jpeg', sizeBytes: 1520000, url: '/images/arass_frontier_build_lab.jpg', storageKey: 'images/arass_frontier_build_lab.jpg', altText: 'Frontier Build Lab' },
  ];

  initialMedia.forEach((med) => {
    db.mediaAssets.set(med.id, {
      ...med,
      uploadedBy: adminId,
      createdAt: now,
    });
  });

  // Initial Audit Log
  db.auditLogs.push({
    id: 'audit-seed-1',
    actorUserId: adminId,
    action: 'EVENT_CREATED',
    resourceType: 'EVENT',
    resourceId: ideathonId,
    ipAddress: '127.0.0.1',
    userAgent: 'ARASS System Initializer',
    metadata: { name: 'ARASS IDEATHON 2026', initialStatus: 'REGISTRATION_OPEN' },
    timestamp: now,
  });

  // =========================================================================
  // FOUNDER CONFERENCE ROOM & FOUNDER AUDIT LOGS
  // =========================================================================
  const sampleFounderMessages = [
    {
      id: 'msg-conf-01',
      senderId: 'fnd-sudev-krishna-001',
      senderName: 'Sudev Krishna',
      senderUsername: 'sudevkrishna',
      channel: 'GENERAL',
      message: 'Welcome to the ARASS Executive Founder Conference Room. All five founder credentials and session controls are active.',
      category: 'NOTICE',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'msg-conf-02',
      senderId: 'fnd-abhinav-ajith-002',
      senderName: 'Abhinav Ajith',
      senderUsername: 'abhinavajith',
      channel: 'INFRASTRUCTURE',
      message: 'Global network cluster telemetry is verified. Edge latency is currently tracking under 45ms across all regions.',
      category: 'DEPLOYMENT',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'msg-conf-03',
      senderId: 'fnd-abel-sangeeth-003',
      senderName: 'Abel Sangeeth',
      senderUsername: 'abelsangeeth',
      channel: 'AI_SYSTEMS',
      message: 'Deterministic reasoning benchmarks updated to 99.2% verified precision SLA.',
      category: 'AUDIT',
      createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    },
  ];

  sampleFounderMessages.forEach((m) => {
    db.founderConferenceMessages.set(m.id, m);
  });

  db.founderAuditLogs = [
    {
      id: 'audit-001',
      actorUsername: 'sudevkrishna',
      actorName: 'Sudev Krishna',
      action: 'SYSTEM_CONFIG_UPDATED',
      details: 'Refined global typography scale and dark contrast scrims across home cinematic scenes.',
      target: 'UI_SYSTEM',
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: 'audit-002',
      actorUsername: 'abhinavajith',
      actorName: 'Abhinav Ajith',
      action: 'SECURITY_POLICY_ENFORCED',
      details: 'Configured 5 founder executive credentials and purged mock demo accounts.',
      target: 'AUTH_GATEWAY',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'audit-003',
      actorUsername: 'ryanpaul',
      actorName: 'Ryan Paul',
      action: 'NAVIGATION_INDEX_RESTORED',
      details: 'Restored Chapter 09 (Systems Blueprints / Technologies) to master directory menu.',
      target: 'MEGA_MENU',
      timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    },
  ];

}
