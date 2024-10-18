import axios from 'axios'


/******** Specify Backend domain */
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;



/** Make API requests */

/** AUTHENTICATE USERS */
export const Authenticate = async(username) => {
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error: "Username does not exist"}
    }
}

/** get user details */
export const getUser = async({ username })=>{
    try {
        const {data} = await axios.get(`/api/user/${username}`);
        return data;
    } catch (error) {
        return {error: "Passwords does not match"}
    }
}

/** Register user: This also works, but needs email verification, learn enail verification */
// export const registerUser = async(credentials)=> {
//     try {
//         const {data: {msg}, status} = await axios.post(`/api/register`, credentials);
//         let { username, email } = credentials;
        // If registration was successfull Send email ()
//         if(status === 201){
//             await axios.post('/api/registerMail', { username, userEmail: email, text: msg })
//         }
//     } catch (error) {
//         return Promise.reject({ error })
//     }
// }

export const registerUser = async (credentials) => {
    try {
        // Send registration request
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials);

        // If registration was successful, automatically log the user in
        if (status === 201) {
            const { username, password } = credentials; // Assuming password is provided in the credentials
            const loginResponse = await axios.post('/api/login', { username, password });

            // Return login response for further processing (like storing tokens, etc.)
            return loginResponse;
        }
    } catch (error) {
        // Handle registration or login failure
        return Promise.reject({ error });
    }
}



/** LOGIN USER */
export const verifyPassword = async({username, password}) =>{
    try {
        if(username){
            const {data} = await axios.post('/api/login', {username, password});
            return Promise.resolve({data})
        }
    } catch (error) {
        return Promise.reject({error: "Password does not match"})
    }
}


/** FUNCTION TO UPDATE USER */
export const updateUser = async(response)=>{
    try {
        const token = await localStorage.getItem("token"); // Retrieve the token from localStorage
        // Send a PUT request to the '/api/updateuser' endpoint with the response data and an Authorization header
        const data = await axios.put('/api/updateuser', response, {
            headers: {
                // Include the token in the Authorization header for authentication
                "Authorization": `Bearer ${token}`
            }
        });
        return Promise.resolve({data})
    } catch (error) {
      return Promise.reject({ error: "Couldn't update profile "})  
    }
}


/** Generate OTP */
export const generateOTP = async(username)=>{
    try {
        // This line makes a GET request to '/api/generateOTP' with the username as a query parameter
        const {data: {code}, status} = await axios.get('/api/generateOTP', {params: {username}}); 
        if(status === 201){
            // Calls the getUser function to retrieve the user's email based on the username
            // The 'username' parameter is passed as an object to the getUser function
            let { data : {email}} = await getUser({username});
            let text = `Your password  Recovery OTP is ${code}. verify and recover your password.`;
            await axios.post('/api/registerMail', {username, userEmail: email, text, subject: "Password recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error: "Error generating OTP"})
    }
}


/************ Verify OTP */
export const verifyOTP = async({username, code})=>{
    try {
        // Making a GET request to the '/api/verifyOTP' endpoint with the username and code as query parameters
        const {data, status} = await axios.get('/api/verifyOTP', {params: {username, code}});
        // Returning the response data and status code from the request
        return {data, status}
    } catch (error) {
        return Promise.reject(error)
    }
}


/********** RESET PASSWORD  */
export const resetPassword = async({username, password})=>{
    try {
        const {data, status} = await axios.get('/api/resetPassword', {username, password});
        return Promise.resolve({data, status});
    } catch (error) {
        return Promise.reject({error})
    }
}