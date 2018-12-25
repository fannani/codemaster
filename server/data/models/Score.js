import mongoose,{Schema} from 'mongoose';

var ScoreSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player' },
  stage: { type: Schema.Types.ObjectId, ref: 'Stage' },
  score: Number,
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  time: Number,
  stars: [Boolean],
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Score', ScoreSchema);