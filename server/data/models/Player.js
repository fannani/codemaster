import mongoose,{Schema} from 'mongoose';
import Score from "./Score";

var PlayerSchema = new Schema({
  energy: Number,
  address: String,
  birthday: Date,
  exp: Number,
  updated_at: { type: Date, default: Date.now }
});

PlayerSchema.methods.scores = async function(){
  let score = await Score.find({ player: this._id });
  let mapping = {};
  for (let i = 0; i < score.length; i++) {
    let maxScore;
    if (mapping[score[i].stage])
      maxScore = mapping[score[i].stage];
    else
      maxScore = new Score({score : 0});
    if(score[i].score > maxScore.score)
      maxScore = score[i];
    mapping[score[i].stage] = maxScore;
  }
  return mapping;
}

PlayerSchema.methods.courseScore = async function(){
  let scores = await this.scores();
  let mapping = {};
  for(let i = 0; i<scores.length;i++){
  }
}

export default mongoose.model('Player', PlayerSchema);