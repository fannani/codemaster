import mongoose, { Schema } from 'mongoose';

var StageSchema = new mongoose.Schema({
  title: String,
  teory: String,
  time: String,
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  imageid: String,
  updated_at: { type: Date, default: Date.now },
});

StageSchema.virtual('win').
  get(function() { return this._win; }).
  set(function(v) { this._win = v; });


export default mongoose.model('Stage', StageSchema);
