import { Router } from "express";

const router = Router();


/** Import all controllers */
import * as controller from '../Controllers/controllers.js'
import { Auth, localVariable } from "../Middlewares/auth.js";
import { registerMail } from "../Controllers/mail.js";


/**GET ROUTE */
router.route('/user/:username').get(controller.getUser); // get username
router.route('/generateOTP').get(controller.verifyusers, localVariable, controller.generateOTP); // generate one time password
router.route('/verifyOTP').get(controller.verifyOTP); // Verify one time password
router.route('/createResetSession').get(controller.createResetSession); // Create a reset session


/** POST ROUTE */
router.route('/register').post(controller.register)//Register user
router.route('/registerMail').post(registerMail); // Send mail
router.route('/authenticate').post((req, res)=>{
    res.end();
}); // Authenticate user
router.route('/login').post(controller.verifyusers, controller.login); // Login user



/** PUT ROUTE */
router.route('/updateuser').put(Auth , controller.updateUser); // update user profile
router.route('/resetPassword').put(controller.verifyusers, controller.resetPasword); // update user password




export default router;