import mongoose,{Schema} from 'mongoose';

var ScoreSchema = new Schema({
  userid: String,
  stageid: String,
  score: Number,
  time: Number,
  stars: Number,
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Score', ScoreSchema);