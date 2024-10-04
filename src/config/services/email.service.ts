import sgMail from "@sendgrid/mail";

// Enviorment Variables
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// setup api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

/** Email Reset Link Email Template
 * @param reciverEmail string
 * @param verificationTokenValue string
 * @returns email
 */
export const emailResetLink = (
  receiverEmail: string,
  resetToken: string
): sgMail.MailDataRequired => {
  const email: sgMail.MailDataRequired = {
    to: receiverEmail,
    from: `${process.env.SENDING_EMAIL}`,
    subject: "Reset password link",
    text: "text",
    html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n
  <a href="${process.env.WEB_HOST}/login/reset?token=${resetToken}">${process.env.WEB_HOST}/login/reset?token=${resetToken}</a> \n\n If you did not request this, please ignore this email and your password will remain unchanged.\n </p>`,
  };
  return email;
};

/** Email Reset Confirmation Template
 * @param reciverEmail string
 * @param verificationTokenValue string
 * @returns email
 */
export const resetConfirmationEmail = (
  receiverEmail: string
): sgMail.MailDataRequired => {
  const email: sgMail.MailDataRequired = {
    to: receiverEmail,
    from: `${process.env.SENDING_EMAIL}`,
    subject: "Your password has been changed",
    text: "Some useless text",
    html: `<p>This is a confirmation that the password for your account ${receiverEmail} has just been changed. </p>`,
  };
  return email;
};

/** Creates Verification Email Template
 * @param reciverEmail string
 * @param verificationTokenValue string
 * @returns email
 */
export const verificationEmail = (
  receiverEmail: string,
  verficationTokenValue: string
): sgMail.MailDataRequired => {
  const email = {
    to: receiverEmail,
    from: `${process.env.SENDING_EMAIL}`,
    subject: "Email Verification",
    text: "some useless text",
    html: `<p>Please verify your account by clicking the link: 
    <a href="${process.env.WEB_HOST}account/confirm?token=${verficationTokenValue}">${process.env.WEB_HOST}/account/confirm?token=${verficationTokenValue}</a>
    </p>`,
  };
  console.log("email", email);
  return email;
};

/** Creates Reset Password Email Template
 * @param reciverEmail string
 * @param verificationTokenValue string
 * @returns email
 */
export const createResetPasswordEmail = (
  receiverEmail: string,
  verificationTokenValue: string
): sgMail.MailDataRequired => {
  const email = {
    to: receiverEmail,
    from: `${process.env.SENDING_EMAIL}`,
    subject: "Email Verification",
    text: "Some uselss text",
    html: `<p>Please verify your account by clicking the link: 
      <a href="${process.env.WEB_HOST}account/confirm?token=${verificationTokenValue}">${process.env.WEB_HOST}/account/confirm?token=${verificationTokenValue}</a> </p>`,
  };

  return email;
};
/** Sends Verification Email
 * @param email MailDataRequired
 */
export const sendEmail = async (email: sgMail.MailDataRequired) =>
  sgMail.send(email);

export default {
  emailResetLink,
  resetConfirmationEmail,
  createResetPasswordEmail,
  verificationEmail,
  sendEmail,
};
