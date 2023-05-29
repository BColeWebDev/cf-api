"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.createResetPasswordEmail = exports.verificationEmail = exports.resetConfirmationEmail = exports.emailResetLink = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
// Enviorment Variables
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
// setup api key
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
// Email Reset
const emailResetLink = (receiverEmail, resetToken) => {
    const email = {
        to: receiverEmail,
        from: `${process.env.SENDING_EMAIL}`,
        subject: "Reset password link",
        text: "text",
        html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n
  <a href="http://${process.env.HOST}/login/reset/${resetToken}">http://${process.env.HOST}/login/reset/${resetToken}</a> \n\n If you did not request this, please ignore this email and your password will remain unchanged.\n </p>`,
    };
    return email;
};
exports.emailResetLink = emailResetLink;
// Email Reset confirmation 
const resetConfirmationEmail = (receiverEmail) => {
    const email = {
        to: receiverEmail,
        from: `${process.env.SENDING_EMAIL}`,
        subject: "Your password has been changed",
        text: "Some useless text",
        html: `<p>This is a confirmation that the password for your account ${receiverEmail} has just been changed. </p>`,
    };
    return email;
};
exports.resetConfirmationEmail = resetConfirmationEmail;
// Verification Email : Goes to Front end
const verificationEmail = (receiverEmail, verficationTokenValue) => {
    const email = {
        to: receiverEmail,
        from: `${process.env.SENDING_EMAIL}`,
        subject: "Email Verification",
        text: "some useless text",
        html: `<p>Please verify your account by clicking the link: 
    <a href="http://${process.env.HOST}/account/confirm/${verficationTokenValue}">http://${process.env.HOST}/account/confirm/${verficationTokenValue}</a> </p>`,
    };
    return email;
};
exports.verificationEmail = verificationEmail;
// Reset Password Email: Goes to Front End
const createResetPasswordEmail = (receiverEmail, verificationTokenValue) => {
    const email = {
        to: receiverEmail,
        from: `${process.env.SENDING_EMAIL}`,
        subject: "Email Verification",
        text: "Some uselss text",
        html: `<p>Please verify your account by clicking the link: 
      <a href="http://${process.env.HOST}/account/confirm/${verificationTokenValue}">http://${process.env.HOST}/account/confirm/${verificationTokenValue}</a> </p>`,
    };
    return email;
};
exports.createResetPasswordEmail = createResetPasswordEmail;
// Sending email
const sendEmail = async (email) => mail_1.default.send(email);
exports.sendEmail = sendEmail;
exports.default = {
    emailResetLink: exports.emailResetLink,
    resetConfirmationEmail: exports.resetConfirmationEmail,
    createResetPasswordEmail: exports.createResetPasswordEmail,
    verificationEmail: exports.verificationEmail,
    sendEmail: exports.sendEmail
};
