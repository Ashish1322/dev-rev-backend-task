const nodemailer = require("nodemailer")

// helper function to send email and will return promise
const sendMail = async (body, subject, to) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user:process.env.EMAIL,
            pass:process.env.PASS
        }
    })
    const mailOptions = {
        from:"a.m2001nov@gmail.com",
        to: to,
        subject: subject,
        html: body
    }
    return transporter.sendMail(mailOptions)
}
module.exports = {sendMail}