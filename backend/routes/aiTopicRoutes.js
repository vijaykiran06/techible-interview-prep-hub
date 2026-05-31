import express from "express";
import AiTopic from "../models/aiTopicSchema.js";
import { checkDb } from "../middleware/checkDb.js";
import { handleError } from "../middleware/handleError.js";

const router = express.Router();

// GET /api/ai-topics — all topics grouped by tier
router.get("/", checkDb, async (req, res) => {
  try {
    const topics = await AiTopic.find().select("-content -completedBy");
    const grouped = { 1: [], 2: [], 3: [] };
    topics.forEach(t => grouped[t.tier].push(t));
    res.json({ success: true, data: grouped });
  } catch (err) { handleError(res, err); }
});

// GET /api/ai-topics/:slug — single topic
router.get("/:slug", checkDb, async (req, res) => {
  try {
    const topic = await AiTopic.findOne({ slug: req.params.slug });
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
    res.json({ success: true, data: topic });
  } catch (err) { handleError(res, err); }
});

// POST /api/ai-topics — create topic
router.post("/", checkDb, async (req, res) => {
  try {
    const topic = await AiTopic.create(req.body);
    res.status(201).json({ success: true, data: topic });
  } catch (err) { handleError(res, err); }
});

// PATCH /api/ai-topics/:id — update topic
router.patch("/:id", checkDb, async (req, res) => {
  try {
    const topic = await AiTopic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
    res.json({ success: true, data: topic });
  } catch (err) { handleError(res, err); }
});

// PATCH /api/ai-topics/:id/complete — mark complete
router.patch("/:id/complete", checkDb, async (req, res) => {
  try {
    const { userId } = req.body;
    const topic = await AiTopic.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { completedBy: userId } },
      { new: true }
    );
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
    res.json({ success: true, data: topic });
  } catch (err) { handleError(res, err); }
});

export default router;