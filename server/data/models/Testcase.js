import mongoose,{Schema} from 'mongoose';

var TestcaseSchema = new mongoose.Schema({
  stage: { type: Schema.Types.ObjectId, ref: 'Stage' },
  testcase: String,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Testcase', TestcaseSchema);