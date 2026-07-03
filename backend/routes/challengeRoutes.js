const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ChallengeDomain = require('../models/challengeDomainSchema');
const ChallengeCategory = require('../models/challengeCategorySchema');
const Challenge = require('../models/challengeSchema');
const logger = require('../utils/logger');

// Centralized handleError pattern matching the team specification
const handleError = (res, error, defaultMessage = 'An error occurred') => {
  if (logger && logger.error) {
    logger.error('Error:', { message: error.message, name: error.name });
  } else {
    console.error('Error:', error);
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: 'Validation error', error: error.message, statusCode: 400 });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid ID format', error: 'INVALID_ID', statusCode: 400 });
  }

  return res.status(500).json({
    success: false,
    message: defaultMessage,
    error: process.env.NODE_ENV === 'production' ? 'INTERNAL_SERVER_ERROR' : error.message,
    statusCode: 500
  });
};

// Database connectivity health check middleware
const checkDb = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ success: false, message: 'Database unavailable', error: 'DATABASE_UNAVAILABLE', statusCode: 503 });
  }
  next();
};

router.use(checkDb);

// 1. GET /api/challenges/domains -> List all active top-level domains
router.get('/domains', async (req, res) => {
  try {
    const domains = await ChallengeDomain.find({ isActive: true }).sort({ order: 1 }).lean();
    return res.status(200).json({ success: true, data: domains });
  } catch (error) {
    handleError(res, error, 'Failed to fetch domains');
  }
});

// 2. GET /api/challenges/domains/:domainSlug -> Get specific domain + its nested sub-categories
router.get('/domains/:domainSlug', async (req, res) => {
  try {
    const domain = await ChallengeDomain.findOne({ slug: req.params.domainSlug, isActive: true }).lean();
    if (!domain) {
      return res.status(404).json({ success: false, message: 'Domain not found', statusCode: 404 });
    }

    const categories = await ChallengeCategory.find({ domain: domain._id, isActive: true }).sort({ order: 1 }).lean();
    
    return res.status(200).json({
      success: true,
      data: { ...domain, categories }
    });
  } catch (error) {
    handleError(res, error, 'Failed to fetch domain details');
  }
});

// 3. GET /api/challenges/domains/:domainSlug/:categorySlug -> Get category metadata + paginated problem list
router.get('/domains/:domainSlug/:categorySlug', async (req, res) => {
  try {
    const { page = 1, limit = 10, difficulty } = req.query;

    const category = await ChallengeCategory.findOne({ slug: req.params.categorySlug, isActive: true }).lean();
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found', statusCode: 404 });
    }

    let query = { category: category._id, approved: true };
    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [challenges, total] = await Promise.all([
      Challenge.find(query).sort({ order: 1 }).skip(skip).limit(parseInt(limit)).select('title slug difficulty description views').lean(),
      Challenge.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      data: { category, challenges },
      pagination: {
        total,
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    handleError(res, error, 'Failed to fetch challenges list');
  }
});

// 4. GET /api/challenges/:domainSlug/:categorySlug/:challengeSlug -> Fetch a single full challenge walkthrough
router.get('/:domainSlug/:categorySlug/:challengeSlug', async (req, res) => {
  try {
    const challenge = await Challenge.findOneAndUpdate(
      { slug: req.params.challengeSlug, approved: true },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('relatedCompanies', 'name logo slug').lean();

    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found', statusCode: 404 });
    }

    return res.status(200).json({ success: true, data: challenge });
  } catch (error) {
    handleError(res, error, 'Failed to fetch challenge details');
  }
});

// 5. POST /api/challenges/domains -> Admin route to establish a brand-new practice domain
router.post('/domains', async (req, res) => {
  try {
    // Note for Nitin: add ensureAuthenticated / ensureAdmin middleware wrappers during core integration
    const newDomain = new ChallengeDomain(req.body);
    const savedDomain = await newDomain.save();
    return res.status(201).json({ success: true, data: savedDomain });
  } catch (error) {
    handleError(res, error, 'Failed to create domain');
  }
});

// 6. POST /api/challenges/categories -> Admin route to attach a child category to an existing domain
router.post('/categories', async (req, res) => {
  try {
    const newCategory = new ChallengeCategory(req.body);
    const savedCategory = await newCategory.save();
    
    // Increment challenge count context placeholders optionally here
    await ChallengeDomain.findByIdAndUpdate(req.body.domain, { $inc: { challengeCount: 0 } });
    
    return res.status(201).json({ success: true, data: savedCategory });
  } catch (error) {
    handleError(res, error, 'Failed to create category');
  }
});

// 7. POST /api/challenges -> Admin route to generate and insert a new coding problem or architecture prompt
router.post('/', async (req, res) => {
  try {
    const newChallenge = new Challenge(req.body);
    const savedChallenge = await newChallenge.save();

    // Increment denormalized counters inside corresponding Category wrapper cleanly
    await ChallengeCategory.findByIdAndUpdate(req.body.category, { $inc: { challengeCount: 1 } });

    return res.status(201).json({ success: true, data: savedChallenge });
  } catch (error) {
    handleError(res, error, 'Failed to establish challenge record');
  }
});

// 8. PATCH /api/challenges/domains/:slug -> Admin utility to update details or hide domains cleanly
router.patch('/domains/:slug', async (req, res) => {
  try {
    const updatedDomain = await ChallengeDomain.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedDomain) {
      return res.status(404).json({ success: false, message: 'Domain targeted for update not found', statusCode: 404 });
    }

    return res.status(200).json({ success: true, data: updatedDomain });
  } catch (error) {
    handleError(res, error, 'Failed to update domain structural scope');
  }
});

// 9. PATCH /api/challenges/:slug -> Admin utility to modify dynamic complexity approaches or answers
router.patch('/:slug', async (req, res) => {
  try {
    const updatedChallenge = await Challenge.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedChallenge) {
      return res.status(404).json({ success: false, message: 'Challenge targeted for adjustment not found', statusCode: 404 });
    }

    return res.status(200).json({ success: true, data: updatedChallenge });
  } catch (error) {
    handleError(res, error, 'Failed to patch targeted challenge components');
  }
});

module.exports = router;