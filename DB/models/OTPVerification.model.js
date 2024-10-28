import mongoose from 'mongoose';  // Use import for ES module
const Schema = mongoose.Schema;

const OTPVerificationSchema = new Schema({
    userId: String,
    otp: String,
    userType: String,
    createdAt: Date,
    expiresAt: Date,
});

// Corrected to use mongoose.model
const OTPVerification = mongoose.model('OTPVerification', OTPVerificationSchema);

// Use default export for ES module
export default OTPVerification;
