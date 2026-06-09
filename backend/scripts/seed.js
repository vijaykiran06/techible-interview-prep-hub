const mongoose = require('mongoose');
require('dotenv').config();

const Company = require('../models/companySchema');
const InterviewProcess = require('../models/interviewProcessSchema');
const InterviewQuestion = require('../models/interviewQuestionSchema');
const SuccessStory = require('../models/successStorySchema');
const Compensation = require('../models/compensationSchema');

// ─────────────────────────────────────────────
// COMPANIES (20 total)
// ─────────────────────────────────────────────
const companies = [
  {
    name: 'Google',
    slug: 'google',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    industry: 'Tech',
    headquarters: 'Mountain View, CA',
    founded: 1998,
    website: 'https://www.google.com',
    glassdoorUrl: 'https://www.glassdoor.com/Overview/Working-at-Google',
    description: 'Search, cloud, and AI company powering products used by billions worldwide.',
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: true, views: 3200,
  },
  {
    name: 'Microsoft',
    slug: 'microsoft',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    industry: 'Tech',
    headquarters: 'Redmond, WA',
    founded: 1975,
    website: 'https://www.microsoft.com',
    description: 'Global technology leader in cloud, productivity, and gaming.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: true, views: 2500,
  },
  {
    name: 'Amazon',
    slug: 'amazon',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    industry: 'E-Commerce',
    headquarters: 'Seattle, WA',
    founded: 1994,
    website: 'https://www.amazon.com',
    description: 'E-commerce giant and cloud leader through AWS. Famous for its 16 Leadership Principles.',
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: true, views: 3000,
  },
  {
    name: 'Adobe',
    slug: 'adobe',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png' },
    industry: 'Tech',
    headquarters: 'San Jose, CA',
    founded: 1982,
    website: 'https://www.adobe.com',
    description: 'Creative software and digital experience company powering design, video, and marketing.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: true, views: 1800,
  },
  {
    name: 'Flipkart',
    slug: 'flipkart',
    logo: { url: 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png' },
    industry: 'E-Commerce',
    headquarters: 'Bengaluru, India',
    founded: 2007,
    website: 'https://www.flipkart.com',
    description: "India's largest e-commerce platform, now backed by Walmart.",
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: true, views: 1700,
  },
  {
    name: 'PhonePe',
    slug: 'phonepe',
    logo: { url: 'https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png' },
    industry: 'Finance',
    headquarters: 'Bengaluru, India',
    founded: 2015,
    website: 'https://www.phonepe.com',
    description: 'India\'s leading digital payments platform processing 500M+ transactions/day.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: true, views: 1600,
  },
  {
    name: 'Zomato',
    slug: 'zomato',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png' },
    industry: 'Tech',
    headquarters: 'Gurugram, India',
    founded: 2008,
    website: 'https://www.zomato.com',
    description: 'Food delivery and restaurant discovery platform operating across India and abroad.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: true, views: 1500,
  },
  {
    name: 'Infosys',
    slug: 'infosys',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' },
    industry: 'Tech',
    headquarters: 'Bengaluru, India',
    founded: 1981,
    website: 'https://www.infosys.com',
    description: 'Global IT services and consulting firm with presence in 50+ countries.',
    interviewDifficulty: 'Easy',
    approved: true, approvalStatus: 'approved', featured: false, views: 1400,
  },
  {
    name: 'TCS',
    slug: 'tcs',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg' },
    industry: 'Tech',
    headquarters: 'Mumbai, India',
    founded: 1968,
    website: 'https://www.tcs.com',
    description: "India's largest IT company, part of the Tata Group, hiring thousands annually.",
    interviewDifficulty: 'Easy',
    approved: true, approvalStatus: 'approved', featured: false, views: 1350,
  },
  {
    name: 'Wipro',
    slug: 'wipro',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg' },
    industry: 'Tech',
    headquarters: 'Bengaluru, India',
    founded: 1945,
    website: 'https://www.wipro.com',
    description: 'IT consulting and business process services company with global delivery.',
    interviewDifficulty: 'Easy',
    approved: true, approvalStatus: 'approved', featured: false, views: 1300,
  },
  {
    name: 'Swiggy',
    slug: 'swiggy',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png' },
    industry: 'Tech',
    headquarters: 'Bengaluru, India',
    founded: 2014,
    website: 'https://www.swiggy.com',
    description: 'On-demand food delivery and quick commerce platform.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: true, views: 1450,
  },
  {
    name: 'Razorpay',
    slug: 'razorpay',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg' },
    industry: 'Finance',
    headquarters: 'Bengaluru, India',
    founded: 2014,
    website: 'https://www.razorpay.com',
    description: 'India\'s leading full-stack payment solutions company for businesses.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: true, views: 1380,
  },
  {
    name: 'Meesho',
    slug: 'meesho',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Meesho_logo.png' },
    industry: 'E-Commerce',
    headquarters: 'Bengaluru, India',
    founded: 2015,
    website: 'https://www.meesho.com',
    description: 'Social commerce platform enabling resellers to build businesses online.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: false, views: 1100,
  },
  {
    name: 'CRED',
    slug: 'cred',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/CRED_logo.png' },
    industry: 'Finance',
    headquarters: 'Bengaluru, India',
    founded: 2018,
    website: 'https://www.cred.club',
    description: 'Fintech platform rewarding creditworthy individuals for bill payments.',
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: true, views: 1250,
  },
  {
    name: 'Atlassian',
    slug: 'atlassian',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/en/6/60/Atlassian-logo.svg' },
    industry: 'Tech',
    headquarters: 'Sydney, Australia',
    founded: 2002,
    website: 'https://www.atlassian.com',
    description: 'Enterprise collaboration software company behind Jira, Confluence, and Trello.',
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: true, views: 1420,
  },
  {
    name: 'Uber',
    slug: 'uber',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg' },
    industry: 'Tech',
    headquarters: 'San Francisco, CA',
    founded: 2009,
    website: 'https://www.uber.com',
    description: 'Global ride-hailing and delivery platform operating in 70+ countries.',
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: true, views: 1550,
  },
  {
    name: 'Salesforce',
    slug: 'salesforce',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
    industry: 'Tech',
    headquarters: 'San Francisco, CA',
    founded: 1999,
    website: 'https://www.salesforce.com',
    description: 'World\'s #1 CRM platform powering sales, service, and marketing clouds.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: false, views: 1180,
  },
  {
    name: 'Paytm',
    slug: 'paytm',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg' },
    industry: 'Finance',
    headquarters: 'Noida, India',
    founded: 2010,
    website: 'https://www.paytm.com',
    description: 'Pioneer of digital payments in India — wallets, banking, and financial services.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: false, views: 1150,
  },
  {
    name: 'Dream11',
    slug: 'dream11',
    logo: { url: 'https://images.seeklogo.com/logo-png/44/1/dream11-logo-png_seeklogo-440740.png' },
    industry: 'Tech',
    headquarters: 'Mumbai, India',
    founded: 2008,
    website: 'https://www.dream11.com',
    description: "India's largest fantasy sports platform with 200M+ users.",
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: true, views: 1320,
  },
  {
    name: 'Groww',
    slug: 'groww',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/en/3/3c/Groww_app_logo.png' },
    industry: 'Finance',
    headquarters: 'Bengaluru, India',
    founded: 2016,
    website: 'https://www.groww.in',
    description: 'India\'s leading investment platform for stocks, mutual funds, and digital gold.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: true, views: 1200,
  },
];

// ─────────────────────────────────────────────
// INTERVIEW PROCESSES
// ─────────────────────────────────────────────
const buildInterviewProcesses = (map) => [
  {
    company: map.google,
    overview: "Google's bar is among the highest in the industry. Rounds are independently scored by a Hiring Committee — a single weak round can block an offer. Expect 5–7 rounds over 3–6 weeks, coding in a plain Google Doc with no IDE support.",
    phases: [
      { order: 1, name: 'Recruiter Screen', duration: '30 min', format: 'Phone', whatItTests: 'Background fit and motivation', whatToExpect: ['Walk through your resume', 'Why Google?', 'Role and level alignment'], platforms: ['Phone'] },
      { order: 2, name: 'Phone Screen — Coding', duration: '45–60 min', format: 'Video Call', whatItTests: 'Core DSA and communication', whatToExpect: ['1–2 medium/hard problems in Google Doc', 'No IDE — practise without autocomplete', 'Think out loud at all times'], platforms: ['Google Meet', 'Google Doc'] },
      { order: 3, name: 'Onsite — Coding × 2', duration: '45 min each', format: 'Video Call', whatItTests: 'Algorithms, data structures, optimal complexity', whatToExpect: ['Medium to hard problems per round', 'Interviewer escalates follow-ups', 'Bug-free code expected — trace through examples'], platforms: ['Google Meet'] },
      { order: 4, name: 'Onsite — System Design', duration: '45–60 min', format: 'Video Call', whatItTests: 'Large-scale distributed systems', whatToExpect: ['Design YouTube, Google Maps, or web crawler', 'Scale from 1 to 1B users', 'Drive the design; justify every decision'], platforms: ['Google Meet'] },
      { order: 5, name: 'Googleyness & Leadership', duration: '45 min', format: 'Video Call', whatItTests: 'Culture fit, intellectual humility, collaboration', whatToExpect: ['STAR stories on conflict, ambiguity, helping others', 'Shows you help teammates succeed — not just yourself', 'May include a light stress-coding question'], platforms: ['Google Meet'] },
      { order: 6, name: 'Hiring Committee Review', duration: '1–3 weeks', format: 'Online', whatItTests: 'All scorecards reviewed holistically', whatToExpect: ['HC can approve, reject, or request more rounds', 'Weak rounds can be compensated by exceptional others', 'Recruiter provides updates — process can take 2–4 weeks'], platforms: ['Internal'] },
    ],
    generalTips: [
      'Practise coding in a plain Google Doc — no syntax highlighting, no autocomplete',
      'Master DP and graph algorithms until they feel reflexive',
      'Every answer needs complexity analysis — always state time and space',
      'Prepare 5+ STAR stories covering failure, ambiguity, collaboration, and impact',
      'Google values intellectual humility — take hints gracefully and run with them',
    ],
  },
  {
    company: map.microsoft,
    overview: "Microsoft's process is structured and competency-driven, centred on Growth Mindset. Expect DSA, system design (LLD for SDE-1, HLD for SDE-2+), and behavioural rounds. The process usually takes 2–3 weeks.",
    phases: [
      { order: 1, name: 'Online Assessment', duration: '60–90 min', format: 'Online', whatItTests: 'DSA fundamentals and problem solving', whatToExpect: ['2–3 coding problems (easy to medium)', 'Focus on arrays, strings, recursion, and basic DP', 'No debugging or MCQ — pure coding'], platforms: ['HackerRank'] },
      { order: 2, name: 'Technical Round 1', duration: '45–60 min', format: 'Video Call', whatItTests: 'Coding quality and communication', whatToExpect: ['1–2 medium/hard problems explained live', 'Always discuss brute force before optimising', 'Interviewer watches how you handle partial solutions'], platforms: ['Microsoft Teams'] },
      { order: 3, name: 'Technical Round 2 — Design', duration: '45–60 min', format: 'Video Call', whatItTests: 'LLD for SDE-1, HLD for SDE-2+', whatToExpect: ['SDE-1: Parking lot, elevator, library system', 'SDE-2+: URL shortener, news feed', 'Think out loud and ask clarifying questions first'], platforms: ['Microsoft Teams'] },
      { order: 4, name: 'HR / Behavioural Round', duration: '30 min', format: 'Video Call', whatItTests: 'Growth mindset and culture fit', whatToExpect: ['STAR questions on conflict, failure, and learning', 'Tie every answer to growth and impact', 'Salary negotiation happens here for experienced hires'], platforms: ['Microsoft Teams'] },
    ],
    generalTips: [
      'Practice explaining your thought process out loud — interviewers score communication heavily',
      'Prepare 3–4 STAR stories specifically around learning from failure',
      'Microsoft values Growth Mindset — every story should end with what you learned',
      'Know OOP principles deeply if going for SDE-1 LLD round',
    ],
  },
  {
    company: map.amazon,
    overview: "Amazon's interview is unique — every round is evaluated against Leadership Principles (LPs), not just technical merit. You must weave LPs into behavioural answers and show ownership. Typically 4–5 rounds in a single-day virtual onsite.",
    phases: [
      { order: 1, name: 'Online Assessment', duration: '90 min', format: 'Online', whatItTests: 'DSA and work-style simulation', whatToExpect: ['2 coding problems + work simulation survey', 'Focus on arrays, trees, and hashmaps', 'Work simulation is LP-based — answer honestly'], platforms: ['HackerRank'] },
      { order: 2, name: 'Phone Screen', duration: '60 min', format: 'Video Call', whatItTests: 'Coding + 1–2 LP behavioural questions', whatToExpect: ['1 medium/hard DSA problem', 'At least one LP question (e.g., Customer Obsession)', 'Interviewer takes detailed notes — be structured'], platforms: ['Chime', 'Amazon Internal'] },
      { order: 3, name: 'Onsite Loop (4–5 rounds)', duration: '45–60 min each', format: 'Video Call', whatItTests: 'Coding, system design, and all 16 LPs', whatToExpect: ['Each interviewer owns a subset of LPs', 'One dedicated Bar Raiser round', 'System design: Design Amazon Warehouse, Prime delivery, or search'], platforms: ['Chime'] },
      { order: 4, name: 'Bar Raiser Round', duration: '60 min', format: 'Video Call', whatItTests: 'Holistic evaluation — independent of the hiring team', whatToExpect: ['Asks deep LP questions and probes inconsistencies', 'Can veto an offer regardless of other rounds', 'Tests if you will raise the bar of the existing team'], platforms: ['Chime'] },
    ],
    generalTips: [
      'Prepare 2 strong stories per Leadership Principle (16 LPs = 32 stories minimum)',
      'Use STAR format strictly — Situation, Task, Action, Result with metrics',
      'The Bar Raiser is not your friend — be consistent and deep in your LP answers',
      'For system design, always tie back to Amazon products you are familiar with',
      'Ownership LP: show you went beyond your role and took responsibility for outcomes',
    ],
  },
  {
    company: map.adobe,
    overview: "Adobe's process is thorough and product-aware. Expect a mix of DSA, LLD (especially OOP and design patterns), and questions that test your understanding of creative/document processing software. Typically 3–4 rounds over 2–3 weeks.",
    phases: [
      { order: 1, name: 'Online Assessment', duration: '60–75 min', format: 'Online', whatItTests: 'Core DSA and basic OOP', whatToExpect: ['2 coding problems, medium difficulty', 'Sometimes includes an MCQ section on CS fundamentals', 'Timed — manage your time across both problems'], platforms: ['HackerEarth', 'HackerRank'] },
      { order: 2, name: 'Technical Round 1 — DSA', duration: '60 min', format: 'Video Call', whatItTests: 'Problem solving and code quality', whatToExpect: ['1–2 DSA problems, medium to hard', 'Discuss multiple approaches before coding', 'Strong focus on tree, graph, and string problems'], platforms: ['Zoom', 'CoderPad'] },
      { order: 3, name: 'Technical Round 2 — LLD', duration: '60 min', format: 'Video Call', whatItTests: 'Object-oriented design and design patterns', whatToExpect: ['Design a document editor, plugin system, or image renderer', 'Expected to use SOLID principles and GoF patterns', 'Draw class diagrams and explain relationships'], platforms: ['Zoom'] },
      { order: 4, name: 'Hiring Manager Round', duration: '45 min', format: 'Video Call', whatItTests: 'Culture, product thinking, and past projects', whatToExpect: ['Deep dive on your resume projects', 'May include a feature design question', 'How do you approach technical debt and code quality?'], platforms: ['Zoom'] },
    ],
    generalTips: [
      'Study common design patterns (Strategy, Observer, Factory, Decorator) — they appear in LLD rounds',
      'Adobe heavily tests string manipulation and tree problems — practise these categories',
      'Understand SOLID principles; be ready to apply them to a real design question on the spot',
      'Research Adobe products before the HM round — showing product knowledge impresses interviewers',
    ],
  },
  {
    company: map.flipkart,
    overview: "Flipkart's interviews are fast-paced and practical, focused on real-world e-commerce challenges. System design questions often involve catalog systems, search, and order management. Typically 3–4 rounds.",
    phases: [
      { order: 1, name: 'Online Coding Test', duration: '90 min', format: 'Online', whatItTests: 'DSA — arrays, DP, graphs', whatToExpect: ['3 coding problems of increasing difficulty', 'Time pressure is real — manage carefully', 'Competitive programming style'], platforms: ['HackerEarth'] },
      { order: 2, name: 'Technical Round 1', duration: '60 min', format: 'Video Call', whatItTests: 'Core DSA and clean code', whatToExpect: ['Live coding in shared editor', 'Graph traversal and DP problems frequent', 'Discuss edge cases proactively'], platforms: ['Google Meet'] },
      { order: 3, name: 'Technical Round 2 — System Design', duration: '60 min', format: 'Video Call', whatItTests: 'E-commerce system architecture', whatToExpect: ['Design search, product catalog, or cart system', 'Caching strategy for inventory at scale', 'Discuss DB sharding for 100M+ product catalog'], platforms: ['Google Meet'] },
      { order: 4, name: 'Culture Fit / HM Round', duration: '30–45 min', format: 'Video Call', whatItTests: 'Team fit and past experience depth', whatToExpect: ['Deep dive into past projects and impact', 'Product thinking: how to improve Flipkart search?', 'Questions on handling fast deadlines'], platforms: ['Google Meet'] },
    ],
    generalTips: [
      'Focus on scalability in system design — Flipkart operates at India-scale (100M+ users)',
      'Graph problems appear frequently — DFS, BFS, shortest path, and connected components',
      'Know how search ranking and recommendation systems work at a high level',
      'Use metrics in your behavioural answers — Flipkart is very data-driven',
    ],
  },
  {
    company: map.phonepe,
    overview: "PhonePe interviews are fintech-focused. Expect deep probing on payment system design, distributed consistency, and idempotency. They value candidates who think in terms of data integrity and system resilience.",
    phases: [
      { order: 1, name: 'Online Assessment', duration: '60 min', format: 'Online', whatItTests: 'Core DSA', whatToExpect: ['2 coding problems — easy to medium', 'Arrays, hashmaps, and graph basics', 'Partial scoring — attempt both'], platforms: ['HackerEarth'] },
      { order: 2, name: 'Technical Round 1 — DSA', duration: '45–60 min', format: 'Video Call', whatItTests: 'Problem solving and complexity analysis', whatToExpect: ['Medium/hard coding problems', 'Graph and heap problems are frequent', 'Always state time and space complexity after coding'], platforms: ['Google Meet'] },
      { order: 3, name: 'Technical Round 2 — System Design', duration: '60 min', format: 'Video Call', whatItTests: 'Distributed payment systems and consistency', whatToExpect: ['Design a payment gateway, wallet, or UPI flow', 'Probed heavily on ACID, idempotency, and rollback', 'Saga vs 2PC — know the trade-offs'], platforms: ['Google Meet'] },
      { order: 4, name: 'Hiring Manager Round', duration: '30–45 min', format: 'Video Call', whatItTests: 'Ownership, product thinking, and culture', whatToExpect: ['Past project deep dive with impact metrics', 'Product scenario: how would you handle double-spend?', 'PhonePe values builder mentality — show you ship and own'], platforms: ['Google Meet'] },
    ],
    generalTips: [
      'Study how UPI, NPCI, and digital payment flows work — even basic domain knowledge gives a huge edge',
      'Idempotency is the keyword — mention it in every payment design question',
      'Know CAP theorem, ACID vs BASE, and distributed transaction patterns cold',
      'STAR stories should show ownership and quantified business impact',
    ],
  },
  {
    company: map.zomato,
    overview: "Zomato's process balances DSA, system design for food-tech scale, and product thinking. They value candidates who can build fast and think about real-world reliability. Typically 3–4 rounds in 2 weeks.",
    phases: [
      { order: 1, name: 'Online Coding Round', duration: '60–90 min', format: 'Online', whatItTests: 'DSA and problem solving speed', whatToExpect: ['2–3 coding problems', 'Mix of easy, medium, and occasionally hard', 'Focus on arrays, hashmaps, and graphs'], platforms: ['HackerEarth', 'CodeSignal'] },
      { order: 2, name: 'Technical Round — DSA', duration: '60 min', format: 'Video Call', whatItTests: 'Core algorithms and code quality', whatToExpect: ['Live coding of graph or DP problems', 'Follow-up: can you handle 10× the input?', 'Edge case discussion expected'], platforms: ['Google Meet'] },
      { order: 3, name: 'System Design Round', duration: '60 min', format: 'Video Call', whatItTests: 'Food-tech architecture at scale', whatToExpect: ['Design a food delivery ETA system, live order tracking, or restaurant search', 'Geospatial data handling is a common probe', 'Discuss caching, queuing, and real-time updates'], platforms: ['Google Meet'] },
      { order: 4, name: 'Culture and HM Round', duration: '30 min', format: 'Video Call', whatItTests: 'Product thinking and values alignment', whatToExpect: ['Product question: improve Zomato Gold feature', 'Questions on handling ambiguity and fast execution', 'Zomato moves fast — show you can too'], platforms: ['Google Meet'] },
    ],
    generalTips: [
      'Geolocation and proximity search come up often — understand geohashing and spatial indexing',
      'Real-time tracking systems are a favourite system design topic at Zomato',
      'Keep STAR stories focused on speed of execution and customer impact',
      'Know how message queues (Kafka/SQS) work for order state management',
    ],
  },
  {
    company: map.infosys,
    overview: "Infosys has a well-defined campus hiring process. The focus is on aptitude, basic programming, and communication skills rather than competitive DSA. Process is typically completed in a single recruitment drive day.",
    phases: [
      { order: 1, name: 'Online Aptitude Test', duration: '120 min', format: 'Online', whatItTests: 'Quantitative, logical, and verbal reasoning', whatToExpect: ['Aptitude and reasoning sections', 'Basic programming questions (C/C++/Java/Python)', 'Pseudocode and output-prediction MCQs'], platforms: ['InfyTQ', 'Mettl'] },
      { order: 2, name: 'Technical Interview', duration: '30–45 min', format: 'In-Person', whatItTests: 'Core CS fundamentals and basic coding', whatToExpect: ['DBMS, OS, OOP, and networking concepts', 'Simple programs in your preferred language', 'Questions from your resume projects'], platforms: ['In-Person / Teams'] },
      { order: 3, name: 'HR Interview', duration: '20–30 min', format: 'In-Person', whatItTests: 'Communication, attitude, and adaptability', whatToExpect: ['Tell me about yourself', 'Strengths and weaknesses', 'Are you flexible with location and shift timings?'], platforms: ['In-Person / Teams'] },
    ],
    generalTips: [
      'Complete the InfyTQ certification before applying — it significantly improves shortlisting chances',
      'Revise DBMS (joins, normalisation), OS (processes, threads), and OOP principles',
      'Infosys values clear communication — practise explaining technical concepts simply',
      'Be ready for relocation and flexible on role assignment in the early career',
    ],
  },
  {
    company: map.tcs,
    overview: "TCS National Qualifier Test (NQT) is the gateway to TCS. It's a standardised test-heavy process with very limited technical depth. The primary filter is the aptitude score. Joining is in batches after result.",
    phases: [
      { order: 1, name: 'TCS NQT — Aptitude', duration: '180 min', format: 'Online', whatItTests: 'Numerical, verbal, and reasoning ability', whatToExpect: ['Four sections: Verbal, Reasoning, Numerical, and Coding', '2 coding questions in the Advanced section', 'Higher NQT score = faster TCS Digital/Ninja track selection'], platforms: ['TCS iON'] },
      { order: 2, name: 'Technical Interview', duration: '30–45 min', format: 'Video Call', whatItTests: 'CS fundamentals and resume projects', whatToExpect: ['OOP concepts — inheritance, polymorphism, encapsulation', 'SQL queries, normalisation', 'Explain your final-year project in detail'], platforms: ['Zoom', 'Google Meet'] },
      { order: 3, name: 'Managerial Round', duration: '20–30 min', format: 'Video Call', whatItTests: 'Problem-solving attitude and flexibility', whatToExpect: ['Situational questions on teamwork', 'Questions on handling deadlines and pressure', 'Interest in TCS learning programs and certifications'], platforms: ['Zoom'] },
      { order: 4, name: 'HR Round', duration: '15–20 min', format: 'Video Call', whatItTests: 'Communication and company alignment', whatToExpect: ['HR paperwork and policy overview', 'Bond period and service agreement discussion', 'Relocation preference'], platforms: ['Zoom'] },
    ],
    generalTips: [
      'Score as high as possible on the NQT — it determines which track (Ninja or Digital) you enter',
      'Revise all CS fundamentals: OOP, SQL, OS, and data structures basics',
      'The technical interview is moderate — explain your final-year project confidently',
      'TCS Digital track pays significantly more — aim for 80%+ NQT score to qualify',
    ],
  },
  {
    company: map.wipro,
    overview: "Wipro's recruitment follows a structured drive process similar to TCS and Infosys. Aptitude is the primary filter, followed by a basic technical interview. Good communication is weighted heavily.",
    phases: [
      { order: 1, name: 'Wipro NLTH Test', duration: '120 min', format: 'Online', whatItTests: 'Aptitude, verbal, and coding basics', whatToExpect: ['Aptitude + Essay section', '2 coding problems (basic to moderate)', 'Online proctored — no malpractice'], platforms: ['AMCAT', 'Wipro NLTH Portal'] },
      { order: 2, name: 'Technical Interview', duration: '30 min', format: 'Video Call', whatItTests: 'CS fundamentals and project work', whatToExpect: ['OOP, DBMS, and networking basics', 'Write a simple program in your language', 'Describe your capstone project impact'], platforms: ['Zoom', 'Teams'] },
      { order: 3, name: 'HR Interview', duration: '20 min', format: 'Video Call', whatItTests: 'Attitude, adaptability, and communication', whatToExpect: ['HR standard questions', 'Flexible to shifts, travel, and relocation', 'Interest in Wipro programs and career growth'], platforms: ['Zoom', 'Teams'] },
    ],
    generalTips: [
      'Practise aptitude problems (time-speed-distance, percentages, probability) — this is the main filter',
      'Write and run at least 5–10 basic programs before the test (arrays, strings, patterns)',
      'Be confident and clear during the HR round — attitude matters as much as aptitude',
      'Wipro turbo and Elite tracks pay better — target them with a higher aptitude score',
    ],
  },
  {
    company: map.swiggy,
    overview: "Swiggy's engineering interviews emphasise real-time system design, data pipelines, and practical problem solving for high-frequency logistics. Expect challenging DSA and product-driven system design rounds.",
    phases: [
      { order: 1, name: 'Online Assessment', duration: '90 min', format: 'Online', whatItTests: 'DSA and speed', whatToExpect: ['3 problems: easy + medium + hard', 'Data structures focus: heaps, graphs, intervals', 'Competitive style — optimise for all test cases'], platforms: ['HackerEarth'] },
      { order: 2, name: 'Technical Round 1 — DSA', duration: '60 min', format: 'Video Call', whatItTests: 'Complex algorithms and clean implementation', whatToExpect: ['Hard DSA problems with follow-ups', 'Focus on sliding window, BFS/DFS, and DP', 'Interviewer evaluates code readability too'], platforms: ['Google Meet'] },
      { order: 3, name: 'Technical Round 2 — System Design', duration: '60 min', format: 'Video Call', whatItTests: 'Real-time logistics systems at scale', whatToExpect: ['Design live order tracking, delivery partner assignment, or ETA engine', 'Geospatial queries and distance-based routing are common', 'Discuss real-time event streaming with Kafka'], platforms: ['Google Meet'] },
      { order: 4, name: 'Hiring Manager Round', duration: '45 min', format: 'Video Call', whatItTests: 'Engineering values and product thinking', whatToExpect: ['Deep dive on technical decisions in past work', 'Product scenario: reduce delivery cancellations by 20%', 'Swiggy values engineers who think like product owners'], platforms: ['Google Meet'] },
    ],
    generalTips: [
      'Geospatial and routing algorithms are Swiggy-specific — study geohashing and proximity queries',
      'Know event-driven architecture (Kafka, SQS) deeply — real-time tracking uses them heavily',
      'Swiggy engineers own their systems end-to-end — show you care about reliability and alerting',
      'Use numbers in your STAR stories: "reduced P95 latency from 800ms to 120ms" beats vague answers',
    ],
  },
  {
    company: map.razorpay,
    overview: "Razorpay interviews are technical-heavy with strong fintech flavour. They probe deeply on payment systems, distributed consistency, and API design. Culture fit centres around ownership and speed.",
    phases: [
      { order: 1, name: 'Online Assessment', duration: '60–75 min', format: 'Online', whatItTests: 'DSA and basic system thinking', whatToExpect: ['2 coding problems + 1 design question', 'Medium difficulty, time-constrained', 'MCQs on networking and OS sometimes included'], platforms: ['HackerEarth', 'CodeSignal'] },
      { order: 2, name: 'Technical Round 1 — Coding', duration: '60 min', format: 'Video Call', whatItTests: 'Algorithm depth and problem decomposition', whatToExpect: ['Hard DSA problem with multiple optimisations', 'Discuss all approaches before committing to one', 'Follow-ups on edge cases and scaling'], platforms: ['Google Meet', 'CoderPad'] },
      { order: 3, name: 'Technical Round 2 — System Design', duration: '60 min', format: 'Video Call', whatItTests: 'Payment system architecture and API design', whatToExpect: ['Design Razorpay checkout, a webhook delivery system, or a ledger', 'Idempotency, retry logic, and webhook reliability are probed', 'API design: REST vs event-driven vs gRPC trade-offs'], platforms: ['Google Meet'] },
      { order: 4, name: 'Culture and Leadership Round', duration: '45 min', format: 'Video Call', whatItTests: 'Ownership, autonomy, and engineering values', whatToExpect: ['Tell me about a system you built end-to-end', 'How did you handle production incidents?', 'Razorpay values urgency — show you ship with care and speed'], platforms: ['Google Meet'] },
    ],
    generalTips: [
      'Webhook reliability and idempotent API design are Razorpay staples — prepare them deeply',
      'Know how payment settlement, refunds, and reconciliation work at an API level',
      'Razorpay engineers own their services — show you have dealt with oncall, incidents, and runbooks',
      'API design questions appear often — know REST conventions, versioning, and error handling patterns',
    ],
  },
  {
    company: map.cred,
    overview: "CRED hires very selectively and targets experienced engineers. The bar is FAANG-adjacent. Expect hard DSA, senior-level system design, and deep product discussions. Rounds are few but intense.",
    phases: [
      { order: 1, name: 'Technical Round 1 — Coding', duration: '60–90 min', format: 'Video Call', whatItTests: 'Hard DSA and pattern recognition', whatToExpect: ['2 hard LeetCode-level problems', 'Focus on DP, graphs, and advanced data structures', 'Optimal solutions expected from the start'], platforms: ['CoderPad', 'Google Meet'] },
      { order: 2, name: 'Technical Round 2 — System Design', duration: '60–90 min', format: 'Video Call', whatItTests: 'Large-scale fintech system architecture', whatToExpect: ['Design CRED coins reward engine, credit score system, or bill payments at scale', 'Strong focus on database design, consistency, and fraud prevention', 'Expected to handle 10M concurrent users in your design'], platforms: ['Google Meet'] },
      { order: 3, name: 'Engineering Leadership Round', duration: '60 min', format: 'Video Call', whatItTests: 'Engineering maturity, product depth, and values', whatToExpect: ['CRED looks for engineers who think like founders', 'Questions on technical strategy, team-building, and tradeoffs at scale', 'How do you prioritise tech debt vs feature delivery?'], platforms: ['Google Meet'] },
    ],
    generalTips: [
      'CRED targets senior engineers — your STAR stories must reflect senior-level scope and impact',
      'Credit scoring and fraud detection are domain-specific — brush up on fintech risk basics',
      'CRED values craft: show you care about code quality, developer experience, and system observability',
      'Research CRED products deeply — interviewers expect you to have used and thought about them',
    ],
  },
  {
    company: map.atlassian,
    overview: "Atlassian's process is values-driven alongside technical rigor. OVATION values (Open, Balanced, Continuous, Decisive, Accountable, Thoughtful, Inclusive, Optimistic, Novel) are evaluated explicitly in each round.",
    phases: [
      { order: 1, name: 'Recruiter Screen', duration: '30 min', format: 'Phone', whatItTests: 'Background fit and role alignment', whatToExpect: ['Walk through your experience', 'Why Atlassian and why this role?', 'Overview of OVATION values and the process'], platforms: ['Phone'] },
      { order: 2, name: 'Technical Screen — Coding', duration: '60 min', format: 'Video Call', whatItTests: 'DSA and engineering problem solving', whatToExpect: ['1–2 medium/hard problems', 'Clean code and correct complexity analysis', 'Thinking out loud is explicitly rewarded'], platforms: ['Zoom', 'CoderPad'] },
      { order: 3, name: 'Values Interview', duration: '45 min', format: 'Video Call', whatItTests: 'OVATION values alignment', whatToExpect: ['Structured STAR questions mapped to OVATION', 'Be specific — vague answers score poorly', 'Show examples of inclusive and collaborative behaviour'], platforms: ['Zoom'] },
      { order: 4, name: 'System Design Round', duration: '60 min', format: 'Video Call', whatItTests: 'Large-scale collaboration software design', whatToExpect: ['Design Jira issue tracker, Confluence pages, or a notification system', 'Focus on real-time collaboration and conflict resolution', 'Multi-tenancy and data isolation are key concerns'], platforms: ['Zoom'] },
    ],
    generalTips: [
      'Research Atlassian\'s OVATION values and map each to a personal story before the interview',
      'Atlassian products (Jira, Confluence, Trello) are the context for system design — use them',
      'Multi-tenancy architecture is an Atlassian speciality — know how to design SaaS data isolation',
      'The values interview is scored as rigorously as the technical rounds — prepare it equally seriously',
    ],
  },
  {
    company: map.uber,
    overview: "Uber's interviews reflect the complexity of operating a real-time marketplace at massive global scale. System design focuses on geospatial matching, pricing, and surge algorithms. Technical bar is high.",
    phases: [
      { order: 1, name: 'Recruiter Screen', duration: '30 min', format: 'Phone', whatItTests: 'Background, motivation, and role fit', whatToExpect: ['Walk through your resume and key projects', 'Why Uber? What excites you about the role?', 'Overview of the interview loop'], platforms: ['Phone'] },
      { order: 2, name: 'Technical Phone Screen', duration: '60 min', format: 'Video Call', whatItTests: 'Core DSA and coding fluency', whatToExpect: ['1–2 medium/hard problems in shared editor', 'Graph, tree, or string manipulation common', 'Explain approach before coding'], platforms: ['Karat', 'Google Meet'] },
      { order: 3, name: 'Onsite — Coding × 2', duration: '45 min each', format: 'Video Call', whatItTests: 'Algorithm optimisation and clean code', whatToExpect: ['Hard problems with tight follow-ups', 'One round may focus on concurrency or multithreading', 'Discuss edge cases thoroughly'], platforms: ['Google Meet'] },
      { order: 4, name: 'Onsite — System Design', duration: '60 min', format: 'Video Call', whatItTests: 'Marketplace and real-time system architecture', whatToExpect: ['Design Uber surge pricing, ride matching, or driver-rider dispatch', 'Geospatial indexing (H3, Geohash) knowledge valued', 'Discuss consistency vs latency trade-offs in dispatch'], platforms: ['Google Meet'] },
      { order: 5, name: 'Hiring Manager Round', duration: '45 min', format: 'Video Call', whatItTests: 'Engineering depth and ownership culture', whatToExpect: ['Deep dive on your most impactful project', 'How do you approach incidents and RCA?', 'Uber values engineers who own outcomes, not just tasks'], platforms: ['Google Meet'] },
    ],
    generalTips: [
      'Study geohashing and H3 spatial indexing — Uber system design rounds expect this knowledge',
      'Surge pricing and driver-rider matching algorithms are classic Uber design topics',
      'Concurrency and multithreading questions appear at Uber more than most companies',
      'Show you have dealt with production systems at scale — incident handling stories score well',
    ],
  },
  {
    company: map.dream11,
    overview: "Dream11 has one of the most challenging interview processes among Indian startups. They expect strong algorithms, real-time system design for sports events, and sharp product thinking around fantasy sports.",
    phases: [
      { order: 1, name: 'Online Assessment', duration: '90 min', format: 'Online', whatItTests: 'Advanced DSA', whatToExpect: ['3 hard coding problems', 'Competitive programming level expected', 'Trees, DP, and graphs dominate'], platforms: ['HackerEarth', 'CodeChef'] },
      { order: 2, name: 'Technical Round 1 — Advanced DSA', duration: '60–90 min', format: 'Video Call', whatItTests: 'Algorithm mastery and code quality', whatToExpect: ['Hard LeetCode problems', 'Segment trees, tries, and advanced DP common', 'Optimal O(n log n) solutions expected'], platforms: ['Google Meet'] },
      { order: 3, name: 'Technical Round 2 — System Design', duration: '60–90 min', format: 'Video Call', whatItTests: 'High-throughput real-time systems', whatToExpect: ['Design live leaderboard for 5M concurrent users during IPL final', 'Fantasy team scoring at match-event granularity', 'High write throughput, low read latency architecture'], platforms: ['Google Meet'] },
      { order: 4, name: 'Engineering Leadership Round', duration: '45–60 min', format: 'Video Call', whatItTests: 'Technical vision and ownership depth', whatToExpect: ['How would you scale our recommendation system to 10× users?', 'Deep dive on past projects with architecture decisions', 'Dream11 values proactive engineers who see beyond the ticket'], platforms: ['Google Meet'] },
    ],
    generalTips: [
      'Dream11 expects competitive programming skills — practise HackerEarth and CodeForces problems',
      'Live leaderboard design with 5M concurrent writes is a favourite topic — master this pattern',
      'Fantasy sports scoring requires real-time event processing at sub-second latency — know Kafka + Redis',
      'The bar here is comparable to FAANG — treat it with the same preparation intensity',
    ],
  },
  {
    company: map.groww,
    overview: "Groww interviews balance DSA, system design for fintech and trading systems, and strong ownership culture questions. They move fast — full loop often completes in under 2 weeks.",
    phases: [
      { order: 1, name: 'Online Assessment', duration: '60–90 min', format: 'Online', whatItTests: 'DSA and analytical thinking', whatToExpect: ['2–3 medium/hard coding problems', 'SQL or database query problems sometimes included', 'Focus on arrays, trees, and dynamic programming'], platforms: ['HackerEarth', 'CodeSignal'] },
      { order: 2, name: 'Technical Round 1 — Coding', duration: '60 min', format: 'Video Call', whatItTests: 'Algorithm depth and clean code', whatToExpect: ['Medium to hard problems, often DP or graph-based', 'Multiple follow-ups: can you do it with less memory?', 'Code readability is assessed'], platforms: ['Google Meet'] },
      { order: 3, name: 'Technical Round 2 — System Design', duration: '60 min', format: 'Video Call', whatItTests: 'Financial and trading system architecture', whatToExpect: ['Design a stock price aggregator, portfolio tracker, or order matching engine', 'Strong focus on eventual consistency and audit logging', 'Discuss latency requirements: trading systems need sub-10ms reads'], platforms: ['Google Meet'] },
      { order: 4, name: 'Culture and Values Round', duration: '30–45 min', format: 'Video Call', whatItTests: 'Ownership, speed, and investor trust', whatToExpect: ['How do you handle systems that deal with users\' money?', 'Past experience owning a critical service end-to-end', 'Groww values radical ownership — show you own problems even off-hours'], platforms: ['Google Meet'] },
    ],
    generalTips: [
      'Trading systems require sub-millisecond latency thinking — understand in-memory data stores deeply',
      'Audit logging and financial reconciliation are important in Groww system design — include them',
      'Groww hires fast and expects you to ramp fast — show self-driven learning in your stories',
      'Know mutual fund NAV computation, SIP mechanisms, and basic market concepts before your HM round',
    ],
  },
  {
    company: map.salesforce,
    overview: "Salesforce's process blends strong technical interviews with heavy emphasis on their #1 value: Trust. Expect DSA, LLD/HLD, and a dedicated values interview assessing Salesforce's V2MOM culture.",
    phases: [
      { order: 1, name: 'Recruiter + Technical Screen', duration: '60 min', format: 'Video Call', whatItTests: 'Basic coding and background review', whatToExpect: ['1–2 easy/medium coding problems', 'Walk through 2 significant past projects', 'Overview of Salesforce\'s product and engineering culture'], platforms: ['Zoom'] },
      { order: 2, name: 'Technical Round 1 — DSA', duration: '60 min', format: 'Video Call', whatItTests: 'Algorithm quality and communication', whatToExpect: ['Medium/hard coding problems', 'Strong emphasis on clean, readable code', 'Testing and edge case discussion expected'], platforms: ['Zoom', 'CoderPad'] },
      { order: 3, name: 'Technical Round 2 — Design', duration: '60 min', format: 'Video Call', whatItTests: 'CRM and multi-tenant system design', whatToExpect: ['Design Salesforce org metadata storage, a workflow engine, or data import pipeline', 'Multi-tenancy and row-level security are core concerns', 'Salesforce data volumes can reach billions of records per tenant'], platforms: ['Zoom'] },
      { order: 4, name: 'Values / Behavioural Round', duration: '45 min', format: 'Video Call', whatItTests: 'Salesforce values: Trust, Customer Success, Innovation, Equality', whatToExpect: ['STAR questions mapped to each core value', 'How have you built or maintained trust in a past project?', 'Diversity and inclusion examples are explicitly valued'], platforms: ['Zoom'] },
    ],
    generalTips: [
      'Salesforce\'s #1 value is Trust — every technical decision should consider security and reliability',
      'Multi-tenancy is a Salesforce engineering core competency — design for data isolation across orgs',
      'Practise writing unit tests during the coding round — Salesforce engineering culture is test-driven',
      'Research V2MOM (Vision, Values, Methods, Obstacles, Measures) and Salesforce Ohana culture before HR',
    ],
  },
  {
    company: map.paytm,
    overview: "Paytm interviews cover the full stack of a payments and banking super-app. Expect DSA, wallet/banking system design, and questions on handling financial compliance at scale. The process is typically 3–4 rounds.",
    phases: [
      { order: 1, name: 'Online Assessment', duration: '90 min', format: 'Online', whatItTests: 'DSA and CS fundamentals', whatToExpect: ['3 coding problems: easy + medium + hard', 'Aptitude and CS MCQs sometimes included', 'Partial scoring — solve as much as possible'], platforms: ['HackerEarth', 'Mettl'] },
      { order: 2, name: 'Technical Round 1 — Coding', duration: '60 min', format: 'Video Call', whatItTests: 'Algorithm depth and clean code', whatToExpect: ['Medium/hard DSA problems', 'Graph, DP, and hashmap problems are common', 'Discuss time/space complexity after every solution'], platforms: ['Google Meet'] },
      { order: 3, name: 'Technical Round 2 — System Design', duration: '60 min', format: 'Video Call', whatItTests: 'Payment and banking system architecture', whatToExpect: ['Design a digital wallet, KYC verification flow, or cashback engine', 'Compliance and audit logging are probed frequently', 'Discuss how to handle failed transactions and reconciliation'], platforms: ['Google Meet'] },
      { order: 4, name: 'HR / HM Round', duration: '30–45 min', format: 'Video Call', whatItTests: 'Cultural alignment and project depth', whatToExpect: ['Why Paytm and what you know about their product pivot?', 'Deep dive on your most complex past project', 'Questions around handling high-pressure launches'], platforms: ['Google Meet'] },
    ],
    generalTips: [
      'Paytm operates as a payments bank — know the difference between PPI wallets, UPI, and bank accounts',
      'Regulatory compliance (RBI guidelines) comes up in system design — show you factor in compliance',
      'KYC/AML system design is a common fintech topic — understand document verification pipelines',
      'Paytm values engineers who can build both scale and reliability — mention both in system design answers',
    ],
  },
  {
    company: map.meesho,
    overview: "Meesho hires strong backend and full-stack engineers. Their interviews focus on social commerce at scale, practical DSA, and product thinking around the reseller economy. Process is lean — 3 rounds, fast turnaround.",
    phases: [
      { order: 1, name: 'Online Assessment', duration: '60 min', format: 'Online', whatItTests: 'DSA and programming speed', whatToExpect: ['2 medium coding problems', 'Arrays, strings, and greedy algorithms common', 'Clean code that passes all test cases'], platforms: ['HackerEarth'] },
      { order: 2, name: 'Technical Round — Coding + Design', duration: '60–90 min', format: 'Video Call', whatItTests: 'DSA + LLD in the same round', whatToExpect: ['1 DSA problem followed by a small LLD question', 'LLD: design a shopping cart, wishlist, or order history system', 'Interviewer evaluates both separately — manage time between them'], platforms: ['Google Meet'] },
      { order: 3, name: 'Hiring Manager Round', duration: '45 min', format: 'Video Call', whatItTests: 'Product thinking, ownership, and team fit', whatToExpect: ['How would you design Meesho\'s seller onboarding flow?', 'Past project impact on business metrics', 'Meesho values engineers who understand Tier 2/3 India user behaviour'], platforms: ['Google Meet'] },
    ],
    generalTips: [
      'Meesho\'s users are often first-time internet users in Tier 2/3 India — design for low bandwidth and simple UX',
      'Social sharing and referral mechanics are central to their business — know virality mechanics',
      'The combined coding + LLD round is unique — practise switching between them smoothly',
      'Show product empathy for the reseller persona in your HM round — it differentiates candidates',
    ],
  },
];

// ─────────────────────────────────────────────
// INTERVIEW QUESTIONS
// ─────────────────────────────────────────────
const buildQuestions = (map) => [
  // ── GOOGLE ──────────────────────────────────
  { company: map.google, question: 'Find all pairs of words where concatenation forms a palindrome.', category: 'DSA', difficulty: 'Hard', round: 'Onsite Round 1', pattern: 'Trie + Palindrome Decomposition', thingsToKeepInMind: ['Brute force is O(n²·k) — interviewer will immediately ask for better', 'Insert reversed words into a Trie; check if suffix/prefix is a palindrome', 'Handle the empty-string edge case — it pairs with every palindrome word', 'Consider odd vs even length palindromes separately'], isRecent: true, dateAsked: new Date('2025-01-15'), approved: true, approvalStatus: 'approved', upvotes: 210 },
  { company: map.google, question: 'Design Google Maps — routing engine finding shortest path between two locations.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 3', pattern: 'Graph + Distributed Data — Contraction Hierarchies', thingsToKeepInMind: ['Start with requirements: real-time traffic, ETA accuracy, offline support', 'Naive Dijkstra doesn\'t scale to a world graph — discuss graph partitioning', 'Geo-sharding strategy for storing road segment data is a key probe', 'Discuss bi-directional Dijkstra and A* heuristics'], approved: true, approvalStatus: 'approved', upvotes: 185 },
  { company: map.google, question: 'Find the minimum window substring containing all characters of T.', category: 'DSA', difficulty: 'Hard', round: 'Phone Screen', pattern: 'Sliding Window with Two Frequency Maps', thingsToKeepInMind: ['Use a "have vs need" counter to avoid scanning the full map on every step', 'Expand right pointer to satisfy constraint, shrink left to minimise window', 'This is a classic Google phone screen — know it cold before the interview', 'Handle duplicate characters in T correctly'], isRecent: true, dateAsked: new Date('2025-02-20'), approved: true, approvalStatus: 'approved', upvotes: 175 },
  { company: map.google, question: 'Describe a time you made a significant technical decision with incomplete information.', category: 'Behavioral', difficulty: 'Medium', round: 'Googleyness Round', pattern: 'STAR — Ambiguity Tolerance + Data-Driven Decision Making', thingsToKeepInMind: ['List explicitly what you knew vs did not know at the time', 'Show you consulted others and weighted their input — intellectual humility', 'Quantify the outcome: what happened as a result of your decision?', 'Close with what you would do differently with hindsight'], approved: true, approvalStatus: 'approved', upvotes: 140 },
  { company: map.google, question: 'Design a snake game with a deque and explain the OOP structure.', category: 'LLD', difficulty: 'Medium', round: 'Onsite Round 2', pattern: 'OOP Design + Deque for O(1) head/tail operations', thingsToKeepInMind: ['Model Game, Snake, Food, and Board as separate classes', 'Deque stores snake body positions: O(1) addHead and removeTail', 'Collision detection: use a HashSet of current body positions for O(1) lookup', 'Ask about food respawn strategy — multiple valid designs'], isRecent: true, dateAsked: new Date('2025-03-10'), approved: true, approvalStatus: 'approved', upvotes: 155 },
  { company: map.google, question: 'Given a binary matrix, find the number of distinct islands (same shape counted once).', category: 'DSA', difficulty: 'Hard', round: 'Phone Screen', pattern: 'DFS with Path Signature Hashing', thingsToKeepInMind: ['Record DFS traversal path (directions taken) as a string signature per island', 'Two islands are the same shape only if their path signatures match exactly', 'Normalise coordinates relative to the island\'s top-left cell', 'Handle back-tracking direction markers in your signature string'], isRecent: true, dateAsked: new Date('2025-04-01'), approved: true, approvalStatus: 'approved', upvotes: 163 },
  { company: map.google, question: 'Design YouTube — focus on video upload, processing, and streaming pipeline.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 3', pattern: 'Write-Heavy Async Pipeline — CDN + Adaptive Bitrate Streaming', thingsToKeepInMind: ['Upload pipeline: chunked upload → blob storage → transcoding job queue → CDN', 'Adaptive bitrate (ABR): encode at multiple resolutions; client selects by bandwidth', 'Google probes: how do you handle 4K video uploaded by 10M concurrent users?', 'Discuss deduplication of identical video content across uploads'], approved: true, approvalStatus: 'approved', upvotes: 192 },
  { company: map.google, question: 'Design a distributed key-value store like Google Bigtable.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 4', pattern: 'LSM Tree + SSTable + Bloom Filters', thingsToKeepInMind: ['Writes go to memtable (in-memory), flushed to SSTables on disk — explain why', 'Bloom filters eliminate unnecessary disk reads for missing keys', 'Compaction strategy (leveled vs tiered) is a key trade-off to discuss', 'Range scans require sorted key ordering across SSTables'], isRecent: true, dateAsked: new Date('2025-03-25'), approved: true, approvalStatus: 'approved', upvotes: 178 },
  { company: map.google, question: 'Implement a Median Finder — return median of a running stream of numbers.', category: 'DSA', difficulty: 'Hard', round: 'Onsite Round 1', pattern: 'Two Heaps — Max-Heap (lower half) + Min-Heap (upper half)', thingsToKeepInMind: ['Max-heap for lower half, min-heap for upper half of the stream', 'Rebalance after each insertion so sizes are equal or off by at most 1', 'Median is top of max-heap, or average of both tops', 'Think about duplicate elements and very large streams'], approved: true, approvalStatus: 'approved', upvotes: 168 },
  { company: map.google, question: 'Word Ladder II — find all shortest transformation sequences from beginWord to endWord.', category: 'DSA', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'BFS for shortest path + DFS backtracking to reconstruct all paths', thingsToKeepInMind: ['BFS finds shortest distance; DFS reconstructs all paths of that distance', 'Use a parent map: for each word, store all words at level-1 that reach it', 'Pruning: remove words from dict once they are added to the queue', 'This is one of the hardest graph-string hybrid problems — practise it multiple times'], isRecent: true, dateAsked: new Date('2025-02-05'), approved: true, approvalStatus: 'approved', upvotes: 147 },

  // ── MICROSOFT ───────────────────────────────
  { company: map.microsoft, question: 'Two Sum — find two numbers that add up to a target.', category: 'DSA', difficulty: 'Easy', round: 'Online Assessment', pattern: 'Hash Map for O(n) lookup', thingsToKeepInMind: ['Brute force O(n²) vs hash map O(n) — always explain the trade-off', 'Ask if the array is sorted — changes your optimal approach to two-pointer', 'Handle edge cases: duplicates, negative numbers, no valid pair', 'Confirm whether you can use the same element twice'], isRecent: true, dateAsked: new Date('2025-01-10'), approved: true, approvalStatus: 'approved', upvotes: 120 },
  { company: map.microsoft, question: 'Longest Substring Without Repeating Characters.', category: 'DSA', difficulty: 'Medium', round: 'Technical Round 1', pattern: 'Sliding Window with a HashSet', thingsToKeepInMind: ['Use two pointers (left, right) with a set tracking current window characters', 'When a repeat is found, advance left until the repeat is removed', 'Track max length throughout traversal — don\'t recompute at end', 'Edge cases: all unique characters, all same character, single character'], approved: true, approvalStatus: 'approved', upvotes: 95 },
  { company: map.microsoft, question: 'Design a Parking Lot system.', category: 'LLD', difficulty: 'Medium', round: 'Technical Round 2', pattern: 'OOP Design — ParkingLot, Floor, Slot, Vehicle classes', thingsToKeepInMind: ['Ask about vehicle types (bike, car, truck) and slot types early', 'Use Strategy pattern for parking spot allocation (nearest, random, reserved)', 'Discuss concurrency: two cars entering simultaneously — how do you prevent double booking?', 'Ticket generation and payment flow are often follow-up questions'], approved: true, approvalStatus: 'approved', upvotes: 80 },
  { company: map.microsoft, question: 'Tell me about a time you failed. What did you learn?', category: 'Behavioral', difficulty: 'Medium', round: 'HR Round', pattern: 'STAR — Growth Mindset (Microsoft Core Value)', thingsToKeepInMind: ['Microsoft specifically looks for genuine failure — don\'t use a "humblebrag" story', 'The learning and behaviour change after failure is what they score', 'Quantify the failure impact if possible (missed deadline, production bug, etc.)', 'Show your Growth Mindset by describing what you actively changed afterward'], approved: true, approvalStatus: 'approved', upvotes: 75 },
  { company: map.microsoft, question: 'Implement LRU Cache with O(1) get and put.', category: 'DSA', difficulty: 'Hard', round: 'Technical Round 1', pattern: 'HashMap + Doubly Linked List', thingsToKeepInMind: ['Both get() and put() must be O(1) — that\'s the key constraint to solve for', 'HashMap for O(1) key lookup, doubly linked list for O(1) insert and delete', 'Draw the data structure and pointer states before writing a single line of code', 'Sentinel head and tail nodes simplify edge cases — use them'], isRecent: true, dateAsked: new Date('2025-02-14'), approved: true, approvalStatus: 'approved', upvotes: 110 },
  { company: map.microsoft, question: 'Serialize and Deserialize a Binary Tree.', category: 'DSA', difficulty: 'Hard', round: 'Technical Round 1', pattern: 'BFS level-order serialisation with null markers', thingsToKeepInMind: ['Choose your delimiter carefully — handle null nodes with a placeholder ("N" or "#")', 'BFS (level-order) is easier to reason about for serialisation than DFS', 'Deserialization must reconstruct the tree from a queue — walk through this carefully', 'Test with empty tree, single node, and perfectly balanced tree'], isRecent: true, dateAsked: new Date('2025-03-20'), approved: true, approvalStatus: 'approved', upvotes: 92 },
  { company: map.microsoft, question: 'Design a URL shortener like bit.ly.', category: 'System Design', difficulty: 'Medium', round: 'Technical Round 2', pattern: 'HLD — Read-Heavy Distributed System with Hashing', thingsToKeepInMind: ['Start with scale: reads far exceed writes — design accordingly', 'Hash strategy: MD5 truncated to 7 chars vs base62 counter encoding', 'Caching is essential — most reads are for top 20% of URLs', 'Discuss custom aliases, expiry, and analytics tracking as extensions'], approved: true, approvalStatus: 'approved', upvotes: 88 },

  // ── AMAZON ─────────────────────────────────
  { company: map.amazon, question: 'LRU Cache — design with O(1) get and put operations.', category: 'DSA', difficulty: 'Medium', round: 'Technical Round', pattern: 'HashMap + Doubly Linked List', thingsToKeepInMind: ['Explain HashMap + Doubly Linked List before coding anything', 'Discuss O(1) constraint and why both structures are needed together', 'Always mention edge cases: cache size 1, put existing key, eviction order'], isRecent: true, dateAsked: new Date(), approved: true, approvalStatus: 'approved', upvotes: 140 },
  { company: map.amazon, question: 'Top K Frequent Elements from a stream.', category: 'DSA', difficulty: 'Medium', round: 'Technical Round', pattern: 'Min-Heap of size K + Frequency HashMap', thingsToKeepInMind: ['HashMap tracks counts, min-heap maintains top K by count', 'For true streaming: discuss approximate solutions like Count-Min Sketch', 'Compare bucket sort approach: O(n) time for static arrays vs O(n log k) heap', 'Ask if K is large relative to distinct elements — changes the optimal approach'], isRecent: true, dateAsked: new Date(), approved: true, approvalStatus: 'approved', upvotes: 110 },
  { company: map.amazon, question: 'Tell me about a conflict within your team. How did you resolve it?', category: 'Behavioral', difficulty: 'Medium', round: 'Leadership Principles Round', pattern: 'STAR — Earn Trust & Have Backbone Disagree and Commit', thingsToKeepInMind: ['Amazon specifically scores this against "Earn Trust" and "Have Backbone"', 'Show you raised the disagreement directly and constructively, not via email chain', 'Outcome must show both parties were heard and the right decision was made', 'Add data or metrics to show the decision was ultimately correct'], isRecent: true, dateAsked: new Date(), approved: true, approvalStatus: 'approved', upvotes: 100 },
  { company: map.amazon, question: 'Design Amazon Warehouse Management and order dispatch system.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Loop', pattern: 'Inventory Event-Driven System with Eventual Consistency', thingsToKeepInMind: ['Inventory updates must be atomic — overselling is a critical failure mode', 'Discuss CQRS: separate command (order placement) from query (inventory check)', 'Warehouse picking and routing optimisation is an extension question', 'Tie your design back to Amazon\'s actual fulfilment centre operations'], approved: true, approvalStatus: 'approved', upvotes: 125 },
  { company: map.amazon, question: 'Tell me about a time you took ownership of a project outside your scope.', category: 'Behavioral', difficulty: 'Medium', round: 'Bar Raiser Round', pattern: 'STAR — Ownership LP (most heavily weighted at Amazon)', thingsToKeepInMind: ['This tests Amazon\'s #1 LP: Ownership — pick your strongest story', 'The key: you saw a gap, acted without being asked, and drove to resolution', 'Quantify business impact — "reduced latency by 40%" beats "improved performance"', 'Bar Raiser will probe further: why did you do this? what would have happened if you didn\'t?'], approved: true, approvalStatus: 'approved', upvotes: 130 },
  { company: map.amazon, question: 'Clone a Linked List with Random Pointer — O(n) time, O(1) space.', category: 'DSA', difficulty: 'Hard', round: 'Technical Round', pattern: 'In-Place Weaving — Interleave Original and Clone Nodes', thingsToKeepInMind: ['Three-pass approach: interleave → assign random pointers → separate lists', 'The O(1) space constraint is the entire trick — O(n) hashmap is the easy solution', 'Draw the pointer state after each pass before writing any code', 'Practice this problem until the three-pass structure is automatic'], approved: true, approvalStatus: 'approved', upvotes: 95 },

  // ── ADOBE ──────────────────────────────────
  { company: map.adobe, question: 'Design a Photoshop Plugin Architecture.', category: 'LLD', difficulty: 'Medium', round: 'Technical Round 2', pattern: 'Plugin Pattern — Interface + Registry + Lifecycle Hooks', thingsToKeepInMind: ['Define a Plugin interface with init(), execute(), and destroy() lifecycle hooks', 'Plugin registry should support dynamic loading and hot-swapping', 'Discuss sandboxing: how do you prevent a plugin from crashing the host app?', 'Version compatibility between plugin API versions is a key probe'], approved: true, approvalStatus: 'approved', upvotes: 85 },
  { company: map.adobe, question: 'Implement LRU Cache.', category: 'DSA', difficulty: 'Medium', round: 'Technical Round 1', pattern: 'HashMap + Doubly Linked List', thingsToKeepInMind: ['Explain both data structures and why each is needed', 'Use dummy head and tail to simplify boundary conditions', 'Test with capacity=1 and accessing the same key repeatedly'], approved: true, approvalStatus: 'approved', upvotes: 70 },
  { company: map.adobe, question: 'Design a Document Versioning System like Google Docs history.', category: 'System Design', difficulty: 'Hard', round: 'Technical Round 2', pattern: 'Event Sourcing + Operational Transform (OT)', thingsToKeepInMind: ['Store diffs (operations) rather than full document snapshots', 'Operational Transform (OT) resolves concurrent edits — explain the basic idea', 'Snapshot + delta compression for efficient storage and fast replay', 'Discuss conflict resolution for offline edits that sync later'], isRecent: true, dateAsked: new Date('2025-01-30'), approved: true, approvalStatus: 'approved', upvotes: 90 },
  { company: map.adobe, question: 'Find the Kth largest element in an array without sorting.', category: 'DSA', difficulty: 'Medium', round: 'Technical Round 1', pattern: 'QuickSelect Algorithm — Average O(n), Worst O(n²)', thingsToKeepInMind: ['QuickSelect is like QuickSort but recurses only on one partition', 'Average O(n) time but worst case O(n²) — discuss randomised pivot selection', 'Alternative: min-heap of size K gives O(n log k) deterministically', 'Ask: is K always valid? What if K > array length?'], approved: true, approvalStatus: 'approved', upvotes: 75 },

  // ── PHONEPE ────────────────────────────────
  { company: map.phonepe, question: 'Detect circular money transfer in a list of transactions (cycle in directed graph).', category: 'DSA', difficulty: 'Hard', round: 'Technical Round 1', pattern: 'DFS Cycle Detection with Three-Color Marking', thingsToKeepInMind: ['Model accounts as nodes, transactions as directed edges', 'Use three-color DFS (white/gray/black) to find back edges', 'Explain why BFS doesn\'t work cleanly for directed graph cycle detection', 'Discuss real-world implication: this is fraud detection in production systems'], isRecent: true, dateAsked: new Date('2025-02-10'), approved: true, approvalStatus: 'approved', upvotes: 115 },
  { company: map.phonepe, question: 'Design a highly available payment processing system handling 50,000 TPS.', category: 'System Design', difficulty: 'Hard', round: 'Technical Round 2', pattern: 'Distributed System — Write-Heavy, Strong Consistency Required', thingsToKeepInMind: ['Idempotency key is non-negotiable — every payment request needs one', 'Discuss two-phase commit vs saga pattern for distributed transactions', 'Debit must be ACID — strong consistency on the ledger is non-negotiable', 'Discuss retry storms and circuit breakers in the payment flow'], approved: true, approvalStatus: 'approved', upvotes: 130 },
  { company: map.phonepe, question: 'How would you handle a payment deducted from wallet but merchant never receives it?', category: 'Domain-Specific', difficulty: 'Medium', round: 'Technical Round 2', pattern: 'Partial Failure Recovery — Outbox Pattern + Reconciliation', thingsToKeepInMind: ['This is a distributed partial failure — the outbox pattern solves it cleanly', 'Reconciliation batch job runs periodically to detect and resolve discrepancies', 'Customer-facing: show failed state immediately, resolve async in background', 'Discuss idempotent retry to avoid double-credit on the merchant side'], approved: true, approvalStatus: 'approved', upvotes: 108 },
  { company: map.phonepe, question: 'Rate limiter — allow each user 100 API calls per minute.', category: 'DSA', difficulty: 'Medium', round: 'Technical Round 1', pattern: 'Token Bucket Algorithm or Sliding Window Log', thingsToKeepInMind: ['Fixed window is simplest but has burst at window boundary — explain this flaw', 'Token bucket is practical for API rate limiting at scale', 'Distributed rate limiting: Redis with atomic Lua scripts or INCR + EXPIRE', 'Discuss what happens when the rate limiter itself goes down'], isRecent: true, dateAsked: new Date('2025-03-05'), approved: true, approvalStatus: 'approved', upvotes: 98 },

  // ── ZOMATO ─────────────────────────────────
  { company: map.zomato, question: 'Design a real-time food delivery tracking system.', category: 'System Design', difficulty: 'Hard', round: 'System Design Round', pattern: 'WebSocket + Geospatial Event Streaming', thingsToKeepInMind: ['WebSocket for real-time push vs polling — discuss latency trade-offs', 'GPS location updates every 5 seconds from 50,000 active riders', 'Geohash partitioning for sharding location data by region', 'Discuss message queuing (Kafka) to buffer location events before DB write'], approved: true, approvalStatus: 'approved', upvotes: 120 },
  { company: map.zomato, question: 'Find restaurants within 5 km radius given user\'s GPS coordinates.', category: 'DSA', difficulty: 'Medium', round: 'Technical Round', pattern: 'Geohashing + K-D Tree for Proximity Search', thingsToKeepInMind: ['Geohash encodes lat/long into a string prefix — nearby points share prefixes', 'KD-Tree supports O(log n) nearest-neighbour search — know when to use it', 'Discuss bounding box approximation as a first pass, then refine with exact distance', 'At scale: ElasticSearch with geo_distance query is the production approach'], approved: true, approvalStatus: 'approved', upvotes: 95 },
  { company: map.zomato, question: 'You are building Zomato Gold — design the subscription benefit engine.', category: 'System Design', difficulty: 'Medium', round: 'System Design Round', pattern: 'Rule Engine + Event-Driven Benefit Application', thingsToKeepInMind: ['Benefits vary by restaurant and subscription tier — use a rule engine pattern', 'Benefit application must be idempotent — users cannot get the same benefit twice', 'Discuss how to handle benefit expiry, mid-cycle cancellations, and prorated refunds', 'Analytics: how do you track benefit utilisation rate across restaurants?'], isRecent: true, dateAsked: new Date('2025-01-20'), approved: true, approvalStatus: 'approved', upvotes: 88 },

  // ── FLIPKART ───────────────────────────────
  { company: map.flipkart, question: 'Design Flipkart\'s product search and ranking system.', category: 'System Design', difficulty: 'Hard', round: 'Technical Round 2', pattern: 'Inverted Index + Ranking Pipeline with Feature Scoring', thingsToKeepInMind: ['Inverted index for full-text search; discuss tokenisation and stemming', 'Ranking score = weighted sum of relevance, popularity, rating, and availability', 'Personalisation: how do you serve different rankings per user?', 'Index update lag: discuss near-real-time index update vs batch rebuild'], approved: true, approvalStatus: 'approved', upvotes: 110 },
  { company: map.flipkart, question: 'Find the maximum product subarray.', category: 'DSA', difficulty: 'Medium', round: 'Technical Round 1', pattern: 'Dynamic Programming — Track Max and Min at Each Step', thingsToKeepInMind: ['A negative × negative = positive — you must track min as well as max', 'At each step: new_max = max(nums[i], max_so_far × nums[i], min_so_far × nums[i])', 'Reset when encountering zero — start a fresh subarray', 'Extend: what if the array can wrap around (circular)?'], approved: true, approvalStatus: 'approved', upvotes: 78 },
  { company: map.flipkart, question: 'Design a flash sale system for Big Billion Days — 10M concurrent users.', category: 'System Design', difficulty: 'Hard', round: 'Technical Round 2', pattern: 'Inventory Lock with Redis + Async Queue Drain', thingsToKeepInMind: ['Overselling is the critical failure mode — atomic decrement in Redis prevents it', 'Use a queue to drain purchase requests at a controlled rate', 'Read-through cache for product data; write-through for inventory', 'Discuss pre-warming CDN and database connection pools before the sale event'], isRecent: true, dateAsked: new Date('2025-02-28'), approved: true, approvalStatus: 'approved', upvotes: 125 },

  // ── SWIGGY ─────────────────────────────────
  { company: map.swiggy, question: 'Design delivery partner assignment — match rider to order in under 200ms.', category: 'System Design', difficulty: 'Hard', round: 'System Design Round', pattern: 'Geospatial Matching + Priority Queue with SLA Constraints', thingsToKeepInMind: ['Use geohash to find candidates in the same region first', 'Score riders by distance, current load, and SLA remaining time', 'Sub-200ms constraint requires in-memory matching — no DB round-trip', 'Discuss what happens when no rider is available in radius — expand gradually'], approved: true, approvalStatus: 'approved', upvotes: 115 },
  { company: map.swiggy, question: 'Merge K sorted arrays efficiently.', category: 'DSA', difficulty: 'Medium', round: 'Technical Round 1', pattern: 'Min-Heap with (value, arrayIndex, elementIndex) tuple', thingsToKeepInMind: ['Push the first element of each array into a min-heap', 'After extracting min, push the next element from the same array', 'Time complexity: O(N log K) where N = total elements, K = number of arrays', 'Discuss the naive O(N log N) sort-all approach and why the heap is better'], approved: true, approvalStatus: 'approved', upvotes: 88 },

  // ── INFOSYS ────────────────────────────────
  { company: map.infosys, question: 'What are the four pillars of OOP? Give real examples.', category: 'DSA', difficulty: 'Easy', round: 'Technical Interview', pattern: 'CS Fundamentals — OOP Concepts', thingsToKeepInMind: ['Encapsulation: bundling data and methods; use an ATM as example', 'Inheritance: is-a relationship; avoid explaining using Animal → Dog', 'Polymorphism: same method, different behaviour — use a real payment example', 'Abstraction: hiding implementation; give an API design example'], approved: true, approvalStatus: 'approved', upvotes: 60 },
  { company: map.infosys, question: 'Write a program to reverse a linked list.', category: 'DSA', difficulty: 'Easy', round: 'Technical Interview', pattern: 'Iterative Three-Pointer Reversal', thingsToKeepInMind: ['Use three pointers: prev, curr, next', 'Update links iteratively: curr.next = prev, then advance all three', 'Recursive version is elegant but uses O(n) call stack — know both', 'Test with empty list, single node, and even vs odd length'], approved: true, approvalStatus: 'approved', upvotes: 55 },

  // ── TCS ────────────────────────────────────
  { company: map.tcs, question: 'Explain DBMS normalisation. What is 3NF?', category: 'Domain-Specific', difficulty: 'Easy', round: 'Technical Interview', pattern: 'CS Fundamentals — Database Design', thingsToKeepInMind: ['1NF: atomic columns, no repeating groups', '2NF: no partial dependency on a composite primary key', '3NF: no transitive dependency (non-key field depending on another non-key field)', 'Give a practical example: Student-Course table before and after normalisation'], approved: true, approvalStatus: 'approved', upvotes: 50 },
  { company: map.tcs, question: 'Write SQL to find the second highest salary from an Employees table.', category: 'Domain-Specific', difficulty: 'Easy', round: 'Technical Interview', pattern: 'SQL Subquery or DENSE_RANK()', thingsToKeepInMind: ['Simple subquery: SELECT MAX(salary) WHERE salary < (SELECT MAX(salary)...)', 'DENSE_RANK() approach handles ties correctly — preferred in interviews', 'Ask: what if two employees have the same highest salary? Discuss tie handling', 'Extend: how would you find Nth highest salary? Generalise your solution'], approved: true, approvalStatus: 'approved', upvotes: 65 },

  // ── WIPRO ──────────────────────────────────
  { company: map.wipro, question: 'What is the difference between process and thread?', category: 'Domain-Specific', difficulty: 'Easy', round: 'Technical Interview', pattern: 'CS Fundamentals — Operating Systems', thingsToKeepInMind: ['Process: independent memory space; thread: shared memory within a process', 'Context switching is cheaper between threads than between processes', 'Race conditions arise when threads share mutable data — mention locks/semaphores', 'Give a real example: a web server using threads to handle concurrent requests'], approved: true, approvalStatus: 'approved', upvotes: 45 },

  // ── CRED ───────────────────────────────────
  { company: map.cred, question: 'Design a credit score update system that processes 50M users daily.', category: 'System Design', difficulty: 'Hard', round: 'System Design Round', pattern: 'Batch + Event-Driven Hybrid Pipeline', thingsToKeepInMind: ['Credit score depends on payment history, utilisation, age — model each factor', 'Batch pipeline (Spark) for full recalculation nightly; events for real-time triggers', 'Consistency: a user paying a bill should see score update within minutes', 'Audit trail: every score change must be traceable to a triggering event'], isRecent: true, dateAsked: new Date('2025-01-25'), approved: true, approvalStatus: 'approved', upvotes: 105 },
  { company: map.cred, question: 'Design a fraud detection system for CRED credit card payments.', category: 'System Design', difficulty: 'Hard', round: 'System Design Round', pattern: 'Real-Time ML Scoring Pipeline with Rule Engine Fallback', thingsToKeepInMind: ['Two layers: fast rule engine (< 10ms) + async ML model scoring', 'Feature store provides real-time user behaviour features to the ML model', 'Discuss false positive trade-off: blocking legitimate transactions is also costly', 'Feedback loop: approved/blocked outcomes retrain the model over time'], approved: true, approvalStatus: 'approved', upvotes: 118 },

  // ── ATLASSIAN ─────────────────────────────
  { company: map.atlassian, question: 'Design Jira — issue tracking with hierarchical projects, epics, stories, and tasks.', category: 'System Design', difficulty: 'Hard', round: 'System Design Round', pattern: 'Multi-Tenant Hierarchical Data Model with Event Sourcing', thingsToKeepInMind: ['Multi-tenancy: each org is a tenant with complete data isolation', 'Hierarchical issue model: Project → Epic → Story → Sub-Task', 'Real-time comments and status updates require WebSocket or SSE', 'Search across millions of issues per org needs per-tenant search index'], approved: true, approvalStatus: 'approved', upvotes: 100 },
  { company: map.atlassian, question: 'Tell me about a time you acted inclusively in a team setting.', category: 'Behavioral', difficulty: 'Easy', round: 'Values Interview', pattern: 'STAR — Atlassian OVATION: Inclusive and Thoughtful', thingsToKeepInMind: ['Atlassian explicitly scores Inclusive and Thoughtful as values — prepare a strong story', 'Example: amplifying a quieter team member\'s idea in a meeting', 'Show the outcome: what changed because you acted inclusively?', 'Avoid generic answers — be specific about what you did and who benefited'], approved: true, approvalStatus: 'approved', upvotes: 72 },

  // ── UBER ──────────────────────────────────
  { company: map.uber, question: 'Design Uber surge pricing system.', category: 'System Design', difficulty: 'Hard', round: 'Onsite System Design', pattern: 'Real-Time Supply-Demand Ratio with Geo-Regional Pricing', thingsToKeepInMind: ['Surge = f(demand/supply ratio in a geohash cell)', 'Price updates must be near real-time (< 30s) across the city', 'Discuss fairness: surge should not prevent all affordable rides', 'A/B testing framework for surge multiplier experimentation is a good extension'], isRecent: true, dateAsked: new Date('2025-02-15'), approved: true, approvalStatus: 'approved', upvotes: 112 },
  { company: map.uber, question: 'Design a distributed rate limiter for Uber\'s API gateway.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round', pattern: 'Token Bucket with Redis Cluster for Distributed State', thingsToKeepInMind: ['Single-node rate limiter fails when API gateway is replicated — need shared state', 'Redis INCR + EXPIRE gives atomic window counting with low latency', 'Discuss sliding window log for precision vs fixed window for simplicity', 'What happens when Redis is down? Fail open vs fail closed trade-off'], approved: true, approvalStatus: 'approved', upvotes: 98 },

  // ── DREAM11 ───────────────────────────────
  { company: map.dream11, question: 'Design a live leaderboard for 5M concurrent users during an IPL final.', category: 'System Design', difficulty: 'Hard', round: 'System Design Round', pattern: 'Redis Sorted Set + Async Score Update Pipeline', thingsToKeepInMind: ['Redis Sorted Set (ZADD/ZRANK) is the canonical leaderboard data structure', 'Write throughput challenge: player events → score deltas → 5M user updates', 'Use fan-out: update only relevant teams when a player scores, not all 5M', 'Top 1000 leaderboard can be cached and refreshed every 5s for most users'], isRecent: true, dateAsked: new Date('2025-03-15'), approved: true, approvalStatus: 'approved', upvotes: 135 },
  { company: map.dream11, question: 'Minimum number of coins to make a target amount.', category: 'DSA', difficulty: 'Medium', round: 'Online Assessment', pattern: 'Dynamic Programming — Unbounded Knapsack', thingsToKeepInMind: ['dp[i] = min coins to make amount i; base case dp[0] = 0', 'For each amount, try all coin denominations and take the minimum', 'Initialise dp array with Infinity except dp[0] — avoids false path counting', 'Extend: count the total number of ways (not min coins) — different recurrence'], approved: true, approvalStatus: 'approved', upvotes: 88 },

  // ── GROWW ─────────────────────────────────
  { company: map.groww, question: 'Design a real-time stock price aggregator ingesting 1M price ticks/second.', category: 'System Design', difficulty: 'Hard', round: 'System Design Round', pattern: 'Event Streaming Pipeline — Kafka + In-Memory Aggregation', thingsToKeepInMind: ['Kafka as the ingestion buffer — 1M/s is too fast for direct DB writes', 'Flink or Spark Streaming for windowed aggregation (OHLCV candles)', 'Write OHLCV results to TimescaleDB or InfluxDB for time-series queries', 'UI needs sub-second chart updates — use WebSocket push from aggregation layer'], approved: true, approvalStatus: 'approved', upvotes: 102 },
  { company: map.groww, question: 'Detect if a stock price array forms a "W" pattern (double bottom).', category: 'DSA', difficulty: 'Medium', round: 'Technical Round', pattern: 'State Machine / Finite Automaton Pattern Detection', thingsToKeepInMind: ['Model the W as a sequence of states: peak → valley1 → peak2 → valley2 → peak3', 'Use a state machine that transitions on local min/max detection', 'Discuss noise filtering: minor fluctuations should not trigger false positives', 'This is a custom pattern — draw the state diagram before coding'], isRecent: true, dateAsked: new Date('2025-02-22'), approved: true, approvalStatus: 'approved', upvotes: 78 },

  // ── RAZORPAY ──────────────────────────────
  { company: map.razorpay, question: 'Design a reliable webhook delivery system.', category: 'System Design', difficulty: 'Hard', round: 'Technical Round 2', pattern: 'At-Least-Once Delivery with Exponential Backoff + Dead Letter Queue', thingsToKeepInMind: ['Webhooks must be delivered at-least-once — idempotency on the consumer side is essential', 'Exponential backoff with jitter for retry (1s → 2s → 4s → ... → 24h)', 'Dead Letter Queue after N failures — manual inspection and replay', 'Signature verification (HMAC) to authenticate that events come from Razorpay'], approved: true, approvalStatus: 'approved', upvotes: 108 },
  { company: map.razorpay, question: 'Trapping Rain Water — calculate water trapped between buildings.', category: 'DSA', difficulty: 'Hard', round: 'Technical Round 1', pattern: 'Two Pointer O(n) or Prefix/Suffix Max Arrays O(n) space', thingsToKeepInMind: ['Water at index i = min(maxLeft[i], maxRight[i]) - height[i]', 'Two-pointer approach avoids extra arrays — use when asked for O(1) space', 'Trace through a small example manually before coding to confirm your formula', 'Extend: what if buildings can have non-integer heights?'], isRecent: true, dateAsked: new Date('2025-01-18'), approved: true, approvalStatus: 'approved', upvotes: 95 },

  // ── SALESFORCE ────────────────────────────
  { company: map.salesforce, question: 'Design multi-tenant data storage for Salesforce CRM (millions of orgs).', category: 'System Design', difficulty: 'Hard', round: 'Technical Round 2', pattern: 'Shared Schema Multi-Tenancy with Row-Level Security', thingsToKeepInMind: ['Three multi-tenancy models: separate DB, separate schema, shared schema — know all three', 'Salesforce uses shared schema with an org_id column on every table', 'Row-level security must be enforced at the query layer, not application layer', 'Discuss performance: org_id index is required on every table for this to work at scale'], approved: true, approvalStatus: 'approved', upvotes: 90 },

  // ── PAYTM ─────────────────────────────────
  { company: map.paytm, question: 'Design a digital wallet with P2P transfer, merchant payments, and cashback.', category: 'System Design', difficulty: 'Hard', round: 'Technical Round 2', pattern: 'Double-Entry Ledger + Event-Driven Cashback Engine', thingsToKeepInMind: ['Use double-entry bookkeeping: every credit has a matching debit', 'Wallet balance should never be derived from summing all transactions — store it explicitly', 'Cashback is async: apply after payment confirmation, not during', 'Discuss RBI PPI wallet limits and KYC tier enforcement as compliance constraints'], approved: true, approvalStatus: 'approved', upvotes: 100 },

  // ── MEESHO ────────────────────────────────
  { company: map.meesho, question: 'Design Meesho\'s seller onboarding and product listing pipeline.', category: 'System Design', difficulty: 'Medium', round: 'HM Round', pattern: 'State Machine for Onboarding + Async Media Processing Pipeline', thingsToKeepInMind: ['Onboarding = state machine: registered → KYC pending → approved → active', 'Product image upload triggers async processing: compress, CDN upload, moderation', 'Discuss how to handle millions of product listings from millions of resellers', 'Onboarding funnel analytics: where do sellers drop off?'], approved: true, approvalStatus: 'approved', upvotes: 72 },
];

// ─────────────────────────────────────────────
// SUCCESS STORIES
// ─────────────────────────────────────────────
const buildStories = (map) => [
  { company: map.google, authorName: 'Vikram S.', isAnonymous: false, role: 'SDE L4', package: { min: 3500000, max: 4500000, currency: 'INR' }, yearOfJoining: 2024, story: 'The phone screen was the hardest mental hurdle — I had prepped for onsite-level problems but the screen was the actual filter. Got a sliding window and a graph BFS question. What saved me was narrating every single thought out loud. The interviewer gave me a hint midway and I took it gracefully instead of pretending I already knew. They noted that positively. The onsite had 5 rounds back-to-back which was exhausting, but manageable if you pace your energy. HC took 3 weeks which was nerve-wracking but the recruiter was responsive throughout.', preparationApproach: '5 months — 300+ LeetCode problems, AlgoExpert, Grokking System Design, 20+ mock interviews on Pramp', keyAdvice: 'Practise coding in a plain Google Doc with no syntax highlighting. That single change shaved 10 minutes off my interview anxiety on the actual day.', approved: true, approvalStatus: 'approved' },
  { company: map.google, authorName: 'Divya M.', isAnonymous: false, role: 'SDE L5 — Senior Engineer', package: { min: 6000000, max: 8000000, currency: 'INR' }, yearOfJoining: 2022, story: 'I came from a mid-size startup and was worried about the system design bar. In my round the prompt was open-ended: "Design a notification service for Google." I spent the first 5 minutes asking 10 clarifying questions about scale, notification types, delivery guarantees, and user preferences. The interviewer later mentioned that those first 5 minutes set a very positive tone. HC approved me in 10 days — apparently fast by Google standards.', preparationApproach: '6 months — deep system design focus, re-read DDIA (Designing Data-Intensive Applications) twice, personal project simulating 10M-scale load', keyAdvice: 'At L5, system design is 50% of the hiring decision. Treat it like learning a language — not as a topic to "cover" before the interview.', approved: true, approvalStatus: 'approved' },
  { company: map.google, authorName: 'Anonymous', isAnonymous: true, role: 'SDE L3 (New Grad)', package: { min: 2200000, max: 3500000, currency: 'INR' }, yearOfJoining: 2025, story: 'Got in straight from campus through Google\'s STEP internship conversion. The new grad loop skipped system design and had 4 coding rounds instead. The Googleyness round surprised me — they asked me to describe a time I disagreed with a professor. I used a real example where I questioned a flawed grading rubric, escalated calmly, and ultimately changed the outcome. They responded very positively to the intellectual honesty.', preparationApproach: '3 months — LeetCode Top 150, Blind 75, strong competitive programming background from university contests', keyAdvice: 'For new grads, graphs and dynamic programming are your entire focus. Get every LeetCode Hard in those two categories. System design will come later.', approved: true, approvalStatus: 'approved' },

  { company: map.microsoft, authorName: 'Rahul K.', isAnonymous: false, role: 'SDE-1', package: { min: 1800000, max: 2200000, currency: 'INR' }, yearOfJoining: 2024, story: 'Applied via LinkedIn and got a recruiter call in 2 weeks. The OA was straightforward — two medium LeetCode problems. The technical rounds were intense but the interviewers were supportive. The key for me was thinking out loud and never jumping to code without discussing the approach. In the HR round I used a genuine failure story — a project where I missed a deadline — and they appreciated the honesty and the clear lesson I drew from it.', preparationApproach: '3 months — LeetCode 150, Striver\'s A to Z DSA sheet, 10 mock interviews', keyAdvice: 'Don\'t rush to code. Spend the first 5 minutes clarifying the problem and walking through examples. Microsoft scores this explicitly.', approved: true, approvalStatus: 'approved' },
  { company: map.microsoft, authorName: 'Priya S.', isAnonymous: false, role: 'SDE-2', package: { min: 3200000, max: 4200000, currency: 'INR' }, yearOfJoining: 2023, story: 'Transitioning from a service-based company. I was worried about the system design round but spent 6 weeks specifically on Grokking the System Design Interview and practised 20 problems end-to-end. In my round they asked me to design a URL shortener. I proactively discussed three different hashing approaches with their trade-offs before the interviewer asked. They appreciated that I didn\'t just present one option.', preparationApproach: '6 months — system design heavy, NeetCode blind 75, company-specific prep on Glassdoor', keyAdvice: 'For SDE-2, system design is the deciding round. Give it at least 40% of your total preparation time.', approved: true, approvalStatus: 'approved' },

  { company: map.amazon, authorName: 'Arjun M.', isAnonymous: false, role: 'SDE-1', package: { min: 1600000, max: 2200000, currency: 'INR' }, yearOfJoining: 2024, story: 'The loop had 4 rounds and every single one had at least one LP question. I had prepared 30+ STAR stories mapped to each of the 16 LPs before the interview. The Bar Raiser round was the toughest — they went 3 levels deep into one of my stories asking "why" repeatedly. The key was that I had actually done what I described — you can\'t fake depth in front of a Bar Raiser.', preparationApproach: '4 months — LeetCode 200 problems, Amazon LP workbook, behavioural prep with a friend who was a Bar Raiser', keyAdvice: 'Prepare 2 genuine STAR stories for every LP and map them to the question before answering. Vague STAR answers fail at Amazon.', approved: true, approvalStatus: 'approved' },
  { company: map.amazon, authorName: 'Anonymous', isAnonymous: true, role: 'SDE-2', package: { min: 2800000, max: 4000000, currency: 'INR' }, yearOfJoining: 2023, story: 'I had failed an Amazon loop 2 years earlier because I didn\'t understand the LP framework. The second attempt I treated LP preparation as seriously as LeetCode. In my system design round I designed the Amazon warehouse management system and explicitly tied my design decisions back to "Customer Obsession" and "Frugality" (cost-efficient design). The debrief feedback was that this specifically stood out.', preparationApproach: '5 months — revisited all 16 LPs, wrote out 2 stories per LP, practised system design with a mock partner', keyAdvice: 'Don\'t treat LP prep as secondary. At Amazon, a bad LP score can cancel a perfect coding score. It is literally 50% of your total evaluation.', approved: true, approvalStatus: 'approved' },

  { company: map.phonepe, authorName: 'Neha K.', isAnonymous: false, role: 'SDE-2', package: { min: 2800000, max: 3500000, currency: 'INR' }, yearOfJoining: 2023, story: 'The HM round was the most interesting part. They gave me a product scenario: "We want to add a Buy Now Pay Later feature — what could go wrong technically?" It was equal parts systems thinking, risk analysis, and communication. I talked about double-spend prevention, credit limit enforcement, and regulatory constraints. They valued candidates who think beyond just writing code.', preparationApproach: '4 months — system design focus, read publicly available PhonePe engineering blog, studied UPI documentation', keyAdvice: 'Understand the domain. Even basic knowledge of how digital payments work gives you an enormous edge over candidates who just know LeetCode.', approved: true, approvalStatus: 'approved' },
  { company: map.phonepe, authorName: 'Rohit V.', isAnonymous: false, role: 'SDE-1', package: { min: 1400000, max: 1800000, currency: 'INR' }, yearOfJoining: 2024, story: 'Got referred by a senior college alumni. The OA was on HackerEarth — easier than I expected. The system design round challenged me with: "What happens if a server crashes mid-debit?" I had never thought about partial failure recovery before. I fumbled initially but recovered by walking through the two-phase commit concept. The interviewer appreciated that I could reason through it even without knowing the term "outbox pattern" formally.', preparationApproach: '2.5 months — LeetCode 150, DDIA book chapters 1–7, Pramp mock interviews', keyAdvice: 'Read the first 7 chapters of "Designing Data-Intensive Applications." It completely changes how you think about distributed systems reliability.', approved: true, approvalStatus: 'approved' },

  { company: map.flipkart, authorName: 'Sandeep R.', isAnonymous: false, role: 'SDE-1', package: { min: 1600000, max: 2000000, currency: 'INR' }, yearOfJoining: 2024, story: 'The OA on HackerEarth had 3 problems and was very competitive. I barely cleared it but the technical round was where I shone. I was asked to design a flash sale system and I immediately brought up the overselling problem and Redis atomic decrements. The interviewer said most candidates don\'t bring this up unprompted. That framing made the rest of the round very collaborative.', preparationApproach: '3 months — Striver A to Z DSA, system design YouTube, Flipkart engineering blog', keyAdvice: 'Go beyond functional requirements in system design. Bringing up consistency, race conditions, and failure modes without being asked will immediately set you apart.', approved: true, approvalStatus: 'approved' },

  { company: map.zomato, authorName: 'Kavya T.', isAnonymous: false, role: 'Backend Engineer', package: { min: 1500000, max: 2000000, currency: 'INR' }, yearOfJoining: 2024, story: 'The system design round asked me to design real-time order tracking. I structured my answer around three layers: data ingestion (GPS events from riders), processing (Kafka + consumer service), and delivery (WebSocket to user app). The interviewer kept asking "what happens at 10× scale" after each component. Having pre-thought about these escalations made the round feel like a conversation rather than an interrogation.', preparationApproach: '2 months — focused on real-time systems, geospatial algorithms, and Kafka basics', keyAdvice: 'For Zomato, think about systems from a logistics perspective, not just a tech perspective. The business context — rider availability, ETA accuracy — should drive your design decisions.', approved: true, approvalStatus: 'approved' },

  { company: map.dream11, authorName: 'Siddharth P.', isAnonymous: false, role: 'Senior Software Engineer', package: { min: 3500000, max: 5000000, currency: 'INR' }, yearOfJoining: 2023, story: 'Dream11\'s bar surprised me — the DSA round was harder than any FAANG round I had previously attempted. The system design asked me to handle 5M concurrent users updating leaderboards during a live IPL match. The key insight I offered: Redis Sorted Sets with fan-out only to affected teams (not all 5M) is what cracked the write-throughput problem. The interviewer had clearly expected most candidates to miss the fan-out optimization.', preparationApproach: '5 months — competitive programming on CodeForces, advanced system design (DDIA + Designing Distributed Systems book), Redis deep dive', keyAdvice: 'Treat Dream11 like a FAANG interview, not like a startup interview. The technical bar is genuinely at that level. If you\'re under-prepped, it shows within 5 minutes.', approved: true, approvalStatus: 'approved' },

  { company: map.cred, authorName: 'Anonymous', isAnonymous: true, role: 'Senior Engineer', package: { min: 5000000, max: 8000000, currency: 'INR' }, yearOfJoining: 2024, story: 'CRED hires like a startup but interviews like FAANG. The engineering leadership round felt like a CTO interview — they wanted to understand how I think about technical strategy, team architecture, and long-term system evolution. The question "How do you decide when to refactor vs rebuild?" led to a 30-minute philosophical discussion. They care deeply about engineering craft here.', preparationApproach: '6 months — senior-level prep, architecture patterns, read CRED engineering blog, studied fintech risk management', keyAdvice: 'Research CRED products deeply and actually use them before the interview. Interviewers expect product knowledge and will probe your genuine thoughts on the UX and tech.', approved: true, approvalStatus: 'approved' },

  { company: map.groww, authorName: 'Ananya B.', isAnonymous: false, role: 'Software Engineer', package: { min: 2000000, max: 2800000, currency: 'INR' }, yearOfJoining: 2024, story: 'The culture round was my favourite — the interviewer asked: "You\'re on-call at 2am and a critical bug affects user portfolios. Walk me through your response." I described my runbook, escalation path, customer communication, and post-incident review process. The interviewer said most candidates describe debugging steps but forget customer communication and post-mortems. That gap shows maturity.', preparationApproach: '3 months — trading system fundamentals, time-series databases, incident management practices', keyAdvice: 'Groww engineers genuinely own their systems. If you haven\'t dealt with production incidents before, study incident response frameworks before your culture round — it will come up.', approved: true, approvalStatus: 'approved' },
];

// ─────────────────────────────────────────────
// COMPENSATION DATA
// ─────────────────────────────────────────────
const buildCompensation = (map) => [
  // GOOGLE
  { company: map.google, role: 'SWE (New Grad)', level: 'Fresher', minSalary: 2200000, maxSalary: 3500000, currency: 'INR', location: 'Hyderabad', source: 'Levels.fyi', yearReported: 2025 },
  { company: map.google, role: 'Software Engineer L4', level: 'Junior', minSalary: 3800000, maxSalary: 5500000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },
  { company: map.google, role: 'Senior SWE L5', level: 'Mid-Level', minSalary: 5500000, maxSalary: 8500000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },
  { company: map.google, role: 'Staff SWE L6', level: 'Senior', minSalary: 9000000, maxSalary: 14000000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },
  { company: map.google, role: 'Principal Engineer L7', level: 'Principal', minSalary: 14000000, maxSalary: 25000000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },

  // MICROSOFT
  { company: map.microsoft, role: 'Software Engineer SDE-1', level: 'Fresher', minSalary: 1400000, maxSalary: 2200000, currency: 'INR', location: 'Hyderabad', source: 'Glassdoor', yearReported: 2025 },
  { company: map.microsoft, role: 'Software Engineer SDE-1', level: 'Junior', minSalary: 2200000, maxSalary: 3200000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },
  { company: map.microsoft, role: 'SDE-2', level: 'Mid-Level', minSalary: 3200000, maxSalary: 4500000, currency: 'INR', location: 'Hyderabad', source: 'Levels.fyi', yearReported: 2025 },
  { company: map.microsoft, role: 'Senior SDE', level: 'Senior', minSalary: 5500000, maxSalary: 8000000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },
  { company: map.microsoft, role: 'Principal SDE', level: 'Principal', minSalary: 9000000, maxSalary: 14000000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },

  // AMAZON
  { company: map.amazon, role: 'SDE-1', level: 'Fresher', minSalary: 1600000, maxSalary: 2200000, currency: 'INR', location: 'Hyderabad', source: 'Levels.fyi', yearReported: 2025 },
  { company: map.amazon, role: 'SDE-2', level: 'Junior', minSalary: 2800000, maxSalary: 4000000, currency: 'INR', location: 'Hyderabad', source: 'Anonymous', yearReported: 2025 },
  { company: map.amazon, role: 'SDE-3 (Senior)', level: 'Mid-Level', minSalary: 4500000, maxSalary: 6500000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },
  { company: map.amazon, role: 'Principal SDE', level: 'Principal', minSalary: 8000000, maxSalary: 13000000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },

  // ADOBE
  { company: map.adobe, role: 'Member of Technical Staff (MTS)', level: 'Fresher', minSalary: 1600000, maxSalary: 2200000, currency: 'INR', location: 'Noida', source: 'Glassdoor', yearReported: 2025 },
  { company: map.adobe, role: 'Senior MTS', level: 'Mid-Level', minSalary: 3000000, maxSalary: 4500000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },
  { company: map.adobe, role: 'Principal Engineer', level: 'Senior', minSalary: 5000000, maxSalary: 8000000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },

  // PHONEPE
  { company: map.phonepe, role: 'Software Engineer', level: 'Fresher', minSalary: 1200000, maxSalary: 1700000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },
  { company: map.phonepe, role: 'Software Engineer', level: 'Junior', minSalary: 1800000, maxSalary: 2600000, currency: 'INR', location: 'Bengaluru', source: 'Glassdoor', yearReported: 2025 },
  { company: map.phonepe, role: 'SDE-2', level: 'Mid-Level', minSalary: 2400000, maxSalary: 3400000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },
  { company: map.phonepe, role: 'Senior SDE', level: 'Senior', minSalary: 4000000, maxSalary: 6000000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },

  // FLIPKART
  { company: map.flipkart, role: 'SDE-1', level: 'Fresher', minSalary: 1400000, maxSalary: 2000000, currency: 'INR', location: 'Bengaluru', source: 'Glassdoor', yearReported: 2025 },
  { company: map.flipkart, role: 'SDE-2', level: 'Mid-Level', minSalary: 2800000, maxSalary: 4200000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },
  { company: map.flipkart, role: 'SDE-3 (Senior)', level: 'Senior', minSalary: 4500000, maxSalary: 7000000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },

  // ZOMATO
  { company: map.zomato, role: 'Software Engineer', level: 'Fresher', minSalary: 1200000, maxSalary: 1800000, currency: 'INR', location: 'Gurugram', source: 'Anonymous', yearReported: 2025 },
  { company: map.zomato, role: 'Senior Engineer', level: 'Mid-Level', minSalary: 2500000, maxSalary: 3800000, currency: 'INR', location: 'Gurugram', source: 'Glassdoor', yearReported: 2025 },

  // SWIGGY
  { company: map.swiggy, role: 'SDE-1', level: 'Fresher', minSalary: 1400000, maxSalary: 2000000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },
  { company: map.swiggy, role: 'SDE-2', level: 'Mid-Level', minSalary: 2500000, maxSalary: 4000000, currency: 'INR', location: 'Bengaluru', source: 'Glassdoor', yearReported: 2025 },

  // INFOSYS
  { company: map.infosys, role: 'Systems Engineer', level: 'Fresher', minSalary: 380000, maxSalary: 450000, currency: 'INR', location: 'Bengaluru', source: 'Glassdoor', yearReported: 2025 },
  { company: map.infosys, role: 'Technology Analyst', level: 'Junior', minSalary: 600000, maxSalary: 900000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },

  // TCS
  { company: map.tcs, role: 'TCS Ninja', level: 'Fresher', minSalary: 350000, maxSalary: 400000, currency: 'INR', location: 'Pan India', source: 'TCS NQT', yearReported: 2025 },
  { company: map.tcs, role: 'TCS Digital', level: 'Fresher', minSalary: 700000, maxSalary: 800000, currency: 'INR', location: 'Pan India', source: 'TCS NQT', yearReported: 2025 },
  { company: map.tcs, role: 'IT Analyst', level: 'Junior', minSalary: 700000, maxSalary: 1000000, currency: 'INR', location: 'Pan India', source: 'Glassdoor', yearReported: 2025 },

  // WIPRO
  { company: map.wipro, role: 'Project Engineer (Turbo)', level: 'Fresher', minSalary: 350000, maxSalary: 450000, currency: 'INR', location: 'Pan India', source: 'Anonymous', yearReported: 2025 },
  { company: map.wipro, role: 'Wipro Elite', level: 'Fresher', minSalary: 600000, maxSalary: 700000, currency: 'INR', location: 'Pan India', source: 'Anonymous', yearReported: 2025 },

  // CRED
  { company: map.cred, role: 'Software Engineer', level: 'Mid-Level', minSalary: 3500000, maxSalary: 5500000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },
  { company: map.cred, role: 'Senior Engineer', level: 'Senior', minSalary: 5000000, maxSalary: 8000000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },

  // DREAM11
  { company: map.dream11, role: 'Software Engineer', level: 'Mid-Level', minSalary: 2500000, maxSalary: 4000000, currency: 'INR', location: 'Mumbai', source: 'Glassdoor', yearReported: 2025 },
  { company: map.dream11, role: 'Senior Engineer', level: 'Senior', minSalary: 3500000, maxSalary: 5500000, currency: 'INR', location: 'Mumbai', source: 'Anonymous', yearReported: 2025 },

  // GROWW
  { company: map.groww, role: 'Software Engineer', level: 'Fresher', minSalary: 1400000, maxSalary: 2000000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },
  { company: map.groww, role: 'Senior Engineer', level: 'Mid-Level', minSalary: 2800000, maxSalary: 4200000, currency: 'INR', location: 'Bengaluru', source: 'Glassdoor', yearReported: 2025 },

  // RAZORPAY
  { company: map.razorpay, role: 'Software Development Engineer', level: 'Fresher', minSalary: 1600000, maxSalary: 2200000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },
  { company: map.razorpay, role: 'Senior SDE', level: 'Mid-Level', minSalary: 3000000, maxSalary: 4500000, currency: 'INR', location: 'Bengaluru', source: 'Glassdoor', yearReported: 2025 },

  // ATLASSIAN
  { company: map.atlassian, role: 'Software Engineer', level: 'Mid-Level', minSalary: 3500000, maxSalary: 5500000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },
  { company: map.atlassian, role: 'Senior Engineer', level: 'Senior', minSalary: 6000000, maxSalary: 9000000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },

  // UBER
  { company: map.uber, role: 'Software Engineer', level: 'Mid-Level', minSalary: 3000000, maxSalary: 5000000, currency: 'INR', location: 'Bengaluru', source: 'Levels.fyi', yearReported: 2025 },
  { company: map.uber, role: 'Senior Engineer', level: 'Senior', minSalary: 5000000, maxSalary: 7500000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },

  // SALESFORCE
  { company: map.salesforce, role: 'MTS (Associate)', level: 'Fresher', minSalary: 1800000, maxSalary: 2500000, currency: 'INR', location: 'Hyderabad', source: 'Glassdoor', yearReported: 2025 },
  { company: map.salesforce, role: 'SMTS (Senior)', level: 'Mid-Level', minSalary: 3500000, maxSalary: 5500000, currency: 'INR', location: 'Hyderabad', source: 'Levels.fyi', yearReported: 2025 },

  // PAYTM
  { company: map.paytm, role: 'Software Engineer', level: 'Fresher', minSalary: 800000, maxSalary: 1400000, currency: 'INR', location: 'Noida', source: 'Anonymous', yearReported: 2025 },
  { company: map.paytm, role: 'Senior Software Engineer', level: 'Mid-Level', minSalary: 2000000, maxSalary: 3500000, currency: 'INR', location: 'Noida', source: 'Glassdoor', yearReported: 2025 },

  // MEESHO
  { company: map.meesho, role: 'SDE-1', level: 'Fresher', minSalary: 1200000, maxSalary: 1800000, currency: 'INR', location: 'Bengaluru', source: 'Anonymous', yearReported: 2025 },
  { company: map.meesho, role: 'SDE-2', level: 'Mid-Level', minSalary: 2200000, maxSalary: 3500000, currency: 'INR', location: 'Bengaluru', source: 'Glassdoor', yearReported: 2025 },
];

// ─────────────────────────────────────────────
// MAIN SEED FUNCTION
// ─────────────────────────────────────────────
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techible-learn');
    console.log('✅ MongoDB connected');

    // Clear all existing data
    await Promise.all([
      Company.deleteMany({}),
      InterviewProcess.deleteMany({}),
      InterviewQuestion.deleteMany({}),
      SuccessStory.deleteMany({}),
      Compensation.deleteMany({}),
    ]);
    console.log('🗑️  Old data cleared');

    // Insert companies
    const createdCompanies = await Company.insertMany(companies);
    console.log(`🏢 ${createdCompanies.length} companies inserted`);

    // Build a slug → _id map for easy reference below
    const map = {};
    createdCompanies.forEach((c) => { map[c.slug] = c._id; });

    // Insert interview processes
    const processes = buildInterviewProcesses(map);
    await InterviewProcess.insertMany(processes);
    console.log(`📋 ${processes.length} interview processes inserted`);

    // Insert questions
    const questions = buildQuestions(map);
    await InterviewQuestion.insertMany(questions);
    console.log(`❓ ${questions.length} interview questions inserted`);

    // Insert success stories
    const stories = buildStories(map);
    await SuccessStory.insertMany(stories);
    console.log(`🌟 ${stories.length} success stories inserted`);

    // Insert compensation records
    const compensation = buildCompensation(map);
    await Compensation.insertMany(compensation);
    console.log(`💰 ${compensation.length} compensation records inserted`);

    console.log('\n✅ Seed completed successfully!\n');
    console.log('Summary:');
    console.log(`  Companies          : ${createdCompanies.length}`);
    console.log(`  Interview processes: ${processes.length}`);
    console.log(`  Interview questions: ${questions.length}`);
    console.log(`  Success stories    : ${stories.length}`);
    console.log(`  Compensation rows  : ${compensation.length}`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    try { await mongoose.connection.close(); } catch {}
    process.exit(1);
  }
}

seedDatabase();