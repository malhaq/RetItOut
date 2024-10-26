const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OTPVerificationSchema = new Schema({
    userId: String,
    otp: String,
    userType: String,
    createdAt: Date,
    expiresAt: Date,
});

const OTPVerification = model('OTPVerification',OTPVerificationSchema);

module.exports = OTPVerification;