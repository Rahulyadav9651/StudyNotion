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


const mailSender = async (email, title, body) => {
    try {
        const response = await fetch(
            "https://api.brevo.com/v3/smtp/email",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                },
                body: JSON.stringify({
                    sender: {
                        name: "StudyNotion",
                        email: process.env.BREVO_FROM_EMAIL,
                    },
                    to: [
                        {
                            email: email,
                        },
                    ],
                    subject: title,
                    htmlContent: body,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ Brevo API Error:", data);
            throw new Error(data.message || "Brevo email failed");
        }

        console.log("✅ Email sent:", data.messageId);
        return data;

    } catch (error) {
        console.error("❌ Error occurred while sending email:", error);
        throw error;
    }
};

module.exports = mailSender;
