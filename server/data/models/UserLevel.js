import mongoose from 'mongoose';

const UserLevelSchema = new mongoose.Schema({
  level: Number,
  exp_req: Number,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('UserLevel', UserLevelSchema);
