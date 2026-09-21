// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 }
//             })


//             let info = await transporter.sendMail({
//                 from: 'StudyNotion || CodeHelp - by Rahul',
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             console.log(info);
//             return info;
//     }
//     catch(error) {
//         console.log(error.message);
//     }
// }


// module.exports = mailSender;


const nodemailer = require("nodemailer");

console.log("SMTP USER:", process.env.BREVO_SMTP_USER ? "FOUND" : "MISSING");
console.log("SMTP KEY:", process.env.BREVO_SMTP_KEY ? "FOUND" : "MISSING");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_KEY,
    },
});

const mailSender = async (email, title, body) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.BREVO_FROM_EMAIL,
            to: email,
            subject: title,
            html: body,
        });

        console.log("✅ Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Error occurred while sending email:", error);
        throw error;
    }
};

module.exports = mailSender;