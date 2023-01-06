const nodemailer = require('nodemailer')
const User = require('../Models/User')
require('dotenv').config()

module.exports = async (req, res) => {
    const userPost = await User.findById(req)

    const transporter = nodemailer.createTransport({
        service: 'Hotmail',
        host: 'smtp-mail.hotmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    
    const mailOptions = {
        from: 'LRDEVELOP ' + process.env.EMAIL,
        to: userPost.email,
        subject: 'New comment on your Post',
        text: 'Hello, you have a new comment on your post. Check it out right now!'
    }
    
    await transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    })
}