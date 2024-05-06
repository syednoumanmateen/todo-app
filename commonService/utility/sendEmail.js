
const nodemailer = require("nodemailer");
const { customException } = require("../customException");
const statusCode = require("../statusCode");
const constants = require("../constants");

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to, subject, html
    };

    const result = await transporter.sendMail(mailOptions);
    if (result) {
      return true
    }
    throw customException.error(statusCode.SERVER_ERROR, "Failed to send email", "Failed to send email")
  } catch (e) {
    if (e instanceof customException.customException) throw e;
    throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
  }
}
module.exports = {
  sendEmail
}