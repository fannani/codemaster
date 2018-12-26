import mongoose, { Schema } from 'mongoose';

var PlayerAchievementSchema = new Schema({
  title: String,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('PlayerAchievement', PlayerAchievementSchema);
