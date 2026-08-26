/**
 * ARASS — Unified Production Seed Data
 * Configures the 5 Sovereign Founders, Authentic Global Hackathons, and Management Stores.
 */

import { hashPassword } from '../auth/password';

export function initialSeedData(db: any) {
  const now = new Date().toISOString();

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

  // =========================================================================
  // 2. PRIMARY INSTITUTIONAL ENTITY
  // =========================================================================
  const orgId = 'org-arass-technology-foundation';
  db.organizations.set(orgId, {
    id: orgId,
    name: 'ARASS Technology Foundation',
    slug: 'arass',
    website: 'https://arass.technology',
    createdAt: now,
    updatedAt: now,
  });

  founders.forEach((f, idx) => {
    db.organizationMembers.set(`om-${idx + 1}`, {
      id: `om-${idx + 1}`,
      organizationId: orgId,
      userId: f.id,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      createdAt: now,
    });
  });

  // =========================================================================
  // 3. AUTHENTIC ARASS HACKATHONS & COMPETITIONS
  // =========================================================================
  const ideathonId = 'evt-arass-ideathon-2026';
  db.events.set(ideathonId, {
    id: ideathonId,
    organizationId: orgId,
    slug: 'arass-ideathon-2026',
    name: 'ARASS GLOBAL IDEATHON 2026',
    shortDescription: 'Global architectural ideation sprint for distributed sovereign software and frontier AI.',
    description: `## ARASS Global Ideathon 2026
The premier challenge for architects and builders worldwide to propose and prototype high-concurrency systems, sovereign digital infrastructure, and deterministic AI reasoning networks.

### Themes:
- Multi-Agent Orchestration Fabrics
- Real-Time Edge Reasoning Engines
- Resilient Sovereign Cloud Topologies`,
    eventType: 'IDEATHON',
    mode: 'ONLINE',
    status: 'REGISTRATION_OPEN',
    visibility: 'PUBLIC',
    banner: '/images/arass_frontier_build_lab.jpg',
    logo: '/images/arass_discovery_quantum_cleanroom.jpg',
    minTeamSize: 1,
    maxTeamSize: 4,
    prizePool: 150000,
    currency: 'INR',
    registrationStart: new Date(Date.now() - 86400000 * 2).toISOString(),
    registrationEnd: new Date(Date.now() + 86400000 * 30).toISOString(),
    eventStart: new Date(Date.now() + 86400000 * 32).toISOString(),
    eventEnd: new Date(Date.now() + 86400000 * 35).toISOString(),
    currentRoundIndex: 0,
    tags: ['AI Systems', 'Distributed Consensus', 'Next.js', 'PyTorch'],
    createdAt: now,
    updatedAt: now,
  });

  const hackathonId = 'evt-arass-frontier-hackathon';
  db.events.set(hackathonId, {
    id: hackathonId,
    organizationId: orgId,
    slug: 'arass-frontier-build-sprint',
    name: 'ARASS FRONTIER BUILD SPRINT',
    shortDescription: 'High-intensity 48-hour systems engineering challenge with validated GPU acceleration and edge deployment.',
    description: `## ARASS Frontier Build Sprint
Engineered for senior software developers, systems programmers, and machine learning researchers. Build mission-critical prototypes that operate with sub-50ms latency and high reliability.`,
    eventType: 'HACKATHON',
    mode: 'HYBRID',
    status: 'LIVE',
    visibility: 'PUBLIC',
    banner: '/images/arass_discovery_quantum_cleanroom.jpg',
    logo: '/images/arass_labs_robotics.jpg',
    minTeamSize: 2,
    maxTeamSize: 4,
    prizePool: 300000,
    currency: 'INR',
    registrationStart: new Date(Date.now() - 86400000 * 10).toISOString(),
    registrationEnd: new Date(Date.now() + 86400000 * 5).toISOString(),
    eventStart: new Date(Date.now() - 86400000 * 1).toISOString(),
    eventEnd: new Date(Date.now() + 86400000 * 3).toISOString(),
    currentRoundIndex: 1,
    tags: ['Systems Programming', 'Rust', 'GPU Pipelines', 'Microservices'],
    createdAt: now,
    updatedAt: now,
  });

  const assessmentId = 'evt-arass-assessment-2026';
  db.events.set(assessmentId, {
    id: assessmentId,
    organizationId: orgId,
    slug: 'arass-core-assessment',
    name: 'ARASS ENGINEERING FELLOWSHIP ASSESSMENT',
    shortDescription: 'Proctored algorithmic and systems architecture evaluation for prospective engineering fellows.',
    description: `## ARASS Engineering Fellowship Assessment
Comprehensive, automated technical assessment measuring algorithmic efficiency, concurrency control, system design, and security compliance.`,
    eventType: 'ASSESSMENT',
    mode: 'ONLINE',
    status: 'REGISTRATION_OPEN',
    visibility: 'PUBLIC',
    banner: '/images/arass_mission_infrastructure.jpg',
    logo: '/images/arass_institutional_monolith.jpg',
    minTeamSize: 1,
    maxTeamSize: 1,
    prizePool: 50000,
    currency: 'INR',
    registrationStart: new Date(Date.now() - 86400000 * 3).toISOString(),
    registrationEnd: new Date(Date.now() + 86400000 * 20).toISOString(),
    eventStart: new Date(Date.now() + 86400000 * 21).toISOString(),
    eventEnd: new Date(Date.now() + 86400000 * 22).toISOString(),
    currentRoundIndex: 0,
    tags: ['Algorithms', 'System Design', 'Code Execution', 'Security'],
    createdAt: now,
    updatedAt: now,
  });

  // =========================================================================
  // 4. FOUNDER CONFERENCE ROOM INITIAL COMMUNICATIONS
  // =========================================================================
  const sampleMessages = [
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

  sampleMessages.forEach((m) => {
    db.founderConferenceMessages.set(m.id, m);
  });

  // =========================================================================
  // 5. FOUNDER SITE EDIT & AUDIT ACTIVITY LOGS
  // =========================================================================
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
