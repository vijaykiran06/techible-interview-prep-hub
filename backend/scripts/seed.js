const mongoose = require('mongoose');
require('dotenv').config();

const Company = require('../models/companySchema');
const InterviewProcess = require('../models/interviewProcessSchema');
const InterviewQuestion = require('../models/interviewQuestionSchema');
const SuccessStory = require('../models/successStorySchema');
const Compensation = require('../models/compensationSchema');

const companies = [
  {
    name: 'Microsoft',
    slug: 'microsoft',
     logo: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
  },
    industry: 'Tech',
    headquarters: 'Redmond, WA',
    founded: 1975,
    website: 'https://www.microsoft.com',
    description: 'Global technology company.',
    interviewDifficulty: 'Medium',
    approved: true,
    approvalStatus: 'approved',
    featured: true,
    views: 2500,
  },
  {
    name: 'Google',
    slug: 'google',
      logo: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
  },
    industry: 'Tech',
    headquarters: 'Mountain View, CA',
    founded: 1998,
    website: 'https://www.google.com',
    description: 'Search and AI company.',
    interviewDifficulty: 'Hard',
    approved: true,
    approvalStatus: 'approved',
    featured: true,
    views: 3200,
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
    description: 'E-commerce and cloud company.',
    interviewDifficulty: 'Hard',
    approved: true,
    approvalStatus: 'approved',
    featured: true,
    views: 3000,
  },

  {
  name: 'Adobe',
  slug: 'adobe',
   logo: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png'
  },
  industry: 'Tech',
  headquarters: 'San Jose, CA',
  founded: 1982,
  website: 'https://www.adobe.com',
  description: 'Creative software and digital experience company.',
  interviewDifficulty: 'Medium',
  approved: true,
  approvalStatus: 'approved',
  featured: true,
  views: 1800,
},

{
  name: 'Flipkart',
  slug: 'flipkart',
   logo: {
    url: 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png'
  },
  industry: 'E-Commerce',
  headquarters: 'Bengaluru, India',
  founded: 2007,
  website: 'https://www.flipkart.com',
  description: 'Indian e-commerce platform.',
  interviewDifficulty: 'Medium',
  approved: true,
  approvalStatus: 'approved',
  featured: true,
  views: 1700,
},

{
  name: 'PhonePe',
  slug: 'phonepe',
   logo: {
    url: 'https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png'
  },
  industry: 'Finance',
  headquarters: 'Bengaluru, India',
  founded: 2015,
  website: 'https://www.phonepe.com',
  description: 'Digital payments and fintech company.',
  interviewDifficulty: 'Medium',
  approved: true,
  approvalStatus: 'approved',
  featured: true,
  views: 1600,
},

{
  name: 'Zomato',
  slug: 'zomato',
   logo: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png'
  },
  industry: 'Tech',
  headquarters: 'Gurugram, India',
  founded: 2008,
  website: 'https://www.zomato.com',
  description: 'Food delivery and restaurant discovery platform.',
  interviewDifficulty: 'Medium',
  approved: true,
  approvalStatus: 'approved',
  featured: true,
  views: 1500,
},

{
  name: 'Infosys',
  slug: 'infosys',
   logo: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg'
  },
  industry: 'Tech',
  headquarters: 'Bengaluru, India',
  founded: 1981,
  website: 'https://www.infosys.com',
  description: 'Global IT services and consulting company.',
  interviewDifficulty: 'Easy',
  approved: true,
  approvalStatus: 'approved',
  featured: false,
  views: 1400,
},

{
  name: 'TCS',
  slug: 'tcs',
   logo: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg'
  },
  industry: 'Tech',
  headquarters: 'Mumbai, India',
  founded: 1968,
  website: 'https://www.tcs.com',
  description: 'Indian multinational IT services company.',
  interviewDifficulty: 'Easy',
  approved: true,
  approvalStatus: 'approved',
  featured: false,
  views: 1350,
},

{
  name: 'Wipro',
  slug: 'wipro',
   logo: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Wipro_Primary_Logo_Color_RGB.svg'
  },
  industry: 'Tech',
  headquarters: 'Bengaluru, India',
  founded: 1945,
  website: 'https://www.wipro.com',
  description: 'IT consulting and business process services.',
  interviewDifficulty: 'Easy',
  approved: true,
  approvalStatus: 'approved',
  featured: false,
  views: 1300,
},
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB Connected');

    await Promise.all([
      Company.deleteMany({}),
      InterviewProcess.deleteMany({}),
      InterviewQuestion.deleteMany({}),
      SuccessStory.deleteMany({}),
      Compensation.deleteMany({})
    ]);

    console.log('Old data cleared');

    const createdCompanies = await Company.insertMany(companies);
    const microsoft = createdCompanies.find(
  (company) => company.slug === 'microsoft');

  const google = createdCompanies.find(
  (company) => company.slug === 'google');

const amazon = createdCompanies.find(
  (company) => company.slug === 'amazon');

const adobe = createdCompanies.find(
  (company) => company.slug === 'adobe');
   

  await InterviewProcess.create({
  company: google._id,
  overview:
    'Google focuses heavily on problem solving, algorithms, and communication.',

  phases: [
    {
      order: 1,
      name: 'Online Assessment',
      duration: '90 min',
      format: 'Online',
      whatItTests: 'Algorithms and Data Structures',
      whatToExpect: [
        '2 coding questions',
        'Medium to hard problems'
      ],
      platforms: ['Google OA']
    },

    {
      order: 2,
      name: 'Technical Round',
      duration: '45 min',
      format: 'Video Call',
      whatItTests: 'DSA and problem solving',
      whatToExpect: [
        'Coding live',
        'Optimization discussion'
      ],
      platforms: ['Google Meet']
    }
  ],

  generalTips: [
    'Master DSA',
    'Communicate clearly',
    'Practice graph problems'
  ]
});

await InterviewQuestion.insertMany([
  {
    company: google._id,
    question: 'Number of Islands',
    category: 'DSA',
    difficulty: 'Medium',
    round: 'Technical Round',
    approved: true,
    approvalStatus: 'approved',
    upvotes: 150
  },

  {
    company: google._id,
    question: 'Word Ladder',
    category: 'DSA',
    difficulty: 'Hard',
    round: 'Technical Round',
    approved: true,
    approvalStatus: 'approved',
    upvotes: 130
  }
]);
await Compensation.insertMany([
  {
    company: google._id,
    role: 'Software Engineer',
    level: 'Fresher',
    minSalary: 1800000,
    maxSalary: 2500000,
    location: 'India',
    yearReported: 2025
  }
]);

await SuccessStory.create({
  company: google._id,
  role: 'Software Engineer',

  story:
    'Solved 300+ LeetCode questions before interview.',

  preparationApproach:
    'Graphs, DP and mock interviews',

  keyAdvice:
    'Focus on problem-solving patterns.',

  approved: true,
  approvalStatus: 'approved'
});

  await InterviewProcess.create({
  company: microsoft._id,

  overview:
    "Microsoft's interview process is structured and competency-driven. Expect DSA, system design, and behavioral interviews focused on Growth Mindset.",

  phases: [
    {
      order: 1,
      name: 'Online Assessment',
      duration: '60-90 min',
      format: 'Online',
      whatItTests:
        'DSA fundamentals and problem solving',

      whatToExpect: [
        '2-3 coding questions',
        'Arrays and strings',
        'Basic dynamic programming'
      ],

      platforms: ['HackerRank']
    },

    {
      order: 2,
      name: 'Technical Round 1',
      duration: '45-60 min',
      format: 'Video Call',

      whatItTests:
        'Coding, communication, problem solving',

      whatToExpect: [
        'Medium coding problems',
        'Discuss brute force first',
        'Explain optimizations'
      ],

      platforms: ['Microsoft Teams']
    },

    {
      order: 3,
      name: 'Technical Round 2',
      duration: '45-60 min',
      format: 'Video Call',

      whatItTests:
        'LLD or System Design',

      whatToExpect: [
        'Parking lot design',
        'URL shortener design',
        'Think aloud'
      ],

      platforms: ['Microsoft Teams']
    },

    {
      order: 4,
      name: 'HR Round',
      duration: '30 min',
      format: 'Video Call',

      whatItTests:
        'Behavioral and Growth Mindset',

      whatToExpect: [
        'STAR questions',
        'Conflict resolution',
        'Learning from failures'
      ],

      platforms: ['Microsoft Teams']
    }
  ],

  generalTips: [
    'Practice explaining your thought process',
    'Prepare STAR stories',
    'Focus on communication',
    'Discuss tradeoffs clearly'
  ]
});

await InterviewQuestion.insertMany([
  {
    company: adobe._id,
    question: 'Design Photoshop Plugin Architecture',
    category: 'LLD',
    difficulty: 'Medium',
    round: 'Technical Round',
    approved: true,
    approvalStatus: 'approved'
  },

  {
    company: adobe._id,
    question: 'LRU Cache',
    category: 'DSA',
    difficulty: 'Medium',
    round: 'Technical Round',
    approved: true,
    approvalStatus: 'approved'
  }
]);

await InterviewQuestion.insertMany([
  {
    company: microsoft._id,
    question: 'Two Sum',
    category: 'DSA',
    difficulty: 'Easy',
    round: 'Online Assessment',
    approved: true,
    approvalStatus: 'approved',
    isRecent: true,
    dateAsked: new Date(),
    upvotes: 120
  },

  {
    company: microsoft._id,
    question:
      'Longest Substring Without Repeating Characters',
    category: 'DSA',
    difficulty: 'Medium',
    round: 'Technical Round 1',
    approved: true,
    approvalStatus: 'approved',
    upvotes: 95
  },

  {
    company: microsoft._id,
    question: 'Design a Parking Lot',
    category: 'LLD',
    difficulty: 'Medium',
    round: 'Technical Round 2',
    approved: true,
    approvalStatus: 'approved',
    upvotes: 80
  },

  {
    company: microsoft._id,
    question:
      'Tell me about a time you failed',
    category: 'Behavioral',
    difficulty: 'Medium',
    round: 'HR Round',
    approved: true,
    approvalStatus: 'approved',
    upvotes: 75
  }
]);

await SuccessStory.insertMany([
  {
    company: microsoft._id,

    authorName: 'Anonymous',

    role: 'Software Engineer',

    story:
      'Focused on DSA for 3 months and practiced mock interviews.',

    preparationApproach:
      'LeetCode + System Design basics',

    keyAdvice:
      'Communication matters as much as coding.',

    approved: true,
    approvalStatus: 'approved'
  }
]);
await Compensation.insertMany([
  {
    company: microsoft._id,
    role: 'Software Engineer',
    level: 'Fresher',
    minSalary: 1500000,
    maxSalary: 1800000,
    location: 'India',
    yearReported: 2025
  },

  {
    company: microsoft._id,
    role: 'Software Engineer',
    level: 'Junior',
    minSalary: 2200000,
    maxSalary: 3000000,
    location: 'India',
    yearReported: 2025
  }
]);

await InterviewQuestion.insertMany([
 {
  company: amazon._id,
  question: 'LRU Cache',
  category: 'DSA',
  difficulty: 'Medium',
  round: 'Technical Round',

  pattern: 'Frequently Asked',

  thingsToKeepInMind: [
    'Explain HashMap + Doubly Linked List',
    'Discuss O(1) operations',
    'Mention edge cases'
  ],

  isRecent: true,
  dateAsked: new Date(),

  approved: true,
  approvalStatus: 'approved',
  upvotes: 140
},

  {
  company: amazon._id,
  question: 'Top K Frequent Elements',
  category: 'DSA',
  difficulty: 'Medium',
  round: 'Technical Round',

  pattern: 'Heap Pattern',

  thingsToKeepInMind: [
    'Compare sorting vs heap approach',
    'Discuss complexity',
    'Handle duplicate frequencies'
  ],

  isRecent: true,
  dateAsked: new Date(),

  approved: true,
  approvalStatus: 'approved',
  upvotes: 110
},


 {
  company: amazon._id,
  question: 'Tell me about a conflict in your team',
  category: 'Behavioral',
  difficulty: 'Medium',
  round: 'Leadership Principles',

  pattern: 'Behavioral STAR',

  thingsToKeepInMind: [
    'Use STAR format',
    'Show ownership',
    'Highlight resolution'
  ],

  isRecent: true,
  dateAsked: new Date(),

  approved: true,
  approvalStatus: 'approved',
  upvotes: 100
}
]);
await SuccessStory.create({
  company: amazon._id,

  role: 'SDE-1',

  story:
    'Focused heavily on Amazon Leadership Principles and DSA.',

  preparationApproach:
    'LeetCode + Behavioral Preparation',

  keyAdvice:
    'Always connect answers to Leadership Principles.',

  approved: true,
  approvalStatus: 'approved'
});

await Compensation.insertMany([
  {
    company: amazon._id,
    role: 'SDE-1',
    level: 'Fresher',
    minSalary: 1600000,
    maxSalary: 2200000,
    location: 'India',
    yearReported: 2025
  },

  {
    company: amazon._id,
    role: 'SDE-2',
    level: 'Junior',
    minSalary: 2800000,
    maxSalary: 4000000,
    location: 'India',
    yearReported: 2025
  }
]);


    console.log(`${createdCompanies.length} companies inserted`);

    await mongoose.connection.close();

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed Error:', error);

    try {
      await mongoose.connection.close();
    } catch {}

    process.exit(1);
  }
}

seedDatabase();