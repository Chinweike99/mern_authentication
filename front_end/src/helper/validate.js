/**
 * usernameVerify: Function to verify username
 * usernameValidate: Function to validate username
 */

import toast from "react-hot-toast"

const usernameVerify = (error ={}, values) => {
    if(!values.username){
        error.username = toast.error("Username required ..")
    }
    else if (values.username.includes(" ")){
        error.username = toast.error("Enter a valid username")
    }

    return error;
}

export const usernameValidate = async(values)=>{
    const errors = usernameVerify({}, values);

    return errors;
}



/**
 * passwordVerify
 */

const passwordVerify = (error={}, values) => {

    const specialChars = /[`!@#%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        error.password = toast.error("Password required .")
    }else if(values.password.includes(" ")){
        error.password = toast.error("Pssword should not be blank")
    }else if(values.password.length < 5){
        error.password = toast.error("Password must be greater than 5 characters long")
    }else if(!specialChars.test(values.password)){
        error.password = toast.error("Add a special character (e.g @#$ etc)")
    }

    return error;
}

export const validatePassword = async(values) => {
    const errors = passwordVerify({}, values);

    return errors;
}


/**
 * resetPassword: Function to reset password.
 */

export const resetPassword = async(values)=>{
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_password){
        errors.exist = toast.error("Passwords do not match"); 
    }

    return errors;
}


/**Funtion to validate email */
const validateEmail = (error={},values)=> {

    if(!values.email){
        error.email = toast.error("Enter your email address")
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong email...")
    }else if(!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address")
    }
    return error;
}

/**
 * :Funtion to validate register..
 */
// export const validateRegister = (values) =>{
//     const errors = passwordVerify({}, values);

//     if(values.password !== values.confirm_password){
//         errors.exist = toast("Paswords don't match")
//     }
//     return errors;
// }

////////********************** ORRR */
export const validateRegister = ( values) =>{
    const errors = usernameVerify({}, values);
    validateEmail(errors, values)
    passwordVerify(errors, values);

    if(values.password !== values.confirm_password){
        errors.exist = toast.error("Passwords do not match")
    }

    return errors;
}


/**
 * Validate Profile
 */

export const validateProfile = (values)=>{
    const errors = validateEmail({}, values);
    return errors;
}