import mongoose from "mongoose";

const aiTopicSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  tier:        { type: Number, enum: [1, 2, 3], required: true },
  description: { type: String, required: true },
  content:     { type: String, required: true },
  resources: [
    {
      label: String,
      url:   String,
    }
  ],
  completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default mongoose.model("AiTopic", aiTopicSchema);