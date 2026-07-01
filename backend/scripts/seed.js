import mongoose from "mongoose";
import AiTopic from "../models/aiTopicSchema.js";
import "dotenv/config";

const aiTopics = [
  // ── TIER 1 — Fundamentals (5 topics) ─────────────────────────────
  {
    title: "Arrays and Strings",
    slug: "arrays-and-strings",
    tier: 1,
    description: "The most frequently tested topic in coding interviews.",
    content: `Arrays are the most fundamental data structure — a fixed-size collection of elements stored in contiguous memory. Every element is accessed in O(1) time using its index.

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
    logo: { 
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' 
        },
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
    logo: {
       url: 'https://www.google.com/s2/favicons?domain=flipkart.com&sz=128' 
      },
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

Strings are just character arrays under the hood. Common string interview questions: check if two strings are anagrams (use a frequency map), reverse words in a sentence, find the longest palindromic substring (expand around center technique).

Most common interview problems: Two Sum (HashMap), Best Time to Buy and Sell Stock (single pass), Move Zeroes (two pointer), Valid Anagram (frequency count).

Time complexity to know: Accessing element O(1), searching O(n), inserting at end O(1) amortized, inserting at beginning O(n).`,
    resources: [
      { label: "Array Problems — LeetCode", url: "https://leetcode.com/tag/array/" },
      { label: "String Problems — LeetCode", url: "https://leetcode.com/tag/string/" },
    ],
  },
  {
    title: "Time and Space Complexity",
    slug: "time-and-space-complexity",
    tier: 1,
    description: "Big O notation — every interviewer will ask you to analyze your solution.",
    content: `Big O notation describes how the runtime or memory usage of an algorithm grows as the input size (n) increases. Interviewers always ask "what is the time and space complexity of your solution?" — you must answer confidently.

Common complexities ranked from best to worst:
- O(1) Constant: Same time regardless of input. Example: array index access, hash map lookup.
- O(log n) Logarithmic: Input is halved each step. Example: Binary Search.
- O(n) Linear: Iterate through input once. Example: finding max in an array.
- O(n log n) Linearithmic: Most efficient sorting algorithms. Example: Merge Sort, Quick Sort.
- O(n²) Quadratic: Nested loops. Example: Bubble Sort, checking all pairs.
- O(2ⁿ) Exponential: All subsets. Example: Recursive Fibonacci without memoization.
- O(n!) Factorial: All permutations. Example: Brute force Travelling Salesman.

Space complexity counts extra memory your algorithm uses. In-place algorithms use O(1) space. Recursive algorithms use O(depth) stack space.

Rules for calculating Big O:
1. Drop constants: O(2n) = O(n)
2. Drop non-dominant terms: O(n² + n) = O(n²)
3. Different variables for different inputs: O(a + b) not O(n)

Always analyze BEFORE you code in interviews — it shows senior-level thinking.`,
    resources: [
      { label: "Big O Cheat Sheet", url: "https://www.bigocheatsheet.com" },
    ],
  },
  {
    title: "OOP Concepts",
    slug: "oop-concepts",
    tier: 1,
    description: "Four pillars of Object-Oriented Programming — asked in every product company interview.",
    content: `Object-Oriented Programming (OOP) is a programming paradigm that organizes code around objects rather than functions. Product companies like Google, Amazon, and Microsoft heavily test OOP in both theory and Low Level Design (LLD) rounds.

The Four Pillars:

1. Encapsulation: Bundling data (fields) and methods that operate on that data into a single unit (class), while hiding internal details. In Java, you use private fields with public getters/setters. Benefit: control over data, prevents invalid state.

2. Inheritance: A child class inherits properties and methods from a parent class, enabling code reuse. Example: Dog extends Animal — Dog gets all Animal methods plus its own. Avoid deep inheritance chains (more than 2-3 levels) — prefer composition over inheritance.

3. Polymorphism: Same method name, different behavior based on the object type. Two types:
   - Compile-time (Method Overloading): Same method name, different parameters.
   - Runtime (Method Overriding): Child class provides its own implementation of a parent's method. This is how interfaces and abstract classes work.

4. Abstraction: Hiding complex implementation details and showing only the necessary interface. Achieved via abstract classes and interfaces. Example: You use Arrays.sort() without knowing it uses dual-pivot quicksort internally.

Key interview questions: "Difference between abstract class and interface?", "What is method overriding vs overloading?", "What is the diamond problem in multiple inheritance?"`,
    resources: [],
  },
  {
    title: "Linked Lists",
    slug: "linked-lists",
    tier: 1,
    description: "Pointer manipulation is a core skill tested in SDE1 and SDE2 interviews.",
    content: `A linked list is a linear data structure where each element (node) contains data and a pointer to the next node. Unlike arrays, nodes are not stored in contiguous memory — they are connected via pointers.

Types:
- Singly Linked List: Each node points to the next. Traversal only forward.
- Doubly Linked List: Each node has next and previous pointers. Allows bidirectional traversal.
- Circular Linked List: Last node points back to head. Used in round-robin scheduling.

Core operations and complexities:
- Access: O(n) — must traverse from head
- Insert at head: O(1)
- Insert at tail: O(n) without tail pointer, O(1) with
- Delete: O(n) to find, O(1) to remove

Must-know patterns:
1. Two Pointer / Fast-Slow (Floyd's Algorithm): Use a slow pointer (moves 1 step) and fast pointer (moves 2 steps). When fast reaches end, slow is at the middle. If fast meets slow, there's a cycle.
2. Reverse a Linked List: Use three pointers — prev, current, next. Iteratively redirect each node's pointer backward.
3. Merge Two Sorted Lists: Use a dummy head node, compare values, attach the smaller one.

Most common interview questions: Reverse a linked list, detect cycle (Floyd's), find middle node, merge two sorted lists, remove Nth node from end (two pass or two pointer).

Tip: Always draw the pointer manipulation on paper before coding — it prevents mistakes.`,
    resources: [
      { label: "Linked List — LeetCode", url: "https://leetcode.com/tag/linked-list/" },
    ],
  },
  {
    title: "Stacks and Queues",
    slug: "stacks-and-queues",
    tier: 1,
    description: "Essential data structures for expression evaluation, BFS, and monotonic problems.",
    content: `Stacks and Queues are fundamental data structures with opposite behavior and different use cases. Both are heavily tested in interviews.

Stack (LIFO — Last In, First Out):
- Push: Add to top — O(1)
- Pop: Remove from top — O(1)
- Peek: View top without removing — O(1)

Real-world uses: browser back button, undo/redo, function call stack, expression evaluation.

Classic stack interview problems:
- Valid Parentheses: Push opening brackets, pop and check when closing bracket appears.
- Min Stack: Maintain a secondary stack that tracks the minimum at each level.
- Daily Temperatures: Use a monotonic decreasing stack to find next warmer day for each day.
- Evaluate Reverse Polish Notation: Push numbers, when operator appears pop two numbers and compute.

Queue (FIFO — First In, First Out):
- Enqueue: Add to rear — O(1)
- Dequeue: Remove from front — O(1)

Real-world uses: BFS traversal, task scheduling, printer queue, sliding window problems.

Deque (Double-Ended Queue): Can insert and remove from both ends. Used in Sliding Window Maximum problem.

Monotonic Stack pattern: A stack that is always kept in increasing or decreasing order. Used for Next Greater Element, Largest Rectangle in Histogram, and Trapping Rain Water.

Tip: Whenever you see "nearest greater/smaller element" in a problem — think monotonic stack immediately.`,
    resources: [],
  },

  // ── TIER 2 — Intermediate (6 topics) ──────────────────────────────
  {
    title: "Trees and Binary Search Trees",
    slug: "trees-and-bst",
    tier: 2,
    description: "Trees are the most tested data structure in SDE2 and senior interviews.",
    content: `A tree is a hierarchical data structure with a root node and subtrees of children nodes. Binary trees have at most two children per node (left and right).

Tree Traversals (must know all four):
- Inorder (Left → Root → Right): Gives sorted order for BST.
- Preorder (Root → Left → Right): Used to clone a tree.
- Postorder (Left → Right → Root): Used to delete a tree.
- Level Order (BFS): Use a queue, process level by level.

Binary Search Tree (BST) property: left subtree values < root < right subtree values. This makes search, insert, and delete O(log n) average, O(n) worst case (skewed tree).

Key algorithms:
- Height of tree: max(height(left), height(right)) + 1 — recursive DFS.
- Validate BST: Pass min and max bounds recursively — don't just check left < root < right locally.
- Lowest Common Ancestor (LCA): If both nodes are less than root, go left. If both greater, go right. Otherwise, root is LCA.
- Diameter of Binary Tree: For each node, diameter = left height + right height. Track global maximum.
- Serialize and Deserialize: Convert tree to string and back — uses preorder with null markers.

Balanced BSTs: AVL trees and Red-Black trees auto-balance to guarantee O(log n) operations. Java's TreeMap uses Red-Black tree internally.

Common interview questions: Level order traversal, max depth, diameter, path sum, LCA, validate BST, right side view, symmetric tree.`,
    resources: [
      { label: "Tree Problems — LeetCode", url: "https://leetcode.com/tag/tree/" },
    ],
  },
  {
    title: "Graphs and BFS/DFS",
    slug: "graphs-bfs-dfs",
    tier: 2,
    description: "Graphs power social networks, maps, and recommendation engines — core SDE2 topic.",
    content: `A graph is a collection of nodes (vertices) connected by edges. Unlike trees, graphs can have cycles and multiple paths between nodes.

Graph representations:
- Adjacency List: Array of lists. Space O(V + E). Best for sparse graphs.
- Adjacency Matrix: 2D boolean array. Space O(V²). Best for dense graphs or checking if edge exists in O(1).

Breadth-First Search (BFS):
- Uses a queue. Explores all neighbors at current depth before going deeper.
- Guarantees shortest path in unweighted graphs.
- Time: O(V + E). Space: O(V) for the queue.
- Use for: Shortest path, level order traversal, finding connected components.

Depth-First Search (DFS):
- Uses recursion (implicit stack) or explicit stack. Goes as deep as possible before backtracking.
- Time: O(V + E). Space: O(V) for recursion stack.
- Use for: Cycle detection, topological sort, connected components, path finding.

Important algorithms:
- Cycle Detection: In undirected graph use DFS with visited set. In directed graph use DFS with recursion stack (color coding: white/gray/black).
- Topological Sort: Linear ordering of nodes where for every edge u→v, u comes before v. Only for Directed Acyclic Graphs (DAGs). Use DFS postorder or Kahn's algorithm (BFS with in-degree).
- Dijkstra's Algorithm: Shortest path in weighted graph with non-negative weights. Uses min-heap. O((V+E) log V).
- Union-Find (Disjoint Set): Efficiently check if two nodes are connected. Used in Kruskal's MST.

Common problems: Number of Islands, Clone Graph, Course Schedule (topological sort), Word Ladder (BFS shortest path), Pacific Atlantic Water Flow.`,
    resources: [
      { label: "Graph Problems — LeetCode", url: "https://leetcode.com/tag/graph/" },
    ],
  },
  {
    title: "Dynamic Programming",
    slug: "dynamic-programming",
    tier: 2,
    description: "DP is the hardest and most rewarding topic — mastering it separates good from great candidates.",
    content: `Dynamic Programming (DP) is an optimization technique that solves problems by breaking them into overlapping subproblems and storing results to avoid recomputation.

Two conditions for DP:
1. Optimal Substructure: Optimal solution can be built from optimal solutions of subproblems.
2. Overlapping Subproblems: Same subproblems are solved multiple times.

Two approaches:
- Top-Down (Memoization): Write recursive solution, add a cache (HashMap or array) to store results. Natural to think about but has recursion overhead.
- Bottom-Up (Tabulation): Fill a table iteratively from base cases up. More space-efficient, no recursion stack.

Classic DP patterns you must master:

1. 1D DP — Fibonacci, Climbing Stairs, House Robber: dp[i] depends on dp[i-1] and/or dp[i-2].

2. 2D DP — Longest Common Subsequence, Edit Distance: dp[i][j] represents answer for first i chars of string1 and j chars of string2.

3. Knapsack — 0/1 Knapsack, Partition Equal Subset Sum: For each item, choose to include or exclude.

4. Unbounded Knapsack — Coin Change, Rod Cutting: Items can be used unlimited times.

5. Interval DP — Matrix Chain Multiplication, Burst Balloons: dp[i][j] represents answer for subarray from i to j.

6. DP on Strings — Palindromic Substrings, Distinct Subsequences.

Problem-solving framework: Define state → Write recurrence relation → Handle base cases → Optimize space if needed.

Most asked: Climbing Stairs, Coin Change, Longest Increasing Subsequence, Word Break, Unique Paths, House Robber.`,
    resources: [
      { label: "DP Problems — LeetCode", url: "https://leetcode.com/tag/dynamic-programming/" },
    ],
  },
  {
    title: "Hashing and Hash Maps",
    slug: "hashing-and-hashmaps",
    tier: 2,
    description: "HashMaps are the single most useful tool in interview problem solving.",
    content: `A hash map (also called dictionary or hash table) stores key-value pairs and provides average O(1) time for insert, delete, and lookup operations. This makes it one of the most powerful tools in competitive programming and interviews.

How hashing works:
A hash function converts a key into an array index. Collisions (two keys mapping to the same index) are handled via:
- Chaining: Each bucket holds a linked list of entries.
- Open Addressing: Find the next empty slot (linear probing, quadratic probing).

Key complexities:
- Average case: O(1) for get, put, delete
- Worst case: O(n) when all keys collide (rare with good hash functions)
- Space: O(n)

When to use a HashMap in interviews:
- Frequency counting: Count occurrences of characters or numbers.
- Two Sum pattern: Store complement in map, check if current element exists.
- Caching/Memoization: Store computed results.
- Grouping: Group anagrams by sorted key.
- Detecting duplicates: Store seen elements.

HashMap vs HashSet: HashMap stores key-value pairs. HashSet stores only keys (backed by HashMap internally). Use HashSet when you only need to check existence.

LinkedHashMap: Maintains insertion order. Used in LRU Cache implementation.
TreeMap: Sorted by key. O(log n) operations. Used when you need ordered iteration.

Must-know problems: Two Sum, Group Anagrams, Top K Frequent Elements, LRU Cache, Subarray Sum Equals K, Longest Consecutive Sequence.`,
    resources: [],
  },
  {
    title: "Recursion and Backtracking",
    slug: "recursion-and-backtracking",
    tier: 2,
    description: "The foundation of tree problems, combinatorics, and constraint satisfaction.",
    content: `Recursion is a technique where a function calls itself with a smaller input until it reaches a base case. It is the natural way to solve problems with tree or divide-and-conquer structure.

Anatomy of a recursive function:
1. Base case: The condition to stop recursion. Without it, you get infinite recursion (stack overflow).
2. Recursive case: Reduce the problem and call the function again.
3. Return value: Combine results from recursive calls.

Recursion vs Iteration: Any recursive solution can be converted to iterative using an explicit stack. Recursion uses O(depth) call stack space.

Backtracking is recursion with an "undo" step. You explore a path, and if it leads to a dead end, you backtrack and try another option. Think of it as DFS on a decision tree.

Backtracking template:
- Choose: Make a choice (add element to current path).
- Explore: Recurse with the choice made.
- Unchoose: Undo the choice (backtrack).

Classic backtracking problems:
- Subsets: At each element, decide to include or exclude.
- Permutations: At each position, try all unused elements.
- Combinations: Choose r elements from n, no repeats, order doesn't matter.
- N-Queens: Place queens row by row, check column and diagonal conflicts.
- Word Search: DFS on grid, mark cell as visited, unmark when backtracking.
- Sudoku Solver: Try digits 1-9 in empty cells, backtrack if invalid.

Optimization: Pruning — add conditions to stop exploring branches that can never lead to a valid solution. This dramatically reduces the search space.`,
    resources: [
      { label: "Backtracking — LeetCode", url: "https://leetcode.com/tag/backtracking/" },
    ],
  },
  {
    title: "Sorting Algorithms",
    slug: "sorting-algorithms",
    tier: 2,
    description: "Know the internals, trade-offs, and when to use each sorting algorithm.",
    content: `Sorting algorithms are fundamental CS concepts and appear in interviews both as standalone questions and as building blocks for harder problems.

Comparison-based sorting algorithms:

Bubble Sort: Compare adjacent elements and swap if out of order. O(n²) time, O(1) space. Only useful for nearly sorted arrays. Never use in production.

Selection Sort: Find minimum element and put it in correct position. O(n²) time, O(1) space. Not stable.

Insertion Sort: Build sorted array one element at a time. O(n²) worst, O(n) best (already sorted). O(1) space. Stable. Good for small or nearly sorted arrays.

Merge Sort: Divide array in half, sort each half, merge. O(n log n) always. O(n) space. Stable. Best for linked lists and external sorting. Java's Arrays.sort() for objects uses Timsort (merge sort variant).

Quick Sort: Pick a pivot, partition array so elements less than pivot are left, greater are right. Recurse. O(n log n) average, O(n²) worst (bad pivot). O(log n) space. Not stable. Fastest in practice. Java's Arrays.sort() for primitives uses dual-pivot quicksort.

Heap Sort: Build a max heap, repeatedly extract max. O(n log n) always. O(1) space. Not stable.

Non-comparison sorting (can beat O(n log n)):
- Counting Sort: O(n + k) where k is range. Only for integers with known range.
- Radix Sort: Sort digit by digit. O(d × n) where d is number of digits.

Interview questions: Sort colors (Dutch National Flag), merge intervals, kth largest element, find duplicate number.

Key insight: If an interviewer asks you to sort, always ask — "What is the range of values? Are there duplicates? Do we need stability?" — this shows you understand trade-offs.`,
    resources: [],
  },

  // ── TIER 3 — Advanced (5 topics) ──────────────────────────────────
  {
    title: "System Design Basics",
    slug: "system-design-basics",
    tier: 3,
    description: "Design scalable distributed systems — mandatory for SDE2+ and senior roles.",
    content: `System design interviews test your ability to architect large-scale distributed systems. There is no single correct answer — the goal is to demonstrate structured thinking and knowledge of trade-offs.

Framework for any system design interview:

Step 1 — Clarify Requirements (5 min):
- Functional: What features must the system support?
- Non-functional: Expected scale (users, requests/sec), latency requirements, availability (99.9% = 8.7 hours downtime/year, 99.99% = 52 minutes).
- Constraints: Read-heavy or write-heavy? Global or regional?

Step 2 — Capacity Estimation:
- Daily Active Users (DAU) × actions per user = requests per day
- Requests per second = requests per day / 86,400
- Storage = data per record × number of records
- Bandwidth = data transferred per request × requests per second

Step 3 — High-Level Design:
- Draw the major components: clients, load balancer, application servers, database, cache, CDN.
- Choose SQL vs NoSQL: SQL for structured data with complex queries (transactions, joins). NoSQL for high scale, flexible schema, and horizontal scaling.

Step 4 — Deep Dive:
- Database design: Schema, indexing strategy, sharding (horizontal partitioning by user_id).
- Caching: Redis for session storage, frequently read data. Cache aside pattern (read from cache, miss → DB → populate cache).
- Message Queues: Kafka or RabbitMQ for async processing and decoupling services.
- CDN: Serve static assets from edge locations close to users.

Common systems to practice: URL Shortener (TinyURL), Instagram, Twitter Feed, WhatsApp, YouTube, Uber, Rate Limiter, Consistent Hashing.`,
    resources: [
      { label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
    ],
  },
  {
    title: "Database Design and SQL",
    slug: "database-design-and-sql",
    tier: 3,
    description: "Schema design, normalization, indexing, and writing complex queries — tested in backend roles.",
    content: `Database design is a critical skill for backend and full-stack roles. Interviewers test both SQL query writing and schema design ability.

Normalization — eliminating redundancy:
- 1NF: Each column has atomic values, no repeating groups.
- 2NF: In 1NF + every non-key column fully depends on the entire primary key (no partial dependency).
- 3NF: In 2NF + no transitive dependencies (non-key column depending on another non-key column).
- Denormalization: Intentionally add redundancy for read performance — common in data warehouses and high-scale applications.

SQL queries to master:
- JOINs: INNER (matching rows only), LEFT (all left + matching right), RIGHT, FULL OUTER.
- GROUP BY with HAVING: Filter after aggregation. WHERE filters before grouping.
- Subqueries vs JOINs: Subqueries are readable, JOINs are usually faster.
- Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD() — for ranking and running totals without GROUP BY collapsing rows.
- CTEs (Common Table Expressions): WITH clause for readable, reusable subqueries.

Indexing:
- B-tree index: Default index type. Speeds up equality and range queries. O(log n) lookup.
- Composite index: Index on multiple columns. Order matters — matches leftmost prefix.
- When NOT to index: Write-heavy tables (index updates slow down inserts/updates), low-cardinality columns (boolean fields).

SQL vs NoSQL:
- SQL: ACID transactions, complex queries, structured schema. PostgreSQL, MySQL.
- NoSQL: Horizontal scale, flexible schema, high write throughput. MongoDB (document), Cassandra (column), Redis (key-value).

ACID properties: Atomicity (all or nothing), Consistency (valid state), Isolation (transactions don't interfere), Durability (committed data persists).`,
    resources: [],
  },
  {
    title: "OS Concepts for Interviews",
    slug: "os-concepts",
    tier: 3,
    description: "Processes, threads, memory management, and deadlocks — common in backend and systems interviews.",
    content: `Operating system concepts are frequently tested in backend SDE2 interviews, especially at companies like Google, Microsoft, and systems-heavy startups.

Process vs Thread:
- Process: Independent program with its own memory space (heap, stack, code, data). Heavy to create. IPC (inter-process communication) is expensive.
- Thread: Lightweight unit within a process. Shares process memory (heap, code, data) but has its own stack. Creation is fast. Communication via shared memory (but needs synchronization).
- Context Switch: OS saves current process/thread state and loads another. Expensive operation — avoid unnecessary thread creation.

Deadlock — four necessary conditions (Coffman conditions):
1. Mutual Exclusion: At least one resource is non-shareable.
2. Hold and Wait: A process holds a resource while waiting for another.
3. No Preemption: Resources cannot be forcibly taken from a process.
4. Circular Wait: Process A waits for B, B waits for C, C waits for A.

Deadlock prevention: Break any one of the four conditions. Deadlock detection: Use resource allocation graph. Deadlock recovery: Kill processes or preempt resources.

Memory Management:
- Virtual Memory: Abstraction that gives each process its own address space. OS maps virtual to physical addresses using page tables.
- Paging: Divide memory into fixed-size pages. Page fault occurs when accessed page is not in RAM — OS loads it from disk.
- Thrashing: Excessive page faults causing more time spent swapping than executing.

CPU Scheduling algorithms: FCFS (First Come First Served), SJF (Shortest Job First), Round Robin (time quantum), Priority Scheduling.

Semaphore vs Mutex: Mutex is a lock owned by one thread. Semaphore is a counter that allows multiple threads to access a resource up to a limit (binary semaphore = mutex).`,
    resources: [],
  },
  {
    title: "Concurrency and Multithreading",
    slug: "concurrency-and-multithreading",
    tier: 3,
    description: "Race conditions, synchronization, and thread-safe design — critical for backend roles.",
    content: `Concurrency is one of the hardest topics in software engineering. Bugs are non-deterministic, hard to reproduce, and dangerous in production.

Core problem — Race Condition: When two or more threads access shared data simultaneously and at least one writes, the result depends on the order of execution (non-deterministic). Fix with synchronization.

Synchronization mechanisms:
- Mutex/Lock: Only one thread can hold the lock at a time. Use for mutual exclusion.
- ReentrantLock (Java): Like synchronized but more flexible — supports tryLock, timeouts, fairness.
- Synchronized (Java): Language-level mutex on a method or block.
- Volatile (Java): Ensures variable reads/writes are directly from/to main memory, not CPU cache. Does NOT make compound operations atomic.
- Atomic classes (Java): AtomicInteger, AtomicBoolean — use CPU-level CAS (Compare and Swap) instructions for lock-free thread safety.

Deadlock vs Livelock:
- Deadlock: Threads are blocked forever waiting for each other.
- Livelock: Threads keep changing state in response to each other but make no progress.

Thread Pool: Pre-create a fixed number of threads and reuse them for tasks. Avoids the overhead of creating/destroying threads. Java's ExecutorService manages thread pools.

Producer-Consumer Problem: Producer adds items to a shared buffer, consumer removes them. Classic solution uses a blocking queue (bounded buffer) — producer blocks when full, consumer blocks when empty.

Common patterns:
- Read-Write Lock: Multiple readers allowed simultaneously, writers need exclusive access.
- Semaphore: Control access to a pool of resources.
- CountDownLatch: Wait for N threads to complete before proceeding.
- CyclicBarrier: N threads wait for each other at a barrier point.

Real-world application: Connection pools in databases, async request handling in web servers, parallel data processing pipelines.`,
    resources: [],
  },
  {
    title: "Low Level Design (LLD)",
    slug: "low-level-design",
    tier: 3,
    description: "Design classes and apply design patterns — mandatory for SDE2 and senior roles at product companies.",
    content: `Low Level Design (LLD) interviews ask you to model a real-world system using classes, interfaces, and design patterns. Companies like Flipkart, Swiggy, and Uber focus heavily on this round.

SOLID Principles (memorize and apply):
- S — Single Responsibility: A class should have only one reason to change.
- O — Open/Closed: Open for extension, closed for modification. Add new behavior via inheritance/composition, not by changing existing code.
- L — Liskov Substitution: Subclasses should be substitutable for their parent class without breaking behavior.
- I — Interface Segregation: Clients should not be forced to depend on interfaces they don't use. Prefer small, specific interfaces.
- D — Dependency Inversion: High-level modules should not depend on low-level modules. Both should depend on abstractions.

Essential Design Patterns for LLD interviews:

Creational Patterns:
- Singleton: Ensure only one instance of a class exists. Used for database connections, config managers.
- Factory Method: Create objects without specifying the exact class. Used when object creation logic is complex.
- Builder: Construct complex objects step by step. Used for objects with many optional parameters.

Structural Patterns:
- Decorator: Add behavior to objects dynamically without changing their class. Java I/O streams use this.
- Adapter: Convert interface of a class into another interface clients expect.

Behavioral Patterns:
- Observer: When one object changes state, all dependents are notified automatically. Used in event systems, MVC.
- Strategy: Define a family of algorithms, encapsulate each one, make them interchangeable.
- Command: Encapsulate a request as an object. Used for undo/redo functionality.

Common LLD problems: Parking Lot, Library Management System, Chess Game, Elevator System, Snake and Ladder, Hotel Booking System, Food Delivery App (Swiggy/Zomato).

Approach: Start with use cases → identify entities → define relationships → apply design patterns → write class diagram before code.`,
    resources: [
      { label: "LLD Primer", url: "https://github.com/prasadgujar/low-level-design-primer" },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await AiTopic.deleteMany({});
  await AiTopic.insertMany(aiTopics);
  console.log("✅ Seeded", aiTopics.length, "CS Interview topics");
  mongoose.disconnect();
}

seed().catch(console.error);