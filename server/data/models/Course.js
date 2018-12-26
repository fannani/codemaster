import mongoose, { Schema } from 'mongoose';
import Score from '../models/Score';

var CourseSchema = new mongoose.Schema({
  name: String,
  desc: String,
  imageid: String,
  updated_at: { type: Date, default: Date.now },
});

CourseSchema.methods.leaderboard = async function() {
  let score = await Score.aggregate([
    { $match: { course: this._id } },
    {
      $group: {
        _id: {
            stage : '$stage',
            player: '$player'
        },
        score: { $max: '$score' },
        player: { $first: '$player' },
      },
    },
    { $group: { _id: '$player', score: { $sum: '$score' } } },
    { $sort : {score: -1}}
  ]);
  return score;
};

export default mongoose.model('Course', CourseSchema);
