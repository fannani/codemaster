import mongoose,{Schema} from 'mongoose';

var PlayerSchema = new Schema({
  energy: Number,
  address: String,
  birthday: Date,
  exp: Number,
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Player', PlayerSchema);