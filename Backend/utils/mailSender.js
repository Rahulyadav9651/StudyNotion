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


const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

const mailSender = async (email, title, body) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = title;
        sendSmtpEmail.htmlContent = body;
        sendSmtpEmail.sender = {
            name: "StudyNotion",
            email: process.env.BREVO_FROM_EMAIL,
        };
        sendSmtpEmail.to = [
            {
                email: email,
            },
        ];

        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log("✅ Email sent:", result);
        return result;

    } catch (error) {
        console.error("❌ Brevo API email error:", error);
        throw error;
    }
};

module.exports = mailSender;