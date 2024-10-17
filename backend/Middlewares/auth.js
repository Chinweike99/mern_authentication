import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

// Auth Middleware
export const Auth = async(req, res, next) => {
    try {
        // Access authorize header to validate request
        //  // The split(" ")[1] extracts the token from the 'Bearer <token>' string.
        const token = req.headers.authorization.split(" ")[1];

        //Retrive the user details to the logged in user
         // The decoded token contains the user details embedded in the JWT
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        // This allows access to user details in subsequent request handlers.
        req.user = decodedToken;
        // res.json(decodedToken);

        // Call the next middleware function in the stack.
        next();

    } catch (error) {
      return  res.status(401).json({error: "Authentication failed"})
    }
}


export const localVariable = (req, res, next)=>{
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}