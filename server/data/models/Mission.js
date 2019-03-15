import mongoose, { Schema } from 'mongoose';

const MissionSchema = new mongoose.Schema({
  stage: { type: Schema.Types.ObjectId, ref: 'Stage' },
  quest: String,
  testcase: [Schema.Types.ObjectId],
  params: [String],
  score: Number,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Mission', MissionSchema);
