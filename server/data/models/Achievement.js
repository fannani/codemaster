import mongoose, { Schema } from 'mongoose';

var AchievementSchema = new Schema({
  title: String,
  continuous: Boolean,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Achievement', AchievementSchema);
