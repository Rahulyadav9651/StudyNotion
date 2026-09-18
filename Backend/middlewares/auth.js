const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
// exports.auth = async (req, res, next) => {
//     try {
//         // Extract token
//         const authHeader = req.header("Authorization");

//         const token =
//             req.cookies.token ||
//             req.body.token ||
//             (authHeader && authHeader.startsWith("Bearer ")
//                 ? authHeader.replace("Bearer ", "")
//                 : null);

//         // Token missing
//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Token is missing",
//             });
//         }

//         // Verify token
//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             console.log(decoded);

//             req.user = decoded;
//         } catch (err) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Token is invalid",
//             });
//         }

//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while validating the token",
//         });
//     }
// };

exports.auth = async (req, res, next) => {
    try {
        console.log("===== AUTH MIDDLEWARE =====");

        console.log("Cookies:", req.cookies);
        console.log("Body:", req.body);
        console.log("Authorization:", req.header("Authorization"));
        console.log("JWT_SECRET:", !!process.env.JWT_SECRET);

        const authHeader = req.header("Authorization");

        const token =
            req.cookies?.token ||
            req.body?.token ||
            (authHeader?.startsWith("Bearer ")
                ? authHeader.replace("Bearer ", "")
                : null);

        console.log("TOKEN EXISTS:", !!token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            console.log("DECODED:", decoded);

            req.user = decoded;
        } catch (err) {
            console.log("JWT ERROR:", err.message);

            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(403).json({
                success: false,
                message: "This is a protected route for Students only",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again",
        });
    }
};

// isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(403).json({
                success: false,
                message: "This is a protected route for Instructors only",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again",
        });
    }
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "This is a protected route for Admins only",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again",
        });
    }
};