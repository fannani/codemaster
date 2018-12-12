import mongoose,{Schema} from 'mongoose';


var CourseSchema = new mongoose.Schema({
    name: String,
    desc: String,
    stages:  [{ type: Schema.Types.ObjectId, ref: 'Stage' }],
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Course', CourseSchema);