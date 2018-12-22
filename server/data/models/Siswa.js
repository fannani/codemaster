import mongoose,{Schema} from 'mongoose';

var SiswaSchema = new Schema({
  energy: Number,
  address: String,
  birthday: Date,
  exp: Number,
  updated_at: { type: Date, default: Date.now }
},{ collection: 'siswa' });

export default mongoose.model('Siswa', SiswaSchema);