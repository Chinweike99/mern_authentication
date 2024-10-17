import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import dotenv from 'dotenv'
dotenv.config();

const mpassword = process.env.PASSWORD;
const EMAIL = process.env.EMAIL;

console.log(EMAIL, mpassword);

// https://ethereal.email/create
let nodeConfig = {
    host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: EMAIL,
    pass: mpassword
  }
}

let transporter = nodemailer.createTransport(nodeConfig);

// Mail generator
let mailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https//mailgen.js"
    }
});


/** POST: http://localhost:3200/api/registerMail
 * @param{
 * "username": "",
 * "password": "",
 * "text": "",
 * "subject": ""
 * }
 */
export const registerMail = async(req, res) => {
    const { username, userEmail, text, subject } = req.body;

    var email = {
        body:{
            name: username,
            intro: text || "Welcome to javaScript",
            outro: "Need help, or have a question? Just reply with this email."
        }
    }

    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(email);
    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    // var emailText = mailGenerator.generatePlaintext(email);//

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: subject || "Hello, welcome",
        html: emailBody
    }
    // Send Mail
    transporter.sendMail(message).then(()=>{
        return res.status(200).send({msg: "You should recieve an email from us"})
    }).catch(error => res.status(500).send({error}));
}