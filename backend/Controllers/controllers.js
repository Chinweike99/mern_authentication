// import { error } from "console";
import { error } from "console";
import UserModel from "../models/User.model.js"
import bcryptjs from 'bcryptjs'
// import { rmSync } from "fs";


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

        //If password is correct, send a success message
        return res.status(200).send({msg: "Login was successful"})

    } catch (error) {
        return res.status(404).send(error.message)
    }
}

/** GET: http://localhost:3200/api/user/example123
 */
export const getUser = async(req, res) => {
    res.json("Get user Route")
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
        res.json("Updateuser route")
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


