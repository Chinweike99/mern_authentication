// import { error } from "console";
import UserModel from "../models/User.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { error } from "console";
dotenv.config();


/**Middle to Verify Users existence*/
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
            const id = req.query.id;
            if(!id){
                return res.status(400).send({error: "No user with this id"})
            }
            const body = req.body;
            const response = await UserModel.updateOne({_id: id}, body);
            if(response.nModified === 0){
                // if no documents were modified, it means user wa not found and data remained the same
                return res.status(404).send({error: "User not found or no changes made"})
            }
            // Fetch the updated user from the database
            const updatedUser = await UserModel.findById(id)
            return res.status(200).send({msg: "Record updated", data: updatedUser})

        } catch (error) {
            return res.status(401).send(error.message)
        }
    }


/**GET: http://localhost:3200/api/generateOTP */
export const generateOTP = async(req, res) => {
    res.json("generateOTP route")
}

/**GET: http://localhost:3200/api/verifyOTP */
export const verifyOTP = async(req, res) => {
    res.json("verifyOTP route")
}


//Suucessfull redirect user when OTP is valid
/**GET: http://localhost:3200/api/createResetSession */
export const createResetSession = async(req, res) => {
    res.json("createRestSession route")
}


/** PUT: http://localhost:3200/api/resetPassword
 * Update the password when there is a valid session
 */
export const resetPasword = async(req, res) => {
    res.json("resetPassword route")
}


