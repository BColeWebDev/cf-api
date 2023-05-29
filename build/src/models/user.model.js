"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dayjs_1 = __importDefault(require("dayjs"));
const hash_1 = __importDefault(require("../config/hash"));
const lodash_1 = __importDefault(require("lodash"));
const userSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordResetToken: { type: String, default: "" },
    passwordResetExpires: { type: Date, default: (0, dayjs_1.default)().toDate() },
    bio: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    crown_member: {
        type: Boolean,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    Settings: {
        type: Object,
    },
    expires: { type: Date, default: (0, dayjs_1.default)().toDate(), expires: 43200 },
    created: { type: Date, default: Date.now() }
});
userSchema.statics.build = (attrs) => {
    return new User(attrs);
};
userSchema.methods.comparePassword = function (password) {
    return hash_1.default.compare(password, this.password);
};
userSchema.methods.hashPassword = function () {
    return hash_1.default.hash({ rounds: 10, password: this.password });
};
userSchema.methods.hidePasswod = function () {
    return lodash_1.default.omit(["password", "__v", "_id"], this.toObject({ virtuals: true }));
};
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
