import mongoose, { Schema } from 'mongoose';

const AvatarSchema = new Schema({
  title: String,
  min_exp: Number,
  imageid: String,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Avatar', AvatarSchema);
