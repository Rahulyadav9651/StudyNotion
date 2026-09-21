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

const mailSender = async (email, title, body) => {
    try {
        if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
            throw new Error("MAIL_USER or MAIL_PASS is missing");
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            connectionTimeout: 10000,
        });

        await transporter.verify();
        console.log("✅ SMTP connection successful");

        const info = await transporter.sendMail({
            from: `"StudyNotion || CodeHelp - by Rahul" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("✅ Email sent successfully:", info.messageId);
        return info;

    } catch (error) {
        console.error("❌ Email Error:", error);
        throw error;
    }
};

module.exports = mailSender;

        










