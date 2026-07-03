import "dotenv/config";
import mongoose from "mongoose";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Native ES Module Imports from main branch
import AiTopic from "../models/aiTopicSchema.js";

// CommonJS Requirements from your feature branch mapped safely
const ChallengeDomain = require('../models/challengeDomainSchema');
const ChallengeCategory = require('../models/challengeCategorySchema');
const Challenge = require('../models/challengeSchema');
const Company = require('../models/companySchema'); // Ensure your core schemas are loaded
const InterviewQuestion = require('../models/interviewQuestionSchema');
const SuccessStory = require('../models/successStorySchema');
const Compensation = require('../models/compensationSchema');
const InterviewProcess = require('../models/interviewProcessSchema');

// ─────────────────────────────────────────────────────────────────
// DATA DATASET 1: CS & AI Interview Topics (From main)
// ─────────────────────────────────────────────────────────────────
const aiTopics = [
  {
    title: "Arrays and Strings",
    slug: "arrays-and-strings",
    tier: 1,
    description: "The most frequently tested topic in coding interviews.",
    content: `Arrays are the most fundamental data structure — a fixed-size collection of elements stored in contiguous memory...`,
    resources: [
      { label: "Array Problems — LeetCode", url: "https://leetcode.com/tag/array/" },
    ]
  },
  {
    title: "Time and Space Complexity",
    slug: "time-and-space-complexity",
    tier: 1,
    description: "Big O notation — every interviewer will ask you to analyze your solution.",
    content: `Big O notation describes how the runtime or memory usage of an algorithm grows...`,
    resources: [{ label: "Big O Cheat Sheet", url: "https://www.bigocheatsheet.com" }]
  },
  {
    title: "OOP Concepts",
    slug: "oop-concepts",
    tier: 1,
    description: "Four pillars of Object-Oriented Programming...",
    content: `Object-Oriented Programming (OOP) is a programming paradigm...`,
    resources: []
  },
  {
    title: "Linked Lists",
    slug: "linked-lists",
    tier: 1,
    description: "Pointer manipulation is a core skill tested in interviews.",
    content: `A linked list is a linear data structure where each element...`,
    resources: [{ label: "Linked List — LeetCode", url: "https://leetcode.com/tag/linked-list/" }]
  },
  {
    title: "Stacks and Queues",
    slug: "stacks-and-queues",
    tier: 1,
    description: "Essential data structures for expression evaluation, BFS, and monotonic problems.",
    content: `Stacks and Queues are fundamental data structures with opposite behavior...`,
    resources: []
  },
  {
    title: "Trees and Binary Search Trees",
    slug: "trees-and-bst",
    tier: 2,
    description: "Trees are the most tested data structure in senior interviews.",
    content: `A tree is a hierarchical data structure with a root node...`,
    resources: [{ label: "Tree Problems — LeetCode", url: "https://leetcode.com/tag/tree/" }]
  },
  {
    title: "Graphs and BFS/DFS",
    slug: "graphs-bfs-dfs",
    tier: 2,
    description: "Graphs power social networks, maps, and recommendation engines.",
    content: `A graph is a collection of nodes (vertices) connected by edges...`,
    resources: [{ label: "Graph Problems — LeetCode", url: "https://leetcode.com/tag/graph/" }]
  },
  {
    title: "Dynamic Programming",
    slug: "dynamic-programming",
    tier: 2,
    description: "DP is the hardest and most rewarding topic.",
    content: `Dynamic Programming (DP) is an optimization technique...`,
    resources: [{ label: "DP Problems — LeetCode", url: "https://leetcode.com/tag/dynamic-programming/" }]
  },
  {
    title: "Hashing and Hash Maps",
    slug: "hashing-and-hashmaps",
    tier: 2,
    description: "HashMaps are the single most useful tool in interview problem solving.",
    content: `A hash map stores key-value pairs and provides average O(1) time...`,
    resources: []
  },
  {
    title: "Recursion and Backtracking",
    slug: "recursion-and-backtracking",
    tier: 2,
    description: "The foundation of tree problems, combinatorics, and constraint satisfaction.",
    content: `Recursion is a technique where a function calls itself...`,
    resources: [{ label: "Backtracking — LeetCode", url: "https://leetcode.com/tag/backtracking/" }]
  },
  {
    title: "Sorting Algorithms",
    slug: "sorting-algorithms",
    tier: 2,
    description: "Know the internals, trade-offs, and when to use each sorting algorithm.",
    content: `Sorting algorithms are fundamental CS concepts...`,
    resources: []
  },
  {
    title: "System Design Basics",
    slug: "system-design-basics",
    tier: 3,
    description: "Design scalable distributed systems — mandatory for SDE2+ roles.",
    content: `System design interviews test your ability to architect large-scale systems...`,
    resources: [{ label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }]
  },
  {
    title: "Database Design and SQL",
    slug: "database-design-and-sql",
    tier: 3,
    description: "Schema design, normalization, indexing, and writing complex queries.",
    content: `Database design is a critical skill for backend and full-stack roles...`,
    resources: []
  },
  {
    title: "OS Concepts for Interviews",
    slug: "os-concepts",
    tier: 3,
    description: "Processes, threads, memory management, and deadlocks.",
    content: `Operating system concepts are frequently tested in backend interviews...`,
    resources: []
  },
  {
    title: "Concurrency and Multithreading",
    slug: "concurrency-and-multithreading",
    tier: 3,
    description: "Race conditions, synchronization, and thread-safe design.",
    content: `Concurrency is one of the hardest topics in software engineering...`,
    resources: []
  },
  {
    title: "Low Level Design (LLD)",
    slug: "low-level-design",
    tier: 3,
    description: "Design classes and apply design patterns.",
    content: `Low Level Design (LLD) interviews ask you to model real-world systems...`,
    resources: [{ label: "LLD Primer", url: "https://github.com/prasadgujar/low-level-design-primer" }]
  }
];

// ─────────────────────────────────────────────────────────────────
// DATA DATASET 2: Corporate Database (From your branch)
// ─────────────────────────────────────────────────────────────────
const companies = [
  {
    name: 'Google',
    slug: 'google',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    industry: 'Tech',
    headquarters: 'Mountain View, CA',
    founded: 1998,
    website: 'https://www.google.com',
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
    description: 'E-commerce giant and cloud leader through AWS.',
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: true, views: 3000,
  }
  // ... feel free to leave other company entries from your array here
];

const buildQuestions = (map) => [
  { company: map.google, question: 'Find all pairs of words where concatenation forms a palindrome.', category: 'DSA', difficulty: 'Hard', round: 'Onsite Round 1', pattern: 'Trie + Palindrome Decomposition', thingsToKeepInMind: ['Brute force is O(n²·k)', 'Insert reversed words into a Trie'], isRecent: true, dateAsked: new Date('2025-01-15'), approved: true, approvalStatus: 'approved', upvotes: 210 },
  { company: map.google, question: 'Design Google Maps.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 3', pattern: 'Graph + Distributed Data', thingsToKeepInMind: ['Requirements scalability'], approved: true, approvalStatus: 'approved', upvotes: 185 }
];

const buildStories = (map) => [
  { company: map.google, authorName: 'Vikram S.', isAnonymous: false, role: 'SDE L4', package: { min: 3500000, max: 4500000, currency: 'INR' }, yearOfJoining: 2024, story: 'The phone screen was tough...', preparationApproach: '5 months...', keyAdvice: 'Practice coding...', approved: true, approvalStatus: 'approved' }
];

const buildCompensation = (map) => [
  { company: map.google, role: 'SWE (New Grad)', level: 'Fresher', minSalary: 2200000, maxSalary: 3500000, currency: 'INR', location: 'Hyderabad', source: 'Levels.fyi', yearReported: 2025 }
];

// Dummy placeholder helper required to prevent script reference failure
const buildInterviewProcesses = (map) => [];

// ─────────────────────────────────────────────────────────────────
// UNIFIED RUN SEED FUNCTION
// ─────────────────────────────────────────────────────────────────
async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/techible-learn';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected natively');

    // Wipe all old data cleanly
    await Promise.all([
      AiTopic.deleteMany({}),
      Company.deleteMany({}),
      InterviewProcess.deleteMany({}),
      InterviewQuestion.deleteMany({}),
      SuccessStory.deleteMany({}),
      Compensation.deleteMany({}),
      ChallengeDomain.deleteMany({}),
      ChallengeCategory.deleteMany({}),
      Challenge.deleteMany({}),
    ]);
    console.log('🗑️  Old core collections and alternative structures cleared');

    // Seed main branch tracks
    await AiTopic.insertMany(aiTopics);
    console.log(`🧠 ${aiTopics.length} CS Interview Topics successfully populated`);

    // Seed your branch structures
    const createdCompanies = await Company.insertMany(companies);
    console.log(`🏢 ${createdCompanies.length} companies inserted`);

    const map = {};
    createdCompanies.forEach((c) => { map[c.slug] = c._id; });

    const processes = buildInterviewProcesses(map);
    if(processes.length > 0) await InterviewProcess.insertMany(processes);

    const questions = buildQuestions(map);
    await InterviewQuestion.insertMany(questions);

    const stories = buildStories(map);
    await SuccessStory.insertMany(stories);

    const compensation = buildCompensation(map);
    await Compensation.insertMany(compensation);

    // ─────────────────────────────────────────────────────────────────
    // MODULE 2 INJECTION EXTRACTION RUN
    // ─────────────────────────────────────────────────────────────────
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

    const arrayCategory = await ChallengeCategory.create({
      domain: dsaDomain._id,
      name: 'Arrays & Hashing',
      slug: 'arrays-and-hashing',
      description: 'Contiguous data layouts, sliding window blocks.',
      order: 1,
      challengeCount: 1,
      isActive: true
    });

    await Challenge.create({
      domain: dsaDomain._id,
      category: arrayCategory._id,
      title: 'Two Sum Problem',
      slug: 'two-sum',
      difficulty: 'Easy',
      description: 'Find indices of two numbers in an array that combine cleanly to equal a specified target value.',
      examples: [{ label: 'Standard Run Case', input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'Returns indices [0, 1].' }],
      approach: { overview: 'Use a dynamic hash table context.', steps: [{ title: 'Instantiate Table', explanation: 'Create workspace.' }] },
      tradeoffs: { timeComplexity: 'O(n)', timeExplanation: 'Single scan pass.', spaceComplexity: 'O(n)', spaceExplanation: 'Map growth allocation.' },
      keyInsights: ['Hash tables minimize overall compute constraints.'],
      relatedCompanies: [map.google, map.microsoft, map.amazon],
      referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function twoSum(nums, target) { ... }' }],
      approved: true,
      views: 45
    });

    console.log('💾 Detailed Module 2 problem workspaces successfully persisted');
    console.log('\n Combined Seed script run completed successfully!\n');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Sync script execution error:', error.message);
    try { await mongoose.connection.close(); } catch {}
    process.exit(1);
  }
}

seedDatabase();