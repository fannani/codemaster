import mongoose,{Schema} from 'mongoose';


var CourseSchema = new mongoose.Schema({
    name: String,
    desc: String,
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Course', CourseSchema);