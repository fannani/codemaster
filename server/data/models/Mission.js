import mongoose,{Schema} from 'mongoose';

var MissionSchema = new mongoose.Schema({
    stage: { type: Schema.Types.ObjectId, ref: 'Stage' },
    quest: String,
    testcase: String,
    score : Integer,
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Mission', MissionSchema);