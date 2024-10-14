import { Router } from "express";

const router = Router();



/**GET ROUTE */
router.route('/user/:username').get(); // get username
router.route('/generateOTP').get(); // generate one time password
router.route('/verifyOTP').get(); // Verify one time password
router.route('/createResetSession').get(); // Create a reset session


/** POST ROUTE */
router.route('/register').post((req, res) => { //Register user
    res.json("Register route")
})
router.route('/registerMail').post(); // Send mail
router.route('/authenticate').post(); // Authenticate user
router.route('/login').post(); // Login user



/** PUT ROUTE */
router.route('/updateuser').put(); // update user profile
router.route('/resetPasword').put(); // update user password




export default router;