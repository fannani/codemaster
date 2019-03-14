import mongoose, { Schema } from 'mongoose';
import Score from './Score';
import Course from './Course';

const PlayerSchema = new Schema({
  energy: Number,
  birthday: Date,
  exp: Number,
  friends: [Schema.Types.ObjectId],
  updated_at: { type: Date, default: Date.now },
});

PlayerSchema.methods.scores = async function() {
  const score = await Score.aggregate([
    { $match: { player: this._id } },
    {
      $group: {
        _id: '$stage',
        score: { $max: '$score' },
        course: { $first: '$course' },
      },
    },
  ]);
  return score;
};

PlayerSchema.methods.courseScore = async function() {
  const score = await Score.aggregate([
    { $match: { player: this._id } },
    {
      $group: {
        _id: '$stage',
        score: { $max: '$score' },
        course: { $first: '$course' },
      },
    },
    {
      $group: {
        _id: '$course',
        score: { $max: '$score' },
      },
    },
  ]);
  return score;
};

PlayerSchema.methods.getCourse = async function() {
  const score = await Score.aggregate([
    { $match: { player: this._id } },
    {
      $group: {
        _id: '$course',
      },
    },
  ]);
  let temp = [];
  for (let index in score) {
    temp.push(score[index]._id);
  }
  let courses = await Course.find({
    _id: { $in: temp },
  });
  return courses;
};

export default mongoose.model('Player', PlayerSchema);
