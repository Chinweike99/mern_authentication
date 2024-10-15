import { profile } from "console";
import mongoose from "mongoose";
// import { type } from "os";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Provide a unique username"],
        unique: [true, "Username exist"]
    },
    password:{
        type: String,
        required: [true, "Provide a password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide unique email"],
        unique: true,
    },
    firstName: {type: String},
    lastName: {type: String},
    mobile: {type: Number},
    address: {type: String},
    profile: {type: String}
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);