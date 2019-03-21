import mongoose from 'mongoose';
import Score from './Score';
import Stage from './Stage';

const CourseSchema = new mongoose.Schema({
  name: String,
  desc: String,
  script: String,
  imageid: String,
  updated_at: { type: Date, default: Date.now },
});

CourseSchema.methods.leaderboard = async function() {
  const score = await Score.aggregate([
    { $match: { course: this._id } },
    {
      $group: {
        _id: {
          stage: '$stage',
          player: '$player',
        },
        score: { $max: '$score' },
        player: { $first: '$player' },
      },
    },
    { $group: { _id: '$player', score: { $sum: '$score' } } },
    { $sort: { score: -1 } },
  ]);
  return score;
};

CourseSchema.methods.player = async function(player) {
  console.log('TESTESTES');
  const stage = await Stage.find({ course: this._id });
  for (let i = 0; i < stage.length; i += 1) {
    let win = false;
    const score = await Score.aggregate([
      {
        $match: {
          stage: mongoose.Types.ObjectId(stage[i]._id),
          player: mongoose.Types.ObjectId(player),
        },
      },
      {
        $group: {
          _id: { stage: '$stage' },
          score: { $max: '$score' },
          stars: { $first: '$stars' },
        },
      },
    ]);
    if (score.length > 0 && score[0].score > 0) {
      win = true;
      stage[i].score = score.score;
      stage[i].stars = score.stars;
    }
    stage[i].win = win;
  }
  console.log(stage);
  return stage;
};

export default mongoose.model('Course', CourseSchema);
