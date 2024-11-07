import Imap from "imap";
import { simpleParser } from "mailparser";
import userFeedbackModel from "./../../../../DB/models/userFeedback.model.js";
import userRenterFeedbackModel from "../../../../DB/models/UseFeedbaclRenter.model.js";
import renterUserModel from "../../../../DB/models/RenterUser.model.js";
import ownerUserModel from "../../../../DB/models/OwnerUser.model.js";
import axios from "axios";

// for owner section
export const askFeedbackOwner = async (req, res) => {
  try {
    const owners = await ownerUserModel.find({});
    if (owners.length === 0) {
      return res.status(404).json({ message: "No Owners Found!" });
    }
    const emailPromises = owners.map(async (owner) => {
    const ownerEmail = owner.email;
    await axios.post('http://localhost:3000/email/sendEmail',{
      to: ownerEmail,
      subject: "🌟 Request to Feedback! 🌟",
      text: `Dear Owners,\n\nWe hope you've had a great experience with us! Your feedback is important and helps us improve.\n\nPlease take a moment to rate our app and share your thoughts.\n\nThanks for being part of our community!\n\nBest regards,\nThe Rental Platform Team`
    });
  });
  await Promise.all(emailPromises);
  } catch (error) {
    return res.status(500).json({
      message: "Error during sending the email",
      error: error.stack,
    });
  }
  return res.status(200).json({
    message: "FeedBack Request send successfully to all owners",
  });
};

const imap = new Imap({
  user: "caraccessioescompany@gmail.com",
  password: "qqqgtutvgbqhtxde",
  host: "imap.gmail.com",
  port: 993,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false,
  },
});

export const getUserEmailFeedback = async (req, res) => {
  imap.once("ready", () => {
    imap.openBox("INBOX", false, () => {
      imap.search(["UNSEEN", ["SINCE", new Date()]], (err, results) => {
        if (err) throw err;

        const fetch = imap.fetch(results, { bodies: "" });
        fetch.on("message", (msg, seqno) => {
          msg.on("body", (stream) => {
            simpleParser(stream, async (err, parsed) => {
              if (err) throw err;
              const { from, text } = parsed;
              const feedback = new userFeedbackModel({
                email: from.value[0].address,
                feedback: text,
              });
              await feedback.save();
            });
          });
        });

        fetch.once("end", () => {
          imap.end();
        });
      });
    });
  });

  imap.connect();
};

// for rental section
export const askFeedbackRenter = async (req, res) => {
  try {
    const renters = await renterUserModel.find({});
    if (renters.length === 0) {
      return res.status(404).json({ message: "No Renters Found!" });
    }
    const emailPromises = renters.map(async (renters) => {
    const renterEmail = renters.email;
    await axios.post("http://localhost:3000/email/sendEmail", {
      to: renterEmail,
      subject: "🌟 Request to Feedback! 🌟",
      text: `Dear Renters,\n\nWe hope you've had a great experience with us! Your feedback is important and helps us improve.\n\nPlease take a moment to rate our app and share your thoughts.\n\nThanks for being part of our community!\n\nBest regards,\nThe Rental Platform Team`
    });
  });
  await Promise.all(emailPromises);
  } catch (error) {
    return res.status(500).json({
      message: "Error during sending the email",
      error: error.stack,
    });
  }
  return res.status(200).json({
    message: "FeedBack Request send successfully to all renters",
  });
};

export const getRenterEmailFeedback = async (req, res) => {
  imap.once("ready", () => {
    imap.openBox("INBOX", false, () => {
      imap.search(["UNSEEN", ["SINCE", new Date()]], (err, results) => {
        if (err) throw err;

        const fetch = imap.fetch(results, { bodies: "" });
        fetch.on("message", (msg, seqno) => {
          msg.on("body", (stream) => {
            simpleParser(stream, async (err, parsed) => {
              if (err) throw err;
              const { from, text } = parsed;
              const feedback = new userRenterFeedbackModel({
                email: from.value[0].address,
                feedback: text,
              });
              await feedback.save();
            });
          });
        });

        fetch.once("end", () => {
          imap.end();
        });
      });
    });
  });

  imap.connect();
};

