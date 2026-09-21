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


// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try {
//         // Check if we're in development/Render environment
//         if (process.env.NODE_ENV === "production" && !process.env.MAIL_HOST) {
//             console.log("📧 Email Service Disabled (Development Mode)");
//             console.log(`To: ${email}`);
//             console.log(`Subject: ${title}`);
//             console.log(`Body: ${body.substring(0, 100)}...`);
            
//             // Return a mock response so caller doesn't crash
//             return {
//                 messageId: "mock-" + Date.now(),
//                 response: "Email logged (not actually sent in development)",
//                 success: true
//             };
//         }

//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             port: process.env.MAIL_PORT || 587,
//             secure: false,
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS,
//             }
//         });

//         let info = await transporter.sendMail({
//             from: 'StudyNotion || CodeHelp - by Rahul',
//             to: `${email}`,
//             subject: `${title}`,
//             html: `${body}`,
//         });
        
//         console.log("✅ Email sent:", info.messageId);
//         return info;
//     } 
//     catch(error) {
//         console.log("⚠️ Email Error (non-blocking):", error.message);
        
//         // Log instead of crashing
//         console.log(`📧 Fallback: Email would have been sent to ${email}`);
        
//         // Return success anyway so app doesn't crash
//         return {
//             messageId: "fallback-" + Date.now(),
//             response: "Email queued for later delivery",
//             success: false,
//             error: error.message
//         };
//     }
// };

// module.exports = mailSender;


        

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // Check if credentials exist
        if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
            throw new Error("Email credentials not configured in .env file");
        }

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT || 2525,
            secure: false,  // Use TLS (not SSL)
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: 'StudyNotion || CodeHelp - by Rahul',
            to: email,
            subject: title,
            html: body,
        });
        
        console.log("✅ Email sent successfully:", info.messageId);
        return info;
    } 
    catch(error) {
        console.error("❌ Email Error:", error.message);
        throw error;  // Throw error so you know something went wrong
    }
};

module.exports = mailSender;








