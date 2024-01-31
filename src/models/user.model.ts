import mongoose from "mongoose";
import dayjs from "dayjs";
import passwordHash from "../config/hash";
import _ from "lodash";
// Interface that describe property to create new user
interface UserAttrs {
  first_name: string;
  last_name: string;
  experience: string;
  email: string;
  password: string;
  bio: string;
  age: string;
  sex: string;
  device: string;
  crown_member: boolean;
  settings: Object;
}
// Interface that describe property a user model has
interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

export interface UserDocument extends mongoose.Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  lastLoggedIn: Date;
  device: string;
  height: "";
  accountCreated: Date;
  isVerified: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;
  expires?: boolean;
  bio: string;
  age: string;
  sex: string;
  crown_member: boolean;
  features: object;
  comparePassword(password: string): boolean;
  hidePassword(): void;
  hashPassword(): Promise<string>;
  settings: Object;
}

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: { type: String, default: "" },
  passwordResetExpires: { type: Date, default: dayjs().toDate() },
  bio: {
    type: String,
    required: true,
  },
  accountCreated: {
    type: Date,
    default: dayjs().toDate(),
  },
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  crown_member: {
    type: Boolean,
    required: true,
  },
  // User exercise experience level
  experience: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isLoggedIn: {
    type: Boolean,
    require: true,
    default: false,
  },

  settings: {
    type: Object,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
userSchema.methods.comparePassword = function (password: string) {
  return passwordHash.compare(password, this.password);
};
userSchema.methods.hashPassword = function () {
  return passwordHash.hash({ rounds: 10, password: this.password });
};

userSchema.methods.hidePasswod = function () {
  return _.omit(["password", "__v", "_id"], this.toObject({ virtuals: true }));
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
