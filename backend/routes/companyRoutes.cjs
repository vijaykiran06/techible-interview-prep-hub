const express = require('express');
const router = express.Router();

const Company = require('../models/companySchema.cjs');
const InterviewProcess = require('../models/interviewProcessSchema.cjs');
const InterviewQuestion = require('../models/interviewQuestionSchema.cjs');
const SuccessStory = require('../models/successStorySchema.cjs');
const Compensation = require('../models/compensationSchema.cjs');
const { createRequire } = require('module');
const requireES = createRequire(__filename);
const handleError = requireES('../middleware/handleError.js').handleError;
const checkDb = requireES('../middleware/checkDb.js').checkDb;

router.use(checkDb);

//get request
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 8,
      search,
      industry,
      difficulty,
      sort = 'views',
      order = 'desc',
    } = req.query;

    const query = {
      approved: true,
    };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (industry && industry !== 'All') {
      query.industry = industry;
    }

    if (difficulty && difficulty !== 'All') {
      query.interviewDifficulty = difficulty;
    }

    const skip =
      (parseInt(page) - 1) * parseInt(limit);

    const sortObj = {
      [sort]: order === 'desc' ? -1 : 1,
    };

    const [companies, total] =
  await Promise.all([
    Company.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),

    Company.countDocuments(query),
  ]);

const companiesWithQuestionCount =
  await Promise.all(
    companies.map(async (company) => {
      const questionCount =
        await InterviewQuestion.countDocuments({
          company: company._id,
          approved: true,
        });

      return {
        ...company,
        questionCount,
      };
    })
  );

    res.status(200).json({
  success: true,
  companies: companiesWithQuestionCount,
      pagination: {
        total,
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(
          total / parseInt(limit)
        ),
      },
    });
  } catch (error) {
    handleError(
      res,
      error,
      'Failed to fetch companies'
    );
  }
});

//
router.get('/:slug', async (req, res) => {
  try {
    const company = await Company.findOne({
      slug: req.params.slug,
      approved: true,
    }).lean();

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    handleError(
      res,
      error,
      'Failed to fetch company'
    );
  }
});

router.get('/:slug/interview-process', async (req, res) => {
  try {
    const company = await Company.findOne({
      slug: req.params.slug,
      approved: true,
    }).lean();

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    const process = await InterviewProcess.findOne({
      company: company._id,
    }).lean();

    res.status(200).json({
      success: true,
      process,
    });
  } catch (error) {
    handleError(
      res,
      error,
      'Failed to fetch interview process'
    );
  }
});

router.get('/:slug/questions', async (req, res) => {
  try {
    const {
      category,
      difficulty,
      page = 1,
      limit = 10,
    } = req.query;

    const company = await Company.findOne({
      slug: req.params.slug,
      approved: true,
    }).lean();

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    const query = {
      company: company._id,
      approved: true,
    };

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    const skip =
      (parseInt(page) - 1) * parseInt(limit);

    const [questions, total] =
      await Promise.all([
        InterviewQuestion.find(query)
          .sort({ upvotes: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .lean(),

        InterviewQuestion.countDocuments(query),
      ]);

    res.status(200).json({
      success: true,
      questions,
      pagination: {
        total,
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(
          total / parseInt(limit)
        ),
      },
    });
  } catch (error) {
    handleError(
      res,
      error,
      'Failed to fetch questions'
    );
  }
});
router.get('/:slug/questions/recent', async (req, res) => {
  try {
    const company = await Company.findOne({
      slug: req.params.slug,
      approved: true,
    }).lean();

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(
      sixMonthsAgo.getMonth() - 6
    );

    const questions =
      await InterviewQuestion.find({
        company: company._id,
        approved: true,
        dateAsked: {
          $gte: sixMonthsAgo,
        },
      })
        .sort({ dateAsked: -1 })
        .lean();

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    handleError(
      res,
      error,
      'Failed to fetch recent questions'
    );
  }
});

router.get('/:slug/success-stories', async (req, res) => {
  try {
    const company = await Company.findOne({
      slug: req.params.slug,
      approved: true,
    }).lean();

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    const stories =
      await SuccessStory.find({
        company: company._id,
        approved: true,
      })
        .sort({ createdAt: -1 })
        .lean();

    res.status(200).json({
      success: true,
      stories,
    });
  } catch (error) {
    handleError(
      res,
      error,
      'Failed to fetch success stories'
    );
  }
});

router.get('/:slug/compensation', async (req, res) => {
  try {
    const company = await Company.findOne({
      slug: req.params.slug,
      approved: true,
    }).lean();

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    const compensation =
      await Compensation.find({
        company: company._id,
      })
        .sort({ minSalary: 1 })
        .lean();

    res.status(200).json({
      success: true,
      compensation,
    });
  } catch (error) {
    handleError(
      res,
      error,
      'Failed to fetch compensation data'
    );
  }
});

module.exports = router;