import mongoose,{Schema} from 'mongoose';

var ScoreSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  stage: { type: Schema.Types.ObjectId, ref: 'Stage' },
  score: Number,
  time: Number,
  stars: Number,
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Score', ScoreSchema);