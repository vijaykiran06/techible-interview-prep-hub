import mongoose from "mongoose";
import AiTopic from "../models/aiTopicSchema.js";
import "dotenv/config";

const topics = [
  // TIER 1 
  {
    title: "Arrays and Strings",
    slug: "arrays-and-strings",
    tier: 1,
    description: "Most common beginner interview topic.",
    content: "Arrays store elements at contiguous memory. Common questions: reverse an array, find duplicates, two-sum. Strings are character arrays — know slicing, reversal, and palindrome checks cold.",
  },
  {
    title: "Time and Space Complexity",
    slug: "time-and-space-complexity",
    tier: 1,
    description: "Big O — every interviewer asks this.",
    content: "Big O describes how runtime grows with input size. O(1) constant, O(n) linear, O(n²) quadratic. Always analyze your solution before the interviewer asks.",
  },
  {
    title: "OOP Concepts",
    slug: "oop-concepts",
    tier: 1,
    description: "Classes, inheritance, polymorphism, encapsulation.",
    content: "OOP pillars: Encapsulation (hide data), Inheritance (reuse code), Polymorphism (same interface, different behavior), Abstraction (hide complexity). Know real examples for each.",
  },
  {
    title: "Linked Lists",
    slug: "linked-lists",
    tier: 1,
    description: "Singly, doubly, and circular linked lists.",
    content: "A linked list is a chain of nodes each holding data and a pointer to the next. Common questions: reverse a list, detect a cycle (Floyd's algorithm), find the middle node.",
  },
  {
    title: "Stacks and Queues",
    slug: "stacks-and-queues",
    tier: 1,
    description: "LIFO vs FIFO — classic interview data structures.",
    content: "Stack: Last In First Out — used for undo, call stack, balanced parentheses. Queue: First In First Out — used for BFS, task scheduling. Know how to implement both using arrays and linked lists.",
  },

  //  TIER 2
  {
    title: "Trees and Binary Search Trees",
    slug: "trees-and-bst",
    tier: 2,
    description: "Traversals, BST insert/delete, height, diameter.",
    content: "Binary tree traversals: inorder (left-root-right), preorder, postorder. BST property: left < root < right. Common questions: validate BST, lowest common ancestor, level order traversal using a queue.",
  },
  {
    title: "Graphs and BFS/DFS",
    slug: "graphs-bfs-dfs",
    tier: 2,
    description: "Graph representations and core traversal algorithms.",
    content: "Graphs can be represented as adjacency list or matrix. BFS uses a queue — good for shortest path. DFS uses a stack (or recursion) — good for cycle detection and topological sort.",
  },
  {
    title: "Dynamic Programming",
    slug: "dynamic-programming",
    tier: 2,
    description: "Memoization, tabulation, and classic DP problems.",
    content: "DP breaks problems into overlapping subproblems. Top-down uses recursion + memoization. Bottom-up fills a table iteratively. Classic problems: Fibonacci, knapsack, longest common subsequence, coin change.",
  },
  {
    title: "Hashing and Hash Maps",
    slug: "hashing-and-hashmaps",
    tier: 2,
    description: "O(1) lookups — used in 60% of interview solutions.",
    content: "Hash maps store key-value pairs with O(1) average lookup. Collisions handled via chaining or open addressing. Use them to reduce O(n²) brute force to O(n): two-sum, frequency count, anagram detection.",
  },
  {
    title: "Recursion and Backtracking",
    slug: "recursion-and-backtracking",
    tier: 2,
    description: "The foundation of tree problems and combinatorics.",
    content: "Recursion solves a problem by calling itself on smaller inputs. Backtracking explores all options and undoes choices that don't work. Classic: N-Queens, permutations, subsets, Sudoku solver.",
  },
  {
    title: "Sorting Algorithms",
    slug: "sorting-algorithms",
    tier: 2,
    description: "Know merge sort, quick sort, and when to use each.",
    content: "Merge sort: O(n log n) stable, good for linked lists. Quick sort: O(n log n) average, in-place, fast in practice. Heap sort: O(n log n) always. Interviewers expect you to know trade-offs, not just code.",
  },

  //  TIER 3
  {
    title: "System Design Basics",
    slug: "system-design-basics",
    tier: 3,
    description: "How to design scalable systems end to end.",
    content: "System design interviews test how you think at scale. Cover: requirements clarification, capacity estimation, API design, database choice (SQL vs NoSQL), caching (Redis), load balancing, CDN, and trade-offs.",
  },
  {
    title: "Database Design and SQL",
    slug: "database-design-and-sql",
    tier: 3,
    description: "Schema design, normalization, and complex queries.",
    content: "Know 1NF/2NF/3NF normalization. Write JOINs, GROUP BY, subqueries confidently. Understand indexes (B-tree), query optimization, and when to denormalize for performance. NoSQL trade-offs: MongoDB vs Cassandra.",
  },
  {
    title: "OS Concepts for Interviews",
    slug: "os-concepts-for-interviews",
    tier: 3,
    description: "Processes, threads, deadlocks, and memory management.",
    content: "Key topics: process vs thread (threads share memory), deadlock conditions (mutual exclusion, hold and wait, no preemption, circular wait), virtual memory, paging, and context switching. Common in backend and SDE2 interviews.",
  },
  {
    title: "Concurrency and Multithreading",
    slug: "concurrency-and-multithreading",
    tier: 3,
    description: "Race conditions, locks, and thread-safe code.",
    content: "Race conditions occur when two threads access shared data simultaneously. Fix with mutex/locks or synchronized blocks. Know deadlock vs livelock, thread pools, and producer-consumer problem. Java/Go questions are common.",
  },
  {
    title: "Low Level Design (LLD)",
    slug: "low-level-design",
    tier: 3,
    description: "Design classes and patterns for real systems.",
    content: "LLD asks you to model a system with classes, interfaces, and design patterns. Common questions: design a parking lot, elevator system, chess game, or library management. Know SOLID principles and patterns like Strategy, Observer, Factory.",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await AiTopic.deleteMany({});
  await AiTopic.insertMany(topics);
  console.log(" Seeded", topics.length, "CS Interview topics");
  mongoose.disconnect();
}

seed().catch(console.error);