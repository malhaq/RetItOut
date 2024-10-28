import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const delivaryUserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    default: 'Male',
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  ratings: [{
    orderid: { type: mongoose.Schema.Types.ObjectId, ref: 'oredrstable' },//this should reference the order that is beaing delivered
    rating: Number,
    Comment: String,
  }]
}, {
  timestamps: true,
});
const delivaryUserModel = model('delivaryUser', delivaryUserSchema);
export default delivaryUserModel;
