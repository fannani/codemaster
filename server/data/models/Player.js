import mongoose, { Schema } from 'mongoose';
import Score from './Score';

var PlayerSchema = new Schema({
  energy: Number,
  address: String,
  birthday: Date,
  exp: Number,
  updated_at: { type: Date, default: Date.now },
});

PlayerSchema.methods.scores = async function() {
  let score = await Score.aggregate([
    { $match: { player: this._id } },
    { $group: {
        _id: '$stage',
        score : { $max: '$score'},
        course : { $first: '$course'}
      },
    },
  ]);
  return score;
};

PlayerSchema.methods.courseScore = async function() {
  let score = await Score.aggregate([
    { $match: { player: this._id } },
    { $group: {
        _id: '$stage',
        score : { $max: '$score'},
        course : { $first: '$course'}
      },
    },
    { $group: {
        _id: '$course',
        score : { $max: '$score'}
    }}
  ]);
  return score;
};

export default mongoose.model('Player', PlayerSchema);
