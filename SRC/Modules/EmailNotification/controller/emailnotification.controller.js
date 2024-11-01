import nodemailer from 'nodemailer';
import { emailNotifySchema } from './emailnotification.validation.js';

export const EmailNotify = async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    const checkInputData = emailNotifySchema.validate({to, subject, text},{abortEarly:true});
    if(checkInputData.error){
        return res.status(400).json(checkInputData.error);
    }
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "caraccessioescompany@gmail.com",
        pass: "qqqgtutvgbqhtxde",
      },
    });
    let info = await transporter.sendMail({
      from: 'caraccessioescompany@gmail.com',
      to,
      subject,
      text,
    });
    res.status(200).json({ message: 'Email notification sent successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.stack });
  }
};
