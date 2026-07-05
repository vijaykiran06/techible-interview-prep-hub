import "dotenv/config";
import mongoose from "mongoose";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// ES Module models
import AiTopic from "../models/aiTopicSchema.js";
import ChallengeDomain from "../models/challengeDomainSchema.js";
import ChallengeCategory from "../models/challengeCategorySchema.js";
import Challenge from "../models/challengeSchema.js";

// CommonJS models
const Company = require("../models/companySchema.cjs");
const InterviewQuestion = require("../models/interviewQuestionSchema.cjs");
const SuccessStory = require("../models/successStorySchema.cjs");
const Compensation = require("../models/compensationSchema.cjs");
const InterviewProcess = require("../models/interviewProcessSchema.cjs");
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
  },
  {
    name: 'Apple',
    slug: 'apple',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    industry: 'Tech',
    headquarters: 'Cupertino, CA',
    founded: 1976,
    website: 'https://www.apple.com',
    description: 'Consumer electronics and software company known for design-first products.',
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: true, views: 2900,
  },
  {
    name: 'Meta',
    slug: 'meta',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    industry: 'Tech',
    headquarters: 'Menlo Park, CA',
    founded: 2004,
    website: 'https://about.meta.com',
    description: 'Social technology company behind Facebook, Instagram, and WhatsApp.',
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: true, views: 2700,
  },
  {
    name: 'Netflix',
    slug: 'netflix',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    industry: 'Tech',
    headquarters: 'Los Gatos, CA',
    founded: 1997,
    website: 'https://www.netflix.com',
    description: 'Streaming entertainment service known for high-scale microservices architecture.',
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: false, views: 1800,
  },
  {
    name: 'Adobe',
    slug: 'adobe',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Corporate_Logo.png' },
    industry: 'Tech',
    headquarters: 'San Jose, CA',
    founded: 1982,
    website: 'https://www.adobe.com',
    description: 'Creative and marketing software company behind Photoshop and Creative Cloud.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: false, views: 1500,
  },
  {
    name: 'Salesforce',
    slug: 'salesforce',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
    industry: 'Tech',
    headquarters: 'San Francisco, CA',
    founded: 1999,
    website: 'https://www.salesforce.com',
    description: 'Cloud-based CRM platform and enterprise software leader.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: false, views: 1400,
  },
  {
    name: 'Uber',
    slug: 'uber',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg' },
    industry: 'Tech',
    headquarters: 'San Francisco, CA',
    founded: 2009,
    website: 'https://www.uber.com',
    description: 'Ride-hailing and delivery platform operating at massive real-time scale.',
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: false, views: 2100,
  },
  {
    name: 'LinkedIn',
    slug: 'linkedin',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
    industry: 'Tech',
    headquarters: 'Sunnyvale, CA',
    founded: 2003,
    website: 'https://www.linkedin.com',
    description: 'Professional networking platform and Microsoft subsidiary.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: false, views: 1600,
  },
  {
    name: 'Oracle',
    slug: 'oracle',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
    industry: 'Tech',
    headquarters: 'Austin, TX',
    founded: 1977,
    website: 'https://www.oracle.com',
    description: 'Enterprise database, cloud, and ERP software provider.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: false, views: 1300,
  },
  {
    name: 'Nvidia',
    slug: 'nvidia',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg' },
    industry: 'Tech',
    headquarters: 'Santa Clara, CA',
    founded: 1993,
    website: 'https://www.nvidia.com',
    description: 'GPU and AI computing hardware leader powering modern ML infrastructure.',
    interviewDifficulty: 'Hard',
    approved: true, approvalStatus: 'approved', featured: true, views: 2600,
  },
  {
    name: 'Flipkart',
    slug: 'flipkart',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg' },
    industry: 'E-Commerce',
    headquarters: 'Bengaluru, India',
    founded: 2007,
    website: 'https://www.flipkart.com',
    description: 'India\'s largest homegrown e-commerce marketplace, owned by Walmart.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: false, views: 1900,
  },
  {
    name: 'Swiggy',
    slug: 'swiggy',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/en/1/16/Swiggy_logo.svg' },
    industry: 'Tech',
    headquarters: 'Bengaluru, India',
    founded: 2014,
    website: 'https://www.swiggy.com',
    description: 'On-demand food delivery and quick-commerce platform in India.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: false, views: 1200,
  },
  {
    name: 'Zomato',
    slug: 'zomato',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png' },
    industry: 'Tech',
    headquarters: 'Gurugram, India',
    founded: 2008,
    website: 'https://www.zomato.com',
    description: 'Restaurant discovery and food delivery platform, listed on Indian stock exchanges.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: false, views: 1250,
  },
  {
    name: 'Paytm',
    slug: 'paytm',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Paytm_Logo_%28standalone%29.svg' },
    industry: 'Finance',
    headquarters: 'Noida, India',
    founded: 2010,
    website: 'https://paytm.com',
    description: 'Digital payments and financial services platform in India.',
    interviewDifficulty: 'Medium',
    approved: true, approvalStatus: 'approved', featured: false, views: 1100,
  },
  {
    name: 'Infosys',
    slug: 'infosys',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Infosys_logo.svg' },
    industry: 'Consulting',
    headquarters: 'Bengaluru, India',
    founded: 1981,
    website: 'https://www.infosys.com',
    description: 'Global IT consulting and outsourcing services company.',
    interviewDifficulty: 'Easy',
    approved: true, approvalStatus: 'approved', featured: false, views: 1700,
  },
  {
    name: 'TCS',
    slug: 'tcs',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Tata_Consultancy_Services_Logo.svg' },
    industry: 'Consulting',
    headquarters: 'Mumbai, India',
    founded: 1968,
    website: 'https://www.tcs.com',
    description: 'India\'s largest IT services and consulting company, part of the Tata Group.',
    interviewDifficulty: 'Easy',
    approved: true, approvalStatus: 'approved', featured: false, views: 1650,
  },
  {
    name: 'Wipro',
    slug: 'wipro',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg' },
    industry: 'Consulting',
    headquarters: 'Bengaluru, India',
    founded: 1945,
    website: 'https://www.wipro.com',
    description: 'Multinational IT consulting and business process services company.',
    interviewDifficulty: 'Easy',
    approved: true, approvalStatus: 'approved', featured: false, views: 1050,
  },
  {
    name: 'Accenture',
    slug: 'accenture',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Accenture.svg' },
    industry: 'Consulting',
    headquarters: 'Dublin, Ireland',
    founded: 1989,
    website: 'https://www.accenture.com',
    description: 'Global professional services company specializing in IT and consulting.',
    interviewDifficulty: 'Easy',
    approved: true, approvalStatus: 'approved', featured: false, views: 1150,
  }
  // ... feel free to leave other company entries from your array here
];

// ─────────────────────────────────────────────────────────────────
// Per-company interview questions (2 each: 1 DSA + 1 System Design/role-specific)
// Keyed by company slug so we only build entries for companies that
// actually exist in `map` — prevents crashes if a slug is renamed/removed.
// ─────────────────────────────────────────────────────────────────
const questionBank = {
  google: [
    { question: 'Find all pairs of words where concatenation forms a palindrome.', category: 'DSA', difficulty: 'Hard', round: 'Onsite Round 1', pattern: 'Trie + Palindrome Decomposition', thingsToKeepInMind: ['Brute force is O(n²·k)', 'Insert reversed words into a Trie'], isRecent: true, dateAsked: new Date('2025-01-15'), upvotes: 210 },
    { question: 'Design Google Maps.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 3', pattern: 'Graph + Distributed Data', thingsToKeepInMind: ['Requirements scalability'], upvotes: 185 }
  ],
  microsoft: [
    { question: 'Merge k sorted linked lists efficiently.', category: 'DSA', difficulty: 'Medium', round: 'Phone Screen', pattern: 'Min-Heap', thingsToKeepInMind: ['Naive concatenation + sort is O(N log N)', 'Heap of size k gives O(N log k)'], upvotes: 120 },
    { question: 'Design Azure Blob Storage.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'Distributed Storage', thingsToKeepInMind: ['Replication and consistency tradeoffs'], upvotes: 95 }
  ],
  amazon: [
    { question: 'Detect and remove a cycle in a singly linked list.', category: 'DSA', difficulty: 'Medium', round: 'Online Assessment', pattern: 'Floyd\'s Cycle Detection', thingsToKeepInMind: ['O(1) space using two pointers'], upvotes: 140 },
    { question: 'Design the product recommendation system for Amazon.com.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'Collaborative Filtering + Caching', thingsToKeepInMind: ['Cold-start problem for new users'], upvotes: 160 }
  ],
  apple: [
    { question: 'Implement an LRU cache with O(1) get and put.', category: 'DSA', difficulty: 'Medium', round: 'Phone Screen', pattern: 'HashMap + Doubly Linked List', thingsToKeepInMind: ['Evict least recently used on capacity overflow'], upvotes: 130 },
    { question: 'Design an offline-first sync system for iCloud documents.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 3', pattern: 'Conflict Resolution + Vector Clocks', thingsToKeepInMind: ['Handling merge conflicts across devices'], upvotes: 88 }
  ],
  meta: [
    { question: 'Serialize and deserialize a binary tree.', category: 'DSA', difficulty: 'Medium', round: 'Onsite Round 1', pattern: 'Pre-order Traversal', thingsToKeepInMind: ['Use a sentinel marker for null nodes'], upvotes: 150 },
    { question: 'Design the News Feed ranking system.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'Ranking + Fan-out', thingsToKeepInMind: ['Fan-out on write vs fan-out on read'], upvotes: 175 }
  ],
  netflix: [
    { question: 'Find the longest palindromic substring in a string.', category: 'DSA', difficulty: 'Medium', round: 'Phone Screen', pattern: 'Expand Around Center', thingsToKeepInMind: ['O(n^2) is acceptable; Manacher\'s gives O(n)'], upvotes: 100 },
    { question: 'Design a global video streaming CDN.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'CDN + Edge Caching', thingsToKeepInMind: ['Adaptive bitrate streaming'], upvotes: 110 }
  ],
  adobe: [
    { question: 'Implement a Trie to support autocomplete suggestions.', category: 'DSA', difficulty: 'Medium', round: 'Onsite Round 1', pattern: 'Trie', thingsToKeepInMind: ['Store frequency at each node for ranking'], upvotes: 70 },
    { question: 'Design real-time collaborative editing for a design canvas.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'Operational Transform / CRDT', thingsToKeepInMind: ['Conflict-free merging of concurrent edits'], upvotes: 65 }
  ],
  salesforce: [
    { question: 'Design a database schema for a multi-tenant CRM.', category: 'System Design', difficulty: 'Medium', round: 'Onsite Round 1', pattern: 'Multi-Tenancy', thingsToKeepInMind: ['Shared schema vs schema-per-tenant tradeoffs'], upvotes: 60 },
    { question: 'Find duplicate customer records in a large dataset efficiently.', category: 'DSA', difficulty: 'Medium', round: 'Phone Screen', pattern: 'Hashing + Fuzzy Matching', thingsToKeepInMind: ['Normalize fields before hashing'], upvotes: 55 }
  ],
  uber: [
    { question: 'Design the rider-driver matching system.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'Geohashing + Matching', thingsToKeepInMind: ['Balancing ETA vs driver utilization'], upvotes: 120 },
    { question: 'Find the shortest path with dynamically changing edge weights (live traffic).', category: 'DSA', difficulty: 'Hard', round: 'Onsite Round 1', pattern: 'Dijkstra Variant', thingsToKeepInMind: ['Re-computation strategy as weights change'], upvotes: 90 }
  ],
  linkedin: [
    { question: 'Design the "People You May Know" feature.', category: 'System Design', difficulty: 'Medium', round: 'Onsite Round 1', pattern: 'Graph Traversal (Mutual Connections)', thingsToKeepInMind: ['Precompute vs on-demand scoring'], upvotes: 85 },
    { question: 'Implement a rate limiter for API requests.', category: 'DSA', difficulty: 'Medium', round: 'Phone Screen', pattern: 'Sliding Window / Token Bucket', thingsToKeepInMind: ['Token bucket allows bursts; sliding window is stricter'], upvotes: 78 }
  ],
  oracle: [
    { question: 'Design a distributed transaction system with two-phase commit.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'Two-Phase Commit', thingsToKeepInMind: ['Coordinator failure handling'], upvotes: 45 },
    { question: 'Optimize a slow SQL query using proper indexing.', category: 'DSA', difficulty: 'Medium', round: 'Onsite Round 1', pattern: 'Query Optimization', thingsToKeepInMind: ['Composite index column order matters'], upvotes: 50 }
  ],
  nvidia: [
    { question: 'Explain memory coalescing in CUDA kernels and how to optimize for it.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 1', pattern: 'GPU Memory Access Patterns', thingsToKeepInMind: ['Aligned, contiguous access maximizes throughput'], upvotes: 40 },
    { question: 'Design a job scheduler for GPU compute workloads.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'Priority Scheduling + Resource Partitioning', thingsToKeepInMind: ['Preemption vs run-to-completion tradeoffs'], upvotes: 38 }
  ],
  flipkart: [
    { question: 'Design an inventory management system for flash sales.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'Distributed Locking + Queueing', thingsToKeepInMind: ['Prevent overselling under high concurrency'], upvotes: 92 },
    { question: 'Find the kth largest element in a continuous data stream.', category: 'DSA', difficulty: 'Medium', round: 'Phone Screen', pattern: 'Min-Heap of size k', thingsToKeepInMind: ['Maintain heap size k for O(log k) updates'], upvotes: 75 }
  ],
  swiggy: [
    { question: 'Design a real-time order tracking system.', category: 'System Design', difficulty: 'Medium', round: 'Onsite Round 1', pattern: 'WebSockets + Geolocation Streaming', thingsToKeepInMind: ['Batching location updates to reduce load'], upvotes: 58 },
    { question: 'Optimize delivery partner assignment to minimize total delivery time.', category: 'DSA', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'Bipartite Matching', thingsToKeepInMind: ['Hungarian algorithm for optimal assignment'], upvotes: 52 }
  ],
  zomato: [
    { question: 'Design a restaurant search and ranking system.', category: 'System Design', difficulty: 'Medium', round: 'Onsite Round 1', pattern: 'Search Index + Ranking Signals', thingsToKeepInMind: ['Balancing relevance, rating, and distance'], upvotes: 48 },
    { question: 'Detect fraudulent or fake reviews using text pattern analysis.', category: 'DSA', difficulty: 'Medium', round: 'Phone Screen', pattern: 'Text Similarity / Hashing', thingsToKeepInMind: ['Shingling + Jaccard similarity for near-duplicates'], upvotes: 41 }
  ],
  paytm: [
    { question: 'Design a wallet transaction ledger system.', category: 'System Design', difficulty: 'Hard', round: 'Onsite Round 2', pattern: 'Double-Entry Ledger + Idempotency', thingsToKeepInMind: ['Every transaction must be atomic and auditable'], upvotes: 66 },
    { question: 'Ensure idempotency in payment retry APIs.', category: 'System Design', difficulty: 'Medium', round: 'Onsite Round 1', pattern: 'Idempotency Keys', thingsToKeepInMind: ['Client-generated idempotency key prevents double charges'], upvotes: 59 }
  ],
  infosys: [
    { question: 'Explain the SOLID principles with a real-world example.', category: 'System Design', difficulty: 'Easy', round: 'Technical Round 1', pattern: 'OOP Fundamentals', thingsToKeepInMind: ['Single Responsibility is the most commonly probed'], upvotes: 35 },
    { question: 'Write a SQL query to find the Nth highest salary.', category: 'DSA', difficulty: 'Easy', round: 'Technical Round 1', pattern: 'Subquery / Window Function', thingsToKeepInMind: ['DENSE_RANK() handles ties correctly'], upvotes: 44 }
  ],
  tcs: [
    { question: 'Explain database normalization with an example up to 3NF.', category: 'DSA', difficulty: 'Easy', round: 'Technical Round 1', pattern: 'Normalization', thingsToKeepInMind: ['Each normal form removes a specific type of redundancy'], upvotes: 30 },
    { question: 'Reverse a string in place without using extra space.', category: 'DSA', difficulty: 'Easy', round: 'Technical Round 1', pattern: 'Two Pointers', thingsToKeepInMind: ['Swap from both ends toward the center'], upvotes: 28 }
  ],
  wipro: [
    { question: 'Explain OOP concepts (encapsulation, inheritance, polymorphism, abstraction) with examples.', category: 'System Design', difficulty: 'Easy', round: 'Technical Round 1', pattern: 'OOP Fundamentals', thingsToKeepInMind: ['Give a concrete code example for each pillar'], upvotes: 25 },
    { question: 'Implement binary search on a sorted array.', category: 'DSA', difficulty: 'Easy', round: 'Technical Round 1', pattern: 'Binary Search', thingsToKeepInMind: ['Watch for off-by-one errors in the mid calculation'], upvotes: 27 }
  ],
  accenture: [
    { question: 'Design a scalable ticketing system for an IT helpdesk.', category: 'System Design', difficulty: 'Medium', round: 'Technical Round 2', pattern: 'Queueing + Priority Scheduling', thingsToKeepInMind: ['SLA-based prioritization'], upvotes: 22 },
    { question: 'Explain REST API best practices and common status codes.', category: 'System Design', difficulty: 'Easy', round: 'Technical Round 1', pattern: 'REST Fundamentals', thingsToKeepInMind: ['Idempotent verbs: GET, PUT, DELETE'], upvotes: 24 }
  ]
};

const buildQuestions = (map) => Object.entries(questionBank).flatMap(([slug, questions]) => {
  if (!map[slug]) return [];
  return questions.map((q) => ({
    company: map[slug],
    approved: true,
    approvalStatus: 'approved',
    ...q
  }));
});

// ─────────────────────────────────────────────────────────────────
// Per-company success stories (1 each)
// ─────────────────────────────────────────────────────────────────
const storyBank = {
  google: { authorName: 'Vikram S.', role: 'SDE L4', package: { min: 3500000, max: 4500000, currency: 'INR' }, yearOfJoining: 2024, story: 'The phone screen was tough...', preparationApproach: '5 months of daily DSA practice plus mock system design interviews.', keyAdvice: 'Practice coding under time pressure and think out loud.' },
  microsoft: { authorName: 'Ananya R.', role: 'SDE II', package: { min: 2800000, max: 3600000, currency: 'INR' }, yearOfJoining: 2024, story: 'Four rounds covering DSA, system design, and a values-fit conversation.', preparationApproach: '3 months focused on trees, graphs, and Azure fundamentals.', keyAdvice: 'Be ready to explain tradeoffs, not just working code.' },
  amazon: { authorName: 'Rohit K.', role: 'SDE I', package: { min: 2400000, max: 3200000, currency: 'INR' }, yearOfJoining: 2023, story: 'Leadership principles were probed as heavily as the coding rounds.', preparationApproach: 'Prepared STAR-format stories for every leadership principle.', keyAdvice: 'Have 2-3 strong stories ready for "Ownership" and "Customer Obsession".' },
  apple: { authorName: 'Sanya M.', role: 'Software Engineer', package: { min: 3200000, max: 4200000, currency: 'INR' }, yearOfJoining: 2024, story: 'Deep dive into iOS internals and a take-home design exercise.', preparationApproach: 'Reviewed memory management and concurrency in Swift.', keyAdvice: 'Show genuine attention to detail and craftsmanship in your answers.' },
  meta: { authorName: 'Karan V.', role: 'Software Engineer', package: { min: 3600000, max: 4800000, currency: 'INR' }, yearOfJoining: 2024, story: 'Two coding rounds plus a behavioral round on "moving fast".', preparationApproach: 'Grinded medium/hard LeetCode graph and DP problems for 4 months.', keyAdvice: 'Optimize for clarity of communication, not just the final answer.' },
  netflix: { authorName: 'Priya D.', role: 'Senior Software Engineer', package: { min: 5500000, max: 7000000, currency: 'INR' }, yearOfJoining: 2023, story: 'Interview focused heavily on ownership and past project depth.', preparationApproach: 'Prepared to discuss production incidents and postmortems in detail.', keyAdvice: 'Netflix values seniority and judgment over algorithmic tricks.' },
  adobe: { authorName: 'Arjun T.', role: 'Member of Technical Staff', package: { min: 2600000, max: 3400000, currency: 'INR' }, yearOfJoining: 2024, story: 'Coding round followed by a design discussion on Creative Cloud sync.', preparationApproach: 'Focused on data structures plus distributed systems basics.', keyAdvice: 'Adobe interviewers appreciate creative, product-aware solutions.' },
  salesforce: { authorName: 'Neha S.', role: 'Software Engineer', package: { min: 2500000, max: 3300000, currency: 'INR' }, yearOfJoining: 2024, story: 'Emphasis on database design for multi-tenant systems.', preparationApproach: 'Studied schema design patterns and SOQL deeply.', keyAdvice: 'Understand tenant isolation tradeoffs before the interview.' },
  uber: { authorName: 'Aditya P.', role: 'Software Engineer II', package: { min: 3400000, max: 4400000, currency: 'INR' }, yearOfJoining: 2023, story: 'Heavy focus on real-time systems and geospatial algorithms.', preparationApproach: 'Practiced graph algorithms and read Uber engineering blog posts.', keyAdvice: 'Be comfortable estimating scale (QPS, storage) on the spot.' },
  linkedin: { authorName: 'Ishaan G.', role: 'Software Engineer', package: { min: 3000000, max: 3900000, currency: 'INR' }, yearOfJoining: 2024, story: 'Graph-heavy DSA round plus a system design round on feeds.', preparationApproach: 'Focused on graph traversal and ranking system design.', keyAdvice: 'LinkedIn interviewers like structured, framework-driven answers.' },
  oracle: { authorName: 'Divya N.', role: 'Applications Engineer', package: { min: 1800000, max: 2400000, currency: 'INR' }, yearOfJoining: 2023, story: 'Strong emphasis on SQL and database internals.', preparationApproach: 'Practiced query optimization and indexing strategies.', keyAdvice: 'Know the difference between clustered and non-clustered indexes cold.' },
  nvidia: { authorName: 'Rahul B.', role: 'Systems Software Engineer', package: { min: 4200000, max: 5500000, currency: 'INR' }, yearOfJoining: 2024, story: 'Low-level questions on GPU architecture and parallel computing.', preparationApproach: 'Studied CUDA programming and memory hierarchy in depth.', keyAdvice: 'Be precise about hardware-level tradeoffs, not just high-level concepts.' },
  flipkart: { authorName: 'Meera J.', role: 'SDE II', package: { min: 2700000, max: 3500000, currency: 'INR' }, yearOfJoining: 2024, story: 'Scenario-based system design around Big Billion Days traffic spikes.', preparationApproach: 'Practiced designing for extreme concurrency and queueing.', keyAdvice: 'Always ask about scale and peak traffic before designing.' },
  swiggy: { authorName: 'Yash R.', role: 'Software Development Engineer', package: { min: 2200000, max: 2900000, currency: 'INR' }, yearOfJoining: 2024, story: 'Practical coding round on optimizing delivery routing.', preparationApproach: 'Studied geospatial indexing and matching algorithms.', keyAdvice: 'Real-time systems questions reward pragmatic, working solutions.' },
  zomato: { authorName: 'Tanya A.', role: 'Software Engineer', package: { min: 2000000, max: 2700000, currency: 'INR' }, yearOfJoining: 2023, story: 'Focused on search ranking and recommendation logic.', preparationApproach: 'Reviewed ranking algorithms and A/B testing fundamentals.', keyAdvice: 'Product sense matters as much as raw coding ability here.' },
  paytm: { authorName: 'Harsh V.', role: 'Software Engineer', package: { min: 1900000, max: 2600000, currency: 'INR' }, yearOfJoining: 2024, story: 'Deep questions on transaction consistency and idempotency.', preparationApproach: 'Studied distributed transactions and payment system design.', keyAdvice: 'Correctness under failure matters more than raw speed in fintech interviews.' },
  infosys: { authorName: 'Sneha K.', role: 'Systems Engineer', package: { min: 450000, max: 650000, currency: 'INR' }, yearOfJoining: 2024, story: 'Standard technical round on OOP, SQL, and aptitude.', preparationApproach: 'Revised core CS fundamentals and solved basic coding problems.', keyAdvice: 'Focus on fundamentals — Infosys interviews rarely go beyond the basics.' },
  tcs: { authorName: 'Aman D.', role: 'Assistant System Engineer', package: { min: 390000, max: 550000, currency: 'INR' }, yearOfJoining: 2024, story: 'Aptitude test followed by a technical and HR round.', preparationApproach: 'Practiced quantitative aptitude and basic programming.', keyAdvice: 'Clear communication in the HR round is as important as technical skill.' },
  wipro: { authorName: 'Pooja L.', role: 'Project Engineer', package: { min: 400000, max: 600000, currency: 'INR' }, yearOfJoining: 2024, story: 'Coding test followed by a managerial round on teamwork.', preparationApproach: 'Revised OOP concepts and basic data structures.', keyAdvice: 'Be ready to discuss teamwork and past academic projects.' },
  accenture: { authorName: 'Vivek S.', role: 'Associate Software Engineer', package: { min: 420000, max: 620000, currency: 'INR' }, yearOfJoining: 2024, story: 'Technical round on REST APIs plus a client-facing communication round.', preparationApproach: 'Practiced explaining technical concepts in simple language.', keyAdvice: 'Accenture values communication skills alongside technical basics.' }
};

const buildStories = (map) => Object.entries(storyBank).flatMap(([slug, s]) => {
  if (!map[slug]) return [];
  return [{
    company: map[slug],
    isAnonymous: false,
    approved: true,
    approvalStatus: 'approved',
    ...s
  }];
});

// ─────────────────────────────────────────────────────────────────
// Per-company compensation reports (1 each)
// ─────────────────────────────────────────────────────────────────
const compensationBank = {
  google: { role: 'SWE (New Grad)', level: 'Fresher', minSalary: 2200000, maxSalary: 3500000, currency: 'INR', location: 'Hyderabad' },
  microsoft: { role: 'SDE II', level: 'Mid-Level', minSalary: 2500000, maxSalary: 3600000, currency: 'INR', location: 'Bengaluru' },
  amazon: { role: 'SDE I', level: 'Junior', minSalary: 2200000, maxSalary: 3200000, currency: 'INR', location: 'Hyderabad' },
  apple: { role: 'Software Engineer', level: 'Mid-Level', minSalary: 3000000, maxSalary: 4200000, currency: 'INR', location: 'Bengaluru' },
  meta: { role: 'Software Engineer', level: 'Mid-Level', minSalary: 3400000, maxSalary: 4800000, currency: 'INR', location: 'Bengaluru' },
  netflix: { role: 'Senior Software Engineer', level: 'Senior', minSalary: 5000000, maxSalary: 7000000, currency: 'INR', location: 'Remote' },
  adobe: { role: 'Member of Technical Staff', level: 'Mid-Level', minSalary: 2400000, maxSalary: 3400000, currency: 'INR', location: 'Noida' },
  salesforce: { role: 'Software Engineer', level: 'Mid-Level', minSalary: 2300000, maxSalary: 3300000, currency: 'INR', location: 'Hyderabad' },
  uber: { role: 'Software Engineer II', level: 'Mid-Level', minSalary: 3200000, maxSalary: 4400000, currency: 'INR', location: 'Bengaluru' },
  linkedin: { role: 'Software Engineer', level: 'Mid-Level', minSalary: 2800000, maxSalary: 3900000, currency: 'INR', location: 'Bengaluru' },
  oracle: { role: 'Applications Engineer', level: 'Junior', minSalary: 1600000, maxSalary: 2400000, currency: 'INR', location: 'Hyderabad' },
  nvidia: { role: 'Systems Software Engineer', level: 'Senior', minSalary: 3800000, maxSalary: 5500000, currency: 'INR', location: 'Pune' },
  flipkart: { role: 'SDE II', level: 'Mid-Level', minSalary: 2500000, maxSalary: 3500000, currency: 'INR', location: 'Bengaluru' },
  swiggy: { role: 'Software Development Engineer', level: 'Junior', minSalary: 2000000, maxSalary: 2900000, currency: 'INR', location: 'Bengaluru' },
  zomato: { role: 'Software Engineer', level: 'Junior', minSalary: 1800000, maxSalary: 2700000, currency: 'INR', location: 'Gurugram' },
  paytm: { role: 'Software Engineer', level: 'Junior', minSalary: 1700000, maxSalary: 2600000, currency: 'INR', location: 'Noida' },
  infosys: { role: 'Systems Engineer', level: 'Fresher', minSalary: 400000, maxSalary: 650000, currency: 'INR', location: 'Bengaluru' },
  tcs: { role: 'Assistant System Engineer', level: 'Fresher', minSalary: 350000, maxSalary: 550000, currency: 'INR', location: 'Mumbai' },
  wipro: { role: 'Project Engineer', level: 'Fresher', minSalary: 380000, maxSalary: 600000, currency: 'INR', location: 'Bengaluru' },
  accenture: { role: 'Associate Software Engineer', level: 'Fresher', minSalary: 400000, maxSalary: 620000, currency: 'INR', location: 'Pune' }
};

const buildCompensation = (map) => Object.entries(compensationBank).flatMap(([slug, c]) => {
  if (!map[slug]) return [];
  return [{
    company: map[slug],
    source: 'Levels.fyi',
    yearReported: 2025,
    ...c
  }];
});

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

    // ===================== NEW DOMAIN: DSA & ALGORITHMS =====================
    // (FIX: this domain was referenced below as `dsaDomain` but was never
    // created anywhere in the script — that was the bug. Creating it here,
    // along with a starter category/challenge, restores what the comments
    // further down assume already exists.)
    const dsaDomain = await ChallengeDomain.create({
      name: 'DSA & Algorithms',
      slug: 'dsa-algorithms',
      description: 'Core data structures and algorithms tested in coding interviews.',
      icon: 'Code2',
      order: 1,
      isActive: true
    });

    const arraysHashingCategory = await ChallengeCategory.create({
      domain: dsaDomain._id,
      name: 'Arrays & Hashing',
      slug: 'arrays-and-hashing',
      description: 'Foundational array manipulation and hash map lookup problems.',
      order: 1,
      challengeCount: 1,
      isActive: true,
      level: 'Easy'
    });

    await Challenge.create({
      domain: dsaDomain._id,
      category: arraysHashingCategory._id,
      title: 'Two Sum',
      slug: 'two-sum',
      difficulty: 'Easy',
      description: 'Given an array of integers and a target, return indices of the two numbers that add up to the target.',
      examples: [{ label: 'Standard Run Case', input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' }],
      approach: {
        overview: 'Use a hash map to store seen values and their indices, checking for the complement on each pass.',
        steps: [
          { title: 'Iterate Array', explanation: 'Loop through nums while tracking a map of value -> index.' },
          { title: 'Check Complement', explanation: 'For each num, check if (target - num) already exists in the map.' },
          { title: 'Return Indices', explanation: 'If found, return [map.get(complement), currentIndex]; otherwise store num in the map.' }
        ]
      },
      tradeoffs: { timeComplexity: 'O(n)', timeExplanation: 'Single pass with O(1) average hash map lookups.', spaceComplexity: 'O(n)', spaceExplanation: 'Hash map stores up to n values.' },
      keyInsights: ['Brute force O(n^2) checks every pair; the hash map reduces this to a single pass.', 'Store index while iterating rather than doing a second pass.'],
      relatedCompanies: [map.google, map.amazon, map.microsoft],
      referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) return [seen.get(complement), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}' }],
      approved: true,
      views: 0
    });

    // ===================== NEW DOMAIN: LOW LEVEL DESIGN (LLD) =====================
    // (FIX: same issue as above — `lldDomain` was used further down without
    // ever being created.)
    const lldDomain = await ChallengeDomain.create({
      name: 'Low Level Design (LLD)',
      slug: 'lld',
      description: 'Object-oriented design and design patterns for real-world systems.',
      icon: 'Boxes',
      order: 2,
      isActive: true
    });

    // ─────────────────────────────────────────────────────────────────
// SEED EXPANSION — PASTE BELOW THE "Two Sum" Challenge.create() BLOCK
// AND ABOVE: console.log('💾 Detailed Module 2 problem workspaces...')
// Reuses existing: dsaDomain, lldDomain, map
// ─────────────────────────────────────────────────────────────────

// ===================== DSA & ALGORITHMS — NEW CATEGORIES =====================

const stringsCategory = await ChallengeCategory.create({
  domain: dsaDomain._id,
  name: 'Strings',
  slug: 'strings',
  description: 'Pattern matching, sliding windows, and string manipulation problems.',
  order: 2,
  challengeCount: 3,
  isActive: true,
  level: 'Easy'
});

await Challenge.insertMany([
  {
    domain: dsaDomain._id,
    category: stringsCategory._id,
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    description: 'Given a string, find the length of the longest substring without repeating characters.',
    examples: [{ label: 'Standard Run Case', input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' }],
    approach: {
      overview: 'Use a sliding window with a hash map storing the last seen index of each character.',
      steps: [
        { title: 'Initialize Window', explanation: 'Set left = 0 and an empty map of char -> last index.' },
        { title: 'Expand Right', explanation: 'Move right pointer, if char seen inside window move left past it.' },
        { title: 'Track Max Length', explanation: 'Update max length as (right - left + 1) each iteration.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(n)', timeExplanation: 'Each character visited at most twice.', spaceComplexity: 'O(min(n, m))', spaceExplanation: 'Map size bounded by charset size m.' },
    keyInsights: ['Sliding window avoids re-scanning substrings.', 'Storing last index (not just a set) lets left jump directly.'],
    relatedCompanies: [map.google, map.amazon, map.microsoft],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function lengthOfLongestSubstring(s) {\n  const lastIndex = new Map();\n  let left = 0, max = 0;\n  for (let right = 0; right < s.length; right++) {\n    const c = s[right];\n    if (lastIndex.has(c) && lastIndex.get(c) >= left) {\n      left = lastIndex.get(c) + 1;\n    }\n    lastIndex.set(c, right);\n    max = Math.max(max, right - left + 1);\n  }\n  return max;\n}' }],
    approved: true,
    views: 0
  },
  {
    domain: dsaDomain._id,
    category: stringsCategory._id,
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    description: 'Determine if two strings are anagrams of each other.',
    examples: [{ label: 'Standard Run Case', input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Both strings contain the same character counts.' }],
    approach: {
      overview: 'Count character frequencies in both strings and compare.',
      steps: [
        { title: 'Check Lengths', explanation: 'If lengths differ, return false immediately.' },
        { title: 'Build Frequency Map', explanation: 'Increment counts for s, decrement for t using the same map.' },
        { title: 'Validate All Zero', explanation: 'If every count returns to zero, strings are anagrams.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(n)', timeExplanation: 'Single pass over both strings.', spaceComplexity: 'O(1)', spaceExplanation: 'Bounded by 26 lowercase letters (or charset size).' },
    keyInsights: ['A single frequency map avoids building two separate maps.', 'Sorting both strings is a simpler O(n log n) alternative.'],
    relatedCompanies: [map.amazon, map.microsoft],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const counts = {};\n  for (const c of s) counts[c] = (counts[c] || 0) + 1;\n  for (const c of t) {\n    if (!counts[c]) return false;\n    counts[c]--;\n  }\n  return true;\n}' }],
    approved: true,
    views: 0
  },
  {
    domain: dsaDomain._id,
    category: stringsCategory._id,
    title: 'Minimum Window Substring',
    slug: 'minimum-window-substring',
    difficulty: 'Hard',
    description: 'Given strings s and t, find the smallest substring of s containing all characters of t.',
    examples: [{ label: 'Standard Run Case', input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'The smallest window containing A, B, and C is "BANC".' }],
    approach: {
      overview: 'Use a sliding window with two hash maps: one for required counts, one for the current window.',
      steps: [
        { title: 'Build Requirement Map', explanation: 'Count frequency of each character needed from t.' },
        { title: 'Expand Right', explanation: 'Grow window until all required characters are satisfied.' },
        { title: 'Contract Left', explanation: 'Shrink from the left while the window remains valid, tracking the minimum.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(n + m)', timeExplanation: 'Each pointer traverses s at most once.', spaceComplexity: 'O(m)', spaceExplanation: 'Map size bounded by distinct characters in t.' },
    keyInsights: ['Track a "formed" counter to avoid re-checking full map equality each step.', 'This pattern generalizes to many "smallest window satisfying condition" problems.'],
    relatedCompanies: [map.google, map.amazon],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function minWindow(s, t) {\n  if (!s || !t) return "";\n  const need = {};\n  for (const c of t) need[c] = (need[c] || 0) + 1;\n  let required = Object.keys(need).length;\n  let left = 0, formed = 0;\n  const window = {};\n  let best = [Infinity, 0, 0];\n  for (let right = 0; right < s.length; right++) {\n    const c = s[right];\n    window[c] = (window[c] || 0) + 1;\n    if (need[c] && window[c] === need[c]) formed++;\n    while (formed === required) {\n      if (right - left + 1 < best[0]) best = [right - left + 1, left, right];\n      const lc = s[left];\n      window[lc]--;\n      if (need[lc] && window[lc] < need[lc]) formed--;\n      left++;\n    }\n  }\n  return best[0] === Infinity ? "" : s.slice(best[1], best[2] + 1);\n}' }],
    approved: true,
    views: 0
  }
]);

const linkedListCategory = await ChallengeCategory.create({
  domain: dsaDomain._id,
  name: 'Linked Lists',
  slug: 'linked-lists',
  description: 'Pointer manipulation, cycle detection, and reversal problems.',
  order: 3,
  challengeCount: 2,
  isActive: true,
  level: 'Medium'
});

await Challenge.insertMany([
  {
    domain: dsaDomain._id,
    category: linkedListCategory._id,
    title: 'Reverse a Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Easy',
    description: 'Reverse a singly linked list in place.',
    examples: [{ label: 'Standard Run Case', input: '1 -> 2 -> 3 -> 4 -> 5', output: '5 -> 4 -> 3 -> 2 -> 1', explanation: 'Each node\'s next pointer is flipped.' }],
    approach: {
      overview: 'Iterate through the list, reversing next pointers using three tracking pointers.',
      steps: [
        { title: 'Initialize Pointers', explanation: 'prev = null, curr = head.' },
        { title: 'Iterate and Flip', explanation: 'Store next, point curr.next to prev, advance prev and curr.' },
        { title: 'Return New Head', explanation: 'prev becomes the new head once curr is null.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(n)', timeExplanation: 'Single traversal of the list.', spaceComplexity: 'O(1)', spaceExplanation: 'Only pointer variables used, no extra structures.' },
    keyInsights: ['Recursive solution is elegant but uses O(n) call stack space.', 'Always store next before overwriting curr.next.'],
    relatedCompanies: [map.microsoft, map.amazon],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}' }],
    approved: true,
    views: 0
  },
  {
    domain: dsaDomain._id,
    category: linkedListCategory._id,
    title: 'Detect Cycle in a Linked List',
    slug: 'detect-cycle-linked-list',
    difficulty: 'Medium',
    description: 'Determine whether a linked list contains a cycle.',
    examples: [{ label: 'Standard Run Case', input: 'head with a cycle back to node index 1', output: 'true', explanation: 'A fast pointer eventually laps a slow pointer inside the cycle.' }],
    approach: {
      overview: 'Use Floyd\'s Tortoise and Hare: two pointers moving at different speeds.',
      steps: [
        { title: 'Initialize Pointers', explanation: 'slow and fast both start at head.' },
        { title: 'Advance at Different Speeds', explanation: 'slow moves 1 step, fast moves 2 steps per iteration.' },
        { title: 'Check for Meeting', explanation: 'If slow === fast at any point, a cycle exists.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(n)', timeExplanation: 'Fast pointer catches slow pointer within one cycle length.', spaceComplexity: 'O(1)', spaceExplanation: 'No auxiliary data structure needed, unlike a hash-set approach.' },
    keyInsights: ['A hash set of visited nodes solves it in O(n) space instead — worth mentioning as tradeoff.', 'This pattern extends to finding the cycle\'s starting node.'],
    relatedCompanies: [map.amazon, map.google],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}' }],
    approved: true,
    views: 0
  }
]);

const treesCategory = await ChallengeCategory.create({
  domain: dsaDomain._id,
  name: 'Trees & BST',
  slug: 'trees-and-bst',
  description: 'Traversals, balancing, and binary search tree properties.',
  order: 4,
  challengeCount: 2,
  isActive: true,
  level: 'Easy'
});

await Challenge.insertMany([
  {
    domain: dsaDomain._id,
    category: treesCategory._id,
    title: 'Validate Binary Search Tree',
    slug: 'validate-binary-search-tree',
    difficulty: 'Medium',
    description: 'Determine if a binary tree is a valid binary search tree.',
    examples: [{ label: 'Standard Run Case', input: 'root = [2,1,3]', output: 'true', explanation: 'Left subtree values < 2, right subtree values > 2.' }],
    approach: {
      overview: 'Recursively validate each node against a running (min, max) bound.',
      steps: [
        { title: 'Pass Bounds Down', explanation: 'Each recursive call carries an allowed (low, high) range.' },
        { title: 'Check Node Value', explanation: 'Node value must strictly fall within the current bounds.' },
        { title: 'Recurse With Updated Bounds', explanation: 'Left child gets updated high = node.val; right child gets updated low = node.val.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(n)', timeExplanation: 'Every node visited exactly once.', spaceComplexity: 'O(h)', spaceExplanation: 'Recursion stack proportional to tree height h.' },
    keyInsights: ['Comparing only to immediate parent is a common bug — bounds must propagate from the root.', 'An in-order traversal that checks strictly increasing order is an equivalent iterative approach.'],
    relatedCompanies: [map.google, map.microsoft],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function isValidBST(root, low = -Infinity, high = Infinity) {\n  if (!root) return true;\n  if (root.val <= low || root.val >= high) return false;\n  return isValidBST(root.left, low, root.val) && isValidBST(root.right, root.val, high);\n}' }],
    approved: true,
    views: 0
  },
  {
    domain: dsaDomain._id,
    category: treesCategory._id,
    title: 'Lowest Common Ancestor of a Binary Tree',
    slug: 'lowest-common-ancestor-binary-tree',
    difficulty: 'Medium',
    description: 'Find the lowest common ancestor of two given nodes in a binary tree.',
    examples: [{ label: 'Standard Run Case', input: 'root, p = 5, q = 1', output: '3', explanation: 'Node 3 is the deepest node that is an ancestor of both 5 and 1.' }],
    approach: {
      overview: 'Recursively search both subtrees; the node where both targets are found in different branches is the LCA.',
      steps: [
        { title: 'Base Case', explanation: 'If root is null or matches p or q, return root.' },
        { title: 'Recurse Left and Right', explanation: 'Search both subtrees for p and q.' },
        { title: 'Combine Results', explanation: 'If both sides return non-null, current root is the LCA; otherwise propagate the non-null side up.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(n)', timeExplanation: 'Worst case visits every node once.', spaceComplexity: 'O(h)', spaceExplanation: 'Recursion depth bounded by tree height.' },
    keyInsights: ['Works even without parent pointers, unlike path-comparison approaches.', 'For a BST specifically, this can be optimized to O(h) using value comparisons only.'],
    relatedCompanies: [map.amazon, map.google],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function lowestCommonAncestor(root, p, q) {\n  if (!root || root === p || root === q) return root;\n  const left = lowestCommonAncestor(root.left, p, q);\n  const right = lowestCommonAncestor(root.right, p, q);\n  if (left && right) return root;\n  return left || right;\n}' }],
    approved: true,
    views: 0
  }
]);

const graphsCategory = await ChallengeCategory.create({
  domain: dsaDomain._id,
  name: 'Graphs',
  slug: 'graphs',
  description: 'BFS, DFS, topological sort, and shortest-path problems.',
  order: 5,
  challengeCount: 2,
  isActive: true,
  level: 'Medium'
});

await Challenge.insertMany([
  {
    domain: dsaDomain._id,
    category: graphsCategory._id,
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'Medium',
    description: 'Given a 2D grid of 1s (land) and 0s (water), count the number of islands.',
    examples: [{ label: 'Standard Run Case', input: 'grid = [["1","1","0"],["0","1","0"],["0","0","1"]]', output: '2', explanation: 'Two connected groups of land cells exist.' }],
    approach: {
      overview: 'For each unvisited land cell, flood-fill (DFS/BFS) to mark the entire connected island as visited.',
      steps: [
        { title: 'Scan Grid', explanation: 'Iterate every cell in the grid.' },
        { title: 'Trigger Flood Fill', explanation: 'On an unvisited "1", increment island count and DFS/BFS to sink connected land.' },
        { title: 'Mark Visited', explanation: 'Set visited cells to "0" or track in a separate visited set to avoid recount.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(rows * cols)', timeExplanation: 'Each cell visited a constant number of times.', spaceComplexity: 'O(rows * cols)', spaceExplanation: 'Worst-case recursion stack for an all-land grid.' },
    keyInsights: ['BFS with an explicit queue avoids stack overflow risk on very large grids.', 'Mutating the grid in place saves the need for a separate visited matrix.'],
    relatedCompanies: [map.amazon, map.google, map.microsoft],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function numIslands(grid) {\n  let count = 0;\n  const rows = grid.length, cols = grid[0].length;\n  function sink(r, c) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;\n    grid[r][c] = "0";\n    sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1);\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === "1") { count++; sink(r, c); }\n    }\n  }\n  return count;\n}' }],
    approved: true,
    views: 0
  },
  {
    domain: dsaDomain._id,
    category: graphsCategory._id,
    title: 'Course Schedule (Topological Sort)',
    slug: 'course-schedule',
    difficulty: 'Medium',
    description: 'Given course prerequisites, determine if it is possible to finish all courses.',
    examples: [{ label: 'Standard Run Case', input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'Take course 0 first, then course 1; no cycle exists.' }],
    approach: {
      overview: 'Model prerequisites as a directed graph and detect a cycle using topological sort (Kahn\'s algorithm).',
      steps: [
        { title: 'Build Graph & In-Degrees', explanation: 'Create adjacency list and compute in-degree for each course.' },
        { title: 'Queue Zero In-Degree Nodes', explanation: 'Start BFS from courses with no prerequisites.' },
        { title: 'Process and Reduce', explanation: 'Remove edges as courses are processed; if all courses are processed, no cycle exists.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(V + E)', timeExplanation: 'Each course and prerequisite edge processed once.', spaceComplexity: 'O(V + E)', spaceExplanation: 'Adjacency list and in-degree array storage.' },
    keyInsights: ['A cycle in the prerequisite graph means it is impossible to finish all courses.', 'DFS-based cycle detection with a "visiting" state is an equally valid alternative.'],
    relatedCompanies: [map.google, map.amazon],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function canFinish(numCourses, prerequisites) {\n  const adj = Array.from({ length: numCourses }, () => []);\n  const indegree = new Array(numCourses).fill(0);\n  for (const [course, pre] of prerequisites) {\n    adj[pre].push(course);\n    indegree[course]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);\n  let processed = 0;\n  while (queue.length) {\n    const node = queue.shift();\n    processed++;\n    for (const next of adj[node]) {\n      indegree[next]--;\n      if (indegree[next] === 0) queue.push(next);\n    }\n  }\n  return processed === numCourses;\n}' }],
    approved: true,
    views: 0
  }
]);

const dpCategory = await ChallengeCategory.create({
  domain: dsaDomain._id,
  name: 'Dynamic Programming',
  slug: 'dynamic-programming',
  description: 'Memoization, tabulation, and optimal substructure problems.',
  order: 6,
  challengeCount: 2,
  isActive: true,
  level: 'Medium'
});

await Challenge.insertMany([
  {
    domain: dsaDomain._id,
    category: dpCategory._id,
    title: 'Coin Change (Minimum Coins)',
    slug: 'coin-change',
    difficulty: 'Medium',
    description: 'Given coin denominations and a target amount, find the fewest coins needed to make that amount.',
    examples: [{ label: 'Standard Run Case', input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1, using 3 coins.' }],
    approach: {
      overview: 'Bottom-up DP where dp[i] represents the minimum coins needed for amount i.',
      steps: [
        { title: 'Initialize DP Array', explanation: 'dp[0] = 0, all other entries = Infinity.' },
        { title: 'Iterate Amounts', explanation: 'For each amount from 1 to target, try every coin denomination.' },
        { title: 'Take Minimum', explanation: 'dp[i] = min(dp[i], dp[i - coin] + 1) for each valid coin.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(amount * coins.length)', timeExplanation: 'Nested loop over amounts and denominations.', spaceComplexity: 'O(amount)', spaceExplanation: 'Single 1D DP array.' },
    keyInsights: ['Greedy coin selection fails for denominations like [1,3,4] with amount 6 — DP is required for correctness.', 'Return -1 (or Infinity check) when the amount is unreachable.'],
    relatedCompanies: [map.amazon, map.microsoft],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}' }],
    approved: true,
    views: 0
  },
  {
    domain: dsaDomain._id,
    category: dpCategory._id,
    title: 'Longest Increasing Subsequence',
    slug: 'longest-increasing-subsequence',
    difficulty: 'Medium',
    description: 'Find the length of the longest strictly increasing subsequence in an array.',
    examples: [{ label: 'Standard Run Case', input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'The subsequence [2,3,7,101] has length 4.' }],
    approach: {
      overview: 'Use binary search with a "tails" array tracking the smallest tail of increasing subsequences of each length.',
      steps: [
        { title: 'Initialize Tails Array', explanation: 'Start with an empty array representing subsequence tails.' },
        { title: 'Binary Search Insertion Point', explanation: 'For each number, find the position to replace or extend the tails array.' },
        { title: 'Update or Extend', explanation: 'If number is larger than all tails, append; otherwise replace the first tail >= number.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(n log n)', timeExplanation: 'Binary search per element instead of O(n^2) naive DP.', spaceComplexity: 'O(n)', spaceExplanation: 'Tails array bounded by input length.' },
    keyInsights: ['The tails array is not the actual LIS, only tracks lengths correctly.', 'A simpler O(n^2) DP (dp[i] = longest ending at i) is a good starting point before optimizing.'],
    relatedCompanies: [map.google, map.amazon],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function lengthOfLIS(nums) {\n  const tails = [];\n  for (const num of nums) {\n    let lo = 0, hi = tails.length;\n    while (lo < hi) {\n      const mid = (lo + hi) >> 1;\n      if (tails[mid] < num) lo = mid + 1;\n      else hi = mid;\n    }\n    tails[lo] = num;\n  }\n  return tails.length;\n}' }],
    approved: true,
    views: 0
  }
]);

const backtrackingCategory = await ChallengeCategory.create({
  domain: dsaDomain._id,
  name: 'Backtracking',
  slug: 'backtracking',
  description: 'Combinatorics, constraint satisfaction, and exhaustive search problems.',
  order: 7,
  challengeCount: 2,
  isActive: true,
  level: 'Medium'
});

await Challenge.insertMany([
  {
    domain: dsaDomain._id,
    category: backtrackingCategory._id,
    title: 'Generate All Subsets',
    slug: 'generate-all-subsets',
    difficulty: 'Medium',
    description: 'Given an array of unique integers, return all possible subsets.',
    examples: [{ label: 'Standard Run Case', input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', explanation: 'All 2^3 = 8 subsets are generated.' }],
    approach: {
      overview: 'Backtrack through each index, choosing to include or exclude it in the current subset.',
      steps: [
        { title: 'Define Recursive Function', explanation: 'Track a start index and the current subset path.' },
        { title: 'Record Current Path', explanation: 'Push a copy of path into results at every recursive call.' },
        { title: 'Branch and Backtrack', explanation: 'For each subsequent index, add to path, recurse, then remove (backtrack).' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(2^n)', timeExplanation: 'Every element has two states: included or excluded.', spaceComplexity: 'O(n)', spaceExplanation: 'Recursion depth and path array bounded by input size.' },
    keyInsights: ['Bitmasking is a non-recursive alternative for generating all subsets.', 'This exact template extends directly to permutations and combinations.'],
    relatedCompanies: [map.amazon, map.microsoft],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function subsets(nums) {\n  const result = [];\n  function backtrack(start, path) {\n    result.push([...path]);\n    for (let i = start; i < nums.length; i++) {\n      path.push(nums[i]);\n      backtrack(i + 1, path);\n      path.pop();\n    }\n  }\n  backtrack(0, []);\n  return result;\n}' }],
    approved: true,
    views: 0
  },
  {
    domain: dsaDomain._id,
    category: backtrackingCategory._id,
    title: 'N-Queens',
    slug: 'n-queens',
    difficulty: 'Hard',
    description: 'Place N queens on an N x N chessboard so that no two queens attack each other.',
    examples: [{ label: 'Standard Run Case', input: 'n = 4', output: '2 distinct solutions', explanation: 'Two valid non-attacking queen placements exist for a 4x4 board.' }],
    approach: {
      overview: 'Place queens row by row, backtracking whenever a placement violates column or diagonal constraints.',
      steps: [
        { title: 'Track Constraints', explanation: 'Use sets for occupied columns, and two diagonal directions (r-c and r+c).' },
        { title: 'Recurse Per Row', explanation: 'For each row, try every column; skip if it conflicts with existing constraints.' },
        { title: 'Backtrack on Conflict', explanation: 'Remove the queen and constraint entries when a branch fails or after exploring it.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(n!)', timeExplanation: 'Worst-case exponential search space, pruned heavily by constraint checks.', spaceComplexity: 'O(n)', spaceExplanation: 'Constraint sets and recursion depth scale linearly with n.' },
    keyInsights: ['Diagonal conflicts can be tracked in O(1) using r-c and r+c as unique keys.', 'Pruning early (checking constraints before recursing) is far more efficient than validating a full board after placement.'],
    relatedCompanies: [map.google, map.amazon],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Optimal', content: 'function solveNQueens(n) {\n  let count = 0;\n  const cols = new Set(), diag1 = new Set(), diag2 = new Set();\n  function backtrack(row) {\n    if (row === n) { count++; return; }\n    for (let col = 0; col < n; col++) {\n      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;\n      cols.add(col); diag1.add(row - col); diag2.add(row + col);\n      backtrack(row + 1);\n      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);\n    }\n  }\n  backtrack(0);\n  return count;\n}' }],
    approved: true,
    views: 0
  }
]);

// ===================== LOW LEVEL DESIGN — NEW CATEGORIES =====================

const solidCategory = await ChallengeCategory.create({
  domain: lldDomain._id,
  name: 'SOLID Principles',
  slug: 'solid-principles',
  description: 'Applying single responsibility, open-closed, and dependency inversion in real designs.',
  order: 1,
  challengeCount: 1,
  isActive: true,
  level: 'Hard'
});

await Challenge.create({
  domain: lldDomain._id,
  category: solidCategory._id,
  title: 'Refactor a Notification System Using SOLID',
  slug: 'notification-system-solid',
  difficulty: 'Medium',
  description: 'Given a tightly-coupled notification class handling Email, SMS, and Push logic in one method, refactor it to follow SOLID principles.',
  examples: [{ label: 'Standard Run Case', input: 'NotificationService.send(type, message)', output: 'Decoupled sender classes implementing a common interface', explanation: 'Each channel becomes its own class implementing a shared NotificationSender interface.' }],
  approach: {
    overview: 'Apply Single Responsibility (split channels into classes) and Open-Closed (add new channels without modifying existing code) via a strategy pattern.',
    steps: [
      { title: 'Extract Interface', explanation: 'Define a NotificationSender interface with a send(message) method.' },
      { title: 'Implement Per Channel', explanation: 'Create EmailSender, SmsSender, PushSender each implementing the interface independently.' },
      { title: 'Inject Dependencies', explanation: 'NotificationService depends on the interface, not concrete classes, satisfying dependency inversion.' }
    ]
  },
  tradeoffs: { timeComplexity: 'N/A', timeExplanation: 'Design problem, not an algorithmic complexity question.', spaceComplexity: 'N/A', spaceExplanation: 'Evaluated on extensibility and coupling, not memory.' },
  keyInsights: ['Adding a new channel (e.g., WhatsApp) requires zero changes to existing sender classes.', 'A factory or registry pattern is commonly paired with this to select senders dynamically.'],
  relatedCompanies: [map.amazon, map.microsoft],
  referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Design', content: 'class NotificationSender {\n  send(message) { throw new Error("Not implemented"); }\n}\n\nclass EmailSender extends NotificationSender {\n  send(message) { console.log(`Email: ${message}`); }\n}\n\nclass SmsSender extends NotificationSender {\n  send(message) { console.log(`SMS: ${message}`); }\n}\n\nclass NotificationService {\n  constructor(sender) { this.sender = sender; }\n  notify(message) { this.sender.send(message); }\n}' }],
  approved: true,
  views: 0
});

const designPatternsCategory = await ChallengeCategory.create({
  domain: lldDomain._id,
  name: 'Design Patterns',
  slug: 'design-patterns',
  description: 'Applying classic Gang of Four patterns to interview-style design problems.',
  order: 2,
  challengeCount: 1,
  isActive: true,
  level: 'Medium'
});

await Challenge.create({
  domain: lldDomain._id,
  category: designPatternsCategory._id,
  title: 'Design a Payment Gateway Using Strategy Pattern',
  slug: 'payment-gateway-strategy-pattern',
  difficulty: 'Medium',
  description: 'Design a payment system that supports Credit Card, UPI, and Wallet payments, allowing new methods to be added without modifying existing code.',
  examples: [{ label: 'Standard Run Case', input: 'PaymentContext.pay(strategy, amount)', output: 'Delegates to the selected strategy\'s pay() implementation', explanation: 'Each payment method is encapsulated as an interchangeable strategy object.' }],
  approach: {
    overview: 'Use the Strategy pattern so PaymentContext holds a reference to a PaymentStrategy interface, swappable at runtime.',
    steps: [
      { title: 'Define Strategy Interface', explanation: 'PaymentStrategy interface with a pay(amount) method.' },
      { title: 'Implement Concrete Strategies', explanation: 'CreditCardStrategy, UpiStrategy, WalletStrategy each implement pay independently.' },
      { title: 'Compose via Context', explanation: 'PaymentContext accepts a strategy in its constructor and delegates calls to it.' }
    ]
  },
  tradeoffs: { timeComplexity: 'N/A', timeExplanation: 'Design-focused problem.', spaceComplexity: 'N/A', spaceExplanation: 'Evaluated on decoupling and testability.' },
  keyInsights: ['Strategy pattern avoids large if/else or switch blocks that grow with every new payment method.', 'Each strategy can be unit tested in isolation.'],
  relatedCompanies: [map.amazon, map.google],
  referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Design', content: 'class PaymentStrategy {\n  pay(amount) { throw new Error("Not implemented"); }\n}\n\nclass CreditCardStrategy extends PaymentStrategy {\n  pay(amount) { console.log(`Paid ${amount} via Credit Card`); }\n}\n\nclass UpiStrategy extends PaymentStrategy {\n  pay(amount) { console.log(`Paid ${amount} via UPI`); }\n}\n\nclass PaymentContext {\n  constructor(strategy) { this.strategy = strategy; }\n  pay(amount) { this.strategy.pay(amount); }\n}' }],
  approved: true,
  views: 0
});

const parkingLotCategory = await ChallengeCategory.create({
  domain: lldDomain._id,
  name: 'Parking Lot System',
  slug: 'parking-lot-system',
  description: 'Classic LLD interview problem: modeling a multi-level parking lot with different vehicle and spot types.',
  order: 3,
  challengeCount: 1,
  isActive: true,
  level: 'Medium'
});

await Challenge.create({
  domain: lldDomain._id,
  category: parkingLotCategory._id,
  title: 'Design a Parking Lot System',
  slug: 'design-parking-lot-system',
  difficulty: 'Medium',
  description: 'Design classes to model a parking lot supporting multiple floors, spot sizes (compact, large, handicapped), and vehicle types.',
  examples: [{ label: 'Standard Run Case', input: 'ParkingLot.parkVehicle(vehicle)', output: 'Assigns the nearest available compatible spot and returns a ticket', explanation: 'The system finds a free spot matching the vehicle size across floors.' }],
  approach: {
    overview: 'Model Floor, ParkingSpot (with a type/size), and Vehicle as separate classes; ParkingLot orchestrates spot allocation.',
    steps: [
      { title: 'Model Core Entities', explanation: 'Vehicle (with type), ParkingSpot (with size, isOccupied), Floor (list of spots).' },
      { title: 'Implement Allocation Logic', explanation: 'ParkingLot iterates floors/spots to find the first compatible free spot for a vehicle.' },
      { title: 'Handle Ticketing', explanation: 'On park, generate a Ticket linking vehicle to spot and timestamp; on exit, compute duration and free the spot.' }
    ]
  },
  tradeoffs: { timeComplexity: 'N/A', timeExplanation: 'Design-focused problem, complexity depends on spot search strategy chosen.', spaceComplexity: 'N/A', spaceExplanation: 'Evaluated on class modeling, not memory.' },
  keyInsights: ['Using a size hierarchy (e.g., compact fits in large spots but not vice versa) is a common edge case interviewers probe.', 'Separating pricing logic into its own strategy class keeps ParkingLot focused on allocation only.'],
  relatedCompanies: [map.amazon, map.microsoft],
  referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Design', content: 'class ParkingSpot {\n  constructor(id, size) { this.id = id; this.size = size; this.occupied = false; }\n}\n\nclass ParkingLot {\n  constructor(spots) { this.spots = spots; }\n  findSpot(vehicleSize) {\n    return this.spots.find(s => !s.occupied && s.size === vehicleSize);\n  }\n  park(vehicle) {\n    const spot = this.findSpot(vehicle.size);\n    if (!spot) throw new Error("No available spot");\n    spot.occupied = true;\n    return { spotId: spot.id, timestamp: Date.now() };\n  }\n}' }],
  approved: true,
  views: 0
});

// ===================== NEW DOMAIN: HIGH LEVEL DESIGN (HLD) =====================

const hldDomain = await ChallengeDomain.create({
  name: 'High Level Design (HLD)',
  slug: 'hld',
  description: 'Architect large-scale distributed systems for real-world products.',
  icon: 'Network',
  order: 3,
  isActive: true,
  level: 'Medium'
});

const urlShortenerCategory = await ChallengeCategory.create({
  domain: hldDomain._id,
  name: 'URL Shortener',
  slug: 'url-shortener',
  description: 'Design a scalable URL shortening service like Bitly or TinyURL.',
  order: 1,
  challengeCount: 2,
  isActive: true,
  level: 'Medium'
});

await Challenge.insertMany([
  {
    domain: hldDomain._id,
    category: urlShortenerCategory._id,
    title: 'Design a URL Shortening Service',
    slug: 'design-url-shortener',
    difficulty: 'Medium',
    description: 'Design a system like TinyURL that converts long URLs into short, unique aliases and redirects users accordingly.',
    examples: [{ label: 'Standard Run Case', input: 'POST /shorten { url: "https://example.com/very/long/path" }', output: '{ shortUrl: "http://tny.co/aZ3x9" }', explanation: 'The service generates a unique short code and stores the mapping.' }],
    approach: {
      overview: 'Use a base62-encoded counter or hash-based approach for short code generation, backed by a key-value store for fast lookups.',
      steps: [
        { title: 'Design Encoding Strategy', explanation: 'Use a distributed counter encoded in base62, or hash the URL and truncate with collision handling.' },
        { title: 'Design Storage', explanation: 'Use a key-value store (e.g., DynamoDB/Redis) mapping short code -> long URL for O(1) redirect lookups.' },
        { title: 'Handle Redirects', explanation: 'On GET /:code, look up the long URL and issue a 301/302 redirect, updating analytics counters asynchronously.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(1) lookup', timeExplanation: 'Key-value store gives constant-time redirect resolution.', spaceComplexity: 'O(n)', spaceExplanation: 'Storage grows linearly with the number of shortened URLs.' },
    keyInsights: ['A distributed counter (e.g., via Zookeeper or a dedicated ID service) avoids collision issues that hashing introduces at scale.', 'Caching hot short codes in Redis significantly reduces database load for popular links.'],
    relatedCompanies: [map.google, map.amazon, map.microsoft],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Sketch', content: 'const store = new Map();\nlet counter = 1000000;\n\nfunction toBase62(num) {\n  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";\n  let result = "";\n  while (num > 0) { result = chars[num % 62] + result; num = Math.floor(num / 62); }\n  return result;\n}\n\nfunction shortenUrl(longUrl) {\n  const code = toBase62(counter++);\n  store.set(code, longUrl);\n  return `http://tny.co/${code}`;\n}\n\nfunction resolve(code) {\n  return store.get(code) || null;\n}' }],
    approved: true,
    views: 0
  },
  {
    domain: hldDomain._id,
    category: urlShortenerCategory._id,
    title: 'Handling Custom Aliases and Expiry',
    slug: 'url-shortener-custom-alias-expiry',
    difficulty: 'Medium',
    description: 'Extend a URL shortener to support user-chosen custom aliases and automatic link expiration.',
    examples: [{ label: 'Standard Run Case', input: 'POST /shorten { url, customAlias: "myPromo", expiresInDays: 30 }', output: '{ shortUrl: "http://tny.co/myPromo" }', explanation: 'The service reserves the custom alias if unused and sets a TTL for expiry.' }],
    approach: {
      overview: 'Add a uniqueness check for custom aliases and a TTL-based expiry mechanism, either via database TTL indexes or a background sweep job.',
      steps: [
        { title: 'Validate Custom Alias', explanation: 'Check the key-value store for existing alias before reserving it; reject on collision.' },
        { title: 'Attach Expiry Metadata', explanation: 'Store an expiresAt timestamp alongside the mapping.' },
        { title: 'Enforce Expiry', explanation: 'Use a TTL index (MongoDB) or a scheduled cleanup job to remove expired mappings; check expiry on read as a fallback.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(1) amortized', timeExplanation: 'Alias uniqueness check and lookup remain constant-time with an indexed store.', spaceComplexity: 'O(n)', spaceExplanation: 'Expired links must eventually be purged to bound storage growth.' },
    keyInsights: ['Checking expiry lazily on read (in addition to background cleanup) prevents serving stale links if the sweep job lags.', 'Custom aliases need stricter validation (length, characters) to avoid collisions with the encoding scheme used for auto-generated codes.'],
    relatedCompanies: [map.amazon, map.microsoft],
    referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Sketch', content: 'function shortenWithAlias(store, longUrl, alias, expiresInDays) {\n  if (store.has(alias)) throw new Error("Alias already taken");\n  const expiresAt = Date.now() + expiresInDays * 24 * 60 * 60 * 1000;\n  store.set(alias, { longUrl, expiresAt });\n  return `http://tny.co/${alias}`;\n}\n\nfunction resolveWithExpiry(store, code) {\n  const entry = store.get(code);\n  if (!entry) return null;\n  if (Date.now() > entry.expiresAt) { store.delete(code); return null; }\n  return entry.longUrl;\n}' }],
    approved: true,
    views: 0
  }
]);

const whatsappCategory = await ChallengeCategory.create({
  domain: hldDomain._id,
  name: 'WhatsApp',
  slug: 'whatsapp',
  description: 'Design a real-time messaging system with delivery guarantees.',
  order: 2,
  challengeCount: 1,
  isActive: true,
  level: 'Hard'
});

await Challenge.create({
  domain: hldDomain._id,
  category: whatsappCategory._id,
  title: 'Design a Real-Time Chat Messaging System',
  slug: 'design-whatsapp-messaging',
  difficulty: 'Hard',
  description: 'Design a system supporting real-time 1:1 and group messaging with delivery and read receipts, similar to WhatsApp.',
  examples: [{ label: 'Standard Run Case', input: 'User A sends message to User B while B is offline', output: 'Message queued and delivered on B\'s reconnect, with delivered/read status updates', explanation: 'Messages persist server-side until acknowledged by the recipient client.' }],
  approach: {
    overview: 'Use persistent WebSocket connections for online users, a message queue for offline delivery, and a database for message history.',
    steps: [
      { title: 'Establish Connections', explanation: 'Clients maintain a WebSocket connection to a gateway server; connection state tracked in a presence service.' },
      { title: 'Route Messages', explanation: 'On send, look up recipient\'s connection server via presence service; if online, push directly, else persist to a per-user queue.' },
      { title: 'Track Delivery State', explanation: 'Store message states (sent/delivered/read) and emit status updates back to the sender as receipts arrive.' }
    ]
  },
  tradeoffs: { timeComplexity: 'O(1) per message routing', timeExplanation: 'Presence lookup and queue push/pop are constant-time operations.', spaceComplexity: 'O(m)', spaceExplanation: 'Storage scales with total undelivered and historical messages, mitigated by retention policies.' },
  keyInsights: ['Sharding chat servers by user ID with a presence/routing layer avoids a single point of connection bottleneck.', 'End-to-end encryption means the server routes ciphertext blobs without needing to inspect message content.'],
  relatedCompanies: [map.google, map.amazon],
  referenceAnswer: [{ language: 'javascript', tabLabel: 'JavaScript Sketch', content: 'const presence = new Map(); // userId -> socket\nconst offlineQueue = new Map(); // userId -> [messages]\n\nfunction sendMessage(senderId, recipientId, message) {\n  const payload = { from: senderId, message, status: "sent", timestamp: Date.now() };\n  const socket = presence.get(recipientId);\n  if (socket) {\n    socket.emit("message", payload);\n    payload.status = "delivered";\n  } else {\n    const queue = offlineQueue.get(recipientId) || [];\n    queue.push(payload);\n    offlineQueue.set(recipientId, queue);\n  }\n  return payload;\n}' }],
  approved: true,
  views: 0
});

// ===================== NEW DOMAIN: SQL =====================

const sqlDomain = await ChallengeDomain.create({
  name: 'SQL',
  slug: 'sql',
  description: 'Query writing, schema design, joins, and window functions for backend and data roles.',
  icon: 'Database',
  order: 4,
  isActive: true
});

const joinsCategory = await ChallengeCategory.create({
  domain: sqlDomain._id,
  name: 'Joins & Subqueries',
  slug: 'joins-and-subqueries',
  description: 'Combining and filtering data across multiple related tables.',
  order: 1,
  challengeCount: 2,
  isActive: true,
  level: 'Easy'
});

await Challenge.insertMany([
  {
    domain: sqlDomain._id,
    category: joinsCategory._id,
    title: 'Find Employees Earning More Than Their Manager',
    slug: 'employees-earning-more-than-manager',
    difficulty: 'Medium',
    description: 'Given an Employee table with id, name, salary, and managerId, find employees who earn more than their manager.',
    examples: [{ label: 'Standard Run Case', input: 'Employee(id=1,name="Joe",salary=70000,managerId=3), Employee(id=3,name="Sam",salary=60000)', output: '[{name: "Joe"}]', explanation: 'Joe earns more than his manager Sam, so Joe is returned.' }],
    approach: {
      overview: 'Self-join the Employee table on managerId = manager\'s id, then filter where the employee\'s salary exceeds the manager\'s salary.',
      steps: [
        { title: 'Alias the Table Twice', explanation: 'Treat the table as both "e" (employee) and "m" (manager) via a self-join.' },
        { title: 'Join on Manager Relationship', explanation: 'JOIN e.managerId = m.id.' },
        { title: 'Filter and Select', explanation: 'WHERE e.salary > m.salary, SELECT e.name.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(n) with an index on managerId', timeExplanation: 'An index on managerId turns the self-join into an efficient lookup rather than a full scan.', spaceComplexity: 'N/A', spaceExplanation: 'Query-level problem; no significant auxiliary storage.' },
    keyInsights: ['This is a classic self-join pattern reused for any "compare row to related row" problem (e.g., duplicate detection).', 'Always index the foreign key column used in the self-join for production performance.'],
    relatedCompanies: [map.amazon, map.google],
    referenceAnswer: [{ language: 'sql', tabLabel: 'SQL Query', content: 'SELECT e.name AS Employee\nFROM Employee e\nJOIN Employee m ON e.managerId = m.id\nWHERE e.salary > m.salary;' }],
    approved: true,
    views: 0
  },
  {
    domain: sqlDomain._id,
    category: joinsCategory._id,
    title: 'Second Highest Salary',
    slug: 'second-highest-salary',
    difficulty: 'Easy',
    description: 'Write a query to find the second highest distinct salary from an Employee table. Return null if none exists.',
    examples: [{ label: 'Standard Run Case', input: 'Employee(salary) = [100, 200, 300]', output: '200', explanation: 'The second highest distinct salary among the rows is 200.' }],
    approach: {
      overview: 'Use a subquery to select the max salary strictly less than the overall maximum, wrapped so it returns null instead of erroring when no such row exists.',
      steps: [
        { title: 'Find Max Salary', explanation: 'Compute the maximum salary via a subquery.' },
        { title: 'Filter Below Max', explanation: 'Select MAX(salary) WHERE salary < that maximum.' },
        { title: 'Handle Empty Result', explanation: 'Wrap in an outer SELECT so a missing second value returns NULL instead of an empty result set.' }
      ]
    },
    tradeoffs: { timeComplexity: 'O(n)', timeExplanation: 'Two passes over the salary column (one per MAX computation), efficient with an index.', spaceComplexity: 'N/A', spaceExplanation: 'No significant auxiliary storage required.' },
    keyInsights: ['Using LIMIT/OFFSET is an alternative but can behave unexpectedly with duplicate top salaries — DISTINCT MAX avoids that pitfall.', 'Wrapping the subquery in an outer SELECT is the standard trick to return NULL gracefully.'],
    relatedCompanies: [map.microsoft, map.amazon],
    referenceAnswer: [{ language: 'sql', tabLabel: 'SQL Query', content: 'SELECT (\n  SELECT DISTINCT salary\n  FROM Employee\n  ORDER BY salary DESC\n  LIMIT 1 OFFSET 1\n) AS SecondHighestSalary;' }],
    approved: true,
    views: 0
  }
]);

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