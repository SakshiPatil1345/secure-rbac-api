import jwt from "jsonwebtoken";
import User from "../models/user.js";

//requireSignIn
export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;

        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

//Admin Only
export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== "admin") {
            return res.status(403).send({
                success: false,
                message: "UnAuthorized Access",
            });
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Role validation error",
        });
    }
}