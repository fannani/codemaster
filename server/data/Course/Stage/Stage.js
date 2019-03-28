import mongoose, { Schema } from 'mongoose';

const StageSchema = new mongoose.Schema({
  title: String,
  index: Number,
  teory: String,
  time: String,
  exp_reward: Number,
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  imageid: String,
  updated_at: { type: Date, default: Date.now },
});

StageSchema.virtual('win')
  .get(function() {
    return this._win;
  })
  .set(function(v) {
    this._win = v;
  });

StageSchema.virtual('stars')
  .get(function() {
    return this._stars;
  })
  .set(function(v) {
    this._stars = v;
  });

StageSchema.virtual('score')
  .get(function() {
    return this._score;
  })
  .set(function(v) {
    this._score = v;
  });

export default mongoose.model('Stage', StageSchema);
