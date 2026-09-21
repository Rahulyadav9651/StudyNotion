// const {instance} = require("../config/razorpay");
// const Course = require("../models/Course");
// const User = require("../models/User");
// const mailSender = require("../utils/mailSender");
// const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
// const { default: mongoose } = require("mongoose");
// const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
// const crypto = require("crypto");

// //order initiate
// exports.capturePayment = async(req, res) => {

//     const {courses} = req.body;
//     const userId = req.user.id;

//     if(courses.length === 0) {
//         return res.json({success:false, message:"Please provide Course Id"});
//     }

//     let totalAmount = 0;

//     for(const course_id of courses) {
//         let course;
//         try{
           
//             course = await Course.findById(course_id);
//             if(!course) {
//                 return res.status(200).json({success:false, message:"Could not find the course"});
//             }

//             const uid  = new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uid)) {
//                 return res.status(200).json({success:false, message:"Student is already Enrolled"});
//             }

//             totalAmount += course.price;
//         }
//         catch(error) {
//             console.log(error);
//             return res.status(500).json({success:false, message:error.message});
//         }
//     }
//     const currency = "INR";
//     const options = {
//         amount: totalAmount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//     }

//     try{
//         const paymentResponse = await instance.orders.create(options);
//         res.json({
//             success:true,
//             message:paymentResponse,
//         })
//     }
//     catch(error) {
//         console.log(error);
//         return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
//     }

// }





// //verify payment

// exports.verifyPayment = async(req, res) => {
//     const razorpay_order_id = req.body?.razorpay_order_id;
//     const razorpay_payment_id = req.body?.razorpay_payment_id;
//     const razorpay_signature = req.body?.razorpay_signature;
//     const courses = req.body?.courses;
//     const userId = req.user.id;

//     if(!razorpay_order_id ||
//         !razorpay_payment_id ||
//         !razorpay_signature || !courses || !userId) {
//             return res.status(200).json({success:false, message:"Payment Failed"});
//     }

//     let body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_SECRET)
//         .update(body.toString())
//         .digest("hex");

//         if(expectedSignature === razorpay_signature) {
//             //enroll karwao student ko
//             await enrollStudents(courses, userId, res);
//             //return res
//             return res.status(200).json({success:true, message:"Payment Verified"});
//         }
//         return res.status(200).json({success:"false", message:"Payment Failed"});

// }



// const enrollStudents = async(courses, userId, res) => {

//     if(!courses || !userId) {
//         return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
//     }

//     for(const courseId of courses) {
//         try{
//             //find the course and enroll the student in it
//         const enrolledCourse = await Course.findOneAndUpdate(
//             {_id:courseId},
//             {$push:{studentsEnrolled:userId}},
//             {new:true},
//         )

//         if(!enrolledCourse) {
//             return res.status(500).json({success:false,message:"Course not Found"});
//         }

//         //find the student and add the course to their list of enrolledCOurses
//         const enrolledStudent = await User.findByIdAndUpdate(userId,
//             {$push:{
//                 courses: courseId,
//             }},{new:true})
            
//         ///bachhe ko mail send kardo
//         const emailResponse = await mailSender(
//             enrollStudents.email,
//             `Successfully Enrolled into ${enrolledCourse.courseName}`,
//             courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
//         )    
//         //console.log("Email Sent Successfully", emailResponse.response);
//         }
//         catch(error) {
//             console.log(error);
//             return res.status(500).json({success:false, message:error.message});
//         }
//     }

// }

// exports.sendPaymentSuccessEmail = async(req, res) => {
//     const {orderId, paymentId, amount} = req.body;

//     const userId = req.user.id;

//     if(!orderId || !paymentId || !amount || !userId) {
//         return res.status(400).json({success:false, message:"Please provide all the fields"});
//     }

//     try{
//         //student ko dhundo
//         const enrolledStudent = await User.findById(userId);
//         await mailSender(
//             enrolledStudent.email,
//             `Payment Recieved`,
//              paymentSuccessEmail(`${enrolledStudent.firstName}`,
//              amount/100,orderId, paymentId)
//         )
//     }
//     catch(error) {
//         console.log("error in sending mail", error)
//         return res.status(500).json({success:false, message:"Could not send email"})
//     }
// }




































const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

const {
    courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");

const {
    paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");

const { default: mongoose } = require("mongoose");
const crypto = require("crypto");


// =====================================================
// CAPTURE PAYMENT
// =====================================================

exports.capturePayment = async (req, res) => {
    try {
        const { courses } = req.body;
        const userId = req.user.id;

        if (!courses || courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide Course Id",
            });
        }

        let totalAmount = 0;

        for (const course_id of courses) {
            const course = await Course.findById(course_id);

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Could not find the course",
                });
            }

            const uid = new mongoose.Types.ObjectId(userId);

            if (course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: "Student is already enrolled",
                });
            }

            totalAmount += course.price;
        }

        const currency = "INR";

        const options = {
            amount: totalAmount * 100,
            currency,
            receipt: Math.random().toString() + Date.now(),
        };

        const paymentResponse = await instance.orders.create(options);

        return res.status(200).json({
            success: true,
            message: paymentResponse,
        });

    } catch (error) {
        console.log("❌ Capture Payment Error:", error);

        return res.status(500).json({
            success: false,
            message: "Could not initiate order",
        });
    }
};


// =====================================================
// VERIFY PAYMENT
// =====================================================

exports.verifyPayment = async (req, res) => {
    try {
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const courses = req.body?.courses;
        const userId = req.user.id;

        // Validate request data
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !courses ||
            courses.length === 0 ||
            !userId
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment Failed",
            });
        }

        // Create signature
        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_SECRET
            )
            .update(body)
            .digest("hex");

        // Verify signature
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment Failed",
            });
        }

        // Payment verified
        console.log("✅ Razorpay payment verified");

        // Enroll student
        await enrollStudents(courses, userId);

        // Send ONE response
        return res.status(200).json({
            success: true,
            message: "Payment Verified",
        });

    } catch (error) {
        console.log("❌ Verify Payment Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Payment verification failed",
        });
    }
};


// =====================================================
// ENROLL STUDENTS
// =====================================================

const enrollStudents = async (courses, userId) => {

    if (!courses || courses.length === 0 || !userId) {
        throw new Error(
            "Please provide data for Courses or UserId"
        );
    }

    for (const courseId of courses) {

        // ---------------------------------------------
        // Find course and enroll student
        // ---------------------------------------------

        const enrolledCourse = await Course.findOneAndUpdate(
            { _id: courseId },
            {
                $push: {
                    studentsEnrolled: userId,
                },
            },
            {
                returnDocument: "after",
            }
        );

        if (!enrolledCourse) {
            throw new Error("Course not found");
        }


        // ---------------------------------------------
        // Find student and add course
        // ---------------------------------------------

        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    courses: courseId,
                },
            },
            {
                returnDocument: "after",
            }
        );

        if (!enrolledStudent) {
            throw new Error("Student not found");
        }


        // ---------------------------------------------
        // Check email
        // ---------------------------------------------

        if (!enrolledStudent.email) {
            throw new Error(
                "Student email is missing"
            );
        }


        // ---------------------------------------------
        // Send enrollment email
        // ---------------------------------------------

        await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(
                enrolledCourse.courseName,
                enrolledStudent.firstName
            )
        );

        console.log(
            `✅ Enrollment email sent to ${enrolledStudent.email}`
        );
    }
};


// =====================================================
// SEND PAYMENT SUCCESS EMAIL
// =====================================================

exports.sendPaymentSuccessEmail = async (req, res) => {

    const {
        orderId,
        paymentId,
        amount,
    } = req.body;

    const userId = req.user.id;

    if (
        !orderId ||
        !paymentId ||
        !amount ||
        !userId
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields",
        });
    }

    try {

        // Find student
        const enrolledStudent =
            await User.findById(userId);

        if (!enrolledStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        if (!enrolledStudent.email) {
            return res.status(400).json({
                success: false,
                message: "Student email is missing",
            });
        }

        // Send payment success email
        await mailSender(
            enrolledStudent.email,
            "Payment Received",
            paymentSuccessEmail(
                enrolledStudent.firstName,
                amount / 100,
                orderId,
                paymentId
            )
        );

        console.log(
            `✅ Payment success email sent to ${enrolledStudent.email}`
        );

        return res.status(200).json({
            success: true,
            message: "Payment success email sent",
        });

    } catch (error) {

        console.log(
            "❌ Error in sending payment email:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Could not send email",
        });
    }
};













































