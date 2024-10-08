import emailService, {
  verificationEmail,
  sendEmail,
  createResetPasswordEmail,
} from "./../config/services/email.service";
import {
  setResetPasswordToken,
  saveUser,
  findUserById,
  setUserVerified,
  deleteUnverifiedUserByEmail,
} from "../config/services/user.service";
import { saveToken, findTokenBy } from "../config/services/token.service";
import { setUserId } from "../config/services/token.service";
import path, { dirname } from "path";
import { generateToken, createToken, decodeToken } from "../config/jwt";
import { Response, Request } from "express";
import { User } from "../models/user.model";
import hashPassword from "../config/hash";
import dayjs from "dayjs";
import { IUserToken } from "config/interfaces";
import fs from "fs";
import { Regiment } from "../models/regiment.model";
import { uploadImage } from "../config/services/image.service";
let error: string[] = [];

// Return all Created Users (Admin)
const allUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({});
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// Creates user and generates login token
const registerUser = async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    email,
    password,
    bio,
    experience,
    crown_member,
    age,
    gender,
    weight,
    height,
    equipment_access,
    primary_goals,
    performance_goals,
    lifestyle_goals,
    device,
  } = req.body;

  // check to see if user already exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    error.push("email already exists!");
    res.status(409).json({ errors: error.map((err) => err) });
    error = [];
  } else {
    // // Hashed Passwords
    const hashedPassword = await hashPassword.hash({ rounds: 10, password });

    // Create User
    const newUser = User.build({
      first_name: first_name.trim().toLowerCase(),
      last_name: last_name.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      bio: bio.trim().toLowerCase(),
      experience: experience.trim().toLowerCase(),
      age: age.trim().toLowerCase(),
      gender,
      primary_goals,
      performance_goals,
      lifestyle_goals,
      equipment_access,
      weight,
      height,
      crown_member,
      settings: {
        theme: "dark",
        weight: "ibs",
        distance: "miles",
        size: "inches",
      },
      device: device.trim().toLowerCase(),
    });

    await newUser.save();

    // token
    const userToken = generateToken(email, first_name, last_name, newUser._id);

    // send user
    if (newUser) {
      // Creates verification email
      const emailVerfication = verificationEmail(newUser.email, userToken);
      try {
        await sendEmail(emailVerfication);

        return res.status(201).json({
          message: `A verification mail has been sent. ${newUser.email}`,
        });
      } catch (error) {
        console.log("Error", error);
        User.findByIdAndDelete(newUser._id);
        return res.status(403).json({
          message: `Impossible to send an email to ${newUser.email}, try again. Our service may be down.`,
        });
      }
    } else {
      error.push("Invalid user data");
      res.status(400).json({ errors: error.map((err) => err) });
      error = [];
    }
  }
};

// - Login User
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Checks for email

  const existingUser = await User.findOne({ email: email });

  if (
    !existingUser ||
    !(await hashPassword.compare(password, existingUser.password))
  ) {
    error.push("Invalid Credentials email or password is incorrect");
    return res
      .status(400)
      .json({ message: "Invalid Credentials email or password is incorrect" });
  }

  // Existing User has not authenticate account

  if (existingUser && !existingUser.isVerified) {
    error.push("User credentials has not been validated");
    return res
      .status(400)
      .json({ message: "User credentials has not been validated" });
  }

  try {
    const userToken = generateToken(
      existingUser.email,
      existingUser.first_name,
      existingUser.last_name,
      existingUser._id
    );
    // hide avatarProfile for now
    const allRegiments = await Regiment.find({ userid: existingUser._id });
    let userData = {
      existingUser,
      regimentsCount: allRegiments.length,
      userToken,
    };

    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// - Sign Out User
const SignOutUser = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Successfully Logged out" });
};

// - Current User
const currentUser = async (req: Request, res: Response) => {
  res.json({ currentUser: req.currentUser || null });
};

// - Login Reset
const loginReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await findUserById(email);
    if (!user)
      return res
        .status(404)
        .send({ message: "No user found with this email address." });
    const resetToken = createToken();
    const tokenExpiryDate = dayjs().add(12, "hours").toDate();

    setUserId(resetToken, user.id);
    setResetPasswordToken(user, resetToken.token, tokenExpiryDate);
    await saveUser(user);
    await saveToken(resetToken);
    try {
      const email = createResetPasswordEmail(user.email, resetToken.token);
      await sendEmail(email);
      return res
        .status(200)
        .send({ message: "Password has been successfully changed." });
    } catch (error) {
      return res.status(503).send({
        message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: "An unexpected error occurred" });
  }
};

// - Forgot Password
const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(404)
        .send({ message: "User not found with that email address!" });
    const resetToken = createToken();
    const tokenExpirationDate = dayjs().add(12, "hours").toDate();
    setUserId(resetToken, user?.id);
    setResetPasswordToken(user, resetToken.token, tokenExpirationDate);

    // Save user and token
    await saveUser(user);
    await saveToken(resetToken);

    try {
      // Creates email reset link
      const email = emailService.emailResetLink(user.email, resetToken.token);
      // sends email
      await emailService.sendEmail(email);
      return res.status(200).send({
        message: `A reset passowrd email has been sent to ${user.email}`,
      });
    } catch (error) {
      return res.status(503).send({
        message: `Impossible to send an email to ${email}, try again. Our service may be down.`,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Error has occured" });
  }
};

// - Reset User Password
const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = await findTokenBy("token", req.params["token"]);
    if (!token) {
      return res.status(404).send({
        message: "This token is not valid. your token may have expired.",
      });
    }
    const user = await findUserById(token._id);
    if (!user) {
      return res
        .status(404)
        .send({ message: "We were unable to find a user for this token." });
    }
    if (user.passwordResetToken !== token.token) {
      return res.status(400).send({
        message:
          "User token and your token didn't match. You may have a more recent token in your mail list.",
      });
    }

    // Verify user token has expired
  } catch (error) {
    res.status(500).send({ message: "Error has occured" });
  }
};

// - Send Confirmation
const sendConfirmation = async (req: Request, res: Response) => {
  try {
    const token: IUserToken = await decodeToken(req.params.token);
    console.log("token", token);
    if (token === undefined) {
      return res.status(404).send({
        message:
          "We were unable to find a valid token. Your token may have expired. Please try again!",
      });
    }

    const user = await findUserById(token.user_id);

    if (!user) {
      return res
        .status(404)
        .send({ message: `We were unable to find a user for this token.` });
    }
    console.log("users", user);
    // User has already been verified
    if (user.isVerified) {
      return res.status(400).send({
        message: "This user has already been verified. Please log in.",
      });
    }

    setUserVerified(user);
    await saveUser(user);

    return res.status(200).json({ message: "User Successfuly created" });
  } catch (error) {
    return res.status(500).send("An unexpected error occurred");
  }
};

// - User Cancel
const userCancel = async (req: Request, res: Response) => {
  try {
    deleteUnverifiedUserByEmail(req.body.email);
    return res.status(200).send({ message: "User reset success" });
  } catch (error) {
    return res.status(500).send("An unexpected error occurred");
  }
};

// Settings Tools
const Settings = async (req: Request, res: Response) => {
  const response = await await User.findById(req.params.id);
  // hide avatarProfile for now

  if (response === undefined || response === null) {
    return res.status(404).json({ message: "User ID Not found" });
  }
  if (req.body.settings === undefined) {
    return res.status(400).json({ message: "Missing Settings" });
  }
  try {
    const allRegiments = await Regiment.find({ userid: req.params.id });

    const response = await User.findByIdAndUpdate(req.params.id, {
      settings: req.body.settings,
    });
    return res.status(200).json({
      message: "Settings Updated",
      existingUser: response,
      regimentsCount: allRegiments.length,
    });
  } catch (error) {
    return res.status(500).send("An unexpected error occurred");
  }
};

// Delete all user and workouts regiments related to
const deleteUser = async (req: Request, res: Response) => {
  try {
    // no id provided
    if (req.params.id === undefined) {
      return res.status(400).json({ message: "no id found" });
    }
    const existingUser = await User.findById(req.params.id);
    if (existingUser === null) {
      return res.status(400).json({ message: "Error could not find user!" });
    }
    const response = await User.findByIdAndDelete(req.params.id);

    if (response) {
      return res.status(200).json({ message: "User Deleted!" });
    }
  } catch (error) {
    return res.status(500).send("An unexpected error occurred");
  }
};

const uploadAvatar = async (req: Request, res: Response) => {
  if (req.file === undefined) return res.send("you must select a file.");

  if (req.params.id === null || req.params.id === undefined) {
    return res.status(400).json({ message: "Error userid is missing!" });
  }

  const response = await uploadImage(req.file?.path, req.params.id);

  await User.findByIdAndUpdate(req.params.id, {
    avatarProfile: response.secure_,
  }).then((value) => {
    return res.status(200).json({
      message: "Success! Updated profile image",
      userid: req.params.id,
      url: response.secure_url,
    });
  });
};

export default {
  registerUser,
  allUsers,
  loginUser,
  currentUser,
  forgotPassword,
  resetPassword,
  sendConfirmation,
  userCancel,
  loginReset,
  SignOutUser,
  Settings,
  deleteUser,
  uploadAvatar,
};
