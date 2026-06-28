const mongoose = require('mongoose');
require('dotenv').config();

const Company = require('../models/companySchema');
const InterviewProcess = require('../models/interviewProcessSchema');
const InterviewQuestion = require('../models/interviewQuestionSchema');
const SuccessStory = require('../models/successStorySchema');
const Compensation = require('../models/compensationSchema');

// ── IMPORT YOUR MODULE 2 SCHEMAS EXACTLY AS WE DID BEFORE ──
const ChallengeDomain = require('../models/challengeDomainSchema');
const ChallengeCategory = require('../models/challengeCategorySchema');
const Challenge = require('../models/challengeSchema');

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
];

// ─────────────────────────────────────────────
// INTERVIEW QUESTIONS
// ─────────────────────────────────────────────
const buildQuestions = (map) => [
  { company: map.google, question: 'Find all pairs of words where concatenation forms a palindrome.', category: 'DSA', difficulty: 'Hard', round: 'Onsite Round 1', pattern: 'Trie + Palindrome Decomposition', thingsToKeepInMind: ['Brute force is O(n²·k) — interviewer will immediately ask for better', 'Insert reversed words into a Trie; check if suffix/prefix is a palindrome', 'Handle the empty-string edge case — it pairs with every palindrome word', 'Consider odd vs even length palindromes separately'], isRecent: true, dateAsked: new Date('2025-01-15'), approved: true, approvalStatus: 'approved', upvotes: 210 },
  { company: map.google, question: 'Design Google Maps — routing engine finding shortest path between two locations.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 3', pattern: 'Graph + Distributed Data — Contraction Hierarchies', thingsToKeepInMind: ['Start with requirements: real-time traffic, ETA accuracy, offline support', 'Naive Dijkstra doesn\'t scale to a world graph — discuss graph partitioning', 'Geo-sharding strategy for storing road segment data is a key probe', 'Discuss bi-directional Dijkstra and A* heuristics'], approved: true, approvalStatus: 'approved', upvotes: 185 },
  { company: map.google, question: 'Find the minimum window substring containing all characters of T.', category: 'DSA', difficulty: 'Hard', round: 'Phone Screen', pattern: 'Sliding Window with Two Frequency Maps', thingsToKeepInMind: ['Use a "have vs need" counter to avoid scanning the full map on every step', 'Expand right pointer to satisfy constraint, shrink left to minimise window', 'This is a classic Google phone screen — know it cold before the interview', 'Handle duplicate characters in T correctly'], isRecent: true, dateAsked: new Date('2025-02-20'), approved: true, approvalStatus: 'approved', upvotes: 175 },
  { company: map.microsoft, question: 'Two Sum — find two numbers that add up to a target.', category: 'DSA', difficulty: 'Easy', round: 'Online Assessment', pattern: 'Hash Map for O(n) lookup', thingsToKeepInMind: ['Brute force O(n²) vs hash map O(n) — always explain the trade-off', 'Ask if the array is sorted — changes your optimal approach to two-pointer', 'Handle edge cases: duplicates, negative numbers, no valid pair', 'Confirm whether you can use the same element twice'], isRecent: true, dateAsked: new Date('2025-01-10'), approved: true, approvalStatus: 'approved', upvotes: 120 },
  { company: map.amazon, question: 'LRU Cache — design with O(1) get and put operations.', category: 'DSA', difficulty: 'Medium', round: 'Technical Round', pattern: 'HashMap + Doubly Linked List', thingsToKeepInMind: ['Explain HashMap + Doubly Linked List before coding anything', 'Discuss O(1) constraint and why both structures are needed together', 'Always mention edge cases: cache size 1, put existing key, eviction order'], isRecent: true, dateAsked: new Date(), approved: true, approvalStatus: 'approved', upvotes: 140 },
];

// ─────────────────────────────────────────────
// SUCCESS STORIES
// ─────────────────────────────────────────────
const buildStories = (map) => [
  { company: map.google, authorName: 'Vikram S.', isAnonymous: false, role: 'SDE L4', package: { min: 3500000, max: 4500000, currency: 'INR' }, yearOfJoining: 2024, story: 'The phone screen was the hardest mental hurdle — I had prepped for onsite-level problems but the screen was the actual filter...', preparationApproach: '5 months — 300+ LeetCode problems...', keyAdvice: 'Practise coding in a plain Google Doc...', approved: true, approvalStatus: 'approved' },
];

// ─────────────────────────────────────────────
// COMPENSATION DATA
// ─────────────────────────────────────────────
const buildCompensation = (map) => [
  { company: map.google, role: 'SWE (New Grad)', level: 'Fresher', minSalary: 2200000, maxSalary: 3500000, currency: 'INR', location: 'Hyderabad', source: 'Levels.fyi', yearReported: 2025 },
];

// ─────────────────────────────────────────────
// MAIN SEED FUNCTION
// ─────────────────────────────────────────────
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techible-learn');
    console.log('✅ MongoDB connected');

    // Clear all existing data, including Module 2 collections
    await Promise.all([
      Company.deleteMany({}),
      InterviewProcess.deleteMany({}),
      InterviewQuestion.deleteMany({}),
      SuccessStory.deleteMany({}),
      Compensation.deleteMany({}),
      ChallengeDomain.deleteMany({}),
      ChallengeCategory.deleteMany({}),
      Challenge.deleteMany({}),
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

    // ─────────────────────────────────────────────────────────────────
    // 🔥 FIXED: MODULE 2 INJECTION POOL SAVES RIGHT HERE
    // ─────────────────────────────────────────────────────────────────
    
    // 1. Create Top Level Challenge Domains
    const dsaDomain = await ChallengeDomain.create({
      name: 'DSA & Algorithms',
      slug: 'dsa',
      description: 'Master core data structures, graph traversals, and dynamic programming paradigms.',
      icon: 'Code2',
      order: 1,
      isActive: true
    });

    const lldDomain = await ChallengeDomain.create({
      name: 'Low Level Design (LLD)',
      slug: 'lld',
      description: 'Implement production-grade SOLID design principles and structural patterns.',
      icon: 'Layers',
      order: 2,
      isActive: true
    });

    console.log('🏁 Challenge domains seeded into MongoDB');

    // 2. Create Category Sub-structures
    const arrayCategory = await ChallengeCategory.create({
      domain: dsaDomain._id,
      name: 'Arrays & Hashing',
      slug: 'arrays-and-hashing',
      description: 'Contiguous data layouts, sliding window blocks, and custom key-value map tables.',
      order: 1,
      challengeCount: 1,
      isActive: true
    });

    const designPatternCategory = await ChallengeCategory.create({
      domain: lldDomain._id,
      domainSlug: 'lld', // Added this explicit matching pointer string field!
      name: 'Creational Patterns',
      slug: 'creational-patterns',
      description: 'Object instantiation mechanisms hiding structural creation complexities.',
      order: 1,
      challengeCount: 1,
      isActive: true
    });

    console.log('📂 Challenge focus categories linked into MongoDB');

    // 3. Create An Individual Target Problem Card
    await Challenge.create({
      domain: dsaDomain._id,
      category: arrayCategory._id,
      title: 'Two Sum Problem',
      slug: 'two-sum',
      difficulty: 'Easy',
      description: 'Find indices of two numbers in an array that combine cleanly to equal a specified target value.',
      examples: [{
        label: 'Standard Run Case',
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Since nums[0] (2) plus nums[1] (7) equals 9, indices [0, 1] are returned.'
      }],
      approach: {
        overview: 'Use a dynamic memory hash table workspace to query existing values in linear performance lookups.',
        steps: [
          { title: 'Instantiate Tracking Workspace', explanation: 'Create a clean map infrastructure object context.' },
          { title: 'Check Complement Values', explanation: 'Compute target minus current array element value on each row.' }
        ]
      },
      tradeoffs: {
        timeComplexity: 'O(n)',
        timeExplanation: 'Scans the input array exactly once via single loop tracks.',
        spaceComplexity: 'O(n)',
        spaceExplanation: 'Memory buffer map objects grow relative to total unique variables registered.'
      },
      keyInsights: ['Hash tables balance your memory limits to minimize overall compute constraints.'],
      relatedCompanies: [map.google, map.microsoft, map.amazon],
      referenceAnswer: [{
        language: 'javascript',
        tabLabel: 'JavaScript Optimal',
        content: 'function twoSum(nums, target) {\n  const register = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (register.has(diff)) return [register.get(diff), i];\n    register.set(nums[i], i);\n  }\n}'
      }],
      approved: true,
      views: 45
    });

    console.log('💾 Detailed problem workspace cards persisted');

    console.log('\n✅ Seed completed successfully!\n');
    console.log('Summary:');
    console.log(`  Companies          : ${createdCompanies.length}`);
    console.log(`  Interview processes: ${processes.length}`);
    console.log(`  Interview questions: ${questions.length}`);
    console.log(`  Success stories    : ${stories.length}`);
    console.log(`  Compensation rows  : ${compensation.length}`);
    console.log(`  Challenge Domains  : 2`);
    console.log(`  Challenge Categories: 1`);
    console.log(`  Challenge Problems : 1`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    try { await mongoose.connection.close(); } catch {}
    process.exit(1);
  }
}

seedDatabase();