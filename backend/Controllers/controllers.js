// import { error } from "console";
import UserModel from "../models/User.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
// import { error } from "console";
dotenv.config();
import otpGenerator from 'otp-generator'
import { error } from "console";


/**Middleware to Verify Users existence*/
export const verifyusers = async(req, res, next)=>{
    try {
        const {username} = req.method == "GET" ? req.query : req.body;

        // Check users existence
        let usernameExits = await UserModel.findOne({username});
        if(!usernameExits){
            return res.status(404).send({error: "Can't find user"})
        }
        // If the user is found,
        next();
    } catch ({error}) {
        return res.status(404).send({error: "Authentication error"})
    }
}


/**POST: http://localhost:3200/api/register
 * @param : {
 *  "username": "@user"
 * "password": "admin123"
 * "email": "example@gmail.com"
 * "firstName": "chidi"
 * "lastname": "Okoye"
 * "mobile": +234 904349 90
 * "address": "No 12 Nnamdi azikiwe onitsha"
 * "profile": ""
 * }
 */

export const register = async (req, res) => {
    try { 
        const {username, password, profile, email } = req.body;
        // Check if user Exists
        const existUsername = await UserModel.findOne({ username });
        if(existUsername){
            return res.status(400).send({error: "Please use a unique username"})
        }

        //Check if the email exists
        const existingEmail = await UserModel.findOne({ email });
        if(existingEmail){
            return res.status(400).send({error: "Email taken, use a unique email"})
        }

        //Hash the password
        if(password){
            const hashedPassword = await bcryptjs.hash(password, 15);

            //Create a new user.
            const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email
            })

            //Save the user to the database.
            await user.save();

            return res.status(201).send({msg: "Registration successful"});
        }else{
            return res.status(400).send({error: "Password is required"})
        }


    } catch (error) {
        return res.status(500).send({error: error.message || "Internal Server Error"});
    }
}


/** POST: http://localhost:3200/api/login
 * @param{
 * "username": "username"
 * "password": "admin123"
 * }
 */

export const login= async(req, res) => {
    const {username, password} = req.body;
    try {
        //Check if user exists
        const userExists = await UserModel.findOne({username});
        if(!userExists){
           return res.status(404).send({error: "User not found"})
        }

        //Compare the provided password with the hashed password
        const passwordCheck =  bcryptjs.compare(password, userExists.password);
        if(!passwordCheck){
            return res.status(400).send({error: "Invalid Password"})
        }

        //Create token
        const token = jwt.sign({
            userId: userExists._id,
            username: userExists.username
        }, process.env.JWT_SECRET, {expiresIn: "24h"})

        //If password is correct, send a success message
        return res.status(200).send({
            msg: "Login was successful",
            username: userExists.username,
            token
        })

    } catch (error) {
        return res.status(404).send(error.message)
    }
}

/** GET: http://localhost:3200/api/user/example123
 */
export const getUser = async(req, res) => {
    const {username} = req.params;
    try {
        if(!username){
            return res.status(400).send({error: "User does not exist"})
        }
        const user = await UserModel.findOne({ username }); // Find user in the database
        if(!user){
            return res.status(404).send({error: "Could not find user"})
        }

        // Removing password from return vlaues to client
        //Object.assign() is used to create a shallow copy of the object.
        // copying the properties from user.toJSON() into a new empty object ({}),
        const {password, ...rest} = Object.assign({}, user.toJSON());
        return res.status(200).send(rest);//If user is found, send user details

    } catch (error) {
        return res.status(500).send({error: error.message || "Cannot find the user"})
    }
}


/** PUT: http://localhost:3200/api/updateuser
 * @param{
 * "id": "<userid>"
 * }
 * body: {
 * firstName: "",
 * address: "",
 * profile: ""
 * }
 */
    export const updateUser = async(req, res) => {
        try {
            /* const id = req.query.id;*/ //retrieves the user ID from the query parameters in the request URL. The ID is manually supplied as a parameter in the URL
            const {userId} = req.user; // This approach enhances security by tying the update action to the logged-in user's identity, preventing users from attempting to update other users' data.
            if(!userId){
                return res.status(400).send({error: "No user with this id"})
            }
            const body = req.body;
            const response = await UserModel.updateOne({_id: userId}, body);
            if(response.nModified === 0){
                // if no documents were modified, it means user was not found and data remained the same
                return res.status(404).send({error: "User not found or no changes made"})
            }
            // Fetch the updated user from the database
            const updatedUser = await UserModel.findById(userId)
            return res.status(200).send({msg: "Record updated", data: updatedUser})

        } catch (error) {
            return res.status(401).send(error.message)
        }
    }


/**GET: http://localhost:3200/api/generateOTP */
export const generateOTP = async(req, res) => {
    //Define format of your otp
    req.app.locals.OTP = await otpGenerator.generate(9, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
    res.status(201).send({code: req.app.locals.OTP})
}

/**GET: http://localhost:3200/api/verifyOTP */
export const verifyOTP = async(req, res) => {
    const { code } = req.query;
    //checks if the OTP stored in the server's local memory (req.app.locals.OTP) matches the code provided by the user.
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // When the OTP matches, the server sets req.app.locals.OTP to null. This effectively clears the stored OTP, preventing it from being reused.
        req.app.locals.resetSession = true; //Sets a resetSession flag in the server's local memory to true, indicating that the user has successfully verified the OTP.
        return res.status(201).send({msg: "Verify successful!"});
    }
    return res.status(400).send({error: "Invalid OTP"}); // If the OTP does not match, this line sends a response with a 400 status code (indicating a bad request) and an error message "Invalid OTP"
}


//Suucessfull redirect user when OTP is valid
/**GET: http://localhost:3200/api/createResetSession */
export const createResetSession = async(req, res) => {
    if(req.app.locals.resetSession){
        req.app.locals(resetSession) = false;
        return res.status(201).send({message: "Access granted"})
    }
    return res.status(404).send({error: "Session expired"})
}


/** PUT: http://localhost:3200/api/resetPassword
 * Update the password when there is a valid session
 */
export const resetPasword = async(req, res) => {
 try {
    // Check if a user has a valid session, only then cam password be updated
    if(!req.app.locals.resetSession){
        return res.status(404).send({error: "Session expired"})
    }

    const { username, password } = req.body;
    //Find the user by name
    const user = await UserModel.findOne({username});
    if(!user){
        return res.status(404).send({error: "Username not found"})
    }
    const hashedPassword = await bcryptjs.hash(password, 15);//Hash the new password

    // Update the users password
    const response = await UserModel.updateOne(
        { username: user.username },
        { password: hashedPassword }
    );

    if(response.nModified === 0){
        return res.status(400).send({error: "Password update failed"})
    }
    return res.status(201).send({msg: "Record Updated"})

 } catch (error) {
    return res.status(500).send({ error: error.messge || "An error occurred"})
 }
}


