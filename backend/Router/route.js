import { Router } from "express";

const router = Router();


/** Import all controllers */
import * as controller from '../Controllers/controllers.js'


/**GET ROUTE */
router.route('/user/:username').get(controller.getUser); // get username
router.route('/generateOTP').get(controller.generateOTP); // generate one time password
router.route('/verifyOTP').get(controller.verifyOTP); // Verify one time password
router.route('/createResetSession').get(controller.createResetSession); // Create a reset session


/** POST ROUTE */
router.route('/register').post(controller.register)//Register user
router.route('/registerMail').post(); // Send mail
router.route('/authenticate').post((req, res)=>{
    res.end();
}); // Authenticate user
router.route('/login').post(controller.login); // Login user



/** PUT ROUTE */
router.route('/updateuser').put(controller.updateUser); // update user profile
router.route('/resetPasword').put(controller.resetPasword); // update user password




export default router;