import express from 'express';
import InterviewPrepTopic from '../models/interviewPrepTopicSchema.js';
import InterviewQuestion from '../models/interviewQuestionSchema.js';
import handleError from '../middleware/handleError.js';
import checkDb from '../middleware/checkDb.js';

const router = express.Router();
router.use(checkDb);

router.get('/levels', async (req, res) => {
    try {
        const levels = ['Easy', 'Medium', 'Hard'];
    
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

router.get('/:level', async (req, res) => {
    try {
        const formattedLevel = req.params.level.charAt(0).toUpperCase() + req.params.level.slice(1).toLowerCase();

        const groupedCategories = await InterviewQuestion.aggregate([
            { $match: { difficulty: formattedLevel, approved: true } },
            { 
                $group: { 
                    _id: { $ifNull: ['$category', 'General'] },
                    questions: { $push: '$$ROOT' },             
                    questionCount: { $sum: 1 }                  
                } 
            }
        ]);

        const data = groupedCategories.map(group => ({
            title: `${group._id} Module`,
            slug: group._id.toLowerCase().replace(/\s+/g, '-'),
            category: group._id,
            categoryType: group._id,
            questionCount: group.questionCount,
            questions: group.questions
        }));

        return res.status(200).json({ success: true, data });
    } catch (error) {
        handleError(res, error, `Failed to retrieve topics for level: ${req.params.level}`);
    }
});

router.get('/:level/:slug', async (req, res) => {
    try {
        const formattedLevel = req.params.level.charAt(0).toUpperCase() + req.params.level.slice(1).toLowerCase();
        const targetSlug = req.params.slug;
        
        const allQuestions = await InterviewQuestion.find({ difficulty: formattedLevel, approved: true }).lean();

        const topicQuestions = allQuestions.filter(q => {
            const currentSlug = (q.category || 'General').toLowerCase().replace(/\s+/g, '-');
            return currentSlug === targetSlug;
        });

        if (topicQuestions.length === 0) {
            return res.status(404).json({ success: false, message: 'Topic category context not found', statusCode: 404 });
        }

        const data = {
            title: `${topicQuestions[0].category} Module`,
            level: formattedLevel,
            slug: targetSlug,
            questions: topicQuestions 
        };

        return res.status(200).json({ success: true, data });
    } catch (error) {
        handleError(res, error, 'Failed to resolve explicit topic collection questions');
    }
});

router.post('/topics', async (req, res) => {
    try {
        const newTopic = new InterviewPrepTopic(req.body);
        const savedTopic = await newTopic.save();
        return res.status(201).json({ success: true, data: savedTopic });
    } catch (error) {
        handleError(res, error, 'Failed to create administration prep topic reference mapping');
    }
});
export default router;