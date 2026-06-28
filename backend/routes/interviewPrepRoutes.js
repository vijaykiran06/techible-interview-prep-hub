const express = require('express');
const router = express.Router();
const InterviewPrepTopic = require('../models/interviewPrepTopicSchema');
const InterviewQuestion = require('../models/interviewQuestionSchema');


const handleError = require('../middleware/handleError');
const checkDb = require('../middleware/checkDb');

// Apply the database connection check barrier globally across this module
router.use(checkDb);

// 1. GET /api/interview-prep/levels -> List available levels with quick metadata counts
router.get('/levels', async (req, res) => {
    try {
        const levels = ['Easy', 'Medium', 'Hard'];
    
    // Aggregate topic numbers dynamically using high performance lean parsing
        const counts = await InterviewQuestion.aggregate([
            { $match: { approved: true } },
            { $group: { _id: '$difficulty', count: { $sum: 1 } } }
        ]);

        const countMap = counts.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        const data = levels.map(lvl => ({
            level: lvl,
            description: lvl === 'Easy' 
                ? 'For those starting their first job search' 
                : lvl === 'Medium' 
                ? 'For engineers scaling up to mid-level roles' 
                : 'For senior engineers tackling architecture and leadership tech loops',
            topicCount: countMap[lvl] || 0,
            estimatedTime: lvl === 'Easy' ? '15-20 hours' : lvl === 'Medium' ? '30-40 hours' : '50+ hours'
        }));

        return res.status(200).json({ success: true, data });
    } catch (error) {
        handleError(res, error, 'Failed to fetch level cards information');
    }
});

// 2. GET /api/interview-prep/:level -> Get all distinct topic categories maps for a chosen level
router.get('/:level', async (req, res) => {
    try {
        // Format the URL param (e.g., 'easy' -> 'Easy') to match Vijay's dataset capitalization
        const formattedLevel = req.params.level.charAt(0).toUpperCase() + req.params.level.slice(1).toLowerCase();

        // 🌟 SWAPPED: Querying InterviewQuestion directly to fetch real data records
        const questions = await InterviewQuestion.find({ difficulty: formattedLevel, approved: true }).lean();

        // Group the retrieved questions dynamically by their category (e.g., 'DSA', 'System Design')
        const categoryMap = {};
        questions.forEach(q => {
            const cat = q.category || 'General';
            if (!categoryMap[cat]) {
                categoryMap[cat] = {
                    title: `${cat} Module`,
                    slug: cat.toLowerCase().replace(/\s+/g, '-'),
                    category: cat,
                    questions: []
                };
            }
            categoryMap[cat].questions.push(q);
        });

        // Convert grouped map blocks into a clean response array for your frontend component
        const data = Object.values(categoryMap).map(topic => ({
            ...topic,
            categoryType: topic.category,
            questionCount: topic.questions ? topic.questions.length : 0
        }));

        return res.status(200).json({ success: true, data });
    } catch (error) {
        handleError(res, error, `Failed to retrieve topics for level: ${req.params.level}`);
    }
});

// 3. GET /api/interview-prep/:level/:slug -> Get full explicit question inventory details under a matching topic slug
router.get('/:level/:slug', async (req, res) => {
    try {
        const formattedLevel = req.params.level.charAt(0).toUpperCase() + req.params.level.slice(1).toLowerCase();
        
        // 1. Fetch all questions matching this difficulty level
        const allQuestions = await InterviewQuestion.find({ difficulty: formattedLevel, approved: true }).lean();

        // 2. Find the questions where the lowercase category matches the URL slug
        // (e.g., if slug is 'dsa', look for category 'DSA')
        const topicQuestions = allQuestions.filter(q => {
            const currentSlug = (q.category || '').toLowerCase().replace(/\s+/g, '-');
            return currentSlug === req.params.slug;
        });

        // 3. If no questions match this category slug, return a clean 404 error
        if (topicQuestions.length === 0) {
            return res.status(404).json({ success: false, message: 'Topic category context not found', statusCode: 404 });
        }

        // 4. Format the response data to mimic what the frontend expects
        const data = {
            title: `${topicQuestions[0].category} Module`,
            level: formattedLevel,
            slug: req.params.slug,
            questions: topicQuestions // Pass the array of real questions directly
        };

        return res.status(200).json({ success: true, data });
    } catch (error) {
        handleError(res, error, 'Failed to resolve explicit topic collection questions');
    }
});

// 4. POST /api/interview-prep/topics -> Admin endpoint to construct a level-based topic track
router.post('/topics', async (req, res) => {
    try {
        const newTopic = new InterviewPrepTopic(req.body);
        const savedTopic = await newTopic.save();
        return res.status(201).json({ success: true, data: savedTopic });
    } catch (error) {
        handleError(res, error, 'Failed to create administration prep topic reference mapping');
    }
});

module.exports = router;