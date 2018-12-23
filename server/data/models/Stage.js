import mongoose, { Schema } from 'mongoose';

var StageSchema = new mongoose.Schema({
  title: String,
  teory: String,
  time: String,
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  imageid: String,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Stage', StageSchema);
