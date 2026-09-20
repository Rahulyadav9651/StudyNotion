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
        // const transporter = nodemailer.createTransport({
        //     host: process.env.MAIL_HOST,
        //     port: Number(process.env.MAIL_PORT) || 587,
        //     secure: process.env.MAIL_SECURE === "true",
        //     auth: {
        //         user: process.env.MAIL_USER,
        //         pass: process.env.MAIL_PASS,
        //     },
        // });

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});



        

        const info = await transporter.sendMail({
            from: `"StudyNotion | CodeHelp - by Rahul" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent successfully:", info.response);
        return info;

    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }
};

module.exports = mailSender;














