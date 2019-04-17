import mongoose, { Schema } from 'mongoose';
import Score from './Score/Score';

const StageSchema = new mongoose.Schema({
  title: String,
  index: Number,
  teory: String,
  time: Number,
  exp_reward: Number,
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  imageid: String,
  badge_name: String,
  badge_image: String,
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

StageSchema.virtual('script')
  .get(function() {
    return this._script;
  })
  .set(function(v) {
    this._script = v;
  });

StageSchema.methods.player = async function(player) {
  const currentStage = await this.model('Stage').findById(this._id);
  const prevStage = await this.model('Stage').findOne({
    course: currentStage.course,
    index: currentStage.index - 1,
  });

  let win = false;
  const score = await Score.aggregate([
    {
      $match: {
        stage: mongoose.Types.ObjectId(prevStage._id),
        player: mongoose.Types.ObjectId(player),
      },
    },
    {
      $group: {
        _id: { stage: '$stage' },
        score: { $max: '$score' },
        script: { $first: '$script' },
      },
    },
  ]);
  if (score.length > 0 && score[0].score > 0) {
    win = true;
    currentStage.script = score[0].script;
  }
  stage[i].win = win;

  return stage;
};

export default mongoose.model('Stage', StageSchema);
