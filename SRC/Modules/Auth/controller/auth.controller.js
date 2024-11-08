import delivaryUserModel from "../../../../DB/models/Delivary.model.js";
import ownerUserModel from "../../../../DB/models/OwnerUser.model.js";
import renterUserModel from "../../../../DB/models/RenterUser.model.js";
import adminUserModel from "../../../../DB/models/AdminUser.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { adminSignInSchema, adminSignUpSchema, deliverySignInSchema, deliverySignUpSchema, newPasswordSchema, ownerSignInSchema, ownerSignUpSchema, renterSignInSchema, renterSignUpSchema, userEmailCheckForResetPassword } from "./auth.validation.js";
// verification
import { OTPVerificationEmail } from '../../Verification/controller/verification.controller.js';
import userVerification from '../../../Middleware/userVerification.js';
const { verifyTokenAndOwner, verifyTokenAndAdmin, verifyTokenAndRenter, verifyTokenAndDelivery, } = userVerification;

// signup section
export const ownerSignUp = async (req, res) => {
    try {
        const { userName, age, email, address, phoneNumber, gender, password } = req.body;
        const checkValid = ownerSignUpSchema.validate({ userName, age, email, address, phoneNumber, gender, password }, { abortEarly: false });
        if (checkValid.error) {
            return res.status(400).json(checkValid.error);
        }
        const hashPassword = await bcrypt.hash(password, 8);
        const createowner = await ownerUserModel.create({ userName, age, email, address, phoneNumber, gender, password: hashPassword });
        const otpResult = await OTPVerificationEmail({
            _id: createowner._id,
            email: createowner.email,
            type: 'owner'
        });
        if (otpResult.status === 'PENDING') {
            return res.status(201).json({
                message: "Owner signup successful, OTP verification email sent.",
                createowner
            });
        } else {
            return res.status(500).json({
                message: "Owner signup successful, but failed to send OTP verification email pleae order an otp resend.",
                error: otpResult.message
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "There is an error occur during owner signup", error: error.stack });
    }
}

export const renterSignUp = async (req, res) => {
    try {
        const { userName, age, email, address, phoneNumber, gender, password } = req.body;
        const checkValid = renterSignUpSchema.validate({ userName, age, email, address, phoneNumber, gender, password }, { abortEarly: false });
        if (checkValid.error) {
            return res.json(checkValid.error);
        }
        const hashPassword = await bcrypt.hash(password, 8);
        const createrenter = await renterUserModel.create({ userName, age, email, address, phoneNumber, gender, password: hashPassword });
        const otpResult = await OTPVerificationEmail({
            _id: createrenter._id,
            email: createrenter.email,
            type: 'renter'
        });
        if (otpResult.status === 'PENDING') {
            return res.status(201).json({
                message: "Renter signup successful, OTP verification email sent.",
                createrenter
            });
        } else {
            return res.status(500).json({
                message: "Renter signup successful, but failed to send OTP verification email pleae order an otp resend.",
                error: otpResult.message
            });
        }
    }
    catch (error) {
        return res.json({ message: "There is an error occur during renter signup", error: error.stack });
    }
}

export const delivarySignUp = async (req, res) => {
    try {
        const { userName, age, email, address, phoneNumber, gender, password } = req.body;
        const checkValid = deliverySignUpSchema.validate({ userName, age, email, address, phoneNumber, gender, password }, { abortEarly: false });
        if (checkValid.error) {
            return res.status(400).json(checkValid.error);
        }
        const hashPassword = await bcrypt.hash(password, 8);
        const createdelivery = await delivaryUserModel.create({ userName, age, email, address, phoneNumber, gender, password: hashPassword });
        const otpResult = await OTPVerificationEmail({
            _id: createdelivery._id,
            email: createdelivery.email,
            type: 'delivary'
        });
        if (otpResult.status === 'PENDING') {
            return res.status(201).json({
                message: "Delivery signup successful, OTP verification email sent.",
                createdelivery
            });
        } else {
            return res.status(500).json({
                message: "Delivery signup successful, but failed to send OTP verification email pleae order an otp resend.",
                error: otpResult.message
            });
        }
    }
    catch (error) {
        return res.json({ message: "There is an error occur during delivery signup", error: error.stack });
    }
}

export const adminSignUp = async (req, res) => {
    try {
        const { userName, age, email, address, phoneNumber, gender, password } = req.body;
        const checkValid = adminSignUpSchema.validate({ userName, age, email, address, phoneNumber, gender, password }, { abortEarly: false });
        if (checkValid.error) {
            return res.json(checkValid.error);
        }
        const hashPassword = await bcrypt.hash(password, 8);
        const createAdmin = await adminUserModel.create({ userName, age, email, address, phoneNumber, gender, password: hashPassword });
        return res.json({ message: "Admin Signup Successfully", createAdmin });
    }
    catch (error) {
        return res.json({ message: "There is an error occur during admin signup", error: error.stack });
    }
}



// signin section
export const ownerSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkAuth = ownerSignInSchema.validate({ email, password }, { abortEarly: false });
        if (checkAuth.error) {
            return res.json(checkAuth.error);
        }
        const owner = await ownerUserModel.findOne({ email });
        if (!owner) {
            return res.json({ message: "Invalid email !" });
        }
        const checkPassword = await bcrypt.compare(password, owner.password);
        if (!checkPassword) {
            return res.json({ message: "Invalid password!" });
        }
        // make sure the user account is verified
        if (!owner.isVerified) {
            return res.json({ message: 'Unverified account, please verify your account' });
        }
        var token = jwt.sign({ id: owner._id, userType: 'owner' }, 'LGOINTOKENJABER99');
        return res.json({ message: "Hi, Login Successfully", token });
    }
    catch (error) {
        console.error(error);
        return res.json({ message: "There is an error occur during owner signin", error: error.stack });
    }
};

export const renterSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkAuth = renterSignInSchema.validate({ email, password }, { abortEarly: false });
        if (checkAuth.error) {
            return res.json(checkAuth.error);
        }
        const renter = await renterUserModel.findOne({ email });
        if (!renter) {
            return res.json({ message: "Invalid email !" });
        }
        const checkPassword = await bcrypt.compare(password, renter.password);
        if (!checkPassword) {
            return res.json({ message: "Invalid Password" });
        }
        // make sure the user account is verified
        if (!renter.isVerified) {
            return res.json({ message: 'Unverified account, please verify your account' });
        }
        var token = jwt.sign({ id: renter._id, userType: 'renter' }, 'LGOINTOKENJABER100');
        return res.json({ message: "Hi, Login Successfully", token });
    }
    catch (error) {
        console.error(error);
        return res.json({ message: "There is an error occur during renter signin", error: error.stack });
    }
}

export const delivarySignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkAuth = deliverySignInSchema.validate({ email, password }, { abortEarly: false });
        if (checkAuth.error) {
            return res.json(checkAuth.error);
        }
        const delivery = await delivaryUserModel.findOne({ email });
        if (!delivery) {
            return res.json({ message: "Invalid email !" });
        }
        const checkPassword = await bcrypt.compare(password, delivery.password);
        if (!checkPassword) {
            return res.json({ message: "Invalid password !" });
        }
        // make sure the user account is verified
        if (!delivery.isVerified) {
            return res.json({ message: 'Unverified account, please verify your account' });
        }
        var token = jwt.sign({ id: delivery._id, userType: 'delivery' }, 'LGOINTOKENJABER101');
        return res.json({ message: "Hi, Login Successfully", token });
    }
    catch (error) {
        console.error(error);
        return res.json({ message: "There is an error occur during delivery signin", error: error.stack });
    }
}

export const adminSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkAuth = adminSignInSchema.validate({ email, password }, { abortEarly: false });
        if (checkAuth.error) {
            return res.json(checkAuth.error);
        }
        const admin = await adminUserModel.findOne({ email });
        if (!admin) {
            return res.json({ message: "Invalid email !" });
        }
        const checkPassword = await bcrypt.compare(password, admin.password);
        if (!checkPassword) {
            return res.json({ message: "Invalid Password !" });
        }
        var token = jwt.sign({ id: admin._id, userType: 'admin' }, 'LGOINTOKENJABER');
        return res.json({ message: "Hi, Login Successfully", token });
    }
    catch (error) {
        console.error(error);
        return res.json({ message: "There is an error occur during admin signin", error: error.stack });
    }
}

// user forget password
const otpStore = {};
export const oforgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const checkEnteredEmail = userEmailCheckForResetPassword.validate({ email }, { abortEarly: false });
        if (checkEnteredEmail.error) {
            return res.status(404).json(checkEnteredEmail.error);
        }
        const findOwner = await ownerUserModel.findOne({ email: email });
        if (!findOwner) {
            return res.status(404).json({ message: "There is no owner for this email!" });
        }
        const generateOTPCode = () => Math.floor(1000 + Math.random() * 9000);
        const OTPCode = generateOTPCode();
        otpStore[email] = { OTPCode, step: 'First' };
        try {
            await axios.post('http://localhost:3000/email/sendEmail', {
                to: email,
                subject: "Forget Password Request",
                text: `Dear User,\n\nYour OTP code for password reset is: ${OTPCode}\n\nPlease note that this OTP is valid for 15 seconds. Verify your email within this time period to reset your password.\n\nBest regards,\nRental Platform`,
            });

            return res.json({ message: "OTP sent successfully", OTPCode });
        } catch (error) {
            return res.json({ message: "Error during sending the email", error: error.stack });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error during executing the forget password API", error: error.stack });
    }
};

export const rforgetPassword = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const checkEnterdEmail = userEmailCheckForResetPassword.validate({ userEmail });
        if (checkEnterdEmail.error) {
            return res.status(404).json(checkEnterdEmail.error);
        }
        const OTPCode = generateOTPCode();
        const generateOTPCode = () => Math.floor(1000 + Math.random() * 9000);
        try {
            await axios.post('http://localhost:3000/email/sendEmail',
                {
                    to: userEmail,
                    subject: "Forget Password Request",
                    text: `Dear User,\n\nYour OTP code for password reset is: ${OTPCode}\n\nPlease note that this OTP is valid for 15 seconds. Verify your email within this time period to reset your password.\n\nBest regards,\nRental Platform`,
                });
            return res.json({ message: "send otp code coorrectly", OTPCode });
        } catch (error) {
            return res.json({ message: "Error during sending the email", error: error.stack });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error during execute the forget passord api", error: error.stack });
    }
}

export const dforgetPassword = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const checkEnterdEmail = userEmailCheckForResetPassword.validate({ userEmail });
        if (checkEnterdEmail.error) {
            return res.status(404).json(checkEnterdEmail.error);
        }
        const OTPCode = generateOTPCode();
        const generateOTPCode = () => Math.floor(1000 + Math.random() * 9000);
        try {
            await axios.post('http://localhost:3000/email/sendEmail',
                {
                    to: userEmail,
                    subject: "Forget Password Request",
                    text: `Dear User,\n\nYour OTP code for password reset is: ${OTPCode}\n\nPlease note that this OTP is valid for 15 seconds. Verify your email within this time period to reset your password.\n\nBest regards,\nRental Platform`,
                });
            return res.json({ message: "send otp code coorrectly", OTPCode });
        } catch (error) {
            return res.json({ message: "Error during sending the email", error: error.stack });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error during execute the forget passord api", error: error.stack });
    }
}

export const aforgetPassword = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const checkEnterdEmail = userEmailCheckForResetPassword.validate({ userEmail });
        if (checkEnterdEmail.error) {
            return res.status(404).json(checkEnterdEmail.error);
        }
        const OTPCode = generateOTPCode();
        const generateOTPCode = () => Math.floor(1000 + Math.random() * 9000);
        try {
            await axios.post('http://localhost:3000/email/sendEmail',
                {
                    to: userEmail,
                    subject: "Forget Password Request",
                    text: `Dear User,\n\nYour OTP code for password reset is: ${OTPCode}\n\nPlease note that this OTP is valid for 15 seconds. Verify your email within this time period to reset your password.\n\nBest regards,\nRental Platform`,
                });
            return res.json({ message: "send otp code coorrectly", OTPCode });
        } catch (error) {
            return res.json({ message: "Error during sending the email", error: error.stack });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error during execute the forget passord api", error: error.stack });
    }
}

// verify the OTP Code sent
export const verifyOTPCode = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!otpStore[email] || otpStore[email].step !== 'First') {
            return res.status(400).json({ message: "Not Found OTP code" });
        }
        const storedOTP = otpStore[email];
        if (parseInt(otp) === storedOTP) {
            otpStore[email].step = 'Second';
            return res.json({ message: "Your are create new passord succssfully", email });
        } else {
            return res.status(400).json({ message: "Invalid OTP. Please try again." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error during OTP verification", error: error.stack });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUserData = newPasswordSchema.validate({ email, password }, { abortEarly: false });
        if (checkUserData.error) {
            return res.json(checkUserData.error);
        }
        if (!otpStore[email] || otpStore[email].step !== 'Second') {
            return res.status(400).json({ message: "Sorry, You should verify your email!." });
        }
        const owner = await ownerUserModel.findOne({ email: email });
        if (!owner) {
            return res.status(404).json({ message: "Owner Not Found" });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        owner.password = hashedPassword;
        await owner.save();
    } catch (error) {
        return res.status(500).json({ message: "Error durong reset the password", error: error.stack });
    }
}

//Delete account 
export const deleteRenterAccount = async (req, res) => {
    await verifyTokenAndRenter(req, res, async () => {
        try {
            const tokenId = req.user.id;
            const { id } = req.params;
            if (id !== tokenId && req.user.userType !== 'admin') {
                res.status(403).json({ message: 'Can not delete other people account' });
            }
            const renter = await renterUserModel.findByIdAndDelete(id);
            if (!renter) {
                return res.status(404).json({ message: 'Renter not found' });
            }
            res.json({ message: 'Renter account deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: 'renter user not found' });
        }
    });
}

export const deleteOwnerAccount = async (req, res) => {
    await verifyTokenAndOwner(req, res, async () => {
        try {
            const tokenId = req.user.id;
            const { id } = req.params;
            if (id !== tokenId && req.user.userType !== 'admin') {
                res.status(403).json({ message: 'Can not delete other people account' });
            }
            const renter = await ownerUserModel.findByIdAndDelete(id);
            if (!renter) {
                return res.status(404).json({ message: 'Owner user not found' });
            }
            res.json({ message: 'Owner account deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: 'Owner user not found' });
        }
    });
}

export const deleteDeliveryAccount = async (req, res) => {
    await verifyTokenAndDelivery(req, res, async () => {
        try {
            const tokenId = req.user.id;
            const { id } = req.params;
            if (id !== tokenId && req.user.userType !== 'admin') {
                res.status(403).json({ message: 'Can not delete other people account' });
            }
            const renter = await delivaryUserModel.findByIdAndDelete(id);
            if (!renter) {
                return res.status(404).json({ message: 'Delivery acount not found' });
            }
            res.json({ message: 'Delivery account deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: 'Delivery user not found' });
        }
    });
}

export const deleteAdminAccount = async (req, res) => {
    await verifyTokenAndAdmin(req, res, async () => {
        try {
            const isAdmin = req.user.userType;
            const { id } = req.params;
            if (isAdmin === 'admin') {
                res.status(403).json({ message: 'Can not delete other people account' });
            }
            const renter = await adminUserModel.findByIdAndDelete(id);
            if (!renter) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            res.json({ message: 'Admin account deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: 'Admin user not found' });
        }
    });
}