import OTPVerification from '../../../../DB/models/OTPVerification.model.js';
import delivaryUserModel from '../../../../DB/models/Delivary.model.js';
import ownerUserModel from '../../../../DB/models/OwnerUser.model.js';
import renterUserModel from '../../../../DB/models/RenterUser.model.js';
import { verifyOTPSchema, verifyResendSchema } from './verification.validation.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';



let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "caraccessioescompany@gmail.com",
        pass: "qqqgtutvgbqhtxde",
    },
});


export const OTPVerificationEmail = async ({ email, type }, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const emailOptions = {
            from: "caraccessioescompany@gmail.com",
            to: email,
            subject: "Verify Your Email",
            html: `<p>To verify your email please enter this <b>${otp}</b> OTP in the app <br> This code will<b> expire within one hour</b></p>`
        };
        const salt = 10;
        const hashedOTP = await bcrypt.hash(otp, salt);
        const newOTPVerification = await new OTPVerification({

            email: email,
            otp: hashedOTP,
            userType: type,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        await newOTPVerification.save();
        //send email using nodemailer
        await transporter.sendMail(emailOptions);
        res.json({
            status: 'PENDING',
            message: 'Verification E-Mail sent'
        });

    } catch (error) {
        res.json({
            status: 'FAILED',
            message: error.message,
        });

    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { error } = verifyOTPSchema(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        let { email, otp } = req.body;
        if (!email || !otp) {
            throw Error("Empty field are not allowed");
        } else {
            const OTPRecord = await OTPVerification.find({
                email,
            });
            if (OTPRecord.length <= 0) {
                throw new Error(
                    "Account is already verified or doesn't exist. please sign up or login "
                );
            } else {
                const { expiresAt } = OTPRecord[0];
                const hashedOTP = OTPRecord[0].otp;
                if (expiresAt < Date.now()) {
                    await OTPVerification.deleteMany({ email });
                    throw new Error('The OTP has expired. pealse request a new one');
                } else {
                    const OTPValid = await bcrypt.compare(otp, hashedOTP);
                    if (!OTPValid) {
                        throw new Error('Invalid OTP entered , please check your email for the valid one');
                    } else {
                        if (OTPRecord[0].userType === 'delivary') {
                            await delivaryUserModel.updateOne({ email: email }, { isVerified: true });
                            await OTPVerification.deleteMany({ email });
                            res.json({
                                status: 'VERIFIED',
                                message: 'User E-Mail verified successfully',
                            });

                        } else if (OTPRecord[0].userType === 'owner') {
                            await ownerUserModel.updateOne({ email: email }, { isVerified: true });
                            await OTPVerification.deleteMany({ email });
                            res.json({
                                status: 'VERIFIED',
                                message: 'User E-Mail verified successfully',
                            });

                        } else {
                            await renterUserModel.updateOne({ email: email }, { isVerified: true });
                            await OTPVerification.deleteMany({ email });
                            res.json({
                                status: 'VERIFIED',
                                message: 'User E-Mail verified successfully',
                            });

                        }
                    }
                }
            }

        }
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: error.message,
        });
    }
}

export const resendOTP = async (req, res) => {
    try {
        const { error } = verifyResendSchema(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        let { email, userType } = req.body;
        if (!email) {
            throw new Error('Empty user details are not allowed')
        } else {
            const OTPRecord = await
                await OTPVerification.deleteMany({ email });
            OTPVerificationEmail({ email, userType }, res);//here
        }
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: error.message,
        });
    }

}